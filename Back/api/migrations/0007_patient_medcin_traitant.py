# Generated by Django 5.1.3 on 2024-12-28 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_patient_medcin_traitant'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='medcin_traitant',
            field=models.CharField(blank=True, max_length=15),
        ),
    ]