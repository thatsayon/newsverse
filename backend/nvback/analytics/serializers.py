from rest_framework import serializers
from django.utils import timezone
from datetime import timedelta
from .models import *

class SendMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SendMessage
        fields = ['user', 'name', 'email', 'message', 'send_time']
        read_only_fields = ['user', 'send_time']
    
    def validate(self, data):
        user = self.context['request'].user
        three_hours_ago = timezone.now() - timedelta(hours=3)
        
        if SendMessage.objects.filter(user=user, send_time__gte=three_hours_ago).exists():
            raise serializers.ValidationError("You can only send one message every 3 hours.")
        
        return data