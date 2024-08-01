from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField, JSONField
from django.utils.translation import gettext_lazy as _
from post.models import Post

User = get_user_model()

class UserInfo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_info')
    address = models.CharField(max_length=120)
    region = models.CharField(max_length=120)
    country = models.CharField(max_length=120)

    fav_topic = models.JSONField()
    lang = ArrayField(models.CharField(max_length=2), null=True, blank=True)
    
    def save(self, *args, **kwargs):
        if isinstance(self.fav_topic, dict):
            # Sort the fav_topic dictionary by value before saving
            self.fav_topic = dict(sorted(self.fav_topic.items(), key=lambda item: item[1], reverse=True))
        super(UserInfo, self).save(*args, **kwargs)
        
    def __str__(self):
        return self.user.full_name

class UserReadRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="read_records")
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    read_count = models.PositiveIntegerField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'post', 'read_count'], name='unique_user_post_read_count')
        ]

    def save(self, *args, **kwargs):
        if not self.pk:  # Only set read_count for new records
            self.read_count = self.get_next_read_count()
        if self.read_count > 3:
            raise ValueError("read_count cannot exceed 3")
        super().save(*args, **kwargs)
        self.delete_previous_record()

    def get_next_read_count(self):
        last_record = UserReadRecord.objects.filter(user=self.user, post=self.post).order_by('-read_count').first()
        if last_record:
            next_count = last_record.read_count + 1
            return next_count if next_count <= 3 else 3
        return 1

    def delete_previous_record(self):
        if self.read_count > 1:
            previous_record = UserReadRecord.objects.filter(user=self.user, post=self.post, read_count=self.read_count - 1).first()
            if previous_record:
                previous_record.delete()

    def __str__(self):
        return f"Read Record of {self.user.username} for post {self.post.title} (Read count: {self.read_count})"