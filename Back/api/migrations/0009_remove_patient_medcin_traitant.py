# Generated by Django 5.1.3 on 2024-12-28 17:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_bilanbiologique_consul_bilanradiologique_consul'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patient',
            name='medcin_traitant',
        ),
    ]
