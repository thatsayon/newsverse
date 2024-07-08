from django.contrib import admin
from .models import *


@admin.register(RssLink)
class RssLinkAdmin(admin.ModelAdmin):
    list_display = ('name', 'base_link', 'type')