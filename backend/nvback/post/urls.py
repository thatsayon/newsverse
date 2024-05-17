from django.urls import path 
from .views import *

urlpatterns = [
    path('get/', PostAPIView.as_view(), name='post'),
    path('upvote/<int:post_id>/', UpvotePostAPIView.as_view(), name='upvote_post'),
    path('downvote/<int:post_id>/', DownvotePostAPIView.as_view(), name='downvote_post'),
]
