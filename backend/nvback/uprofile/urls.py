from django.urls import path
from .views import *

urlpatterns = [
    path('bookmark/', BookmarkListAPIView.as_view(), name='bookmark_list'),
    path('bookmark/<int:post_id>/', BookmarkPostAPIView.as_view(), name='bookmark_post'),
]