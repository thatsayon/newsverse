from django.urls import path 
from .views import *

urlpatterns = [
    path('get/', PostAPIView.as_view(), name='post'),
]
