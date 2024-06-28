from django.shortcuts import render, get_object_or_404
from rest_framework import status, generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django.utils import timezone
from django.utils.timezone import now, timedelta
from uprofile.models import History, SearchHistory
from .models import *
from .serializers import *
import django_filters
from .utils import PostFilter

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
            history = History(user=user, post=post, interaction_type='upvote')
            history.save()

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
            history = History(user=user, post=post, interaction_type='downvote')
            history.save()

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

    
class PostSearchAPIView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]  
    filter_backends = [filters.SearchFilter, DjangoFilterBackend] 
    search_fields = ['title', 'content', 'topics', 'lang']  
    filterset_class = PostFilter 

    def get(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        
        page = self.paginate_queryset(queryset)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            searched_text = request.GET.get('search')
            if searched_text:
                try:
                    last_search = SearchHistory.objects.filter(user=request.user).latest('created_at')
                    last_search_text = last_search.searched_text if last_search else ''
                except SearchHistory.DoesNotExist:
                    last_search_text = ''
                if searched_text != last_search_text:
                    new_search = SearchHistory(user=request.user, searched_text=searched_text)
                    new_search.save()
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)