from rest_framework import serializers
from api.models import (Administratif , Patient , Medcin , User ,  Infirmier , Laborantin , Radiologue ,Medicament , Ordonnance , BilanBiologique , BilanRadiologique , Medicament , Ordonnance , BilanRadiologique, BilanBiologique , MedcalRecord)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'role', 'password' , 'id' , 'first_name' , 'last_name']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
        

class AdministratifSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Administratif
        fields = '__all__'
        
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        admin=Administratif.objects.create(user=user , **validated_data)
        return admin
    


class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Patient
        fields = '__all__'
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        # Create the user
        user = User.objects.create_user(**user_data)
        # Create the Patient profile and associate it with the user
        patient = Patient.objects.create(user=user, **validated_data)
        return patient


class MedcinSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Medcin
        fields = '__all__'
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        medcin=Medcin.objects.create(user=user , **validated_data)
        return medcin 


class InfirmierSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Infirmier
        fields = '__all__'
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        infirmier=Infirmier.objects.create(user=user , **validated_data)
        return infirmier

class LaborantinSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Laborantin
        fields = '__all__'
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        laborantin=Laborantin.objects.create(user=user , **validated_data)
        return laborantin

class RadiologueSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model=  Radiologue
        fields= '__all__'
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        radiologue=Radiologue.objects.create(user=user , **validated_data)
        return radiologue

class MedicamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicament
        fields = '__all__'
    

class OrdonnanceSerializer(serializers.ModelSerializer):
    medicaments = MedicamentSerializer(many=True) 
    
    class Meta:
        model = Ordonnance
        fields = '__all__'
  


class MedicalRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedcalRecord
        fields = '__all__'
        
class BilanBilogiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanBiologique
        fields ='__all__' 
    
        
class BilanRadiologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = BilanRadiologique
        fields = '__all__'


