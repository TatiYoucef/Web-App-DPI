from django.urls import path
from .views import UserRegistrationView , PatientRegistrationView , MedcinRegistrationView , UserLoginView, DPIView,ConsultationDetailView,SoinDetailView

urlpatterns = [
    path('auth/register/', UserRegistrationView.as_view(), name='user-registration'),
    path('auth/register/patient', PatientRegistrationView.as_view(), name='user-registration'),
    path('auth/register/medcin' , MedcinRegistrationView.as_view() , name='patient-registration'),
    path('auth/login/' , UserLoginView.as_view() , name='user-login'),
    path('medcin/dossiers/', DPIView.as_view(), name='dossiers-list'),
    path('medcin/consultations/',  ConsultationDetailView.as_view(), name='sejour-list'),
    path('medcin/soins/',  SoinDetailView.as_view(), name='soins-list'),

]


