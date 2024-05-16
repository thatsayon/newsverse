from django.shortcuts import render
from rest_framework import generics, status 
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
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

                return Response({'token': token.key, 'expires_in': expires_in(token), })
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogoutAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.auth.delete()
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)