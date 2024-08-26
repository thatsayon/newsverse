from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from crawl.access import IsSelectedUser
from .crawl import crawl_data, crawl_yt_data
from .post import add_post
from .models import *

class CrawlWwebsites(APIView):
    permission_classes = [IsAuthenticated, IsSelectedUser]

    def post(self, request):
        links = RssLink.objects.all()
        # links = []
        
        for link in links:
            if link.type == "yt":
                data = crawl_yt_data(link.link)
                for d in data:
                    try:
                        add_post(
                            d['title'],
                            d['content'],
                            d['thumbnail_url'],
                            d['creator'],
                            d['creator_link'],
                            d['post_link'],
                            d['published'],
                            link.type
                        )
                    except Exception:
                        pass
            elif link.type == "web":
                data = crawl_data(link.link)
                for d in data:
                    try:
                        add_post(
                            d['title'],
                            d['content'],
                            d['thumbnail_url'],
                            link.name,
                            link.base_link,
                            d['post_link'],
                            d['published'],
                            link.type
                        )
                    except Exception:
                        pass

        # data1 = crawl_data("https://feeds.bbci.co.uk/news/world/rss.xml")
        # data2 = crawl_data("https://www.jagonews24.com/rss/rss.xml")
        # data = data1 + data2
        # for d in data:
        #     add_post(d['title'], d['content'], d['thumbnail'])

        return Response({"message": "crawling completed"}, status=status.HTTP_200_OK)
