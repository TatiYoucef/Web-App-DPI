from django.urls import path
from . import views
from .views import UserRegistrationView , PatientRegistrationView , MedcinRegistrationView , UserLoginView ,PatientList , PatientByNSSView ,MedicamentView ,OrdonnanceView , MedcalRecordView ,BilanBiologiqueCreateView ,BilanRadiologiqueView ,OrdonnanceCreatView ,BilanBiologiqueView


urlpatterns = [
    path('auth/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('auth/register/patient', PatientRegistrationView.as_view(), name='user-registration'),
    path('auth/register/medcin' , MedcinRegistrationView.as_view() , name='patient-registration'),
    path('auth/login/' , UserLoginView.as_view() , name='user-login'), 
    path('auth/get/patient' , PatientList.as_view() , name='Patient_list'),
    path('auth/get/patient/<int:id>', PatientList.as_view(), name='patient_id'), 
    path('auth/get/patient/<int:nss>' , PatientByNSSView.as_view() , name='Patient_list'),
    #path("Ordonnance/Medicament/", views.MedicamentView.as_view(), name ="Medicament-create"),
    path("Medicament/<int:id>", views.MedicamentView.as_view(), name ="Medicament-details"),
    path("auth/get/patient/<int:patient_id>/Ordonnance/", OrdonnanceView.as_view(), name ="Ordonnance-list"),
    path("auth/get/patient/<int:patient_id>", OrdonnanceCreatView.as_view(), name ="Ordonnance-create"),
    #path("BilanBio/<int:id>/MedRecord/<int:id_medRecord>", views.MedicalRecordView.as_view(), name ="MedRecord-create"),
    path("auth/get/patient/<int:patient_id>", views.BilanBiologiqueCreateView.as_view(), name ="BilanBio-create"),
    path("auth/get/patient/<int:patient_id>/bilanBio", views.BilanBiologiqueView.as_view(), name ="BilanBio-list"),
    #path("BilanRadio/", views.BilanRadiologiqueView.as_view(), name ="BilanRadio-create"),
    path('auth/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('auth/register/patient', PatientRegistrationView.as_view(), name='user-registration'),
    path('auth/register/medcin' , MedcinRegistrationView.as_view() , name='patient-registration'),
    path('auth/login/' , UserLoginView.as_view() , name='user-login'),
]


