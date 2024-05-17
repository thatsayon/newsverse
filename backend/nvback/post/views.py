from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *


class PostAPIView(APIView):
    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

        
# APIView for Upvote a post
class UpvotePostAPIView(APIView):
    def post(self, request, post_id):
        post = get_object_or_404(models.Post, pk=post_id)

        # Check if the user has already upvoted the post
        existing_vote = models.Vote.objects.filter(
            user=request.user, post=post).first()
        if existing_vote:
            if existing_vote.vote_type == models.Vote.UPVOTE:
                return Response({'error': 'You have already upvoted this post'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                existing_vote.delete()

        # Create an upvote for the post by the current user
        vote = models.Vote(user=request.user, post=post,
                           vote_type=models.Vote.UPVOTE)
        vote.save()

        return Response({'message': 'Upvoted successfully'}, status=status.HTTP_201_CREATED)

# APIView for Downvote a post
class DownvotePostAPIView(APIView):
    def post(self, request, post_id):
        post = get_object_or_404(models.Post, pk=post_id)

        # Check if the user has already downvoted the post
        existing_vote = models.Vote.objects.filter(
            user=request.user, post=post).first()
        if existing_vote:
            if existing_vote.vote_type == models.Vote.DOWNVOTE:
                return Response({'error': 'You have already downvoted this post'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                existing_vote.delete()

        # Create a downvote for the post by the current user
        vote = models.Vote(user=request.user, post=post,
                           vote_type=models.Vote.DOWNVOTE)
        vote.save()

        return Response({'message': 'Downvoted successfully'}, status=status.HTTP_201_CREATED)
