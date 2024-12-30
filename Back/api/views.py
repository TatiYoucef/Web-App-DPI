from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate , login
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (User , Administratif , Medcin ,BilanRadiologique,BilanBiologique, Patient,DPI,Consultation,Soin,Infirmier,Observation,Medcin,Bilan,Ordonnance)
from .serializers import(UserSerializer , PatientDPIListSerializer,AdministratifSerializer,ConsultationListSerializer , MedcinSerializer , PatientSerializer , LaborantinSerializer , InfirmierSerializer , RadiologueSerializer,DPISerializer,ConsultationSerializer,SoinSerializer)
from datetime import datetime
from rest_framework import status
from rest_framework.authtoken.models import Token

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
    
    
class PatientListView(APIView):
    def get(self, request):
        patients = Patient.objects.all()
        serializer = PatientDPIListSerializer(patients, many=True)
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
    
class PatientView(APIView):
        
    def get(self, request,firstName,lastName):
        patient = Patient.objects.filter(user_first_name=firstName,user_last_name=lastName,)
        if not patient:
            return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = PatientDPIListSerializer(patient)
        return Response(serializer.data, status=status.HTTP_200_OK)

    


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



class DPIView(APIView):
        
    def get(self, request, DPI_id):
        try:
            dossier = DPI.objects.get(id=DPI_id)    
            patient = dossier.patient  
            
            dossier_serializer = DPISerializer(dossier)
            patient_serializer = PatientSerializer(patient)
            
            return Response({
                "dossier": dossier_serializer.data,
                "patient": patient_serializer.data
            }, status=status.HTTP_200_OK)
        
        except DPI.DoesNotExist:
            return Response({"error": "Dossier de patient not found."}, status=status.HTTP_404_NOT_FOUND)
        except Patient.DoesNotExist:
            return Response({"error": "Patient not found."}, status=status.HTTP_404_NOT_FOUND)


    
    
class addDPIView(APIView):
    
    def post(self, request):

        data = request.data
        try: 
            consultation = Consultation.objects.get(id=data.get('consultaton_id'))
            antecedentsMedicaux = data.get(('antecedentsMedicaux'))
            ordonnance=Ordonnance.objects.get(id=data.get('ordonnance_id'))
            bilanRadiologique =  BilanRadiologique.objects.get(id=data.get(' bilanRadiologique_id'))
            bilanBiologique =  BilanBiologique.objects.get(id=data.get(' bilanBiologique_id'))
            observation=Observation.get(id=data.get('observation_id'))
                
        except (Consultation.DoesNotExist, Ordonnance.DoesNotExist, Bilan.DoesNotExist, Observation.DoesNotExist) as e:
                
            return JsonResponse({'error': str(e)}, status=400)
        
        dossier = DPI.objects.create(
            antecedentsMedicaux=antecedentsMedicaux,
            dateAddmition=datetime.now(),
            dateSortie=datetime.now(),
            dateMaj=datetime.now(),
        )
        
        dossier.consultations.set(consultation)
        dossier.ordonnances.set(ordonnance)
        dossier.bilanRadiologiques.set(bilanRadiologique)
        dossier.bilanBiologiques.set(bilanBiologique)
        dossier.observations.set(observation)
        
        dossier.save()
            
        return JsonResponse({'message': 'Dossier created successfully', 'dossier_id': dossier.id}, status=201)

       
class modifyDIView(APIView):
    def put(self, request, dpi_id):
        data = request.data
        try:
            dossier = DPI.objects.get(id=dpi_id)

            if 'consultation_id' in data:
                consultations = Consultation.objects.filter(id__in=data.get('consultation_id'))
                dossier.consultations.set(consultations)
            
            if 'ordonnance_id' in data:
                ordonnances = Ordonnance.objects.filter(id__in=data.get('ordonnance_id'))
                dossier.ordonnances.set(ordonnances)

            if 'bilanBiologique_id' in data:
                bilanBiologique = BilanBiologique.objects.filter(id__in=data.get('bilanBiologique_id'))
                dossier.bilanBiologiques.set(bilanBiologique)
                
            if 'bilanBiologique_id' in data:
                bilanRadiologique = BilanRadiologique.objects.filter(id__in=data.get(' bilanRadiologique_id'))
                dossier. bilanRadiologiquess.set(bilanRadiologique)
                
            if 'antecedentsMedicaux' in data:
                dossier.antecedentsMedicaux = data.get('antecedentsMedicaux')

            if 'observation_id' in data:
                dossier.observations = Observation.objects.get(id=data.get('observation_id'))

            dossier.dateMaj = datetime.now()
            
            dossier.save()

            return JsonResponse({'message': 'Dossier updated successfully', 'dossier_id': dossier.id}, status=200)

        except DPI.DoesNotExist:
            return JsonResponse({'error': 'Dossier not found.'}, status=404)

        except (Consultation.DoesNotExist,Ordonnance.DoesNotExist,Bilan.DoesNotExist, Observation.DoesNotExist) as e:
            return JsonResponse({'error': str(e)}, status=400)
    


    
class DPIConsultationListView(APIView):
    def get(self, request, id):
        try:
            dossier = DPI.objects.get(id=id)
            consultations = dossier.consultation.all() 
            serializer = ConsultationListSerializer(consultations, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Consultation.DoesNotExist:
            return Response({"error": "consultation not found."}, status=status.HTTP_404_NOT_FOUND)


class ConsultationView(APIView):
    
    def get(self, request,id):
        try:
            consultation = Consultation.objects.get(id=id)
            serializer = ConsultationSerializer(consultation)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Consultation.DoesNotExist:
            return Response({"error": "Consultation not found."}, status=status.HTTP_404_NOT_FOUND)
    
    
class addConsultationView(APIView):
    
    def post(self, request,dpi_id):

        data = request.data
        try: 
            patient = Patient.objects.get(id=data.get('patient_id'))
            medcin = Medcin.objects.get(id=data.get('medcin_id'))
            soin = Soin.objects.get(id=data.get('soin_id'))
            raisonAdmission = data.get(('raisonAdmission'))
            dateProchaineCons=data.get(('dateProchaineConsultation'))
            trouveDiagnostic=data.get(('trouveDiagnostic'))
        except ( Patient.DoesNotExist,Medcin.DoesNotExist,Soin.DoesNotExist) as e:
                
            return JsonResponse({'error': str(e)}, status=400)
        
        consultation = Consultation.objects.create(
            patient=patient,
            medcin=medcin,
            raisonAdmission=raisonAdmission,
            date=datetime.now(),
            dateProchaineCons=dateProchaineCons,
            trouveDiagnostic=trouveDiagnostic         
        )
        
        consultation.soins.set(soin)
        consultation.save()
        dossier=DPI.objects.get(dpi_id)
        dossier.consultations.set(consultation)
        
            
        return JsonResponse({'message': 'Consultation created successfully', 'dossier_id': dossier.id}, status=201)
