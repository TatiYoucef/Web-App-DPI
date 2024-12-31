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
  subject: String,
  description: String, 
  date: String,
    
}