# Generated by Django 5.0.4 on 2025-01-04 07:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_bilanbiologique_rempli_bilanradiologique_rempli'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bilanbiologique',
            name='rempli',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='bilanradiologique',
            name='rempli',
            field=models.BooleanField(default=False),
        ),
    ]