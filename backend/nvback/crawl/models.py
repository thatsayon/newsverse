from django.db import models
from django.utils.translation import gettext_lazy as _

class RssLink(models.Model):
    name = models.CharField(_("Name"), max_length=120)
    link = models.URLField(_("Link"), unique=True)
    base_link = models.URLField(_("Base Link"), blank=True, null=True)
    type = models.CharField(_("Type"), choices=[
        ("web", "Website"),
        ("yt", "Youtube")
    ])

    def __str__(self):
        return f"{self.name} - {self.type}"