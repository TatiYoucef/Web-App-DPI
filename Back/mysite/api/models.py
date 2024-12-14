from django.db import models
from abc import ABC, abstractmethod

# Create your models here.

class Medicament(models.Model):
    #id_med = models.AutoField(primary_key=True) 
    nom = models.CharField(max_length=100)  
    dose = models.CharField(max_length=50) 
    frequence = models.CharField(max_length=50)   

    def __str__(self):
        return self.nom 

class Ordonnance(models.Model):
    id_ord = models.AutoField(primary_key=True)   
    medicaments = models.ManyToManyField(Medicament, related_name="ordonnances")

    def __str__(self):
        return f"Ordonnance {self.id_ord}" 

class BilanType(models.TextChoices):  # i can do :'database_value', 'human_readable_label
        BIOLOGIQUE = 'Biologique'
        RADIOLOGIQUE ='Radiologique'

class Bilan(models.Model):
    id_bilan = models.AutoField(primary_key=True)  
    type = models.CharField(
        max_length=50, 
        choices=BilanType.choices, 
        default=BilanType.BIOLOGIQUE
    )
    description = models.TextField() 
    date_prescription = models.DateField()  
    medecin = models.CharField(max_length=200) 

    class Meta:
        abstract = True  # Marks this as an abstract model (not directly stored in DB)

    def afficher_details(self):
        """DAffichage """
        print(f"ID: {self.id_bilan}, Type: {self.type}, Description: {self.description}, "
              f"Date: {self.date_prescription}, Médecin: {self.medecin}")

    def traiter_resultats(self):
        """Abstract method to process and display results."""
        raise NotImplementedError("Subclasses must implement this method")
        

class MedicalRecord(models.Model):
    id_medRecord = models.AutoField(primary_key=True)  
    parametre = models.CharField(max_length=100)
    value = models.FloatField()
    unite = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.parametre} ({self.value} {self.unite})"


class BilanBiologique(Bilan):
    biologist = models.CharField(max_length=200)  
    resultats_analytiques = models.ManyToManyField(MedicalRecord, related_name="bilans")

    def ajouter_resultat(self, parametre, valeur, unite):
        new_record = MedicalRecord.objects.create(parametre=parametre, value=valeur, unite=unite)
        self.resultats_analytiques.add(new_record)
        self.save()

    def traiter_resultats(self):
        print(f"Fait par: {self.biologist}")
        print("Parametre Valeur Unite")
        for record in self.resultats_analytiques.all():   
            print(record.parametre ,record.valeur, record.unite) 

class BilanRadiologique(Bilan):
    radiologue = models.CharField(max_length=200)  
    images = models.JSONField(default=list)  # List to store image paths
    compte_rendu = models.TextField(null=True, blank=True)  

    def ajouter_image(self, image_path):
        self.images.append(image_path)
        self.save() 

    def ajouter_compte_rendu(self, texte):
        """Raport """
        self.compte_rendu = texte
        self.save() 

    def traiter_resultats(self):
        """Processes and displays radiological results."""
        print(f"Fait par: {self.radiologue}")
        print("Images radiologiques:")
        for image in self.images:
            print(f"Image: {image}")
        print(f"Compte-rendu: {self.compte_rendu}")
