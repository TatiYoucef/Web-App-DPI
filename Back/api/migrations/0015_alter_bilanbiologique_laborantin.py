# Generated by Django 5.1.3 on 2025-01-01 10:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_rename_images_bilanradiologique_resultats_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bilanbiologique',
            name='laborantin',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='labo_bilan', to='api.laborantin'),
        ),
    ]
