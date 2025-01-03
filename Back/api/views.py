from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate , login
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (User , Administratif , Medcin , Patient , Ordonnance , Medicament , Dossier ,Consultation , Soin , MedcalRecord , BilanBiologique , BilanRadiologique , Radiologue , Laborantin , Infirmier)
from .serializers import(UserSerializer , AdministratifSerializer , MedcinSerializer , PatientSerializer , LaborantinSerializer , InfirmierSerializer , RadiologueSerializer , OrdonnanceSerializer , MedcalRecordSerializer , MedicamentSerializer , SoinSerializer , ConsultationSerializer , DossierSerializer , BilanBiologiqueSerializer , BilanRadiologiqueSerializer)
from rest_framework import generics ,permissions ,status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from django.db.models import Q


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

class PatientDetail(generics.RetrieveAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    lookup_field = 'id'

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


class Patientwithoutaacounts(APIView):
    serializer_class = PatientSerializer
    def get(self , request ):

        try:
            patients=Patient.objects.filter(have_accounts=False)

        except Patient.DoesNotExist:

            return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(patients , many=True)
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
        

class AdminUpdatePatient(APIView):
    
    def put(self, request, id):
        # Fetch the Patient object based on the ID
        try:
            patient = Patient.objects.get(id=id)
        except Patient.DoesNotExist:
            return Response({'error': 'Patient not found'}, status=status.HTTP_404_NOT_FOUND)

        

        # Retrieve the data from the request
        username = request.data.get('username')
        password = request.data.get('password')
        
        # Check if both username and password are provided
        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Update the associated User object for the patient
        user = patient.user
        user.username = username
        user.set_password(password)  # Securely hash the password
        user.save()

        # Update the patient's have_accounts field
        patient.have_accounts = True
        patient.save()

        serializer = PatientSerializer(patient)

        return Response(serializer.data, status=status.HTTP_200_OK)
    

class MedcalRecordView(APIView):  
    def post(self, request):
        """Handle POST request - Create a new med record"""
        serializer = MedcalRecordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 




class BilanBiologiqueCreateView(APIView):
    def post(self, request, dossier_id ):
              
        try:
            dossier = Dossier.objects.get(pk=dossier_id)
        except Dossier.DoesNotExist:
            return Response({'error': 'Dossier not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BilanBiologiqueSerializer(data=request.data)

        if serializer.is_valid():
            
            bilan =  serializer.save()
            dossier.bilanBiologique.add(bilan)
            dossier_serializer = DossierSerializer(dossier)
            return Response(dossier_serializer.data, status=status.HTTP_201_CREATED)
        else :
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BilanBiogiqueView(APIView):
    serializer_class= BilanBiologiqueSerializer
    def get(self, request , dossier_id ):
        try:
            dossier = Dossier.objects.get(pk=dossier_id)
        except Dossier.DoesNotExist:
            return Response({'error': 'Dossier not found'}, status=status.HTTP_404_NOT_FOUND)
        
        bilans = dossier.bilanBiologique.all()
        serializer = self.serializer_class(bilans , many=True)


        return Response(serializer.data, status=status.HTTP_200_OK)

class BilanView(APIView):
    serializer_class= BilanBiologiqueSerializer
    serializer_class= BilanRadiologiqueSerializer
    def get(self, request , dossier_id ):
        try:
            dossier = Dossier.objects.get(pk=dossier_id)
        except Dossier.DoesNotExist:
            return Response({'error': 'Dossier not found'}, status=status.HTTP_404_NOT_FOUND)
        
        bilans_bio = dossier.bilanBiologique.all()
        bilans_radio = dossier.bilanRadiologique.all()

        # Serialize both bilan types
        serializer_bio = BilanBiologiqueSerializer(bilans_bio, many=True)
        serializer_radio = BilanRadiologiqueSerializer(bilans_radio, many=True)

        # Return both serialized data in the response
        return Response({
            'bilan_biologique': serializer_bio.data,
            'bilan_radiologique': serializer_radio.data
        }, status=status.HTTP_200_OK)
    

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

class BilanRadioView(APIView):
    serializer_class = BilanRadiologiqueSerializer
    def get(self, request, bilan_id):

        try:
            bilan_radiologique = BilanRadiologique.objects.get(pk=bilan_id)          
        except BilanRadiologique.DoesNotExist:
            return Response({'error': 'Bilan Radiologique not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BilanRadiologiqueSerializer(bilan_radiologique)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BilanBioView(APIView):
    serializer_class = BilanBiologiqueSerializer
    def get(self, request, bilan_id):
        
        try:
            bilan_biologique = BilanBiologique.objects.get(pk=bilan_id)          
        except BilanBiologique.DoesNotExist:
            return Response({'error': 'Bilan Radiologique not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BilanBiologiqueSerializer(bilan_biologique)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BilanRadiologiqueView_radiologue(APIView):

  def get(self, request , id):
    try:
        
        try:
            radiologue = Radiologue.objects.get(pk=id)
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

    
