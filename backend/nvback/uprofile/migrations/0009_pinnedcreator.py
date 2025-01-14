# Generated by Django 5.0.6 on 2024-07-31 05:56

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_creator'),
        ('uprofile', '0008_delete_pinnedcreator'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PinnedCreator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pinned_creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pinned_by_users', to='post.creator')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pinned_creator', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Pinned Creator',
                'verbose_name_plural': 'Pinned Creators',
                'unique_together': {('user', 'pinned_creator')},
            },
        ),
    ]
