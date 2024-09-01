import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TexathonRegisterComponent } from './components/register/register.component';
import { TexathonResultsComponent } from '../components/results/results.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PookalamComponent } from '../components/pookalam/pookalam.component';

export const routes: Routes = [
  {
    path: 'register', 
    component: TexathonRegisterComponent
  },
  {
    path: 'results', 
    component: TexathonResultsComponent
  },
  {
    path: 'pookalam', 
    component: PookalamComponent
  },
  {
    path : 'dashboard',
    component: DashboardComponent
  } ,
  {
    path: '**',
    redirectTo: 'results'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
