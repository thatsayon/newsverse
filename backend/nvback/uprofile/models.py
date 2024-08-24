from django.db import models
from django.contrib.auth import get_user_model
from post.models import Post 
from datetime import date, timedelta
from post.models import Creator

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

    @staticmethod
    def count_read_interaction(user):
        return History.objects.filter(user=user, interaction_type="read").count()
        
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

        
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    is_public = models.BooleanField(default=True, verbose_name="Is Public")
    facebook = models.URLField(blank=True, null=True, verbose_name="Facebook Profile URL")
    instagram = models.URLField(blank=True, null=True, verbose_name="Instagram Profile URL")
    twitter = models.URLField(blank=True, null=True, verbose_name="Twitter/X Profile URL")
    linkedin = models.URLField(blank=True, null=True, verbose_name="LinkedIn Profile URL")
    personal_website = models.URLField(blank=True, null=True, verbose_name="Personal Website URL")
    profile_views = models.IntegerField(default=0)
    longest_streak = models.IntegerField(default=0)
    total_reading_days = models.IntegerField(default=0)
    last_read_date = models.DateField(null=True, blank=True)
    

    def __str__(self):
        return f'{self.user.username} Profile'

    def increment_profile_views(self, viewing_user):
        if viewing_user == self.user:
            return
        if not ProfileView.objects.filter(profile=self, viewer=viewing_user).exists():
            ProfileView.objects.create(profile=self, viewer=viewing_user)
            self.profile_views += 1
            self.save()
    
    def increment_reading_streak(self):
        today = date.today()
        if self.last_read_date == today:
            return  # Already incremented today
        if self.last_read_date == today - timedelta(days=1):
            # Continue the streak
            self.total_reading_days += 1
            self.longest_streak = max(self.longest_streak, self.total_reading_days)
        else:
            # Streak broken
            self.total_reading_days = 1
        self.last_read_date = today
        self.save()
        
    class Meta:
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'

class ProfileView(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    viewer = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.viewer.username} viewed {self.profile.user.username}'

    class Meta:
        unique_together = ('profile', 'viewer')
        
class PinnedCreator(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pinned_creator')
    pinned_creator = models.ForeignKey(Creator, on_delete=models.CASCADE, related_name='pinned_by_users')

    class Meta:
        unique_together = ('user', 'pinned_creator')
        # indexes = [
        #     models.Index(fields=['user']),
        #     models.Index(fields=['creator']),
        # ]
        verbose_name = 'Pinned Creator'
        verbose_name_plural = 'Pinned Creators'

    def __str__(self):
        return f'{self.user.username} pinned {self.pinned_creator.name}'

