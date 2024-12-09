from rest_framework import serializers
from .models import Medicament , Ordonnance , BilanRadiologique, BilanBiologique

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = ["id" , "nom", "dose" , "frequence"]


class OrdonnanceSerializer(serializers.ModelSerializer):
    medicament = serializers.StringRelatedField(many=True)  # Adjust to handle ManyToManyField

    class Meta:
        model = Ordonnance
        fields = ["id_ord", "medicament"]

class BilanBilogiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanBiologique
        fields = ["id_bilan" , "type", "description" , "date_prescription", "medecin", "biologist" ,"resultats_analytiques"]    
        
class BilanRadiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanRadiologique
        fields = ["id_bilan" , "type", "description" , "date_prescription", "medecin", "radiologue" ,"images","compte_rendu"]   