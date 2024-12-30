from rest_framework import serializers
from api.models import (Administratif ,BilanRadiologique,BilanBiologique, Patient , Medcin , User ,Observation,Ordonnance,Bilan, Infirmier , Laborantin , Radiologue,DPI, Consultation,Soin)

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
    patient_id = serializers.IntegerField(source='id', read_only=True)  
    
    class Meta:
        model = Patient
        fields = [' patient_id','user_first_name', 'user_last_name', 'date_admission', 'dpi_id']
        



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
    
    consultations = serializers.PrimaryKeyRelatedField(queryset=Consultation.objects.all(), many=True)
    ordonnances = serializers.PrimaryKeyRelatedField(queryset=Ordonnance.objects.all(), many=True)
    bilanBiologiques = serializers.PrimaryKeyRelatedField(queryset=BilanBiologique.objects.all(), many=True)
    bilanRadiologiques = serializers.PrimaryKeyRelatedField(queryset=BilanRadiologique.objects.all(), many=True)
    observations = serializers.PrimaryKeyRelatedField(queryset=Observation.objects.all(), many=True)
    antecedents_medicaux = serializers.CharField(allow_blank=True, required=False)

    class Meta:
        model = DPI
        fields = ['id', 'dateAdmission', 'dateSortie', 'dateMaj', 'consultations', 'ordonnances','bilanBiologiques' ,'bilanRadiologiques', 'observations', 'antecedents_medicaux']



class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'


class ConsultationListSerializer(serializers.ModelSerializer): 
    
    medcin_nom = serializers.CharField(source='medcin.user.lastname', read_only=True)
    raison_admission= serializers.CharField(source='raison_admission', read_only=True)
    id=serializers.CharField(source='id',read_only=True)
    class Meta:
        model = Consultation
        fields = ['id','medcin_nom','raison_admission']
        


class SoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soin
        fields = '__all__'
        
        


        
        
