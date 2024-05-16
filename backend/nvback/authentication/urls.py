from django.urls import path
from .views import *

urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view(), name='register'),
    path('active/<uid64>/<token>/', active, name='activate'),
]