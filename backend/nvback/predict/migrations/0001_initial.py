# Generated by Django 5.0.6 on 2024-05-17 14:20

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
            name='UserInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=120)),
                ('division', models.CharField(blank=True, choices=[('DH', 'Dhaka'), ('CTG', 'Chittagong'), ('KHL', 'Khulna'), ('RJH', 'Rajshahi'), ('BSL', 'Barisal'), ('SYL', 'Sylhet'), ('RNG', 'Rangpur'), ('MYS', 'Mymensingh')], max_length=3, null=True)),
                ('state', models.CharField(blank=True, max_length=120, null=True)),
                ('city', models.CharField(max_length=120)),
                ('country', models.CharField(max_length=120)),
                ('fav_topic', models.JSONField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]