from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from post.models import Post
from predict.models import UserInfo
from post.serializers import PostSerializer

class PredictedPost(APIView, PageNumberPagination):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user 
            user_info = UserInfo.objects.get(user=user)

            user_topics = list(user_info.fav_topic.keys())
            user_languages = user_info.lang
            
            posts = Post.objects.filter(lang__in=user_languages).order_by('-created_at')
            
            topics_query = Q()
            for ftpc in user_topics:
                topics_query |= Q(topics__icontains=ftpc)

            posts = posts.filter(topics_query).distinct()

            if posts.exists():
                result = self.paginate_queryset(posts, request, view=self)            
                serializer = PostSerializer(result, many=True)
                response = self.get_paginated_response(serializer.data)
                response.status_code = status.HTTP_200_OK
                return response
            else:
                return Response({"error": "No posts found for this user"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
