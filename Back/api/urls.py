from django.urls import path
from .views import UserRegistrationView , PatientRegistrationView , MedcinRegistrationView , UserLoginView ,PatientList , PatientByNSSView

urlpatterns = [
    path('auth/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('auth/register/patient', PatientRegistrationView.as_view(), name='user-registration'),
    path('auth/register/medcin' , MedcinRegistrationView.as_view() , name='patient-registration'),
    path('auth/login/' , UserLoginView.as_view() , name='user-login'), 
    path('auth/get/patient' , PatientList.as_view() , name='Patient_list'),
    path('auth/get/patient/<int:nss>' , PatientByNSSView.as_view() , name='Patient_list'),
]


