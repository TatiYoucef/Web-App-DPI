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
    path:'test',
    loadComponent: async () => {
      const m = await import("./pages/homePages/rad-lab-inf-page/rad-lab-inf-page.component");
      return m.RadLabInfPageComponent;
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
