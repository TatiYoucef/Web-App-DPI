// Hna ndeclariw les classes tawe3na pour les utiliser (User, DPI, Médicament, ...)

export type User = {

  id: number,
  username : String ,
  first_name: String,
  last_name : String,
  role: String,
  email: String,

}

export type Patient = { //classe patient
  id : number ,
  dossier : number , 
  user: User,
  nss: String ,
  date_naissance: String,
  address: String,
  phone_number: String,
  mutuelle: String,
  medcin_traitant: String,
  have_accounts: Boolean,
  en_cours_traitement: Boolean,
  qrcode : String ,
}

export type BilanBio = {

  id: number;
  laborantin: number;
  medcin: number;

  rempli: boolean; //si rad/lab l'a rempli ou pas
  date_creation: String;
  resultats_analytiques: Array<MedicalRecord>;

  description: String;
  date_prescription: String;
  typeBilan: String;
  status: String;

}

export type BilanRadio = {

  id: number;
  radiologue: number;
  medcin: number;

  rempli: boolean; //si rad/lab l'a rempli ou pas
  date_creation: String;

  compte_rendu: String;

  description: String;
  date_prescription: String;
  typeBilan: String;
  status: String;
  
}

export type MedicalRecord = {

  id : number,
  parametre : String,
  value: String | null,
  unite: String

}

export type DPI = {
  id : number,
  date_maj : Date,
  date_admission : Date,
  date_sortie : Date,
  antecedents_medicaux : Array<String>,
  ordonnances : Array<Ordonnance>,
  soins : Array<Soin>

// bilans : Bilan[]
// observations : Observation[]
}

export type Ordonnance = {
  id : number,
  id_DPI : number,
  dateCreation : Date,
  duree : String,
  etat : Boolean,
}

export type Medicament = {
  id : number,
  id_ordonnance : number,
  nom : String,
  dose : String,
  frequence : String,
}

export type Soin = {

  id: number,
  infirmier: number,
  subject: String,
  description: String, 
  date: String,
    
}

export type Consultation = {
  patient: Patient;  // Assuming Patient is another type or interface you have defined elsewhere
  medcin: number;    // Assuming Medcin is another type or interface you have defined elsewhere
  soins: Soin[];     // Assuming Soin is an array type that corresponds to the 'Soin' model
  date: Date;        // Represents the date of consultation (DateTimeField in Django)
  dateProchaineCons: Date; // Represents the date of the next consultation (DateTimeField in Django)
  trouveDiagnostic: boolean; // Boolean value indicating whether a diagnosis was found
  raison_admission: string; // Text field representing the reason for admission
};

export type Bilan = {

  id: number;
  idMed: number;
  idConsul: number;

  type: String; //Biologique or Radiologique
  rempli: boolean; //si rad/lab l'a rempli ou pas
  date: String;

  tests: Array<TestBilan>;
}

export type TestBilan = {

  id : number,
  testName : String,
  result: String | null,

}