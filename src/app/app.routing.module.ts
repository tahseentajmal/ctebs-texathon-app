import { RouterModule, Routes } from '@angular/router';
import { TexathonRegisterComponent } from '../components/register/register.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'register', 
    component: TexathonRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
