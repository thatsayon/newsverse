# Generated by Django 5.0.6 on 2024-07-30 19:18

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uprofile', '0004_profile_linkedin_profile_twitter'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='personal_website',
            field=models.URLField(blank=True, null=True, verbose_name='Personal Website URL'),
        ),
        migrations.AddField(
            model_name='profile',
            name='profile_views',
            field=models.IntegerField(default=0),
        ),
        migrations.CreateModel(
            name='ProfileView',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='uprofile.profile')),
                ('viewer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('profile', 'viewer')},
            },
        ),
    ]
