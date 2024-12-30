from django.db import models
from datetime import date
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django import forms
# Create your models here.
class User(AbstractUser):
    ROLE_CHOICES = (
        ('Administratif', 'administratif'),
        ('Patient', 'patient'),
        ('Medcin', 'medcin'),
        ('Infirmier' , 'infirmier'),
        ('Laborantin' , 'laborantin'),
        ('Radiologue' , 'radiologue'),
    )
    role = models.CharField(max_length=30, choices=ROLE_CHOICES)



class Infirmier(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE , related_name="compte_Infirmier")
  date_naissance=models.DateField(default=date.today)
  address = models.CharField(max_length=255 , blank=True)
  phone_number = models.CharField(max_length=15 , blank=True)

  def __str__(self):
    return f"{self.user.username}"

class Laborantin(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE , related_name="compte_Laborantin")
  date_naissance=models.DateField(default=date.today)
  address = models.CharField(max_length=255 , blank=True)
  phone_number = models.CharField(max_length=15 , blank=True)

  def __str__(self):
   return f"{self.user.username}"
  
class Radiologue(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE , related_name="compte_Radiologue")
  date_naissance=models.DateField(default=date.today)
  address = models.CharField(max_length=255 , blank=True)
  phone_number = models.CharField(max_length=15 , blank=True)

  def __str__(self):
   return f"{self.user.username}"    
  
  
class Administratif(models.Model):
  user = models.OneToOneField( User , on_delete=models.CASCADE , related_name="compte_admin")
  date_naissance=models.DateField(default=date.today)
  address = models.CharField(max_length=255 , blank=True)
  phone_number = models.CharField(max_length=15 , blank=True)


  def __str__(self):
        return f"{self.user.username} "
  
class Soin(models.Model):
  infirmier = models.OneToOneField(Infirmier , on_delete=models.CASCADE , related_name="infirmier_soin")
  observation =models.TextField()


class Medcin(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE , related_name="compte_medcin")
  date_naissance=models.DateField(default=date.today)
  address = models.CharField(max_length=255 , blank=True)
  phone_number = models.CharField(max_length=15 , blank=True)
  
  def __str__(self):
    return f"{self.user.username}"
  
class Consultation(models.Model):
  soin = models.ForeignKey(Soin ,on_delete=models.CASCADE , related_name= "soin_sejour")
  medcin = models.OneToOneField(Medcin , on_delete=models.CASCADE , related_name="medcin_sejour")
  date = models.DateField(default=date.today)
  trouveDiagnostic = models.BooleanField(default=False) 


class Medicament(models.Model):
  nom = models.CharField(max_length=100)  
  dose = models.CharField(max_length=50) 
  FREQUENCE_CHOICES = [
      ('matin', 'Matin'),
      ('midi', 'Midi'),
      ('soir', 'Soir'),
      ('matin_midi', 'Matin et Midi'),
      ('midi_soir', 'Midi et Soir'),
      ('matin_midi_soir', 'Matin, Midi et Soir'),
      ('au_besoin', 'Au besoin'),
  ]
  frequence = models.CharField(max_length=50, choices=FREQUENCE_CHOICES)  

  def __str__(self):
      return self.nom  
  
class Ordonnance(models.Model):
  medicaments = models.ManyToManyField(Medicament, related_name="ordonnances" ,  blank=True )  
  medecin = models.ForeignKey(Medcin, on_delete=models.CASCADE , related_name="medecin_ord" ,  blank=True , null = True)
  consul = models.ForeignKey(Consultation, on_delete=models.CASCADE,  related_name="consul_ord" ,  blank=True, null= True)
  duree = models.CharField(max_length=50, blank=True)
  etat = models.BooleanField(default=False) #validee ou nn
  dateCreation = models.DateTimeField(auto_now_add=True , null=True, blank=True) 
  commentairesValidation = models.TextField(blank=True, null=True)
  dateValidation =  models.DateTimeField(null=True, blank=True)

  

  def __str__(self):
    return f"Ordonnance {self.id}"

class Bilan(models.Model):
  TYPE_BILAN_CHOICES = [
      ('BIOLOGIQUE', 'Biologique'),
      ('RADIOLOGIQUE', 'Radiologique'),
  ]
  description = models.TextField() 
  date_prescription = models.DateField()  
  #medecin = models.ForeignKey(Medcin, on_delete=models.CASCADE, related_name="medcin_bilan",blank=True)  
  consul = models.ForeignKey(Consultation, on_delete=models.CASCADE,  blank=True, null= True)
  typeBilan = models.CharField(
      max_length=100,
      choices=TYPE_BILAN_CHOICES,
      default='',  
  )

  class Meta :
    abstract = True 

class MedcalRecord(models.Model) :
    parametre = models.CharField(max_length=100)
    value = models.FloatField()
    unite = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.parametre} ({self.value} {self.unite})"


class BilanBiologique(Bilan):
  laborantin= models.OneToOneField(Laborantin ,on_delete=models.CASCADE ,  related_name="labo_bilan" )  
  resultats_analytiques = models.ManyToManyField(MedcalRecord ,related_name="result_bilan")
  def __str__(self):
        return f"{self.pk}"

  

class BilanRadiologique(Bilan):
  radiologue = models.OneToOneField(Radiologue ,on_delete=models.CASCADE ,related_name="radio_bilan" , null=True)  
  images = models.JSONField(default=list , null=True, blank=True )  # List to store image paths
  compte_rendu = models.TextField(null=True, blank=True) 

class Dossier(models.Model):
  ordannance = models.ManyToManyField(Ordonnance  , related_name="sejour_ord" ,  blank=True)
  bilanBiologique = models.ManyToManyField(BilanBiologique  , related_name="sejour_bilanBio" , blank=True)
  bilanRadiologique =models.ManyToManyField(BilanRadiologique , related_name="sejour_bilanRadio", blank=True)
  consultation = models.ManyToManyField(Consultation , related_name="cons_dossier" ,  blank=True)
  antecedants = models.TextField( null=True ,blank=True)

   
class Patient(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE , related_name="compte_patient")
  date_naissance=models.DateField(default=date.today)
  address = models.CharField(max_length=255 , blank=True)
  phone_number = models.CharField(max_length=15 , blank=True)
  nss = models.CharField( unique=True , max_length=15 , blank=True)
  medcin_traitant = models.ForeignKey('Medcin', on_delete=models.SET_NULL, blank=True, null=True)
  mutuelle = models.CharField(max_length=15 , blank=True)
  dossier = models.OneToOneField(Dossier , on_delete=models.CASCADE , related_name="patient_dossier" , null=True , blank=True)
  def __str__(self):
        return f"{self.user.username} "

  
class Resume(models.Model):
    #id_resume = models.AutoField(primary_key=True) 
    symptomes = models.CharField(max_length=100)  
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    consul = models.OneToOneField(Consultation, on_delete=models.CASCADE)
    mesuresPrises = models.ManyToManyField(MedcalRecord, related_name="resume")
    dateProchaineConsul = models.DateField() 

    def __str__(self):
        return f"Resume {self.id_resume}" 

  

 
  






  







  

  

  


  





  
