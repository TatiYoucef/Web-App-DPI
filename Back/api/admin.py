from django.contrib import admin
from .models import Medcin , Patient , Administratif , User ,Infirmier , Laborantin , Radiologue , Medicament , Ordonnance , Bilan , BilanRadiologique , BilanBiologique , Dossier , Consultation , Soin , MedcalRecord 
# Register your models here.

admin.site.register(Medcin)
admin.site.register(Patient)
admin.site.register(Administratif)
admin.site.register(User)
admin.site.register(Infirmier)
admin.site.register(Laborantin)
admin.site.register(Radiologue)
admin.site.register(Medicament)
admin.site.register(Ordonnance)
admin.site.register(BilanBiologique)
admin.site.register(BilanRadiologique)
admin.site.register(MedcalRecord)
admin.site.register(Soin)
admin.site.register(Consultation)
admin.site.register(Dossier)




