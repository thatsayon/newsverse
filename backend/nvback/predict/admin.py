from django.contrib import admin
from .models import *

admin.site.register(UserInfo)

@admin.register(UserReadRecord)
class ReadRecordAdmin(admin.ModelAdmin):
    list_display = ("user", "post", "read_count")