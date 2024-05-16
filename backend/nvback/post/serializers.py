from rest_framework import serializers
from .models import *

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'thumbnail', 'slug', 'created_at', 'topics', 'lang', 'upvote_count', 'downvote_count']