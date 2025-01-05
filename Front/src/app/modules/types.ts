// User class represents a user with basic details
export type User = {
  id: number,          // User's unique ID
  username : String,   // Username of the user
  first_name: String,  // User's first name
  last_name : String,  // User's last name
  role: String,        // Role of the user (e.g., doctor, admin)
  email: String,       // User's email address
}

// Patient class represents a patient with medical and personal information
export type Patient = { 
  id : number ,             // Patient's unique ID
  dossier : number ,        // Patient's medical file number
  user: User,               // User data associated with the patient
  nss: String ,             // Patient's social security number
  date_naissance: String,   // Patient's date of birth
  address: String,          // Patient's address
  phone_number: String,     // Patient's phone number
  mutuelle: String,         // Patient's health insurance company
  medcin_traitant: String,  // Patient's attending physician
  have_accounts: Boolean,   // Whether the patient has accounts
  en_cours_traitement: Boolean, // Whether the patient is undergoing treatment
  qrcode : String ,         // Patient's QR code for identification
}

// BilanBio represents a biological report or analysis
export type BilanBio = {
  id: number;                        // Report's unique ID
  laborantin: number;                 // ID of the lab technician
  medcin: number;                     // ID of the doctor
  rempli: boolean;                    // Whether the report was completed by the lab technician
  date_creation: String;              // Date the report was created
  resultats_analytiques: Array<MedicalRecord>;  // Array of medical records from the analysis
  description: String;                // Description of the report
  date_prescription: String;          // Date the prescription was given
  typeBilan: String;                  // Type of the report (e.g., biological, radiological)
  status: String;                     // Status of the report
}

// BilanRadio represents a radiological report
export type BilanRadio = {
  id: number;                        // Report's unique ID
  radiologue: number;                 // ID of the radiologist
  medcin: number;                     // ID of the doctor
  rempli: boolean;                    // Whether the report was completed by the radiologist
  date_creation: String;              // Date the report was created
  compte_rendu: String;               // Report summary
  description: String;                // Description of the report
  date_prescription: String;          // Date the prescription was given
  typeBilan: String;                  // Type of the report (e.g., biological, radiological)
  status: String;                     // Status of the report
}

// MedicalRecord represents a single medical parameter
export type MedicalRecord = {
  id : number,        // Unique ID for the medical record
  parametre : String, // Name of the medical parameter (e.g., blood pressure)
  value: String | null, // Value of the medical parameter
  unite: String       // Unit of measurement (e.g., mmHg, mg/dL)
}

// DPI represents a patient's medical record system
export type DPI = {
  id : number,           // Unique ID for the medical record
  dateMaj : String,      // Date of the last update to the medical record
  dateAdmission : String, // Date the patient was admitted
  dateSortie : String,    // Date the patient was discharged
  antecedants : String,   // Patient's medical history
  ordannance : Array<number>,   // List of prescription IDs
  bilanBiologique : Array<number>,  // List of biological report IDs
  bilanRadiologique : Array<number>, // List of radiological report IDs
  consultation: Array<number>,      // List of consultation IDs
}

// Ordonnance represents a prescription for a patient
export type Ordonnance = {
  id : number,         // Unique ID for the prescription
  id_DPI : number,     // Associated medical record ID
  dateCreation : Date, // Date the prescription was created
  duree : String,      // Duration of the treatment
  etat : Boolean,      // Whether the prescription is active
}

// Medicament represents a medication in a prescription
export type Medicament = {
  id : number,        // Unique ID for the medication
  id_ordonnance : number,  // ID of the associated prescription
  nom : String,       // Name of the medication
  dose : String,      // Dose of the medication
  frequence : String, // Frequency of the medication intake
}

// Soin represents a medical care or treatment action
export type Soin = {
  id: number,         // Unique ID for the care action
  infirmier: number,  // ID of the nurse providing the care
  subject: String,    // Subject of the care action
  description: String, // Description of the care action
  date: String,       // Date the care action was provided
}

// Consultation represents a medical consultation for a patient
export type Consultation = {
  patient: Patient,            // Patient associated with the consultation
  medcin: number,              // ID of the doctor conducting the consultation
  soins: Soin[],               // List of care actions provided during the consultation
  date: Date,                  // Date of the consultation
  dateProchaineCons: Date,     // Date of the next consultation
  trouveDiagnostic: boolean,   // Whether a diagnosis was found during the consultation
  raison_admission: string,    // Reason for the consultation
};

// Bilan represents a general report for a patient
export type Bilan = {
  id: number,        // Unique ID for the report
  idMed: number,     // ID of the associated doctor
  idConsul: number,  // ID of the associated consultation
  type: String,      // Type of report (e.g., biological, radiological)
  rempli: boolean,   // Whether the report was completed
  date: String,      // Date of the report
  tests: Array<TestBilan>, // List of tests in the report
}

// TestBilan represents a specific test in a report
export type TestBilan = {
  id : number,        // Unique ID for the test
  testName : String,  // Name of the test
  result: String | null, // Result of the test (could be null if not yet performed)
}
