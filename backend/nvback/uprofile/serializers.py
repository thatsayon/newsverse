from rest_framework import serializers
from post.models import Post
from authentication.models import UserAccount
from django.contrib.auth import get_user_model
from .models import *

User = get_user_model()

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'thumbnail', 'thumbnail_url', 'slug', 'created_at', 'topics', 'lang', 'upvote_count', 'downvote_count', 'user_upvoted', 'user_downvoted', 'user_bookmarked']

class PostSerializerforHistory(serializers.ModelSerializer):
    class Meta:
        model = Post 
        fields = ['title', 'thumbnail', 'thumbnail_url', 'upvote_count', 'downvote_count']

class UserSerializerforHistory(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['username', 'full_name']

class HistorySerializer(serializers.ModelSerializer):
    post = PostSerializerforHistory()
    user = UserSerializerforHistory()

    class Meta:
        model = History
        fields = ['id', 'user', 'post', 'interaction_type', 'created_at']

class SearchHistorySerializer(serializers.ModelSerializer):
    user = UserSerializerforHistory()

    class Meta:
        model = SearchHistory
        fields = ['id', 'user', 'searched_text', 'created_at']

class CustomizeSerializer(serializers.ModelSerializer):
    language = serializers.SerializerMethodField()

    class Meta:
        model = Customize
        fields = '__all__'

    def get_language(self, obj):
        return obj.language

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'full_name', 'email', 'date_joined']
