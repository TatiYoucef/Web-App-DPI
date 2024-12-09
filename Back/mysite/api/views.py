from django.shortcuts import render
from .models import Ordonnance, Medicament
from rest_framework import generics ,status
from rest_framework.response import Response
from .serializers import MedicamentSerializer, OrdonnanceSerializer ,BilanBilogiqueSerializer, BilanRadiologiqueSerializer


class MedicamentCreate(generics.ListCreateAPIView):
    queryset = Medicament.objects.all()
    serializer_class = MedicamentSerializer    

    def delete(self,request, *args ,**kwargs):
        Medicament.objects.all().delete()
        return Response(status =status.HTTP_204_NO_CONTENT)

class MedicamentRetriveUpdateDestory(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medicament.objects.all()
    serializer_class = MedicamentSerializer 
    lookup_field = "pk"

class BilanBilogiqueCreate(generics.ListCreateAPIView):
    queryset = Medicament.objects.all()
    serializer_class = BilanBilogiqueSerializer        

class BilanRadiologiqueCreate(generics.ListCreateAPIView):
    queryset = Medicament.objects.all()
    serializer_class = BilanRadiologiqueSerializer  