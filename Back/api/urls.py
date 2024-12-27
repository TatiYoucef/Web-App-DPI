from django.urls import path
from .views import UserRegistrationView , addDPIView,PatientView,PatientListView,modifyDIView,PatientRegistrationView , MedcinRegistrationView , UserLoginView, DPIView

urlpatterns = [
    path('auth/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('auth/register/patient', PatientRegistrationView.as_view(), name='user-registration'),
    path('auth/register/medcin' , MedcinRegistrationView.as_view() , name='patient-registration'),
    path('auth/login/' , UserLoginView.as_view() , name='user-login'),
    path('auth/register/medcin/add_patients/', addDPIView.as_view(), name='add_patient'),
    path('auth/register/medcin/patients/', PatientListView.as_view(), name='patient-list'),
    path('auth/register/medcin/patients/<str:first_name>/<str:last_name>/', PatientView.as_view(), name='patient'),
    path('auth/register/medcin/patients/<str:first_name>/<str:last_name>/dpi/', DPIView.as_view(), name='dpi-detail'),
    path('auth/register/medcin/patients/<str:first_name>/<str:last_name>/modifyDpi/', modifyDIView.as_view(), name='modify_dpi'),
   # path('medcin/soins/',  SoinDetailView.as_view(), name='soins-list'),

]


