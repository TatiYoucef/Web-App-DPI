from django.urls import path
from . import views

urlpatterns = [
    path("Ordonnance/Medicament/", views.MedicamentView.as_view(), name ="Medicament-create"),
    path("Medicament/<int:id>", views.MedicamentView.as_view(), name ="Medicament-details"),
    path("Ordonnance/", views.OrdonnanceView.as_view(), name ="Ordonnance-create"),
    path("BilanBio/<int:id>/MedRecord/<int:id_medRecord>", views.MedicalRecordView.as_view(), name ="MedRecord-create"),
    path("BilanBio/<int:id>", views.BilanBilogiqueView.as_view(), name ="BilanBio-create"),
    path("BilanRadio/", views.BilanRadiologiqueView.as_view(), name ="BilanRadio-create"),

]
