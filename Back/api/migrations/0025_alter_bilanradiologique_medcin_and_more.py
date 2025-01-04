# Generated by Django 5.0.4 on 2025-01-04 09:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0024_alter_bilanbiologique_rempli_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bilanradiologique',
            name='medcin',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='medcin_bilanRad', to='api.medcin'),
        ),
        migrations.AlterField(
            model_name='bilanradiologique',
            name='radiologue',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='radio_bilan', to='api.radiologue'),
        ),
    ]