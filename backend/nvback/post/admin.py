from django.contrib import admin
from .models import *

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "lang", "post_type", "created_at")
    list_filter = ("created_at",)
    search_fields = ("title__startswith",)

admin.site.register(Creator)


