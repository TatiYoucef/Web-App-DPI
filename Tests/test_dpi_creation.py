from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime, timedelta
import time
import random
import requests

# Function to generate a random date
def random_date(start_date, end_date):
    delta_days = (end_date - start_date).days
    random_days = random.randint(0, delta_days)
    return (start_date + timedelta(days=random_days)).strftime("%d/%m/%Y")

# Backend base URL
BACKEND_URL = "http://127.0.0.1:8000/api"  #backend URL

# Initialize the WebDriver
driver = webdriver.Chrome()

try:
    # Open the frontend application
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

    # Generate random data for the form fields
    random_id = random.randint(1000, 9999)
    nss = str(random.randint(10000000000, 99999999999))
    nom = f"Nom_patient_{random_id}"
    prenom = f"Prenom_patient_{random_id}"
    user = f"user_patient_{random_id}"
    adresse = f"adresse_patient_{random_id}_Algerie"
    date_naissance = random_date(datetime(1950, 1, 1).date(), datetime(2025, 1, 1).date()).strftime("%d/%m/%Y")
    num = f"0{random.randint(1000000000, 9999999999)}"
    mutuelle = f"0{random.randint(1000000000, 9999999999)}"

    # Fill in the form fields on the frontend
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "nss"))
<<<<<<< HEAD
    )
    value = int(10000000000 * random.random())
    nss_input = str(value) 
    time.sleep(0.5)
    nss_field.send_keys(nss_input)
=======
    ).send_keys(nss)
>>>>>>> 2a65d154614a4eb83d0380a00246b5a4d41d5864

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "nom"))
    ).send_keys(nom)

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "prenom"))
    ).send_keys(prenom)

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "user"))
    ).send_keys(user)

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "adresse"))
    ).send_keys(adresse)

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "date_naissance"))
<<<<<<< HEAD
    )
    
    start = datetime(1950, 1, 1).date()
    end = datetime(2025, 1, 1).date()
    input = random_date(start, end)  # Random date as a valid string
    date_naissance_field.send_keys(input)
=======
    ).send_keys(date_naissance)
>>>>>>> 2a65d154614a4eb83d0380a00246b5a4d41d5864

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "num"))
    ).send_keys(num)

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "mutuelle"))
    ).send_keys(mutuelle)

    # Submit the form
    submit_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "submit-btn"))
    )
<<<<<<< HEAD

    time.sleep(3)
=======
    time.sleep(2)
>>>>>>> 2a65d154614a4eb83d0380a00246b5a4d41d5864
    submit_button.click()
    path = "http://127.0.0.1:8000/api/auth/get/patient/" + nss_input
    driver.get(path)  
    for _ in range(3):
        driver.refresh()  
        time.sleep(1)  
    time.sleep(5)

<<<<<<< HEAD
    # Verify that the DPI has been created
    success_message = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "success-message"))
    )
    assert "DPI créé avec succès" in success_m
=======
    # Wait for the frontend success message
    success_message = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "success-message"))
    )
    assert "DPI créé avec succès" in success_message.text
    print("Frontend: DPI created successfully!")

    # Verify the data in the backend
    response = requests.get(f"{BACKEND_URL}/dpi/{nss}")  # Replace with your backend's DPI retrieval endpoint
    if response.status_code == 200:
        backend_data = response.json()
        assert backend_data["nss"] == nss
        assert backend_data["nom"] == nom
        assert backend_data["prenom"] == prenom
        assert backend_data["user"] == user
        assert backend_data["adresse"] == adresse
        assert backend_data["date_naissance"] == datetime.strptime(date_naissance, "%d/%m/%Y").strftime("%Y-%m-%d")
        assert backend_data["num"] == num
        assert backend_data["mutuelle"] == mutuelle
        print("Backend: Data verified successfully!")
    else:
        print(f"Backend verification failed! Status code: {response.status_code}")
        print("Response:", response.text)
>>>>>>> 2a65d154614a4eb83d0380a00246b5a4d41d5864

finally:
    # Close the browser
    time.sleep(5)
    driver.quit()
