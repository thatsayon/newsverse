from django.urls import path
from .views import BookmarkPostAPIView

urlpatterns = [
    path('bookmark/<int:post_id>/', BookmarkPostAPIView.as_view(), name='bookmark_post'),
]