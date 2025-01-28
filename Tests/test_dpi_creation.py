from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime, timedelta
import time
import random

# generate a random date
def random_date(start_date, end_date):
    delta_days = (end_date - start_date).days
    random_days = random.randint(0, delta_days)
    return start_date + timedelta(days=random_days)


# Initialize the WebDriver
driver = webdriver.Chrome()

try:
    # Open the application
    driver.get("http://localhost:4200")  # URL of the Angular frontend
    time.sleep(2)
    # Wait for and click the "Connecter" button
    connecter_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "connecter-btn"))
    )
    connecter_button.click()

    # Wait for and interact with the username and password fields
    username_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "username"))
    )
    time.sleep(1)
    username_field.send_keys("adYoucef")

    password_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "password"))
    )
    time.sleep(1)
    password_field.send_keys("12345678")

    # Wait for and click the "Log In" button
    logIn_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "logIn"))
    )
    time.sleep(1)
    logIn_button.click()

    # Wait for and click the "Créer DPI" button
    create_dpi_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "create-dpi-btn"))
    )
    time.sleep(2)
    create_dpi_button.click()

    # Wait for and interact with the form fields
    nss_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "nss"))
    )
    value = int(10000000000 * random.random())
    input = str(value) 
    time.sleep(0.5)
    nss_field.send_keys(value)

    nom_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "nom"))
    )
    value = int(1000 * random.random())
    input = "Nom_patient_"+ str(value)
    time.sleep(0.5)
    nom_field.send_keys(input)

    prenom_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "prenom"))
    )
    input = "Prenom_patient_"+ str(value)
    time.sleep(0.5)
    prenom_field.send_keys(input)

    user_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "user"))
    )
    input = "user_patient_"+ str(value)
    time.sleep(0.5)
    user_field.send_keys(input)

    adresse_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "adresse"))
    )
    input = "adresse_patient_"+ str(value) +"_Algerie"
    time.sleep(0.5)
    adresse_field.send_keys(input)

    date_naissance_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "date_naissance"))
    )
    
    start = datetime(1950, 1, 1).date()
    end = datetime(2025, 1, 1).date()
    date_naissance = random_date(start, end)
    input = date_naissance.strftime("%d/%m/%Y")
    date_naissance_field.send_keys(input)

    num_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "num"))
    )

    value = int(1000000000 * random.random())
    input = "0"+ str(value)
    time.sleep(0.5)
    num_field.send_keys(input)

    mutuelle_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "mutuelle"))
    )
    value = int(1000000000 * random.random())
    input = "0"+ str(value)
    time.sleep(0.5)
    mutuelle_field.send_keys(input)

    # Wait for and click the submit button
    submit_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "submit-btn"))
    )

    time.sleep(2)
    submit_button.click()

    # Verify that the DPI has been created
    # success_message = WebDriverWait(driver, 10).until(
    #     EC.presence_of_element_located((By.CLASS_NAME, "success-message"))
    # )
    # assert "DPI créé avec succès" in success_m

finally:
    # Fermer le navigateur
    time.sleep(5)
    driver.quit()