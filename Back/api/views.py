from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate , login
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (User , Administratif , Medcin , Patient)
from .serializers import(UserSerializer , AdministratifSerializer , MedcinSerializer , PatientSerializer)
from rest_framework import generics ,permissions ,status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken




class ExampleView(APIView):
    def get(self, request):
        return Response({"message": "Hello from Django REST!"})
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


