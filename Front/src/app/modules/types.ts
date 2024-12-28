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
  qrcode : String,
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
  antecedents_medicaux : String[],

// antécédents médicaux : String[]
// ordonnances : Ordonnance[]
// bilans : Bilan[]
// observations : Observation[]
// soins : Soin[]

}

export type Consultation = {
  id : number,
  soin : String[],
  medecin: Medcin,
  date : Date,
  trouveDiagnostic : boolean,
}

export type Ordonnance = {
  id : number,
  id_DPI : number,
  medecin : Medcin,
  id_consul : number,
  duree : String,
  etat : Boolean,
  medicaments :Medicament[],
}

export type Medicament = {
  id : number,
  nom : String,
  dose : String,
  frequence : String,
}

export type Soin = {

  id: number,
  subject: String,
  description: String, 
  date: String,
    
}