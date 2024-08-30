from django.utils import timezone
from analytics.models import ActiveUserCount

class TrackUserVisitMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Process the request (before the view is called)
        if request.user.is_authenticated:
            today = timezone.now().date()
            ActiveUserCount.objects.get_or_create(
                user=request.user, date=today
            )
        
        # Get the response from the view
        response = self.get_response(request)
        
        # Process the response (after the view is called)
        return response