from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField
from django.utils.text import slugify
import random
import string

User = get_user_model()

LANGUAGE_CHOICES = (
    ('en', _('English')),
    ('bn', _('Bangla')),
)

class Post(models.Model):

    title = models.CharField(_("Title"), max_length=120)
    content = models.TextField(_("Content"))
    thumbnail = models.ImageField(_("Thumbnail"), upload_to="img/thumbnail", null=True, blank=True)
    slug = models.SlugField(unique=True, blank=True)
    created_at = models.DateTimeField(_("Created At"), auto_now_add=True)
    topics = ArrayField(models.CharField(max_length=60))
    lang = models.CharField(_("Language"), max_length=2, choices=LANGUAGE_CHOICES, blank=True, null=True)

    upvote_count = models.PositiveBigIntegerField(default=0)
    downvote_count= models.PositiveBigIntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        
        while Post.objects.filter(slug=self.slug).exists():
            self.slug = self.create_slug(self.slug)
        super().save(*args, **kwargs)
    
    def create_slug(self, slug):
        random_text = ''.join(random.choices(string.ascii_letters + string.digits, k=6))
        return f"{slug}-{random_text}"

    def update_vote_counts(self):
        self.upvote_count = self.vote_set.filter(vote_type=Vote.UPVOTE).count()
        self.downvote_count = self.vote_set.filter(
            vote_type=Vote.DOWNVOTE).count()
        self.save()

    def __str__(self):
        return self.title

class Vote(models.Model):
    UPVOTE = 'U'
    DOWNVOTE = 'D'
    VOTE_CHOICES = [
        (UPVOTE, 'Upvote'),
        (DOWNVOTE, 'Downvote'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    vote_type = models.CharField(max_length=1, choices=VOTE_CHOICES)

    class Meta:
        unique_together = ('user', 'post')

    def save(self, *args, **kwargs):
        existing_vote = Vote.objects.filter(
            user=self.user, post=self.post).first()
        if existing_vote:
            existing_vote.delete()

        super().save(*args, **kwargs)
        self.post.update_vote_counts()