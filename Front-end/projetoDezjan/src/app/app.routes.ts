import { Routes } from '@angular/router';
import { HubComponent } from './pages/main/hub/hub.component';
import { LoginComponent } from './pages/register/login/login.component';
import { ChampionshipPageComponent } from './pages/championship/championship-page/championship-page.component';

export const routes: Routes = [
  { path: '', component: HubComponent },
  { path: 'cadastro', component: LoginComponent },
  { path: 'campeonatos', component: ChampionshipPageComponent },
  
];
