from django.contrib import admin
from .models import *
from core.admin import admin_site 

@admin.register(Post, site=admin_site)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "lang", "post_type", "created_at")
    list_filter = ("created_at",)
    search_fields = ("title__startswith",)

admin_site.register(Creator)


