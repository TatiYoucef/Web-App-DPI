from django.contrib import admin
from .models import Medcin , Patient , Administratif , User ,Infirmier , Laborantin , Radiologue
# Register your models here.

admin.site.register(Medcin)
admin.site.register(Patient)
admin.site.register(Administratif)
admin.site.register(User)
admin.site.register(Infirmier)
admin.site.register(Laborantin)
admin.site.register(Radiologue)

