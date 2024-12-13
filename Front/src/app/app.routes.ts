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
    path:'test',
    loadComponent: async () => {
      const m = await import("./pages/homePages/medecin/medecin.component");
      return m.MedecinComponent;
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
