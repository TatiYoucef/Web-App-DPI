from django.db import models
from abc import ABC, abstractmethod

# Create your models here.

class Medicament(models.Model):
    nom = models.CharField(max_length=100)  
    dose = models.CharField(max_length=50) 
    frequence = models.CharField(max_length=50)   

    def __str__(self):
        return self.nom 

class Ordonnance(models.Model):
    id_ord = models.AutoField(primary_key=True)  
    medicament = models.ManyToManyField(Medicament)  

    def __str__(self):
        return f"Ordonnance {self.id_ord}" 


class Bilan(models.Model):
    id_bilan = models.AutoField(primary_key=True)  
    type = models.CharField(max_length=50) 
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
        


class BilanBiologique(Bilan):
    biologist = models.CharField(max_length=200)  
    resultats_analytiques = models.JSONField(default=dict)  

    def ajouter_resultat(self, parametre, valeur, unite):
        """Adds a biological test result to the JSON field."""
        self.resultats_analytiques[parametre] = {"valeur": valeur, "unite": unite}
        self.save()  # Save changes to the database

    def traiter_resultats(self):
        """Processes and displays analytical results."""
        print(f"Fait par: {self.biologist}")
        print("Résultats analytiques:")
        for parametre, data in self.resultats_analytiques.items():
            print(f"{parametre}: {data['valeur']} {data['unite']}")

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
