from rest_framework import serializers
from post.models import Post
from authentication.models import UserAccount
from django.contrib.auth import get_user_model
from .models import *
from post.models import Vote
from predict.models import UserInfo
from uprofile.models import History, PinnedCreator

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

class PrivateProfileSerializer(serializers.ModelSerializer):
    is_public = serializers.BooleanField(source='profile.is_public')
    class Meta:
        model = User
        fields = ['id', 'username', 'full_name', 'is_public']

class ProfileSerializer(serializers.ModelSerializer):
    facebook = serializers.URLField(source='profile.facebook')
    instagram = serializers.URLField(source='profile.instagram')
    twitter = serializers.URLField(source='profile.twitter')
    linkedin = serializers.URLField(source='profile.linkedin')
    personal_website = serializers.URLField(source='profile.personal_website')
    profile_views = serializers.IntegerField(source='profile.profile_views')
    longest_streak = serializers.IntegerField(source='profile.longest_streak')
    total_reading_days = serializers.IntegerField(source='profile.total_reading_days')
    upvote_count = serializers.SerializerMethodField()
    downvote_count = serializers.SerializerMethodField()
    read_count = serializers.SerializerMethodField()
    address = serializers.SerializerMethodField()
    favourite_topics = serializers.SerializerMethodField()
    pinned_creators = serializers.SerializerMethodField()
    is_public = serializers.BooleanField(source='profile.is_public')

    class Meta:
        model = User
        fields = [
            'id', 'username', 'full_name', 'email', 'date_joined', 
            'facebook', 'instagram', 'twitter', 'linkedin',
            'personal_website', 'profile_views', 'longest_streak', 'total_reading_days',
            'upvote_count', 'downvote_count', 'read_count', 'address',
            'favourite_topics', 'pinned_creators', 'is_public'
        ]

    def get_upvote_count(self, obj):
        return Vote.objects.filter(user=obj, vote_type=Vote.UPVOTE).count()
    
    def get_downvote_count(self, obj):
        return Vote.objects.filter(user=obj, vote_type=Vote.DOWNVOTE).count()
    
    def get_read_count(self, obj):
        return History.count_read_interaction(obj)
    
    def get_address(self, obj):
        userinfo = UserInfo.objects.filter(user=obj).first()
        if userinfo:
            return f"{userinfo.region}, {userinfo.country}"
    
    def get_favourite_topics(self, obj):
        userinfo = UserInfo.objects.filter(user=obj).first()
        if userinfo:
            top_four = sorted(userinfo.fav_topic, key=userinfo.fav_topic.get, reverse=True)[:4]
            return top_four
    
    def get_pinned_creators(self, obj):
        creators = PinnedCreator.objects.filter(user=obj)
        creators_data = [
            {
                'name': creator.pinned_creator.name,
                'link': creator.pinned_creator.website_link
            }
            for creator in creators
        ] 
        return creators_data
     
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        return {key: value for key, value in representation.items() if value not in [None, '', [], {}]}