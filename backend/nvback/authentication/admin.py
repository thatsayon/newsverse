from django.contrib import admin
from .models import *
from core.admin import admin_site

admin_site.register(UserAccount)