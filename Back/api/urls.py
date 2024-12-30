from django.urls import path
from .views import UserRegistrationView , PatientRegistrationView , MedcinRegistrationView , UserLoginView ,PatientList , PatientByNSSView ,PatientByDefaultUser ,AdminRegistrationView, OrdonnanceCreatView , OrdonnanceList,DossierPatient,DossierOrdonnanceCreatView,LaborantinRegistrationView,RadiologueRegistrationView , InfirmierRegistrationView,MedcinList

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
    #path('auth/get/patient/<int:pk>' , PatientList.as_view() , name='Patient_list'),
    path('auth/get/patient/dossier/<int:key>' , DossierPatient.as_view() , name='fetch_dossier'),
    path('auth/get/patient/dossier/<int:pk>/ordonnance' , DossierOrdonnanceCreatView.as_view() , name='fetch_dossier'),
    path('auth/post/patient/ordonnance' , OrdonnanceCreatView.as_view() , name='createOrd'),
    path('auth/get/patient/<str:nss>' , PatientByNSSView.as_view() , name='Patient_list'),
    path('auth/get/admin/patient' , PatientByDefaultUser.as_view() , name='admin_list'),
    path('auth/register/admin' , AdminRegistrationView.as_view() , name='adminregister'),
]


