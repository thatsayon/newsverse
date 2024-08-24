from django.shortcuts import render
from rest_framework import generics, status 
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import check_password
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.contrib.auth import login as django_login
from django.contrib.auth import authenticate
from django.utils.encoding import force_bytes
from django.shortcuts import redirect
from django.db import transaction
from datetime import datetime
import json
from .serializers import *
from .tokenlogin import *

class UserRegistrationAPIView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            with transaction.atomic():
                user = serializer.save()
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                confirm_link = f"http://127.0.0.1:8000/auth/active/{uid}/{token}/"


                try:
                    email_subject = "Confirm Your Email"
                    email_body = render_to_string(
                        'confirm_email.html', {'confirm_link': confirm_link, 'full_name': user.full_name})
                    email = EmailMultiAlternatives(
                        email_subject, '', to=[user.email])
                    email.attach_alternative(email_body, "text/html")
                    email.send()
                except Exception as e:
                    user.delete()
                    return Response({"error": "Failed to send verification email. User registration rolled back."}, status=status.HTTP_400_BAD_REQUEST)

                response_data = {"message": "Verification mail sended"}
                return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            if 'email' in serializer.errors:
                error_response = {
                    "error": "Email already exists"
                }
                return Response(error_response, status=status.HTTP_400_BAD_REQUEST)

            if 'username' in serializer.errors:
                error_response = {
                    "error": "Username already exists"
                }
                return Response(error_response, status=status.HTTP_400_BAD_REQUEST)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def active(request, uid64, token):
    try:
        uid = urlsafe_base64_decode(uid64).decode()
        user = User._default_manager.get(pk=uid)
    except (User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()

        email_subject = "Welcome to Sahityo Jogot"
        email_body = render_to_string(
            'welcome.html', {'user_name': user.full_name}
        )
        email = EmailMultiAlternatives(email_subject, '', to=[user.email])
        email.attach_alternative(email_body, "text/html")
        email.send()
        return redirect('https://sahityojogot.com/')
    else:
        return Response({"error": "wrong activation url"}, status=status.HTTP_400_BAD_REQUEST)


class UserLoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')

            user = None
            if email:
                user = authenticate(request, email=email, password=password)
            elif username:
                try:
                    cuser = User.objects.get(username=username)
                    user = authenticate(
                        request, email=cuser.email, password=password)

                except User.DoesNotExist:
                    return Response({'error': 'Invalid credentials'}, status=status.HTTP_404_NOT_FOUND)

            if user:
                # first check if the account is in the deletion request model
                # deletion_request = AccountDeletionRequest.objects.filter(
                #     user=user).first()
                # if deletion_request:
                #     return Response({"detail": "You account is pending deletion. Please recover your account before loggin in."}, status=status.HTTP_400_BAD_REQUEST)

                ip_add = request.META.get('REMOTE_ADDR')
                device_info = request.META.get('HTTP_USER_AGENT')

                # createing token for the user after login
                token, created = Token.objects.get_or_create(user=user)
                is_expired, token = token_expire_handler(token)
                django_login(request, user)

                # get current time
                current_time = datetime.now()
                formatted_time = current_time.strftime("%B %d, %Y at %I:%M %p")

                # send mail if user logged in
                email_subject = "Login Alert"
                email_body = render_to_string(
                    'login_alert.html', {'name': user.full_name, 'current_time': formatted_time, 'ip_add': ip_add, 'device_info': device_info})
                email = EmailMultiAlternatives(
                    email_subject, '', to=[user.email])
                email.attach_alternative(email_body, "text/html")
                email.send()

                user_info = UserInfoSerializer(user).data
                return Response({'token': token.key, 'expires_in': expires_in(token), 'user_info': user_info})
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogoutAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.auth.delete()
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
    
class ChangePasswordAPIView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        old_password = serializer.validated_data.get('old_password')
        new_password = serializer.validated_data.get('new_password')

        if check_password(new_password, user.password):
            return Response({'new_password': ['New password must be different from the old password.']}, status=status.HTTP_400_BAD_REQUEST)
        if not check_password(old_password, user.password):
            return Response({'old_password': ['Wrong password.']}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password successfully changed'}, status=status.HTTP_200_OK)

class UserEmailUpdateAPIView(generics.UpdateAPIView):
    serializer_class = EmailUpdateSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            new_email = serializer.validated_data.get('new_email')

            user.new_email = new_email
            user.save()

            # Generate verification link
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            confirm_link = f"http://127.0.0.1:8000/auth/confirm-update-email/{uid}/{token}/"

            # Send verification email
            email_subject = "Confirm Your Email Address Update"
            email_body = render_to_string(
                'confirm_email_update.html', {'confirm_link': confirm_link})
            email = EmailMultiAlternatives(email_subject, '', to=[new_email])
            email.attach_alternative(email_body, "text/html")
            email.send()

            return Response({"detail": "Verification email sent to the new email address."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def confirm_email_update(request, uid64, token):
    try:
        uid = urlsafe_base64_decode(uid64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        new_email = user.new_email
        if new_email:
            user.email = new_email
            user.new_email = ''
            user.save()
            return redirect('https://sahityojogot.com/')
        else:
            return Response({"error": "No new email address found."}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"error": "Invalid activation link."}, status=status.HTTP_400_BAD_REQUEST)


class CheckEmailExistsorNotApiView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = EmailUpdateSerializer(data=request.data)
        if serializer.is_valid():
            given_email = serializer.validated_data.get('new_email')
            if User.objects.filter(email=given_email):
                return Response({"error": "email already exists"}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"detail": "email is available"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CheckUsernameExistsorNotAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UsernameExistorNotSerializer(data=request.data)
        if serializer.is_valid():
            given_username = serializer.validated_data.get('username')
            if User.objects.filter(username=given_username):
                return Response({"error": "username already exists"}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"detail": "username is available"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UsernameGetAPIView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, *args, **kwargs):
        return Response({"username": request.user.username})