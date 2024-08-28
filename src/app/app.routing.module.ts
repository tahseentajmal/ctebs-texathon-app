import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TexathonRegisterComponent } from './components/register/register.component';

export const routes: Routes = [
 {
    path:'register',
    component:TexathonRegisterComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
