from django.urls import path
from . import views
from .views import UserRegistrationView , PatientRegistrationView , MedcinRegistrationView , UserLoginView ,PatientList , PatientByNSSView ,MedicamentView ,OrdonnanceView , MedcalRecordView ,BilanBiologiqueCreateView ,BilanRadiologiqueView ,OrdonnanceCreatView ,BilanBiologiqueView , ValiderOrdonnanceAPIView ,UpdateBilanRadiologiqueAPIView,UpdateBilanBiologiqueView , BilanRadiologiqueView_radiologue


urlpatterns = [
    path('auth/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('auth/register/patient', PatientRegistrationView.as_view(), name='user-registration'),
    path('auth/register/medcin' , MedcinRegistrationView.as_view() , name='patient-registration'),
    path('auth/login/' , UserLoginView.as_view() , name='user-login'), 
    path('auth/get/patient' , PatientList.as_view() , name='Patient_list'),
    path('auth/get/patient/<int:id>', PatientList.as_view(), name='patient_id'), 
    path('auth/get/patient/<int:nss>' , PatientByNSSView.as_view() , name='Patient_list'),
    path("Medicament/<int:id>", views.MedicamentView.as_view(), name ="Medicament-details"),
    path("auth/get/patient/<int:patient_id>/Ordonnance/", OrdonnanceView.as_view(), name ="Ordonnance-list"),
    path("auth/get/patient/<int:patient_id>", OrdonnanceCreatView.as_view(), name ="Ordonnance-create"),
    path("auth/get/patient/<int:patient_id>/Ordonnance/<int:ordonnance_id>/valider/", ValiderOrdonnanceAPIView.as_view(), name='valider_ordonnance'),
    path("auth/get/patient/<int:patient_id>/consultation/<int:consul_id>/", views.BilanBiologiqueCreateView.as_view(), name ="BilanBio-create"),
    path("auth/get/patient/<int:patient_id>/bilanBio", views.BilanBiologiqueView.as_view(), name ="BilanBio-list"),
    path('auth/bilanBio/<int:bilan_id>/update/', UpdateBilanBiologiqueView.as_view(), name='update-bilanBio'),
    path("auth/post/patient/dossier/<int:dossier_id>", views.BilanRadiologiqueCreateView.as_view(), name ="BilanRadio-create"),
    path("auth/get/patient/dossier/<int:dossier_id>/bilanRadio/", views.BilanRadiologiqueView.as_view(), name ="BilanRadio-list"),
    path("auth/get/patient/dossier/<int:dossier_id>/bilanRadio/<int:bilan_id>/", views.BilanRadiologiqueView.as_view(), name ="BilanRadio-details"),
    path('auth/put/bilanRadio/<int:bilan_id>/update/', UpdateBilanRadiologiqueAPIView.as_view(), name='update-bilanRadio'),
    path('auth/log/radiologue/<int:id>/bilanRad/', BilanRadiologiqueView_radiologue.as_view(), name='radiologue_bilans'),
    path('auth/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('auth/register/patient', PatientRegistrationView.as_view(), name='user-registration'),
    path('auth/register/medcin' , MedcinRegistrationView.as_view() , name='patient-registration'),
    path('auth/login/' , UserLoginView.as_view() , name='user-login'),
]


