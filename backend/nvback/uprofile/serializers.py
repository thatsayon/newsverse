from rest_framework import serializers
from post.models import Post 

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'thumbnail', 'thumbnail_url', 'slug', 'created_at', 'topics', 'lang', 'upvote_count', 'downvote_count', 'user_upvoted', 'user_downvoted', 'user_bookmarked']