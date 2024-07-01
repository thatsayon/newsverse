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
        news_item['news_link'] = item.link.text 

        try:
            news_item['thumbnail'] = item.find("media:thumbnail").get('url')
        except AttributeError:
            try:
                news_item['thumbnail'] = item.find("media:content").get('url')
            except AttributeError:
                news_item['thumbnail'] = None
        news_items.append(news_item)

    return news_items