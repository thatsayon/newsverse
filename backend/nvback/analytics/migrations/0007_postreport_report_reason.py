# Generated by Django 5.0.6 on 2024-08-31 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('analytics', '0006_postreport'),
    ]

    operations = [
        migrations.AddField(
            model_name='postreport',
            name='report_reason',
            field=models.CharField(blank=True, choices=[('sfi', 'Scam, fraud or impersonation'), ('spam', 'Spam'), ('fi', 'False information'), ('spri', 'Selling or promoting restricted items'), ('dws', "I don't want to see this"), ('se', 'Something else')], max_length=50, null=True),
        ),
    ]
