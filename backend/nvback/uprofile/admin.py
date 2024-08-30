from django.contrib import admin
from .models import *
from core.admin import admin_site

admin_site.register(Bookmark)
admin_site.register(History)
admin_site.register(SearchHistory)
admin_site.register(Customize)
admin_site.register(Profile)
admin_site.register(PinnedCreator)