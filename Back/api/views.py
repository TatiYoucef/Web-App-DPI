from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate , login
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (User , Administratif , Medcin , Patient,DPI,Consultation,Soin,Infirmier,Medcin,Bilan,Ordonnance,Resume)
from .serializers import(UserSerializer , AdministratifSerializer , MedcinSerializer , PatientSerializer , LaborantinSerializer , InfirmierSerializer , RadiologueSerializer,DPISerializer,ConsultationSerializer,SoinSerializer)
from datetime import datetime
from rest_framework import status
from rest_framework.authtoken.models import Token



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



class DPIView(APIView):
    
    def get(self, request, id=None):
        if id:
            try:
                dossier = DPI.objects.get(id=id)
                serializer = DPISerializer(dossier)
                return Response(serializer.data)
            except DPI.DoesNotExist:
                return Response({"error": "dossier not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            dossier = DPI.objects.all()
            serializer = DPISerializer(dossier, many=True)
            return Response(serializer.data)
        
    
    def post(self, request):
        
        
        data = request.POST
        
        try:
            # Fetch related model instances
            
            patient = Patient.objects.get(id=data.get('patientid'))
            consultation = Consultation.objects.get(id=data.get('sejourid'))
            antecedentsMedicaux = Resume.objects.get(id=data.get('antecedentsMedicauxid'))
            ordonnance=Ordonnance.objects.get(id=data.get(''))
            bilan = Bilan.objects.get(id=data.get('bilanid'))
            soin = Soin.objects.get(id=data.get('soinid'))
            
        except (Patient.DoesNotExist, Consultation.DoesNotExist, Resume.DoesNotExist, Bilan.DoesNotExist) as e:
            
            return JsonResponse({'error': str(e)}, status=400)
        
        
        # Create the Dossier instance
        dossier = DPI.objects.create(
            patient=patient,
            consultation=consultation,
            antecedentsMedicaux=antecedentsMedicaux,
            dateAddmition=datetime.now(),
            dateSortie=datetime.now(),
            dateMaj=datetime.now(),
            bilan=bilan,
            soin=soin,
        )
        
        # Return success response
        return JsonResponse({'message': 'Dossier created successfully', 'dossier_id': dossier.id}, status=201)
    


class ConsultationDetailView(APIView):
 

    def get(self, request, id=None):
        if id:
            try:
                consultation = Consultation.objects.get(id=id)
                serializer = ConsultationSerializer(consultation)
                return Response(serializer.data)
            
            except Consultation.DoesNotExist:
                return Response({"error": "Consultation not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            consultation = Consultation.objects.all()
            serializer = ConsultationSerializer(consultation, many=True)
            return Response(serializer.data)

    def post(self, request):
        
        
        data = request.POST
        
        try:
            # Fetch related model instances
            
            patient = Patient.objects.get(id=data.get('patient_id'))
            medcin = Medcin.objects.get(id=data.get('medcin_id'))
            trouveDiagnostic = data.get("trouveDiagnostic", False) 
            raison_admission = data.get("raisonAdmission")
            
        except (Patient.DoesNotExist, Consultation.DoesNotExist,Medcin.DoesNotExist) as e:
            
            return Response({'error': str(e)}, status=400)
        
        
        
        # Create the Dossier instance
        consultation = Consultation.objects.create(
            
            patient=patient,
            medcin=medcin,
            date=datetime.now(),
            trouveDiagnostic=trouveDiagnostic,
            raison_admission=raison_admission, 
        )
        
        
        # Return success response
        return Response({'message': 'Consultation created successfully', 'consultation_id': consultation.id}, status=201)
        
   
      
class SoinDetailView(APIView):
 

    def get(self, request, id=None):
        
        if id:
            try:
                soins = Soin.objects.get(id=id)
                serializer = SoinSerializer(soins)
                return Response(serializer.data)
            
            except Soin.DoesNotExist:
                return Response({"error": "Soin not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            soins = Soin.objects.all()
            serializer = SoinSerializer(soins, many=True)
            return Response(serializer.data)

    def post(self, request):
        
        
        data = request.POST
        
        try:
            # Fetch related model instances
            
            patient = Patient.objects.get(id=data.get('patient_id'))
            typeSoin=data.get("typeSoin")
            description = data.get("description")
            infermier = Infirmier.objects.get(id=data.get('infermier'))
            
        except (Patient.DoesNotExist,infermier.DoesNotExist) as e:
            
            return Response({'error': str(e)}, status=400)
        
        
        
        # Create the Dossier instance
        soin = Soin.objects.create(
            
            patient=patient,
            typeSoin=typeSoin,
            description=description,
            date=datetime.now(), 
            infermier=infermier
        )
        
        
        # Return success response
        return Response({'message': 'Soin created successfully', 'soin_id': soin.id}, status=201)
   