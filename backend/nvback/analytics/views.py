from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *

class SendMessageAPIVIew(generics.CreateAPIView):
    queryset = SendMessage.objects.all()
    serializer_class = SendMessageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
