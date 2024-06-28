import django_filters
from django.utils.timezone import now, timedelta
from django_filters import rest_framework as filters
from django.db.models import Q
from django.contrib.postgres.fields import ArrayField 
from .models import Post

class ArrayFieldFilter(filters.BaseCSVFilter, filters.CharFilter):
    def filter(self, qs, value):
        if not value:
            return qs

        values = value.split(',')
        queries = [Q(topics__icontains=val) for val in values]
        query = queries.pop()

        for item in queries:
            query |= item
        
        return qs.filter(query)

class PostFilter(django_filters.FilterSet):
    last_7_days = django_filters.BooleanFilter(method='filter_last_7_days', label="Last 7 Days")
    last_30_days = django_filters.BooleanFilter(method='filter_last_30_days', label="Last 30 Days")
    lang = django_filters.CharFilter(field_name='lang', lookup_expr='iexact')
    topics = ArrayFieldFilter(field_name='topics')  # Use the custom filter for ArrayField

    class Meta:
        model = Post
        fields = ['title', 'content', 'topics', 'lang', 'last_7_days', 'last_30_days']
        
        filter_overrides = {
            ArrayField: {
                'filter_class': ArrayFieldFilter,
            },
        }

    def filter_last_7_days(self, queryset, name, value):
        if value:
            return queryset.filter(created_at__gte=now() - timedelta(days=7))
        return queryset

    def filter_last_30_days(self, queryset, name, value):
        if value:
            return queryset.filter(created_at__gte=now() - timedelta(days=30))
        return queryset