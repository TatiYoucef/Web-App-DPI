from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome()

try:
    # Ouvrir l'application
    driver.get("http://localhost:4200")  # URL du frontend Angular

    # Cliquer sur le bouton "Créer un DPI"
    create_dpi_button = driver.find_element(By.ID, "create-dpi-btn")  # Mettre l'ID ou la classe correcte
    create_dpi_button.click()

    # Remplir le formulaire
    name_field = driver.find_element(By.ID, "name")  # ID du champ "Nom"
    name_field.send_keys("Test DPI Name")

    age_field = driver.find_element(By.ID, "age")  # ID du champ "Âge"
    age_field.send_keys("30")

    # Soumettre le formulaire
    submit_button = driver.find_element(By.ID, "submit-btn")  # ID du bouton de soumission
    submit_button.click()

    # Vérifier que le DPI a été créé (par exemple, un message de confirmation)
    success_message = driver.find_element(By.CLASS_NAME, "success-message")  # Classe du message
    assert "DPI créé avec succès" in success_message.text

finally:
    # Fermer le navigateur
    time.sleep(5)
    driver.quit()