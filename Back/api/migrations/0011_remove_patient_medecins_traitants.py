# Generated by Django 5.1.3 on 2024-12-28 17:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_patient_medecins_traitants'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patient',
            name='medecins_traitants',
        ),
    ]
