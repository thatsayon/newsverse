from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django.utils import timezone
from .models import *
from .serializers import *


class PostAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

        
class UpvotePostAPIView(APIView):
    def post(self, request, post_id):
        post = get_object_or_404(Post, pk=post_id)
        user = request.user

        existing_vote = Vote.objects.filter(user=user, post=post).first()

        if existing_vote:
            if existing_vote.vote_type == Vote.UPVOTE:
                # If the user has already upvoted, remove the upvote
                existing_vote.delete()
                post.update_vote_counts()
                user_upvoted = False
                remove_downvote = False
            else:
                # If the user has downvoted, remove the downvote and add upvote
                existing_vote.delete()
                post.update_vote_counts()

                vote = Vote(user=user, post=post, vote_type=Vote.UPVOTE)
                vote.save()
                post.update_vote_counts()

                user_upvoted = True
                remove_downvote = True
        else:
            # If the user has not voted yet, add upvote
            vote = Vote(user=user, post=post, vote_type=Vote.UPVOTE)
            vote.save()
            post.update_vote_counts()
            user_upvoted = True
            remove_downvote = False

        response_data = {
            'message': 'Upvote removed successfully' if not user_upvoted else 'Upvoted successfully',
            'upvote_count': post.upvote_count,
            'user_upvoted': user_upvoted,
            'remove_downvote': remove_downvote
        }
        
        return Response(response_data, status=status.HTTP_200_OK if not user_upvoted else status.HTTP_201_CREATED)

class DownvotePostAPIView(APIView):
    def post(self, request, post_id):
        post = get_object_or_404(Post, pk=post_id)
        user = request.user

        existing_vote = Vote.objects.filter(user=user, post=post).first()

        if existing_vote:
            if existing_vote.vote_type == Vote.DOWNVOTE:
                # If the user has already downvoted, remove the downvote
                existing_vote.delete()
                post.update_vote_counts()
                user_downvoted = False
                remove_upvote = False
            else:
                # If the user has upvoted, remove the upvote and add downvote
                existing_vote.delete()
                post.update_vote_counts()

                vote = Vote(user=user, post=post, vote_type=Vote.DOWNVOTE)
                vote.save()
                post.update_vote_counts()

                user_downvoted = True
                remove_upvote = True
        else:
            # If the user has not voted yet, add downvote
            vote = Vote(user=user, post=post, vote_type=Vote.DOWNVOTE)
            vote.save()
            post.update_vote_counts()
            user_downvoted = True
            remove_upvote = False

        response_data = {
            'message': 'Downvote removed successfully' if not user_downvoted else 'Downvoted successfully',
            'downvote_count': post.downvote_count,
            'user_downvoted': user_downvoted,
            'remove_upvote': remove_upvote
        }
        
        return Response(response_data, status=status.HTTP_200_OK if not user_downvoted else status.HTTP_201_CREATED)
    
class MostUpvotedAPIView(APIView, PageNumberPagination):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        seven_days_ago = timezone.now() - timezone.timedelta(days=7)
        recent_posts = Post.objects.filter(created_at__gte=seven_days_ago)

        posts = recent_posts.order_by('-upvote_count')

        if posts.exists():
            result = self.paginate_queryset(posts, request, view=self)
            serializer = PostSerializer(result, many=True, context={'request': request})
            response = self.get_paginated_response(serializer.data)
            response.status_code = status.HTTP_200_OK
            return response
        else:
            return Response({"error": "No post found"}, status=status.HTTP_404_NOT_FOUND)