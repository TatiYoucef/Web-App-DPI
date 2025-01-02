# Generated by Django 5.1.3 on 2024-12-28 13:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='consultation',
            name='resume',
        ),
        migrations.AddField(
            model_name='consultation',
            name='trouveDiagnostic',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='ordonnance',
            name='consul',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='consul_ord', to='api.consultation'),
        ),
        migrations.AddField(
            model_name='ordonnance',
            name='duree',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='ordonnance',
            name='etat',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='ordonnance',
            name='medecin',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='medecin_ord', to='api.medcin'),
        ),
        migrations.AlterField(
            model_name='bilanbiologique',
            name='typeBilan',
            field=models.CharField(choices=[('BIOLOGIQUE', 'Biologique'), ('RADIOLOGIQUE', 'Radiologique')], default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='bilanradiologique',
            name='typeBilan',
            field=models.CharField(choices=[('BIOLOGIQUE', 'Biologique'), ('RADIOLOGIQUE', 'Radiologique')], default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='medicament',
            name='frequence',
            field=models.CharField(choices=[('matin', 'Matin'), ('midi', 'Midi'), ('soir', 'Soir'), ('matin_midi', 'Matin et Midi'), ('midi_soir', 'Midi et Soir'), ('matin_midi_soir', 'Matin, Midi et Soir'), ('au_besoin', 'Au besoin')], max_length=50),
        ),
        migrations.CreateModel(
            name='Resume',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('symptomes', models.CharField(max_length=100)),
                ('dateProchaineConsul', models.DateField()),
                ('consul', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.consultation')),
                ('mesuresPrises', models.ManyToManyField(related_name='resume', to='api.medcalrecord')),
                ('patient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.patient')),
            ],
        ),
    ]