from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from crawl.access import IsSelectedUser
from .crawl import crawl_data
from .post import add_post


class CrawlWwebsites(APIView):
    permission_classes = [IsAuthenticated, IsSelectedUser]

    def post(self, request):
        data1 = crawl_data("https://feeds.bbci.co.uk/news/world/rss.xml")
        data2 = crawl_data("https://www.jagonews24.com/rss/rss.xml")
        data = data1 + data2
        for d in data:
            add_post(d['title'], d['content'], d['thumbnail'])

        return Response({"message": "This is a restricted view.", "data": data})
