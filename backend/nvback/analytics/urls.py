from django.urls import path 
from .views import *

urlpatterns = [
    path('send-message/', SendMessageAPIVIew.as_view(), name="Send Message"),
    path("report/<int:post_id>/", ReportPostAPIView.as_view(), name='report post'),
]