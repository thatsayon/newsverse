from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField, JSONField

User = get_user_model()

DIVISION_CHOICES = [
        ('DH', 'Dhaka'),
        ('CTG', 'Chittagong'),
        ('KHL', 'Khulna'),
        ('RJH', 'Rajshahi'),
        ('BSL', 'Barisal'),
        ('SYL', 'Sylhet'),
        ('RNG', 'Rangpur'),
        ('MYS', 'Mymensingh'),
]

class UserInfo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    address = models.CharField(max_length=120)
    division = models.CharField(max_length=3, choices=DIVISION_CHOICES, null=True, blank=True)
    state = models.CharField(max_length=120, null=True, blank=True)
    city = models.CharField(max_length=120)
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