from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q, Case, When, IntegerField, Exists, OuterRef, Subquery
from django.utils import timezone
from django.contrib.auth import get_user_model
from collections import Counter
from datetime import timedelta
from post.models import Post
from predict.models import UserInfo, UserReadRecord
from analytics.models import PostReport
from post.serializers import PostSerializer
from .models import UserInfo

User = get_user_model()

class PredictedPost(APIView, PageNumberPagination):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            user_info = UserInfo.objects.get(user=user)

            user_topics = [topic.lower() for topic in user_info.fav_topic.keys()]
            user_languages = user_info.lang
            user_country = user_info.country.lower()
            user_region = user_info.region.lower()

            # Define the time threshold for recent posts (last 7 days)
            time_threshold = timezone.now() - timedelta(days=7)

            # Subquery to get the read_count for UserReadRecord entries
            read_posts_subquery = UserReadRecord.objects.filter(
                user=user,
                post=OuterRef('id')
            ).values('read_count')

            # Initial filter for user languages and recent posts
            posts = Post.objects.filter(
                lang__in=user_languages,
                created_at__gte=time_threshold
            ).annotate(
                read_count=Subquery(read_posts_subquery[:1])
            )

            # Separate posts based on read_count
            unread_posts = posts.filter(read_count__isnull=True)
            read_once_posts = posts.filter(read_count=1)
            read_twice_posts = posts.filter(read_count=2)
            read_three_times_posts = posts.filter(read_count=3)

            # Exclude posts that have been read three times
            posts = unread_posts | read_once_posts | read_twice_posts

            # Construct topic queries
            topics_query = Q()
            for topic in user_topics:
                topics_query |= Q(topics__icontains=topic)

            # Construct title query
            title_query = Q()
            for topic in user_topics:
                title_query |= Q(title__icontains=topic)

            # Country queries
            country_query_in_title = Q(title__icontains=user_country)
            country_query_in_topics = Q(topics__icontains=user_country)

            # Region queries
            region_query_in_title = Q(title__icontains=user_region)
            region_query_in_topics = Q(topics__icontains=user_region)

            # Apply further filtering and ranking
            posts = posts.filter(
                topics_query | title_query | country_query_in_title | country_query_in_topics | region_query_in_title | region_query_in_topics
            ).distinct()

            posts = posts.annotate(
                rank=Case(
                    When(topics_query, then=1),
                    When(title_query, then=2),
                    When(country_query_in_topics, then=3),
                    When(region_query_in_topics, then=3),
                    When(country_query_in_title, then=4),
                    When(region_query_in_title, then=4),
                    default=5,
                    output_field=IntegerField(),
                )
            ).order_by('rank', '-created_at')

            # Reorder posts according to read_count rules
            final_posts = list(posts.filter(read_count__isnull=True))
            final_posts.extend(list(posts.filter(read_count=1)))
            final_posts.extend(list(posts.filter(read_count=2)))

            if final_posts:
                if len(final_posts) < 20:
                    posts = Post.objects.filter(created_at__gte=timezone.now() - timezone.timedelta(days=7)).order_by('-upvote_count')[:40]
                    final_posts = list(set(final_posts).union(posts))

                result = self.paginate_queryset(final_posts, request, view=self)
                serializer = PostSerializer(result, many=True, context={'request': request})
                return self.get_paginated_response(serializer.data)

            posts = Post.objects.filter(created_at__gte=timezone.now() - timezone.timedelta(days=7)).order_by('-upvote_count')
            
            if posts.exists():
                result = self.paginate_queryset(posts, request, view=self)
                serializer = PostSerializer(result, many=True, context={'request': request})
                return self.get_paginated_response(serializer.data)
            
            return Response({"error": "No posts found for this user"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ShowMoreAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, post_id):
        post = Post.objects.filter(id=post_id).first()
        if post:
            user_info = UserInfo.objects.get(user=request.user)
            user_info.fav_topic = dict(Counter(user_info.fav_topic) + Counter(post.topics))
            user_info.save()
            
        return Response(status=status.HTTP_200_OK)
    
class ShowLessAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, post_id):
        post = Post.objects.filter(id=post_id).first()
        if post:
            user_info = UserInfo.objects.get(user=request.user)
            user_info.fav_topic = dict((Counter(user_info.fav_topic) - Counter(post.topics)).items())
            user_info.save()
        return Response(status=status.HTTP_200_OK)
    
class ReportPostAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, post_id):
        post = Post.objects.filter(id=post_id).first()
        if post:
            try:
                PostReport.objects.create(post=post, user=request.user)
            except Exception as e:
                return Response(status=status.HTTP_400_BAD_REQUEST) 
        return Response(status=status.HTTP_200_OK)
