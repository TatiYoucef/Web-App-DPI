from django.urls import path
from . import views

urlpatterns = [
    path("Medicament/", views.MedicamentCreate.as_view(), name ="Medicament-create"),
    path("Medicament/<int:pk>", views.MedicamentRetriveUpdateDestory.as_view(), name ="Medicament-update"),
    path("BilanBio/", views.BilanBilogiqueCreate.as_view(), name ="BilanBio-create"),
    path("BilanRadio/", views.BilanRadiologiqueCreate.as_view(), name ="BilanRadio-create"),

]
