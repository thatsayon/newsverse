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
        news_item['thumbnail'] = item.find("media:thumbnail").get('url')
        news_items.append(news_item)

    return news_items