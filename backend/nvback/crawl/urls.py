from django.urls import path 
from .views import *

urlpatterns = [
    path('websites/', CrawlWwebsites.as_view(), name="crawl"),
]