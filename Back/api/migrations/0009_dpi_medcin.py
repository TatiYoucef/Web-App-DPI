# Generated by Django 5.1.4 on 2024-12-26 18:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_observation_dpi_observation'),
    ]

    operations = [
        migrations.AddField(
            model_name='dpi',
            name='medcin',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.medcin'),
        ),
    ]