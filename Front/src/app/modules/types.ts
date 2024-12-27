// Hna ndeclariw les classes tawe3na pour les utiliser (User, DPI, Médicament, ...)

export type User = {

  id: number,
  nomUser : string ,
  nom: string,
  prenom : string,
  role: string,
  naissance: string,
  adresse: string,
  tel: string,

}

export type Patient = { //classe patient
  id : number ,
  idUser : number ,
  nomUser : String ,
  nss: number ,
  naissance: String,
  adresse: string,
  tel: string,
  mutuelle: string,
  nom: string,
  prenom : string,
}

export type Medcin = {
  id : number ,
  idUser : number ,
  nomUser : String ,
  nom: string,
  prenom : string,
  naissance: String,
  adresse: string,
  tel: string,
}

export type TestBilan = {

  id : number,
  testName : string,
  result: string | null,

}

export type DPI = {
  id : number,
  id_medecin : number,
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
  subject: string,
  description: string, 
  date: string,
    
}