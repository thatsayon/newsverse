from django.urls import path
from .views import *

urlpatterns = [
    path('bookmark/', BookmarkListAPIView.as_view(), name='bookmark_list'),
    path('bookmark/<int:post_id>/', BookmarkPostAPIView.as_view(), name='bookmark_post'),
    path('history/', HistoryAPIView.as_view(), name='history-list'),
    path('history/<int:history_id>/', HistoryDeleteAPIView.as_view(), name='history-delete'),
    path('search-history/', SearchHistoryAPIView.as_view(), name="search-history"),
    path('search-history/<int:search_history_id>/', SearchHistoryDeleteAPIView.as_view(), name="search-history-delete"),
    path('customize/', CustomizeAPIView.as_view(), name='customize-detail'),
    path('<str:username>/', ProfileAPIView.as_view(), name='profile'),
]