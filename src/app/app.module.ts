import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app.routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TexathonRegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    TexathonRegisterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatDialogModule,
    AppRoutingModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ProgressSpinnerModule,
    HttpClientModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    MatProgressSpinnerModule
  
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
