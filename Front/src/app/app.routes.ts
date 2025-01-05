import { Routes } from '@angular/router'; // Importing Routes from Angular router module

export const routes: Routes = [ // Defining the application's route configuration

  {
    path: '', // Page d'accueil (Home page)
    pathMatch: 'full', // Match the full path
    loadComponent: async () => { // Lazy load the AcceuilPageComponent for this route
      const m = await import("./pages/authPages/acceuil-page/acceuil-page.component");
      return m.AcceuilPageComponent;
    }
  },

  {
    path: 'logIn', // Page Log-In
    pathMatch: 'full', // Match the full path
    loadComponent: async () => { // Lazy load the LogInPageComponent for this route
      const m = await import("./pages/authPages/log-in-page/log-in-page.component");
      return m.LogInPageComponent;
    }
  },

  {
    path: 'rabLabInf/:id', // Path to the page for a specific rabLabInf with a dynamic ID
    loadComponent: async () => { // Lazy load the AcceuilPageComponent for this route
      const m = await import("./pages/userPages/rab-lab-inf/acceuil-page/acceuil-page.component");
      return m.AcceuilPageComponent;
    }
  },

  {
    path: 'rabLabInf/:id/geneGraph', // Path for generating graphs related to rabLabInf with dynamic ID
    loadComponent: async () => { // Lazy load the GenererGraphComponent for this route
      const m = await import("./pages/userPages/rab-lab-inf/generer-graph/generer-graph.component");
      return m.GenererGraphComponent;
    }
  },

  {
    path: 'rabLabInf/:idP/joindreBilan/:id', // Path to join a bilan for a specific patient and bilan ID
    loadComponent: async () => { // Lazy load the AjoutResultBilanComponent for this route
      const m = await import("./pages/userPages/rab-lab-inf/ajout-result-bilan/ajout-result-bilan.component");
      return m.AjoutResultBilanComponent;
    }
  },

  {
    path: 'rabLabInf/:idP/ajoutSoin/:id', // Path to add soin for a specific patient and soin ID
    loadComponent: async () => { // Lazy load the AjoutSoinComponent for this route
      const m = await import("./pages/userPages/rab-lab-inf/ajout-soin/ajout-soin.component");
      return m.AjoutSoinComponent;
    }
  },

  {
    path: 'patient/consulter-DPI/:id', // Path to consult a DPI for a specific patient ID
    loadComponent: async () => { // Lazy load the ConsulterDPIComponent for this route
      const m = await import("./pages/userPages/DPI/consulter-dpi/consulter-dpi.component");
      return m.ConsulterDPIComponent;
    }
  },

  {
    path: 'patient/consulter-DPI/:id/Ordonnances', // Path to view ordonnances for a specific patient ID
    loadComponent: async () => { // Lazy load the OrdonnancesAccueilComponent for this route
      const m = await import("./pages/userPages/DPI/ordonnances/ordonnances-accueil.component");
      return m.OrdonnancesAccueilComponent;
    }
  },

  {
    path: 'patient/consulter-DPI/:id/Bilans', // Path to view bilans for a specific patient ID
    loadComponent: async () => { // Lazy load the BilansListeComponent for this route
      const m = await import("./pages/userPages/DPI/bilans-liste/bilans-liste.component");
      return m.BilansListeComponent;
    }
  },

  {
    path: 'patient/consulter-DPI/:id1/Bilans/:id2', // Path for viewing a specific bilan for a patient (id1: patient id, id2: bilan id)
    loadComponent: async () => { // Lazy load the ConsulterBilanComponent for this route
      const m = await import("./pages/userPages/DPI/consulter-bilan/consulter-bilan.component");
      return m.ConsulterBilanComponent;
    }
  },

  {
    path: 'patient/consulter-DPI/:id/consultations', // Path to view consultations for a specific patient ID
    loadComponent: async () => { // Lazy load the ConsultationsComponent for this route
      const m = await import("./pages/userPages/DPI/consultations/consultations.component");
      return m.ConsultationsComponent;
    }
  },

  {
    path: 'medecin/:id', // Path for accessing a specific medecin's page using medecin ID
    loadComponent: async () => { // Lazy load the AcceuilPageComponent for this route
      const m = await import("./pages/userPages/medecin/acceuil-page/acceuil-page.component");
      return m.AcceuilPageComponent;
    }
  },

  {
    path: 'medecin/consulter-DPI/:id', // Path for medecin to consult a patient's DPI using the patient ID
    loadComponent: async () => { // Lazy load the ConsulterDPIComponent for this route
      const m = await import("./pages/userPages/DPI/consulter-dpi/consulter-dpi.component");
      return m.ConsulterDPIComponent;
    }
  },

  {
    path: 'medecin/consulter-DPI/:id/Ordonnances', // Path for medecin to view ordonnances for a patient
    loadComponent: async () => { // Lazy load the OrdonnancesAccueilComponent for this route
      const m = await import("./pages/userPages/DPI/ordonnances/ordonnances-accueil.component");
      return m.OrdonnancesAccueilComponent;
    }
  },

  {
    path: 'medecin/consulter-DPI/:id/Bilans', // Path for medecin to view bilans for a patient
    loadComponent: async () => { // Lazy load the BilansListeComponent for this route
      const m = await import("./pages/userPages/DPI/bilans-liste/bilans-liste.component");
      return m.BilansListeComponent;
    }
  },

  {
    path: 'medecin/consulter-DPI/:id1/Bilans/:id2', // Path for medecin to consult a specific bilan for a patient
    loadComponent: async () => { // Lazy load the ConsulterBilanComponent for this route
      const m = await import("./pages/userPages/DPI/consulter-bilan/consulter-bilan.component");
      return m.ConsulterBilanComponent;
    }
  },

  {
    path: 'medecin/consulter-DPI/:id/consultations', // Path for medecin to view consultations for a patient
    loadComponent: async () => { // Lazy load the ConsultationsComponent for this route
      const m = await import("./pages/userPages/DPI/consultations/consultations.component");
      return m.ConsultationsComponent;
    }
  },

  {
    path: 'admin/:id', // Path for admin page with dynamic admin ID
    loadComponent: async () => { // Lazy load the AcceuilPageComponent for this route
      const m = await import("./pages/userPages/admin/acceuil-page/acceuil-page.component");
      return m.AcceuilPageComponent;
    }
  },

  {
    path: 'admin/:id/gestionPatient', // Path for admin to manage patients
    loadComponent: async () => { // Lazy load the GestionPatientsComponent for this route
      const m = await import("./pages/userPages/admin/gestion-patients/gestion-patients.component");
      return m.GestionPatientsComponent;
    }
  },

  {
    path: 'admin/:idA/gestionPatient/:id', // Path for admin to add account for a specific patient
    loadComponent: async () => { // Lazy load the AddAccountComponent for this route
      const m = await import("./pages/userPages/admin/add-account/add-account.component");
      return m.AddAccountComponent;
    }
  },

  {
    path: 'notif', // Path for notifications page
    loadComponent: async () => { // Lazy load the NotificationPageComponent for this route
      const m = await import("./pages/supplementPages/notification-page/notification-page.component");
      return m.NotificationPageComponent ;
    }
  },
];
