# Generated by Django 5.0.6 on 2024-07-31 05:42

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uprofile', '0006_profile_is_public'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='last_read_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='longest_streak',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='profile',
            name='total_reading_days',
            field=models.IntegerField(default=0),
        ),
        migrations.CreateModel(
            name='PinnedCreator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pinned_creator', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]