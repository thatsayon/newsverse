from django.contrib import admin
from .models import *
from core.admin import admin_site

admin_site.register(UserInfo)

@admin.register(UserReadRecord, site=admin_site)
class ReadRecordAdmin(admin.ModelAdmin):
    list_display = ("user", "post", "read_count")