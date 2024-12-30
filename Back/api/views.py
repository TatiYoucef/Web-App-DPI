from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate , login
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (User , Administratif , Medcin , Patient , Ordonnance , Medicament , Dossier ,Consultation , Soin , MedcalRecord )
from .serializers import(UserSerializer , AdministratifSerializer , MedcinSerializer , PatientSerializer , LaborantinSerializer , InfirmierSerializer , RadiologueSerializer , OrdonnanceSerializer , MedcalRecordSerializer , MedicamentSerializer , SoinSerializer , ConsultationSerializer , DossierSerializer)
from rest_framework import generics ,permissions ,status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken


# Create your views here.

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class PatientRegistrationView(APIView):
    def post(self, request) :
        serializer =PatientSerializer(data= request.data)
        if serializer.is_valid():
          
          serializer.save()
          return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MedcinRegistrationView(APIView):
    def post(self, request) :
        serializer =MedcinSerializer(data= request.data)
        if serializer.is_valid():         
          serializer.save()
          return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RadiologueRegistrationView(APIView):
    def post(self, request) :
        serializer =RadiologueSerializer(data= request.data)
        if serializer.is_valid():         
          serializer.save()
          return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LaborantinRegistrationView(APIView):
    def post(self, request) :
        serializer =LaborantinSerializer(data= request.data)
        if serializer.is_valid():         
          serializer.save()
          return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InfirmierRegistrationView(APIView):
    def post(self, request) :
        serializer =InfirmierSerializer(data= request.data)
        if serializer.is_valid():         
          serializer.save()
          return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminRegistrationView(APIView):
    def post(self, request) :
        serializer =AdministratifSerializer(data= request.data)
        if serializer.is_valid():         
          serializer.save()
          return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    def post(self , request , *args , **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request , username = username , password = password)
        if user is not None:
            login(request , user) 
            token , created = Token.objects.get_or_create(user=user)
            if created:
                token.delete()  
                token = Token.objects.create(user=user)
            response_data = {
                'token': token.key,
                'username': user.username,
                'role': user.role,
            }
            
            if user.role == 'Administratif' :
                admin = user.compte_admin
                if admin is not None:
                    admin_data = AdministratifSerializer(admin).data
                    response_data['data'] = admin_data
            
            if user.role == 'Patient' :
                patient = user.compte_patient
                if patient is not None:
                    patient_data = PatientSerializer(patient).data
                    response_data['data'] = patient_data
            
            elif user.role == 'Medcin' :
                medcin = user.compte_medcin
                if medcin is not None:
                    medcin_data = MedcinSerializer(medcin).data
                    response_data['data'] = medcin_data
            
            elif user.role == 'Laborantin' :
                laborantin = user.compte_laborantin
                if laborantin is not None:
                    laborantin_data = LaborantinSerializer(laborantin).data
                    response_data['data'] = laborantin_data
            
            elif user.role == 'Infirmier' :
                infirmier = user.compte_infirmier
                if infirmier is not None:
                    infirmier_data = InfirmierSerializer(infirmier).data
                    response_data['data'] = infirmier_data
            
            elif user.role == 'Radiologue' :
                radiologue = user.compte_radiologue
                if radiologue is not None:
                    radiologue_data = RadiologueSerializer(radiologue).data
                    response_data['data'] = radiologue_data
                
                     
            return Response(response_data)
        
        else:
            return Response({'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)


class PatientList(generics.ListAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class MedcinList(generics.ListAPIView):
    queryset = Medcin.objects.all()
    serializer_class = MedcinSerializer

class PatientByNSSView(APIView):
    serializer_class = PatientSerializer
    def get(self, request, nss):
        try:
            patient = Patient.objects.get(nss=nss)
        except Patient.DoesNotExist:
            return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(patient)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DossierPatient(APIView):
    serializer_class= DossierSerializer
    def get(self, request , key):
        try:
            dossier = Dossier.objects.get(pk=key)
        except Dossier.DoesNotExist:
            return Response({'error': 'Dossier not found'}, status=status.HTTP_404_NOT_FOUND)
      
        serializer = self.serializer_class(dossier)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrdonnanceList(APIView):
    # You can use this if you want to manually query the queryset
    def get(self, request, format=None):
        ordonnances = Ordonnance.objects.all()  # Get all ordonnances
        serializer = OrdonnanceSerializer(ordonnances, many=True)  # Serialize the data
        return Response(serializer.data)


class PatientByDefaultUser(APIView):
    serializer_class = PatientSerializer
    def get(self , request ):

        try:
            patient=Patient.objects.get(user__username="DefaultUser")

        except Patient.DoesNotExist:

            return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(patient)
        return Response(serializer.data, status=status.HTTP_200_OK)
        

class OrdonnanceCreatView(APIView):
    def post(self, request):
        serializer = OrdonnanceSerializer(data=request.data)
        if serializer.is_valid():
            ordonnance = serializer.save()
            return Response({
                "message": "Ordonnance created successfully.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DossierOrdonnanceCreatView(APIView):
    def post(self, request , pk):
        try:
            dossier = Dossier.objects.get(pk=pk)
        except Dossier.DoesNotExist:
            return Response({'error': 'Dossier not found'}, status=status.HTTP_404_NOT_FOUND)
      
        ordonnance_serializer = OrdonnanceSerializer(data=request.data)
        if ordonnance_serializer.is_valid():
            ordonnance = ordonnance_serializer.save()
            dossier.ordannance.add(ordonnance)
            dossier_serializer = DossierSerializer(dossier)
            return Response(dossier_serializer.data, status=status.HTTP_201_CREATED)
        else :
            return Response(ordonnance_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

