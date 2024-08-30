from django.contrib import admin
from .models import RssLink
from core.admin import admin_site  

@admin.register(RssLink, site=admin_site)  
class RssLinkAdmin(admin.ModelAdmin):  
    list_display = ('name', 'base_link', 'type')
