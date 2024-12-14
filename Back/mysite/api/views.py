from django.shortcuts import render
from .models import Ordonnance, Medicament , BilanBiologique, BilanRadiologique, MedicalRecord
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import MedicamentSerializer, OrdonnanceSerializer ,BilanBilogiqueSerializer, BilanRadiologiqueSerializer ,MedicalRecordSerializer


class MedicamentView(APIView):
    
    def get(self, request, id=None):
        """Handle GET request - Retrieve all or specific medicament by ID"""
        if id:
            try:
                medicament = Medicament.objects.get(id=id)
                serializer = MedicamentSerializer(medicament)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Medicament.DoesNotExist:
                return Response({"error": "Medicament not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            medicaments = Medicament.objects.all()
            serializer = MedicamentSerializer(medicaments, many=True)
            return Response(serializer.data)
    
    def post(self, request):
        """Handle POST request - Create a new medicament"""
        serializer = MedicamentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 



class OrdonnanceView(APIView):
    
    def get(self, request):
        """Handle GET request - Ordonnances"""
        ordonnances = Ordonnance.objects.all()  
        serializer = OrdonnanceSerializer(ordonnances, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Handle POST request - Create a new ordonnance """
        serializer = OrdonnanceSerializer(data=request.data)
        if serializer.is_valid():
            ordonnance = serializer.save()
            medicaments_data = request.data.get('medicaments', [])
            if medicaments_data:
                # Assuming medicaments_data contains a list of IDs of existing medicaments
                ordonnance.medicaments.set(medicaments_data)
                ordonnance.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
          

class MedicalRecordView(APIView):
    
    def post(self, request):
        """Handle POST request - Create a new med record"""
        serializer = MedicalRecordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    
    def get(self, request, id=None, id_medRecord=None):
        if id:
            try:
                bilan = BilanBiologique.objects.get(id_bilan=id)
                if id_medRecord:
                    try:
                        medical_record = bilan.resultats_analytiques.get(id_medRecord=id_medRecord)
                        serializer = MedicalRecordSerializer(medical_record)
                        return Response(serializer.data, status=status.HTTP_200_OK)
                    except MedicalRecord.DoesNotExist:
                        return Response({"error": "Medical Record not found in this Bilan."}, status=status.HTTP_404_NOT_FOUND)
                
                records = bilan.resultats_analytiques.all()  
                serializer = MedicalRecordSerializer(records, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except BilanBiologique.DoesNotExist:
                return Response({"error": "BilanBiologique not found."}, status=status.HTTP_404_NOT_FOUND)
        #to see later 
        medicaments = MedicalRecord.objects.all()
        serializer = MedicalRecordSerializer(medicaments, many=True)
        return Response(serializer.data)


    
class BilanBilogiqueView(APIView):

    def post(self, request):
        """Handle POST request - Create a new Bilan Biologique"""
        serializer = BilanBilogiqueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   

    def get(self, request,id = None):
        if id:
                try:
                    bilan = BilanBiologique.objects.get(id_bilan=id)
                    serializer = BilanBilogiqueSerializer(bilan)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                except BilanBiologique.DoesNotExist:
                    return Response({"error": "BilanBiologique not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
                bilan = BilanBiologique.objects.all()
                serializer = BilanBilogiqueSerializer(bilan, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

 

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




   
           