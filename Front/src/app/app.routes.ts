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
    path:'rabLabInf',
    loadComponent: async () => {
      const m = await import("./pages/userPages/rab-lab-inf/acceuil-page/acceuil-page.component");
      return m.AcceuilPageComponent;
    }
  },

  {
    path:'rabLabInf/joindreBilan',
    loadComponent: async () => {
      const m = await import("./pages/userPages/rab-lab-inf/ajout-result-bilan/ajout-result-bilan.component");
      return m.AjoutResultBilanComponent;
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
    path:'medecin',
    loadComponent: async () => {
      const m = await import("./pages/userPages/medecin/acceuil-page/acceuil-page.component");
      return m.AcceuilPageComponent;
    }
  },

  {
    path:'admin',
    loadComponent: async () => {
      const m = await import("./pages/userPages/admin/acceuil-page/acceuil-page.component");
      return m.AcceuilPageComponent;
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
