from django.contrib import admin
from .models import *
from core.admin import admin_site

admin_site.register(SendMessage)

@admin.register(ActiveUserCount, site=admin_site)
class DailyVisitAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'visit_count')
    list_filter = ('date', 'user')