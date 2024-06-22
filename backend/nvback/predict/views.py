from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q, Case, When, IntegerField
from django.utils import timezone
from datetime import timedelta
from post.models import Post
from predict.models import UserInfo
from post.serializers import PostSerializer

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
            
            # Initial filter for user languages
            posts = Post.objects.filter(
                lang__in=user_languages,
                created_at__gte=time_threshold
            ).order_by('-created_at')

            
            if not posts.exists():
                return Response({"error": "No posts found for this user"}, status=status.HTTP_404_NOT_FOUND)
            
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
            
            # region queries
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

            if posts.exists():
                result = self.paginate_queryset(posts, request, view=self)
                serializer = PostSerializer(result, many=True, context={'request': request})
                response = self.get_paginated_response(serializer.data)
                response.status_code = status.HTTP_200_OK
                return response
            else:
                return Response({"error": "No posts found for this user"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)