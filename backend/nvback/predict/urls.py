from django.urls import path 
from .views import *

urlpatterns = [
    path("posts/", PredictedPost.as_view(), name='predict-post'),
]