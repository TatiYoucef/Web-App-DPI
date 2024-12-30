from django.urls import path
from .views import UserRegistrationView,PatientByNSSView ,addConsultationView,ConsultationView, addDPIView,PatientView,DPIConsultationListView,PatientListView,modifyDIView,PatientRegistrationView , MedcinRegistrationView , UserLoginView, DPIView

urlpatterns = [
     path('auth/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('auth/register/patient', PatientRegistrationView.as_view(), name='user-registration'),
    path('auth/register/medcin' , MedcinRegistrationView.as_view() , name='patient-registration'),
    path('auth/login/' , UserLoginView.as_view() , name='user-login'), 
   # path('auth/get/patient' , PatientList.as_view() , name='Patient_list'),
    path('auth/get/patient/<int:nss>' , PatientByNSSView.as_view() , name='Patient_list'),
    path('auth/register/medcin/add_patients/', addDPIView.as_view(), name='ajouter_patient'),
    path('auth/register/medcin/patients/', PatientListView.as_view(), name='patient-list'),
    path('auth/register/medcin/patients/<str:first_name>/<str:last_name>/', PatientView.as_view(), name='patient'),#chercher patient par nom et prenom
    path('auth/register/medcin/patients/dpi-id/dpi/', DPIView.as_view(), name='dpi-detail'),
    path('auth/register/medcin/patients/dpi-id/modifyDpi/', modifyDIView.as_view(), name='modifier dpi'),
    path('auth/register/medcin/patients/dpi-id/dpi/consultations',DPIConsultationListView.as_view(), name='consultation-list'),
    path('auth/register/medcin/patients/dpi-id/dpi/consultations/cons_id',ConsultationView.as_view(), name='consultation'),
    path('auth/register/medcin/patients/dpi-id/dpi/consultations/cons_id/addConsultation',addConsultationView.as_view(), name='Ajouter consultation'),



]


