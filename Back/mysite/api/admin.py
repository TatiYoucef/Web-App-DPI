from django.contrib import admin
from .models import Medicament, Ordonnance, BilanBiologique , BilanRadiologique, MedicalRecord
# Register your models here.
admin.site.register(Medicament)
admin.site.register(Ordonnance)
admin.site.register(BilanBiologique)
admin.site.register(BilanRadiologique)
admin.site.register(MedicalRecord)