import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path :'' , //Page d'accueil
    pathMatch: 'full', 
    loadComponent: async () => {
      const m = await import("./pages/authPages/acceuil-page/acceuil-page.component");
      return m.AcceuilPageComponent;
    }
  },

  {
    path :'logIn' , //Page Log-In
    pathMatch: 'full', 
    loadComponent: async () => {
      const m = await import("./pages/authPages/log-in-page/log-in-page.component");
      return m.LogInPageComponent;
    }
  },

  {
    path:'rabLabInf/:id',
    loadComponent: async () => {
      const m = await import("./pages/userPages/rab-lab-inf/acceuil-page/acceuil-page.component");
      return m.AcceuilPageComponent;
    }
  },

  {
    path:'rabLabInf/:id/geneGraph',
    loadComponent: async () => {
      const m = await import("./pages/userPages/rab-lab-inf/generer-graph/generer-graph.component");
      return m.GenererGraphComponent;
    }
  },

  {
    path:'rabLabInf/:idP/joindreBilan/:id', //id te3 patient li 7a najoutiwlou bilan
    loadComponent: async () => {
      const m = await import("./pages/userPages/rab-lab-inf/ajout-result-bilan/ajout-result-bilan.component");
      return m.AjoutResultBilanComponent;
    }
  },
  
  {
    path:'rabLabInf/:idP/ajoutSoin/:id', //id te3 patient li 7a najoutiwlou soins
    loadComponent: async () => {
      const m = await import("./pages/userPages/rab-lab-inf/ajout-soin/ajout-soin.component");
      return m.AjoutSoinComponent;
    }
  },



  {
    path:'patient',
    loadComponent: async () => {
      const m = await import("./pages/userPages/patient/acceuil-page/acceuil-page.component");
      return m.AcceuilPageComponent;
    }
  },

  {
    path :'patient/consulter-DPI/:id' ,
    loadComponent: async () => {
      const m = await import("./pages/userPages/DPI/consulter-dpi/consulter-dpi.component");
      return m.ConsulterDPIComponent;
    }
  },

  {
    path :'patient/consulter-DPI/:id/Ordonnances' , //the right path to ordonnances
    loadComponent: async () => {
      const m = await import("./pages/userPages/DPI/ordonnances/ordonnances-accueil.component");
      return m.OrdonnancesAccueilComponent;
    }
  },

  {
    path :'patient/consulter-DPI/:id/Bilans' ,
    loadComponent: async () => {
      const m = await import("./pages/userPages/DPI/bilans-liste/bilans-liste.component");
      return m.BilansListeComponent;
    }
  },

  {
    path :'patient/consulter-DPI/:id1/Bilans/:id2' , //id1: id de patient / id2: id de bilan
    loadComponent: async () => {
      const m = await import("./pages/userPages/DPI/consulter-bilan/consulter-bilan.component");
      return m.ConsulterBilanComponent;
    }
  },

  {
    path :'patient/consulter-DPI/:id/consultations' ,
    loadComponent: async () => {
      const m = await import("./pages/userPages/DPI/consultations/consultations.component");
      return m.ConsultationsComponent;
    }
  },

  {
    path:'medecin/:id',
    loadComponent: async () => {
      const m = await import("./pages/userPages/medecin/acceuil-page/acceuil-page.component");
      return m.AcceuilPageComponent;
    }
  },

  {
    path :'medecin/consulter-DPI/:id' ,
    loadComponent: async () => {
      const m = await import("./pages/userPages/DPI/consulter-dpi/consulter-dpi.component");
      return m.ConsulterDPIComponent;
    }
  },

  {
    path :'medecin/consulter-DPI/:id/Ordonnances' , //the right path to ordonnances
    loadComponent: async () => {
      const m = await import("./pages/userPages/DPI/ordonnances/ordonnances-accueil.component");
      return m.OrdonnancesAccueilComponent;
    }
  },

  {
    path :'medecin/consulter-DPI/:id/Bilans' ,
    loadComponent: async () => {
      const m = await import("./pages/userPages/DPI/bilans-liste/bilans-liste.component");
      return m.BilansListeComponent;
    }
  },

  {
    path :'medecin/consulter-DPI/:id1/Bilans/:id2' , //id1: id de patient / id2: id de bilan
    loadComponent: async () => {
      const m = await import("./pages/userPages/DPI/consulter-bilan/consulter-bilan.component");
      return m.ConsulterBilanComponent;
    }
  },

  {
    path :'medecin/consulter-DPI/:id/consultations' ,
    loadComponent: async () => {
      const m = await import("./pages/userPages/DPI/consultations/consultations.component");
      return m.ConsultationsComponent;
    }
  },
  

  {
    path:'admin/:id',
    loadComponent: async () => {
      const m = await import("./pages/userPages/admin/acceuil-page/acceuil-page.component");
      return m.AcceuilPageComponent;
    }
  },

  {
    path:'admin/:id/gestionPatient',
    loadComponent: async () => {
      const m = await import("./pages/userPages/admin/gestion-patients/gestion-patients.component");
      return m.GestionPatientsComponent;
    }
  },

  {
    path:'admin/:idA/gestionPatient/:id',
    loadComponent: async () => {
      const m = await import("./pages/userPages/admin/add-account/add-account.component");
      return m.AddAccountComponent;
    }
  },

  {
    path:'notif',
    loadComponent: async () => {
      const m = await import("./pages/supplementPages/notification-page/notification-page.component");
      return m.NotificationPageComponent ;
    }
  },

  
];
