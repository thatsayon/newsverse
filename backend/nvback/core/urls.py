from django.conf.urls.static import static
from django.urls import path, include
from django.conf import settings
from .admin import admin_site  # Import the instance, not the class

urlpatterns = [
    path('admin/', admin_site.urls),  # Use the instance, not the class
    path('auth/', include('authentication.urls')),
    path('post/', include('post.urls')),
    path('predict/', include('predict.urls')),
    path('profile/', include('uprofile.urls')),
    path('crawl/', include('crawl.urls')),
    path('analytics/', include('analytics.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
