from django.urls import path 
from .views import *

urlpatterns = [
    path("posts/", PredictedPost.as_view(), name='predict-post'),
    path("show-more/<int:post_id>/", ShowMoreAPIView.as_view(), name='show more'),
    path("show-less/<int:post_id>/", ShowLessAPIView.as_view(), name='show less'),
]