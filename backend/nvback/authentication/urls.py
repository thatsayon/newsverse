from django.urls import path
from .views import *

urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view(), name='register'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('logout/', UserLogoutAPIView.as_view(), name='logout'),
    path('change-password/', ChangePasswordAPIView.as_view(), name='change-password'),
    path('update-email/', UserEmailUpdateAPIView.as_view(), name='update-email'),
    path('confirm-update-email/<str:uid64>/<str:token>/', confirm_email_update, name='confirm email update'),
    path('active/<uid64>/<token>/', active, name='activate'),
    path('check-email/', CheckEmailExistsorNotApiView.as_view(), name='check email'),
    path('check-username/', CheckUsernameExistsorNotAPIView.as_view(), name='check username'),
]