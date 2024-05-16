from django.shortcuts import render
from rest_framework import generics, status 
from rest_framework.response import Response 
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.utils.encoding import force_bytes
from django.shortcuts import redirect
from django.db import transaction
from .serializers import *

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
