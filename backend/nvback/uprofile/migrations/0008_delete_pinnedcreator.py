# Generated by Django 5.0.6 on 2024-07-31 05:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('uprofile', '0007_profile_last_read_date_profile_longest_streak_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='PinnedCreator',
        ),
    ]