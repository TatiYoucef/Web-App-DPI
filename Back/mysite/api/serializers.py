from rest_framework import serializers
from .models import Medicament , Ordonnance , BilanRadiologique, BilanBiologique , MedicalRecord

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = '__all__'
    

class OrdonnanceSerializer(serializers.ModelSerializer):
    medicaments = MedicamentSerializer(many=True)  # Adjust to handle ManyToManyField
    
    class Meta:
        model = Ordonnance
        fields = '__all__'
        

class MedicalRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalRecord
        fields = '__all__'

class BilanBilogiqueSerializer(serializers.ModelSerializer):
    resultats_analytiques = MedicalRecordSerializer(many=True)

    class Meta:
        model = BilanBiologique
        fields ='__all__' 
        
class BilanRadiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanRadiologique
        fields = '__all__'