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
    password = models.CharField(max_length=128, null=True, blank=True)
    


class Medcin(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE , related_name="compte_medcin")
  date_naissance=models.DateField(default=date.today)
  address = models.CharField(max_length=255 , blank=True)
  phone_number = models.CharField(max_length=15 , blank=True)
  
  def __str__(self):
    return f"{self.user.username}" 

class Medicament(models.Model):
  nom = models.CharField(max_length=100)  
  dose = models.CharField(max_length=50) 
  frequence = models.CharField(max_length=50)   

  def __str__(self):
    return self.nom 

  
class Ordonnance(models.Model):
  date = models.DateField(default=date.today)
  medicaments = models.ManyToManyField(Medicament, related_name="ordonnances" ,  blank=True )
  medcin = models.ForeignKey(Medcin , on_delete=models.CASCADE , related_name="medi_ord" , blank=True , null=True)
  

  def __str__(self):
    return f"Ordonnance {self.id}"
  

class Bilan(models.Model):
  TYPE_BILAN_CHOICES = [
      ('BIO', 'Biologique'),
      ('RAD', 'Radiologique'),
  ]
  description = models.TextField() 
  date_prescription = models.DateField(default=date.today)  
  typeBilan = models.CharField(
      max_length=10,
      choices=TYPE_BILAN_CHOICES,
      default='BIO',  # Option par défaut, si nécessaire
  )
  
  STATUS_CHOICES = [
        ('PENDING', 'Pending'),  # not effected and not traited
        ('IN_PROGRESS', 'In Progress'),  # affected and not traited
        ('COMPLETED', 'Completed'),  # affected and traited
    ]
  status = models.CharField(
        max_length=100,
        choices=STATUS_CHOICES,
        default='',
        blank=True
  )

  class Meta :
    abstract = True 


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
  
class MedcalRecord(models.Model) :
    parametre = models.CharField(max_length=100 , blank=True)
    value = models.FloatField(blank=True , null=True)
    unite = models.CharField(max_length=50 , blank=True , null=True)

class BilanBiologique(Bilan):
  laborantin= models.ForeignKey(Laborantin ,on_delete=models.CASCADE , related_name="labo_bilan" , blank=True , null=True)  
  resultats_analytiques = models.ManyToManyField(MedcalRecord ,related_name="result_bilan")
  medcin = models.OneToOneField(Medcin,  on_delete=models.CASCADE ,  related_name="medcin_bilanBio" , blank=True , null=True )
  rempli = models.BooleanField(default=False) 
  date_creation = models.DateField(default=date.today)
  

class BilanRadiologique(Bilan):
  radiologue = models.ForeignKey(Radiologue ,on_delete=models.CASCADE ,related_name="radio_bilan" , null=True)  
  images = models.JSONField(default=list , null=True, blank=True )  # List to store image paths
  compte_rendu = models.TextField(null=True, blank=True)
  medcin = models.OneToOneField(Medcin,  on_delete=models.CASCADE ,  related_name="medcin_bilanRad" , blank=True , null=True ) 
  rempli = models.BooleanField(default=False) 
  date_creation = models.DateField(default=date.today)


class Soin(models.Model):
  infirmier = models.OneToOneField(Infirmier , on_delete=models.CASCADE , related_name="infirmier_soin")
  descriptionSoin = models.TextField()
  typeSoin = models.TextField(blank=True)


class Observation(models.Model):
    temperature = models.FloatField(default=0.0)
    tension = models.FloatField(default=0.0)
    frequanceCardiaque = models.FloatField(default=0.0)
    date = models.DateTimeField(default=date.today)




class Consultation(models.Model):
  soin = models.ManyToManyField(Soin , related_name= "soin_sejour")
  medcin = models.OneToOneField(Medcin , on_delete=models.CASCADE , related_name="medcin_sejour")
  date = models.DateField(default=date.today)
  trouveDiagnostic = models.BooleanField(default=False)
  raison_admission = models.TextField(blank = True)
  

class Resume(models.Model):
  diagnostic = models.CharField(max_length=255 , blank=True)
  symptomes = models.CharField(max_length=255 , blank=True)
  mesuresPrises = models.CharField(max_length=255 , blank=True)
  date_prochin = models.DateField(default=date.today)
  consul = models.OneToOneField( Consultation, on_delete=models.CASCADE  , related_name="cons_resum" , blank=True , null=True)

class Dossier(models.Model):
  ordannance = models.ManyToManyField(Ordonnance  , related_name="sejour_ord" ,  blank=True)
  bilanBiologique = models.ManyToManyField(BilanBiologique  , related_name="sejour_bilanBio" , blank=True)
  bilanRadiologique =models.ManyToManyField(BilanRadiologique , related_name="sejour_bilanRadio", blank=True)
  consultation = models.ManyToManyField(Consultation , related_name="cons_dossier" ,  blank=True)
  dateSortie = models.DateField(default=date.today)
  dateMaj = models.DateField(default=date.today)
  antecedants = models.TextField( null=True ,blank=True)
  dateAdmission = models.DateField(default=date.today)

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
  have_accounts = models.BooleanField(default=False , null =True)
  en_cours_traitement = models.BooleanField(default=False)
  qrcode = models.CharField(default='', max_length=15, blank=True)

  def __str__(self):
        return f"{self.user.username} "






  

  

  


  





  
