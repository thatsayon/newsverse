from django.contrib.admin import AdminSite
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.apps import apps
from django.contrib.admin.sites import AlreadyRegistered
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from post.models import Post 
from analytics.models import ActiveUserCount, PostReport
User = get_user_model()

def chart_view():
    today = timezone.now().date()
    start_of_month = today.replace(day=1)
    end_of_month = (start_of_month + timedelta(days=31)).replace(day=1) - timedelta(days=1)
    
    visits = ActiveUserCount.objects.filter(date__range=[start_of_month, end_of_month]).order_by('date')
    data = {
        'dates': [visit.date.strftime('%B %d') for visit in visits],  # Example: 'January 01'
        'counts': [visit.visit_count for visit in visits],
    }
    
    return data

class CustomAdminSite(AdminSite):
    @method_decorator(never_cache)
    def index(self, request, extra_context=None):
        if extra_context is None:
            extra_context = {}
        
        # Add your custom context here
        extra_context['custom_data'] = 'This is some custom data'
        extra_context['dashboard_stats'] = {
            'total_users': User.objects.count(),
            'total_posts': Post.objects.count(),
            'comments': 450,
        }
        extra_context['activity'] = {
            'total_active_user_today': ActiveUserCount.objects.filter(date=timezone.now().date()).count(),
            'total_active_user_yesterday': ActiveUserCount.objects.filter(date=timezone.now().date() - timedelta(days=1)).count(),
            'total_active_user_this_week': ActiveUserCount.objects.filter(
                date__gte=(timezone.now().date() - timedelta(days=timezone.now().date().weekday()))).count(),
            'total_active_user_this_month': ActiveUserCount.objects.filter(
                date__year=timezone.now().year,
                date__month=timezone.now().month).count(),
            'total_active_user_last_month': ActiveUserCount.objects.filter(
                date__year=(timezone.now().date().replace(day=1) - timedelta(days=1)).year,
                date__month=(timezone.now().date().replace(day=1) - timedelta(days=1)).month).count(),
            'graph_data': chart_view(),
        }

        extra_context['report'] = {
            'post_report': PostReport.objects.count(),
        }
        return super().index(request, extra_context=extra_context)

admin_site = CustomAdminSite()

# Automatically register all models with the custom admin site
for model in apps.get_models():
    try:
        # admin_site.register(model)
        pass
    except AlreadyRegistered:
        pass
