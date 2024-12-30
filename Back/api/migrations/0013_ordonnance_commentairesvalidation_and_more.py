# Generated by Django 5.1.3 on 2024-12-30 21:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_patient_medcin_traitant'),
    ]

    operations = [
        migrations.AddField(
            model_name='ordonnance',
            name='commentairesValidation',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='ordonnance',
            name='dateCreation',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='ordonnance',
            name='dateValidation',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
