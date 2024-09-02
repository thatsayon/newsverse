from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _ 
from django.utils import timezone
from post.models import Post 

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
    
class PostReport(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    report_reason = models.CharField(max_length=50, choices=[
        ("sfi", "Scam, fraud or impersonation"),
        ("spam", "Spam"),
        ("fi", "False information"),
        ("spri", "Selling or promoting restricted items"),
        ("dws", "I don't want to see this"),
        ("se", "Something else")
    ]) 
    class Meta:
        unique_together = ('user', 'post')
    
    def __str__(self):
        return f"{self.user} reported for {self.post}"