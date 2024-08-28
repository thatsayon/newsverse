from django.urls import path 
from .views import *
from .admin_views import *

urlpatterns = [
    path('page/', analytics_admin_view, name="analytics page"),
    path('send-message/', SendMessageAPIVIew.as_view(), name="Send Message"),
]