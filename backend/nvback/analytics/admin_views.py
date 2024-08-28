from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import get_user_model
from post.models import Post

User = get_user_model()

@staff_member_required
def analytics_admin_view(request):
    context = {
        'total_user': User.objects.count(),
        'total_post': Post.objects.count(),
        'data': "Some information to display"
    }
    return render(request, 'analytics_page.html', context)
