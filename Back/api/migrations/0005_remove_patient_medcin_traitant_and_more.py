# Generated by Django 5.1.3 on 2024-12-28 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_patient_medcin_traitant'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patient',
            name='medcin_traitant',
        ),
        migrations.AddField(
            model_name='patient',
            name='medcin_traitant',
            field=models.ManyToManyField(blank=True, related_name='med_traitant', to='api.medcin'),
        ),
    ]