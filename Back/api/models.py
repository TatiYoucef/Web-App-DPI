from django.db import models
from datetime import date
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from datetime import datetime

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
    

class Administratif(models.Model):
  user = models.OneToOneField( User , on_delete=models.CASCADE , related_name="compte_admin")
  date_naissance=models.DateField(default=date.today)
  address = models.CharField(max_length=255 , blank=True)
  phone_number = models.CharField(max_length=15 , blank=True)


  def __str__(self):
        return f"{self.user.username} "
      
  
class Patient(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE , related_name="compte_patient")
  dossier=models.OneToOneField('DPI',on_delete=models.CASCADE,null=True, blank=True)
  date_naissance=models.DateField(default=date.today)
  address = models.CharField(max_length=255 , blank=True)
  phone_number = models.CharField(max_length=15 , blank=True)
  nss = models.CharField(max_length=15 , blank=True)
  medcin_traitant = models.CharField(max_length=15 , blank=True)
  mutuelle = models.CharField(max_length=15 , blank=True)
 
  def __str__(self):
        return f"{self.user.username} "


class Medcin(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE , related_name="compte_medcin")
  date_naissance=models.DateField(default=date.today)
  address = models.CharField(max_length=255 , blank=True)
  phone_number = models.CharField(max_length=15 , blank=True)
  
  def __str__(self):
    return f"{self.user.username}"
  

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



class DPI(models.Model):
  
    # # Link to the Patient class
    # patient = models.OneToOneField('Patient', on_delete=models.CASCADE)

    # Link to the Séjour class
    
    consultation = models.ForeignKey('Consultation', on_delete=models.CASCADE)
      # Date and time of the patient entrence 
    dateAdmission = models.DateTimeField(default=datetime.now)

    # Date and time of the discharge of the patient
    dateSortie = models.DateTimeField(auto_now=True)
    
    # Date and time of the last update of the DPI record
    dateMaj = models.DateTimeField(default=datetime.now)

    # String dispkaying antecedents_medicaux of a patient 
    antecedents_medicaux = models.TextField(blank=True, null=True)    
    # Link to the Ordonnance class
    ordonnance=models.ForeignKey('Ordonnance',on_delete=models.CASCADE)

    # Link to the Bilan (medical exam results) class
    bilan = models.ForeignKey('Bilan', on_delete=models.CASCADE)
      
    # Link to the Soin class
    soins=models.ForeignKey('Soin',on_delete=models.CASCADE)
    
    observation=models.ForeignKey('Observation',on_delete=models.CASCADE,null=True, blank=True)
    
  
    

class Consultation(models.Model):
    # Link to the Patient class
    patient = models.ForeignKey('Patient', on_delete=models.CASCADE)

    # Link to the Medcin class
    medcin = models.ForeignKey('Medcin', on_delete=models.CASCADE)
    
    # Date of the creation of the stay
    date = models.DateTimeField(default=datetime.now)
    
    # The state of the diagno
    trouveDiagnostic = models.BooleanField(default=False)

    # Reason for admission
    raison_admission = models.TextField()




class Soin(models.Model):
  
    # Link to the Patient class
    patient = models.ForeignKey('Patient', on_delete=models.CASCADE)
    
    #type de soin
    typeSoin = models.TextField()
    
    #description
    descriptionSoin = models.TextField()

    #date of 'soin'
    date = models.DateTimeField(default=datetime.now)
     
    # Link to Infermier
    infermier = models.ManyToManyField('Infirmier', related_name='soins')


class Observation(models.Model):
  
    temperature = models.FloatField(default=0.0)
    
    tension = models.FloatField(default=0.0)
    
    frequanceCardiaque= models.FloatField(default=0.0)
    
    date=models.DateTimeField(default=datetime.now)



class Ordonnance(models.Model):
    pass  # Placeholder for now; I'll add fields later

class Bilan(models.Model):
    pass  # Placeholder for now; I'll add fields later
  
  
