from django.urls import path 
from .views import *

urlpatterns = [
    path('send-message/', SendMessageAPIVIew.as_view(), name="Send Message"),
]