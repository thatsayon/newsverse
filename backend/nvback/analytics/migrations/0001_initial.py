# Generated by Django 5.0.6 on 2024-07-11 09:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SendMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Name')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='Email')),
                ('message', models.TextField(verbose_name='Message')),
                ('send_time', models.DateTimeField(auto_now_add=True, verbose_name='Send Tie')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Message', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]