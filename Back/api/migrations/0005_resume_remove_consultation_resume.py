# Generated by Django 5.1.2 on 2024-12-28 12:34

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_user_password'),
    ]

    operations = [
        migrations.CreateModel(
            name='Resume',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('diagnostic', models.CharField(blank=True, max_length=255)),
                ('symptomes', models.CharField(blank=True, max_length=255)),
                ('mesures', models.CharField(blank=True, max_length=255)),
                ('date_prochin', models.DateField(default=datetime.date.today)),
            ],
        ),
        migrations.RemoveField(
            model_name='consultation',
            name='resume',
        ),
    ]