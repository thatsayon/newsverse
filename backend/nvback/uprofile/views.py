from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
from post.models import Post
from post.serializers import PostSerializer

class BookmarkPostAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        user = request.user
        
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        bookmark_qs = Bookmark.objects.filter(user=user, post=post)
        if bookmark_qs.exists():
            bookmark_qs.delete()
            return Response({"message": "Post has been unbookmarked successfully", "bookmarked": False}, status=status.HTTP_200_OK)
        
        bookmark = Bookmark.objects.create(user=user, post=post)
        bookmark.save()
        
        return Response({"message": "Post has been bookmarked successfully", "bookmarked": True}, status=status.HTTP_201_CREATED)
    
class BookmarkListAPIView(APIView, PageNumberPagination):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user 
        bookmarks = Bookmark.objects.filter(user=user)
        posts = [bookmark.post for bookmark in bookmarks]
        result = self.paginate_queryset(posts, request, view=self)
        serializer = PostSerializer(result, many=True, context={'request': request})
        response = self.get_paginated_response(serializer.data)
        response.status_code = status.HTTP_200_OK
        return response

class HistoryAPIView(APIView, PageNumberPagination):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        histories = History.objects.filter(user=request.user).order_by('-created_at')
        
        if histories.exists():
            result = self.paginate_queryset(histories, request, view=self)
            serializer = HistorySerializer(result, many=True)
            response = self.get_paginated_response(serializer.data)
            response.status_code = status.HTTP_200_OK
            return response
        else:
            return Response({"error": "No history found"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        user = request.user 
        history_deleted, _ = History.objects.filter(user=user).delete()

        if history_deleted:
            return Response({"message": "All history records deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "No history found to delete"}, status=status.HTTP_400_BAD_REQUEST)

class HistoryDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, history_id):
        history_instance = get_object_or_404(History, id=history_id)

        if history_instance.user != request.user:
            return Response(
                {"message": "You do not have permission to delete this history record."},
                status=status.HTTP_403_FORBIDDEN
            )

        history_instance.delete()
        return Response(
            {"message": "History record deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )

class SearchHistoryAPIView(APIView, PageNumberPagination):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        search_histories = SearchHistory.objects.filter(user=request.user).order_by('-created_at')

        if search_histories.exists():
            result = self.paginate_queryset(search_histories, request, view=self)
            serializer = SearchHistorySerializer(result, many=True)
            response = self.get_paginated_response(serializer.data)
            response.status_code = status.HTTP_200_OK
            return response 
        else:
            return Response({"error": "No search history found"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        user = request.user 
        search_history_deleted, _ = SearchHistory.objects.filter(user=user).delete()

        if search_history_deleted:
            return Response({"message": "All search history records deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "No search history found to delete"}, status=status.HTTP_400_BAD_REQUEST)

class SearchHistoryDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, search_history_id):
        search_history_instance = get_object_or_404(SearchHistory, id=search_history_id)

        if search_history_instance.user != request.user:
            return Response(
                {"message": "You do not have permission to delete this search history record"},
                status=status.HTTP_403_FORBIDDEN
            )

        search_history_instance.delete()
        return Response(
            {"message": "Search history record deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )