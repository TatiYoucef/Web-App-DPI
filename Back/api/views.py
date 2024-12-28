from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate , login
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (User , Administratif , Medcin , Patient ,Ordonnance, Medicament , BilanBiologique, BilanRadiologique, MedcalRecord)
from .serializers import(UserSerializer , AdministratifSerializer , MedcinSerializer , PatientSerializer , LaborantinSerializer , InfirmierSerializer , RadiologueSerializer)
from rest_framework import generics ,permissions ,status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from .serializers import MedicamentSerializer, OrdonnanceSerializer ,BilanBilogiqueSerializer, BilanRadiologiqueSerializer ,MedicalRecordSerializer

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


class PatientList(APIView):
     def get(self, request, id=None):
        if id:
            try:
                patient = Patient.objects.get(id=id)
            except Patient.DoesNotExist:
                return Response(
                    {"error": f"Patient with ID {id} not found."},
                    status=status.HTTP_404_NOT_FOUND
                )
            serializer = PatientSerializer(patient)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            patients = Patient.objects.all()
            serializer = PatientSerializer(patients, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

class PatientByNSSView(APIView):
    serializer_class = PatientSerializer
    def get(self, request, nss):
        try:
            patient = Patient.objects.get(nss=nss)
        except Patient.DoesNotExist:
            return Response({'error': 'Notification not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(patient)
        return Response(serializer.data, status=status.HTTP_200_OK)
        

class MedicamentView(APIView):
    def post(self, request):
        """Handle POST request - Create a new Medicament"""
        serializer = MedicamentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrdonnanceCreatView(APIView):
    def post(self, request):
        """Handle POST request - Create a new Ordonnance with associated Medicaments"""
        serializer = OrdonnanceSerializer(data=request.data)
        if serializer.is_valid():
            ordonnance = serializer.save()

            # Extract Medicaments data from the request
            medicaments_data = request.data.get("medicaments", [])

            # Create and associate Medicaments with the Ordonnance
            medicament_instances = []
            for medicament_data in medicaments_data:
                medicament_serializer = MedicamentSerializer(data=medicament_data)
                if medicament_serializer.is_valid():
                    medicament = medicament_serializer.save()
                    medicament_instances.append(medicament)
                else:
                    return Response(
                        medicament_serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST
                    )
            ordonnance.medicaments.set(medicament_instances)
            ordonnance.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class OrdonnanceView(APIView):
    def get(self, request, patient_id):
        try:
            patient = Patient.objects.get(pk=patient_id)
            dossier = patient.dossier 

            if dossier:
                ordonnances = Ordonnance.objects.filter(consul__in=dossier.consultation.all()) 
            else:
                ordonnances = []

            serializer = OrdonnanceSerializer(ordonnances, many=True)
            return Response({
                'patient': patient.user.username,
                'dossier': dossier.id if dossier else None,
                'ordonnances': serializer.data
            })
        except Patient.DoesNotExist:
            return Response({'detail': 'Patient not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

          

class MedcalRecordView(APIView):  
    def post(self, request):
        """Handle POST request - Create a new med record"""
        serializer = MedicalRecordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 



    
class BilanBiologiqueCreateView(APIView):
    def post(self, request):
        serializer = BilanBilogiqueSerializer(data=request.data)

        if serializer.is_valid():
            try:
                medecin = Medcin.objects.get(pk=serializer.validated_data.get('medecin'))
            except Medcin.DoesNotExist:
                return Response({'error': 'Invalid médecin ID'}, status=status.HTTP_400_BAD_REQUEST)

            serializer.validated_data['medecin'] = medecin

            bilan = serializer.save()

            resultats_analytiques_data = serializer.validated_data.get('resultats_analytiques', [])
            created_records = []
            for record_data in resultats_analytiques_data:
                record_serializer = MedicalRecordSerializer(data=record_data)
                if record_serializer.is_valid():
                    record_data['value'] = 0.0  # Set initial value to 0.0
                    record = record_serializer.save()
                    created_records.append(record)
                else:
                    return Response(record_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            bilan.resultats_analytiques.set(created_records)
            bilan.save()  

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BilanBiologiqueView(APIView):
    def get(self, request, patient_id):
        try:
            patient = Patient.objects.get(pk=patient_id)
            dossier = patient.dossier

            if dossier:
                bilans = BilanBiologique.objects.filter(consul__in=dossier.consultation.all())
                serializer = BilanBilogiqueSerializer(bilans, many=True)
            else:
                bilans = []
                serializer = BilanBilogiqueSerializer(bilans, many=True)

            return Response({
                'patient': patient.user.username,
                'dossier': dossier.id if dossier else None,
                'bilans': serializer.data
            })
        except Patient.DoesNotExist:
            return Response({'detail': 'Patient not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 


class BilanRadiologiqueView(APIView):
    def post(self, request):
        """Handle POST request - Create a new Bilan Radiologique"""
        serializer = BilanRadiologiqueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   

    def get(self, request):
        bilan = BilanRadiologique.objects.all()
        serializer = BilanRadiologiqueSerializer(bilan)
        return Response(serializer.data, status=status.HTTP_200_OK)



        