from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import *
from .serializers import *

class SendMessageAPIVIew(generics.CreateAPIView):
    queryset = SendMessage.objects.all()
    serializer_class = SendMessageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ReportPostAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, post_id):
        post = Post.objects.filter(id=post_id).first()
        if post:
            serializer = PostReportSerializer(post=post, data=request.data)
            if serializer.is_valid:
                try:
                    PostReport.objects.create(post=post, user=request.user)
                except Exception as e:
                    return Response(status=status.HTTP_400_BAD_REQUEST) 
        return Response(status=status.HTTP_200_OK)