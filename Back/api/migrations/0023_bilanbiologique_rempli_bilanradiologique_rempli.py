# Generated by Django 5.0.4 on 2025-01-04 07:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_bilanbiologique_date_creation_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='bilanbiologique',
            name='rempli',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='bilanradiologique',
            name='rempli',
            field=models.BooleanField(default=True),
        ),
    ]
