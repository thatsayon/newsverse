from django.contrib import admin
from django.db.models import Count
from django.utils.html import format_html
from django.urls import reverse
from .models import *
from core.admin import admin_site

class MostReportedPostFilter(admin.SimpleListFilter):
    title = 'Most Reported Posts'
    parameter_name = 'most_reported'

    def lookups(self, request, model_admin):
        # Annotate posts with their report count and create a lookup list
        most_reported_posts = (
            Post.objects.annotate(report_count=Count('postreport'))
            .order_by('-report_count')
            .values_list('id', 'title', 'report_count')
        )
        return [(post_id, f"{title} ({report_count} reports)") for post_id, title, report_count in most_reported_posts]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(post_id=self.value())
        return queryset

class PostReportAdmin(admin.ModelAdmin):
    list_filter = (MostReportedPostFilter,)
    list_display = ('post', 'user', 'report_count', 'post_link')

    def report_count(self, obj):
        return PostReport.objects.filter(post=obj.post).count()

    report_count.short_description = 'Report Count'

    def post_link(self, obj):
        link = reverse("admin:%s_%s_change" % (obj.post._meta.app_label, obj.post._meta.model_name), args=[obj.post.id])
        truncated_title = ' '.join(obj.post.title.split()[:3]) + '...'
        return format_html('<a href="{}">{}</a>', link, truncated_title)


    post_link.short_description = 'Post'

admin_site.register(PostReport, PostReportAdmin)

admin_site.register(SendMessage)
# admin_site.register(PostReport)

@admin.register(ActiveUserCount, site=admin_site)
class DailyVisitAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'visit_count')
    list_filter = ('date', 'user')