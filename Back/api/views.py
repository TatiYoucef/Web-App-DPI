from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate , login
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (User , Administratif , Medcin , Patient,DPI,Consultation,Soin,Infirmier,Observation,Medcin,Bilan,Ordonnance)
from .serializers import(UserSerializer , PatientDPIListSerializer,AdministratifSerializer , MedcinSerializer , PatientSerializer , LaborantinSerializer , InfirmierSerializer , RadiologueSerializer,DPISerializer,ConsultationSerializer,SoinSerializer)
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
    
    def get(self,request,DPI_id):
                
            if DPI_id:
                try:
                    dossier = DPI.objects.get(id=DPI_id)
                    serializer = DPISerializer(dossier)
                    return Response(serializer.data)    
                except DPI.DoesNotExist :
                    return Response({"error": "Dossier de patient not found."}, status=status.HTTP_404_NOT_FOUND)
            else:
                  return Response({"error": "Not authorised"}, status=status.HTTP_401_UNAUTHORIZED)
    
    
    
class addDPIView(APIView):
    
    def post(self, request):

        data = request.data
        try: 
            # patient = Patient.objects.get(id=data.get('patient_id'))
            consultation = Consultation.objects.get(id=data.get('consultaton_id'))
            antecedentsMedicaux = data.get(('antecedentsMedicaux'))
            ordonnance=Ordonnance.objects.get(id=data.get('ordonnance_id'))
            bilan = Bilan.objects.get(id=data.get('bilan_id'))
            soin = Soin.objects.get(id=data.get('soin_id'))
          #  observation=Observation.get(id=data.get('observation_id'))
                
        except ( Consultation.DoesNotExist, 
            Ordonnance.DoesNotExist, Bilan.DoesNotExist, Soin.DoesNotExist, Observation.DoesNotExist) as e:
                
            return JsonResponse({'error': str(e)}, status=400)
        
        # Create the Dossier instance
        dossier = DPI.objects.create(
            # patient=patient,
            consultation=consultation,
            antecedentsMedicaux=antecedentsMedicaux,
            dateAddmition=datetime.now(),
            dateSortie=datetime.now(),
            dateMaj=datetime.now(),
            ordonnance=ordonnance,
            bilan=bilan,
            soin=soin,
           # observation=observation
        )
            
        # Return success response
        return JsonResponse({'message': 'Dossier created successfully', 'dossier_id': dossier.id}, status=201)
       
    
class modifyDIView(APIView):
    
   def put(self, request, dpi_id):
    data = request.data
    try:
        dossier = DPI.objects.get(id=dpi_id)

        if 'consultation_id' in data:
            dossier.consultation = Consultation.objects.get(id=data.get('consultation_id'))
        if 'antecedentsMedicaux' in data:
            dossier.antecedentsMedicaux = data.get('antecedentsMedicaux')
        if 'ordonnance_id' in data:
            dossier.ordonnance = Ordonnance.objects.get(id=data.get('ordonnance_id'))
        if 'bilan_id' in data:
            dossier.bilan = Bilan.objects.get(id=data.get('bilan_id'))
        if 'soin_id' in data:
            dossier.soin = Soin.objects.get(id=data.get('soin_id'))
        # if 'observation_id' in data:
        #     dossier.observation = Observation.objects.get(id=data.get('observation_id'))

        dossier.dateMaj = datetime.now()

        dossier.save()

        return JsonResponse({'message': 'Dossier updated successfully', 'dossier_id': dossier.id}, status=200)

    except DPI.DoesNotExist:
        return JsonResponse({'error': 'Dossier not found.'}, status=404)

    except (Consultation.DoesNotExist, Ordonnance.DoesNotExist, Bilan.DoesNotExist, Soin.DoesNotExist) as e:
        return JsonResponse({'error': str(e)}, status=400)



# class ConsultationDetailView(APIView):
 

#     def get(self, request, id=None):
#         if id:
#             try:
#                 consultation = Consultation.objects.get(id=id)
#                 serializer = ConsultationSerializer(consultation)
#                 return Response(serializer.data)
            
#             except Consultation.DoesNotExist:
#                 return Response({"error": "Consultation not found."}, status=status.HTTP_404_NOT_FOUND)
#         else:
#             consultation = Consultation.objects.all()
#             serializer = ConsultationSerializer(consultation, many=True)
#             return Response(serializer.data)

#     def post(self, request):
        
        
#         data = request.POST
        
#         try:
#             # Fetch related model instances
            
#             patient = Patient.objects.get(id=data.get('patient_id'))
#             medcin = Medcin.objects.get(id=data.get('medcin_id'))
#             trouveDiagnostic = data.get("trouveDiagnostic", False) 
#             raison_admission = data.get("raisonAdmission")
            
#         except (Patient.DoesNotExist, Consultation.DoesNotExist,Medcin.DoesNotExist) as e:
            
#             return Response({'error': str(e)}, status=400)
        
        
        
#         # Create the Dossier instance
#         consultation = Consultation.objects.create(
            
#             patient=patient,
#             medcin=medcin,
#             date=datetime.now(),
#             trouveDiagnostic=trouveDiagnostic,
#             raison_admission=raison_admission, 
#         )
        
        
#         # Return success response
#         return Response({'message': 'Consultation created successfully', 'consultation_id': consultation.id}, status=201)
        
   
      
# class SoinDetailView(APIView):
 

#     def get(self, request, id=None):
        
#         if id:
#             try:
#                 soins = Soin.objects.get(id=id)
#                 serializer = SoinSerializer(soins)
#                 return Response(serializer.data)
            
#             except Soin.DoesNotExist:
#                 return Response({"error": "Soin not found."}, status=status.HTTP_404_NOT_FOUND)
#         else:
#             soins = Soin.objects.all()
#             serializer = SoinSerializer(soins, many=True)
#             return Response(serializer.data)

#     def post(self, request):
        
        
#         data = request.POST
        
#         try:
#             # Fetch related model instances
            
#             patient = Patient.objects.get(id=data.get('patient_id'))
#             typeSoin=data.get("typeSoin")
#             description = data.get("description")
#             infermier = Infirmier.objects.get(id=data.get('infermier'))
            
#         except (Patient.DoesNotExist,infermier.DoesNotExist) as e:
            
#             return Response({'error': str(e)}, status=400)
        
        
        
#         # Create the Dossier instance
#         soin = Soin.objects.create(
            
#             patient=patient,
#             typeSoin=typeSoin,
#             description=description,
#             date=datetime.now(), 
#             infermier=infermier
#         )
        
        
#         # Return success response
#         return Response({'message': 'Soin created successfully', 'soin_id': soin.id}, status=201)
   