from django.db import models
from django.contrib.auth import get_user_model
from post.models import Post 

User = get_user_model()

class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')
    
    def __str__(self):
        return f"{self.user.username}'s bookmark on {self.post.title}"

class History(models.Model):
    INTERACTION_CHOICES = [
        ('upvote', 'Upvote'),
        ('downvote', 'Downvote'),
        ('read', 'Read'),
        ('share', 'Share'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    interaction_type = models.CharField(max_length=10, choices=INTERACTION_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} history created at {self.created_at}"

class SearchHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    searched_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} searched for {self.searched_text}"

class Customize(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    layout = models.CharField(max_length=8, choices=[
        ("grid", "Grid"),
        ("list", "List")
    ], default="grid")
    show_video_news = models.BooleanField(default=True)
    send_email = models.BooleanField(default=True)

    @property
    def language(self):
        try:
            return self.user.user_info.all()[0].lang
        except Exception:
            return None 
    
    def __str__(self):
        return f"Customize setting for {self.user.username}"