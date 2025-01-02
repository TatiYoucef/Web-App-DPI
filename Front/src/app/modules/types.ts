// Hna ndeclariw les classes tawe3na pour les utiliser (User, DPI, Médicament, ...)

export type User = {

  id: number,
  nomUser : String ,
  nom: String,
  prenom : String,
  role: String,
  naissance: String,
  adresse: String,
  tel: String,

}

export type Patient = { //classe patient
  id : number ,
  id_DPI : number , 
  idUser : number ,
  nomUser : String ,
  nss: number ,
  naissance: String,
  adresse: String,
  tel: String,
  mutuelle: String,
  nom: String,
  prenom : String,
  qrcode : string,
}

export type Medcin = {
  id : number ,
  idUser : number ,
  nomUser : String ,
  nom: String,
  prenom : String,
  naissance: String,
  adresse: String,
  tel: String,
}

export type TestBilan = {

  id : number,
  testName : String,
  result: String | null,

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
  etat : Boolean
}

export type Medicament = {
  id : number,
  id_ordonnance : number,
  nom : String,
  dose : String,
  frequence : String
}

export type Soin = {

  id: number,
  subject: String,
  description: String, 
  date: String
    
}

export type BilanRadio = {

  id: number;
  //idMed: number;
  //idConsul: number;
  medcin:String,
  type: String , //Biologique or Radiologique
  status : String,
  images : Array<String>,
  date: String,
  compteRendu : String,
  idRadio : number
}

export type MedicalRecord = {

  id: number,
  parametre: String,
  value: number,
  unite: String
}

export type BilanBio = {

  id: number,
  //idMed: number;
  //idConsul: number;
  type: String , //Biologique or Radiologique
  status : String,
  date: String,
  idLabo : number,
  resultats_analytiques : Array<MedicalRecord>,
  medcin : String,
}
