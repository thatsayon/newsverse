from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from .models import Bookmark
from post.models import Post
from post.serializers import PostSerializer

class BookmarkPostAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        # Get the authenticated user
        user = request.user
        
        # Check if the post exists
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({"error": "Post does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if the post is already bookmarked by the user
        bookmark_qs = Bookmark.objects.filter(user=user, post=post)
        if bookmark_qs.exists():
            # If already bookmarked, delete the bookmark (unbookmark)
            bookmark_qs.delete()
            return Response({"message": "Post has been unbookmarked successfully", "bookmarked": False}, status=status.HTTP_200_OK)
        
        # If not bookmarked, create a new bookmark
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