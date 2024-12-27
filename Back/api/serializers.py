from rest_framework import serializers
from api.models import (Administratif , Patient , Medcin , User ,Observation,Ordonnance,Bilan, Infirmier , Laborantin , Radiologue,DPI, Consultation,Soin)

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


class PatientDPIListSerializer(serializers.ModelSerializer):
    user_first_name = serializers.CharField(source='user.first_name', read_only=True)
    user_last_name = serializers.CharField(source='user.last_name', read_only=True)
    date_admission = serializers.DateTimeField(source='dossier.dateAdmission', read_only=True)
    dpi_id = serializers.IntegerField(source='dossier.id', read_only=True)
    
    class Meta:
        model = Patient
        fields = ['user_first_name', 'user_last_name', 'date_admission', 'dpi_id']
        



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




class DPISerializer(serializers.ModelSerializer):
    consultation = serializers.PrimaryKeyRelatedField(queryset=Consultation.objects.all())
    ordonnance = serializers.PrimaryKeyRelatedField(queryset=Ordonnance.objects.all())
    bilan = serializers.PrimaryKeyRelatedField(queryset=Bilan.objects.all())
    soins = serializers.PrimaryKeyRelatedField(queryset=Soin.objects.all())
    antecedents_medicaux = serializers.CharField(allow_blank=True, required=False) 
    #observation = serializers.PrimaryKeyRelatedField(queryset=Observation.objects.all())
    
    class Meta:
        model = DPI
        fields = ['id', 'dateAddmition', 'dateMaj', 'consultation', 'ordonnance', 'bilan', 'soins', 'antecedents_medicaux']


class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'


class SoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soin
        fields = '__all__'
        
        


        
        
