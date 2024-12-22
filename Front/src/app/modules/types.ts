// Hna ndeclariw les classes tawe3na pour les utiliser (User, DPI, Médicament, ...)

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