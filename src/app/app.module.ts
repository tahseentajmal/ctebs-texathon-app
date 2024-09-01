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
import { TableModule } from 'primeng/table';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TexathonRegisterComponent } from './components/register/register.component';
import { TexathonResultsComponent } from '../components/results/results.component';
import {MatTableModule} from '@angular/material/table';
import { PookalamComponent } from '../components/pookalam/pookalam.component';
import { DragDropModule } from '@angular/cdk/drag-drop'; 


@NgModule({
  declarations: [
    AppComponent,
    TexathonRegisterComponent,
    TexathonResultsComponent,
    PookalamComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatDialogModule,
    AppRoutingModule,
    MatTableModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ProgressSpinnerModule,
    HttpClientModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    MatProgressSpinnerModule,
    TableModule,
    DragDropModule
  
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
