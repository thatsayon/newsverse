from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('authentication.urls')),
    path('post/', include('post.urls')),
    path('predict/', include('predict.urls')),
    path('profile/', include('uprofile.urls')),
    path('crawl/', include('crawl.urls')),
    path('analytics/', include('analytics.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
