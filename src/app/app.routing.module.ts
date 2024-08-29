import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TexathonRegisterComponent } from './components/register/register.component';
import { TexathonResultsComponent } from '../components/results/results.component';

export const routes: Routes = [
  {
    path: 'register', 
    component: TexathonRegisterComponent
  },
  {
    path: 'results', 
    component: TexathonResultsComponent
  },
  // {
  //   path : 'arena',
  //   component: TexathonArenaComponent
  // } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
