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

class Medicament(models.Model):
  nom = models.CharField(max_length=100)  
  dose = models.CharField(max_length=50) 
  frequence = models.CharField(max_length=50)   

  def __str__(self):
    return self.nom 
  

class Ordonnance(models.Model):
  date = models.DateField(default=date.today)
  medicaments = models.ManyToManyField(Medicament, related_name="ordonnances" ,  blank=True )
  #medcin = models.OneToOneField(Medcin , on_delete=models.CASCADE , related_name="medi_ord")
  

  def __str__(self):
    return f"Ordonnance {self.id}"
  

class Bilan(models.Model):
  TYPE_BILAN_CHOICES = [
      ('BIO', 'Biologique'),
      ('RAD', 'Radiologique'),
  ]
  description = models.TextField() 
  date_prescription = models.DateField()  
  #medcin = models.OneToOneField(Medcin,  on_delete=models.CASCADE ,  related_name="medcin_bilan") 
  typeBilan = models.CharField(
      max_length=10,
      choices=TYPE_BILAN_CHOICES,
      default='BIO',  # Option par défaut, si nécessaire
  )

  class Meta :
    abstract = True 

class MedcalRecord(models.Model) :
    parametre = models.CharField(max_length=100)
    value = models.FloatField()
    unite = models.CharField(max_length=50)


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

class BilanBiologique(Bilan):
  laborantin= models.OneToOneField(Laborantin ,on_delete=models.CASCADE ,  related_name="labo_bilan")  
  resultats_analytiques = models.ManyToManyField(MedcalRecord ,related_name="result_bilan")
  
  

class BilanRadiologique(Bilan):
  radiologue = models.OneToOneField(Radiologue ,on_delete=models.CASCADE ,related_name="radio_bilan" , null=True)  
  images = models.JSONField(default=list , null=True, blank=True )  # List to store image paths
  #images = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}))
  compte_rendu = models.TextField(null=True, blank=True)


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
  date = models.DateField()
  resume = models.TextField()


class Dossier(models.Model):
  ordannance = models.ManyToManyField(Ordonnance  , related_name="sejour_ord" ,  blank=True)
  bilanBiologique = models.ManyToManyField(BilanBiologique  , related_name="sejour_bilanBio" , blank=True)
  bilanRadiologique =models.ManyToManyField(BilanRadiologique , related_name="sejour_bilanRadio", blank=True)
  consultation = models.ManyToManyField(Consultation , related_name="cons_dossier" ,  blank=True)
  antecedants = models.TextField( null=True ,blank=True)
  

class Administratif(models.Model):
  user = models.OneToOneField( User , on_delete=models.CASCADE , related_name="compte_admin")
  date_naissance=models.DateField(default=date.today)
  address = models.CharField(max_length=255 , blank=True)
  phone_number = models.CharField(max_length=15 , blank=True)


  def __str__(self):
        return f"{self.user.username} "
  
class Patient(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE , related_name="compte_patient")
  date_naissance=models.DateField(default=date.today)
  address = models.CharField(max_length=255 , blank=True)
  phone_number = models.CharField(max_length=15 , blank=True)
  nss = models.CharField( unique=True , max_length=15 , blank=True)
  medcin_traitant = models.CharField(max_length=15 , blank=True)
  mutuelle = models.CharField(max_length=15 , blank=True)
  dossier = models.OneToOneField(Dossier , on_delete=models.CASCADE , related_name="patient_dossier" , null=True , blank=True)
  def __str__(self):
        return f"{self.user.username} "






  

  

  


  





  
