from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate , login
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (User , Administratif , Medcin , Patient ,Ordonnance, Medicament , BilanBiologique, BilanRadiologique, MedcalRecord,Consultation ,Radiologue, Laborantin ,Dossier)
from .serializers import(UserSerializer , AdministratifSerializer , MedcinSerializer , PatientSerializer , LaborantinSerializer , InfirmierSerializer , RadiologueSerializer)
from rest_framework import generics ,permissions ,status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from .serializers import DossierSerializer, MedicamentSerializer, OrdonnanceSerializer ,BilanBiologiqueSerializer, BilanRadiologiqueSerializer ,MedicalRecordSerializer,OrdonnanceSerializer
from django.utils import timezone
import json

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
        
#ORDONNANCE
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

        
#BILAN BIO 
class MedcalRecordView(APIView):  
    def post(self, request):
        """Handle POST request - Create a new med record"""
        serializer = MedicalRecordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class BilanBiologiqueCreateView(APIView):
    def post(self, request,patient_id,consul_id):
        serializer = BilanBiologiqueSerializer(data=request.data)

        if serializer.is_valid():
            consultation = Consultation.objects.get(id=consul_id)
            
            bilan = serializer.save(
                    consul=consultation,
                    typeBilan="RADIOLOGIQUE",
                )
            resultats_analytiques_data = serializer.validated_data.get('resultats_analytiques', [])
            created_records = []
            for record_data in resultats_analytiques_data:
                record_serializer = MedicalRecordSerializer(data=record_data)
                if record_serializer.is_valid():
                    record_data['value'] = 0.0  
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
                serializer = BilanBiologiqueSerializer(bilans, many=True)
            else:
                bilans = []
                serializer = BilanBiologiqueSerializer(bilans, many=True)

            return Response({
                'patient': patient.user.username,
                'dossier': dossier.id if dossier else None,
                'bilans': serializer.data
            })
        except Patient.DoesNotExist:
            return Response({'detail': 'Patient not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 

class UpdateBilanBiologiqueView(APIView):
    def put(self, request, bilan_id):
        try:
            bilan = BilanBiologique.objects.get(id=bilan_id)
            #update le laboratin
            laboratin_id = request.data.get("laborantin")
            if laboratin_id:
                try:
                    laborantin = Laborantin.objects.get(id=laboratin_id)
                    bilan.laborantin = laborantin
                except Laborantin.DoesNotExist:
                    return Response(
                        {"error": "Laborantin not found."},
                        status=status.HTTP_404_NOT_FOUND,
                    )

            resultats_analytiques_data = request.data.get("resultats_analytiques", [])
            if isinstance(resultats_analytiques_data, list):
                for record_data in resultats_analytiques_data:
                    record_id = record_data.get("id")  
                    if record_id:
                        try:
                            medical_record = MedcalRecord.objects.get(id=record_id)
                            medical_record.value = record_data.get("value", medical_record.value)
                            medical_record.save()
                        except MedcalRecord.DoesNotExist:
                            return Response(
                                {"error": f"Medical record with id {record_id} not found."},
                                status=status.HTTP_404_NOT_FOUND,
                            )
                    else:
                        return Response(
                            {"error": "Medical record ID is required."},
                            status=status.HTTP_400_BAD_REQUEST,
                        )

            bilan.save()

            return Response(
                {"message": "Bilan Biologique updated successfully."},
                status=status.HTTP_200_OK,
            )
        except BilanBiologique.DoesNotExist:
            return Response(
                {"error": "Bilan Biologique not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            print("Error:", str(e))
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        

#BILAN RADIO   

class BilanRadiologiqueCreateView(APIView):
    def post(self, request, dossier_id):
        try:
            dossier = Dossier.objects.get(pk=dossier_id)
        except Dossier.DoesNotExist:
            return Response({'error': 'Dossier not found'}, status=status.HTTP_404_NOT_FOUND)

        bilanRadio_serializer = BilanRadiologiqueSerializer(data=request.data)

        if bilanRadio_serializer.is_valid():
            try:
                radiologue_id = request.data.get("radiologue")
                radiologue = None

                if radiologue_id:
                    try:
                        radiologue = Radiologue.objects.get(id=radiologue_id)
                    except Radiologue.DoesNotExist:
                        return Response(
                            {"error": "Radiologue not found."},
                            status=status.HTTP_404_NOT_FOUND,
                        )

                bilanRad = bilanRadio_serializer.save(
                    radiologue=radiologue,
                    status="IN_PROGRESS" if radiologue else "PENDING"
                )

                dossier.bilanRadiologique.add(bilanRad)
                dossier_serializer = DossierSerializer(dossier)
                return Response(
                    {
                        "message": "Bilan Radiologique created successfully.",
                        "bilan_id": bilanRad.id,
                        "radiologue": radiologue.user.username if radiologue else None,
                        "status": bilanRad.status,
                        "data": dossier_serializer.data,
                    },
                    status=status.HTTP_201_CREATED,
                )
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(bilanRadio_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class BilanRadiologiqueView(APIView):
    def get(self, request, dossier_id, bilan_id=None):
        try:
            dossier = Dossier.objects.get(pk=dossier_id)
        except Dossier.DoesNotExist:
            return Response({'error': 'Dossier not found'}, status=status.HTTP_404_NOT_FOUND)

        # If bilan_id is provided, retrieve that specific Bilan Radiologique
        if bilan_id is not None:
            try:
                bilan_radiologique = dossier.bilanRadiologique.get(pk=bilan_id)
                serializer = BilanRadiologiqueSerializer(bilan_radiologique)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except BilanRadiologique.DoesNotExist:
                return Response({'error': 'Bilan Radiologique not found'}, status=status.HTTP_404_NOT_FOUND)

        # If bilan_id is not provided, retrieve all Bilan Radiologique
        bilan_radiologiques = dossier.bilanRadiologique.all()
        serializer = BilanRadiologiqueSerializer(bilan_radiologiques, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateBilanRadiologiqueAPIView(APIView):
    def put(self, request, bilan_id):
        try:
            bilan = BilanBiologique.objects.get(id=bilan_id, status__in=["PENDING", "IN_PROGRESS"])
            if not bilan.laborantin:
                return Response({"error": "Bilan not assigned to a laborantin."}, status=status.HTTP_403_FORBIDDEN)

            if isinstance(bilan.resultats, str):
                bilan.resultats = json.loads(bilan.resultats)


            updates = request.data.get("resultats", [])
            for update in updates:
                nom_radio = update.get("nomRadio")
                image = update.get("image")

                # update images 
                for resultat in bilan.resultats:
                    if resultat.get("nomRadio") == nom_radio:
                        resultat["image"] = image

            radiologue_id = request.data.get("radiologue")
            if radiologue_id:
                try:
                    radiologue = Radiologue.objects.get(id=radiologue_id)
                    bilan.radiologue = radiologue
                except Radiologue.DoesNotExist:
                    return Response(
                        {"error": "Radiologue not found."},
                        status=status.HTTP_404_NOT_FOUND,
                    )
            
            compte_rendu = request.data.get("compte_rendu")
            if compte_rendu is not None:
                bilan.compte_rendu = compte_rendu

            bilan.status = "COMPLETED" 
            bilan.save()

            return Response(
                {"message": "Bilan Radiologique updated successfully."},
                status=status.HTTP_200_OK,
            )
        except BilanRadiologique.DoesNotExist:
            return Response(
                {"error": "Bilan Radiologique not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            print("Error:", str(e)) 
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

class BilanRadiologiqueView_radiologue(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request):
    try:
        user = request.user
        try:
            radiologue = Radiologue.objects.get(user=user)
        except Radiologue.DoesNotExist:
            return Response({"error": "You are not a radiologue."}, status=status.HTTP_403_FORBIDDEN)

        assigned_bilans = BilanRadiologique.objects.filter(
            radiologue=radiologue,
            status="IN_PROGRESS"
        )

        unassigned_bilans = BilanRadiologique.objects.filter(
            radiologue__isnull=True,
            status="PENDING"
        )

        bilans = assigned_bilans | unassigned_bilans
        serializer = BilanRadiologiqueSerializer(bilans, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#SGPH  
class ValiderOrdonnanceAPIView(APIView):
    def put(self, request, patient_id, ordonnance_id):
        try:
            ordonnance = Ordonnance.objects.get(id=ordonnance_id)
            
            if ordonnance.etat:
                return Response({"message": "Cette ordonnance est déjà validée."}, status=status.HTTP_400_BAD_REQUEST)

            ordonnance.etat = True
            ordonnance.dateValidation = timezone.now()  
            ordonnance.commentairesValidation = request.data.get('commentairesValidation', ordonnance.commentairesValidation)
            ordonnance.save()
            serializer = OrdonnanceSerializer(ordonnance)

            return Response({"message": "Ordonnance validée avec succès.", "ordonnance": serializer.data}, status=status.HTTP_200_OK)

        except Ordonnance.DoesNotExist:
            return Response({"error": "Ordonnance introuvable."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)