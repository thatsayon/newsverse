from rest_framework import serializers
from .models import *

class PostSerializer(serializers.ModelSerializer):
    user_upvoted = serializers.SerializerMethodField()
    user_downvoted = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'thumbnail', 'slug', 'created_at', 'topics', 'lang', 'upvote_count', 'downvote_count', 'user_upvoted', 'user_downvoted']
    
    def get_user_upvoted(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            user = request.user
            return Vote.objects.filter(user=user, post=obj, vote_type=Vote.UPVOTE).exists()
        return False

    def get_user_downvoted(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            user = request.user
            return Vote.objects.filter(user=user, post=obj, vote_type=Vote.DOWNVOTE).exists()
        return False