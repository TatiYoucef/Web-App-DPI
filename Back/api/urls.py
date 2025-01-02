from django.urls import path
from .views import UserRegistrationView , PatientRegistrationView , MedcinRegistrationView , UserLoginView ,PatientList , PatientByNSSView ,Patientwithoutaacounts ,AdminRegistrationView, OrdonnanceCreatView , OrdonnanceList,DossierPatient,DossierOrdonnanceCreatView,LaborantinRegistrationView,RadiologueRegistrationView , InfirmierRegistrationView,MedcinList, PatientDetail,AdminUpdatePatient,BilanBiologiqueCreateView,BilanBiogiqueView, BilanRadiologiqueCreateView, BilanRadiologiqueView , BilanRadiologiqueView_radiologue,BilanView

urlpatterns = [
    path('auth/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('auth/register/patient', PatientRegistrationView.as_view(), name='user-registration'),
    path('auth/register/medcin' , MedcinRegistrationView.as_view() , name='patient-registration'),
    path('auth/register/radiologue' , RadiologueRegistrationView.as_view() , name='radiologue-registration'),
    path('auth/register/laborantin' , LaborantinRegistrationView.as_view() , name='laborantin-registration'),
    path('auth/register/infirmier' , InfirmierRegistrationView.as_view() , name='infirmier-registration'),
    path('auth/get/medcin' , MedcinList.as_view() , name='medcin_list'),
    path('auth/login/' , UserLoginView.as_view() , name='user-login'), 
    path('auth/get/patient' , PatientList.as_view() , name='Patient_list'),
    path('auth/get/ordonnance' , OrdonnanceList.as_view() , name='ord_list'),
    path('auth/get/medcin/patient/<int:id>' , PatientDetail.as_view() , name='Patient_list'),
    path('auth/get/medcin/patient/<int:id>/update' , AdminUpdatePatient.as_view() , name='Patient_list'),
    path('auth/get/patient/dossier/<int:key>' , DossierPatient.as_view() , name='fetch_dossier'),
    path('auth/get/patient/dossier/<int:pk>/ordonnance' , DossierOrdonnanceCreatView.as_view() , name='fetch_dossier'),
    path('auth/post/patient/ordonnance' , OrdonnanceCreatView.as_view() , name='createOrd'),
    path('auth/post/patient/dossier/<int:dossier_id>/bilanbio' , BilanBiologiqueCreateView.as_view() , name='create_bilan'),
    path("auth/post/patient/dossier/<int:dossier_id>/bilanRadio",BilanRadiologiqueCreateView.as_view(), name ="BilanRadio-create"),
    path('auth/get/patient/dossier/<int:dossier_id>/bilanbio' , BilanBiogiqueView.as_view() , name='get_bilan'),
    path("auth/get/patient/dossier/<int:dossier_id>/bilanRadio", BilanRadiologiqueView.as_view(), name ="BilanRadio-list"),
    path("auth/get/patient/dossier/<int:dossier_id>/bilan", BilanView.as_view(), name ="Bilan-list"),
    path("auth/get/patient/dossier/<int:dossier_id>/bilanRadio/<int:bilan_id>", BilanRadiologiqueView.as_view(), name ="BilanRadio-details"),
    path('auth/get/radiologue/<int:id>/bilanRad', BilanRadiologiqueView_radiologue.as_view(), name='radiologue_bilans'),
    path('auth/get/patient/<str:nss>' , PatientByNSSView.as_view() , name='Patient_list'),
    path('auth/get/admin/patient' , Patientwithoutaacounts.as_view() , name='admin_list'),
    path('auth/register/admin' , AdminRegistrationView.as_view() , name='adminregister'),
]


