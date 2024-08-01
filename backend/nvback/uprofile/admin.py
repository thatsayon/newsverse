from django.contrib import admin
from .models import *

admin.site.register(Bookmark)
admin.site.register(History)
admin.site.register(SearchHistory)
admin.site.register(Customize)
admin.site.register(Profile)
admin.site.register(PinnedCreator)