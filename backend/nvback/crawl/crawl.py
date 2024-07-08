import requests
import re 
from bs4 import BeautifulSoup

def crawl_data(url: str):
    resp = requests.get(url)
    soup = BeautifulSoup(resp.content, features="xml")
    items = soup.findAll('item')

    news_items = []

    for item in items:
        news_item = {}
        news_item['title'] = item.title.text 
        news_item['content'] = item.description.text 

        try:
            news_item['thumbnail_url'] = item.find("media:thumbnail").get('url')
        except AttributeError:
            try:
                news_item['thumbnail_url'] = item.find("media:content").get('url')
            except AttributeError:
                news_item['thumbnail_url'] = None

        news_item['post_link'] = item.link.text 

        try:
            news_item['published'] = item.find("pubDate").text
        except AttributeError:
            news_item['published'] = None
        news_items.append(news_item)

    return news_items

def crawl_yt_data(url: str):
    resp = requests.get(url)
    soup = BeautifulSoup(resp.content, features="xml")
    items = soup.findAll('entry')

    yt_items = []

    for item in items:
        yt_item = {}
        yt_item['title'] = item.title.text
        yt_item['content'] = item.find("media:description").text
        yt_item['thumbnail_url'] = item.find("media:thumbnail").get('url')
        yt_item['post_link'] = item.find("media:content").get('url')
        yt_item['creator'] = item.find("name").text
        yt_item['creator_link'] = item.find("uri").text
        yt_item['published'] = item.published.text
        yt_items.append(yt_item)
    return yt_items