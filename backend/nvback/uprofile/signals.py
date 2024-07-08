from django.db.models.signals import post_save
from django.dispatch import receiver
from authentication.models import UserAccount
from .models import Customize

@receiver(post_save, sender=UserAccount)
def create_customize(sender, instance, created, **kwargs):
    if created:
        Customize.objects.create(user=instance)