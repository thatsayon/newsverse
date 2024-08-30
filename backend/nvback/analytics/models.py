from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _ 
from django.utils import timezone

User = get_user_model()

class SendMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Message")
    name = models.CharField(_("Name"), max_length=50)
    email = models.EmailField(_("Email"))
    message = models.TextField(_("Message"))
    send_time = models.DateTimeField(_("Send Tie"), auto_now_add=True)

    def __str__(self):
        return f"Messaged by {self.name}"
        
class ActiveUserCount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)
    visit_count = models.PositiveIntegerField(default=1)
    
    class Meta:
        unique_together = ('user', 'date')
    
    def __str__(self):
        return f"{self.date} - {self.visit_count}"