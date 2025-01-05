from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Initialize the WebDriver
driver = webdriver.Chrome()

try:
    # Open the application
    driver.get("http://localhost:4200")  # URL of the Angular frontend

    # Wait for and click the "Connecter" button
    connecter_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "connecter-btn"))
    )
    connecter_button.click()

    # Wait for and interact with the username and password fields
    username_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "username"))
    )
    username_field.send_keys("adYoucef")

    password_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "password"))
    )
    password_field.send_keys("12345678")

    # Wait for and click the "Log In" button
    logIn_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "logIn"))
    )
    logIn_button.click()

    # Wait for and click the "Créer DPI" button
    create_dpi_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "create-dpi-btn"))
    )
    create_dpi_button.click()

    # Wait for and interact with the form fields
    nss_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "nss"))
    )
    nss_field.send_keys("1234567890")

    nom_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "nom"))
    )
    nom_field.send_keys("Bousdjira")

    prenom_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "prenom"))
    )
    prenom_field.send_keys("Nadine")

    user_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "user"))
    )
    user_field.send_keys("mn_bousdjira")

    adresse_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "adresse"))
    )
    adresse_field.send_keys("Djijel")

    date_naissance_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "date_naissance"))
    )
    date_naissance_field.send_keys("01/01/2000")

    num_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "num"))
    )
    num_field.send_keys("0613134340")

    mutuelle_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "mutuelle"))
    )
    mutuelle_field.send_keys("0123456789")

    # Wait for and click the submit button
    submit_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "submit-btn"))
    )
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