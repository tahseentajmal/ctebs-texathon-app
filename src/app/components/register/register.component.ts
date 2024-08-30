import { Component, OnInit } from "@angular/core";
import { Form, FormControl } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of, throwError } from "rxjs";
import { MessageService } from "primeng/api";
import { HttpClient } from "@angular/common/http";


@Component({
    selector:'texathon-register',
    templateUrl:'./register.component.html',
    styleUrls:['./register.component.scss'],
})
export class TexathonRegisterComponent implements OnInit {
    registrationForm!: FormGroup;
    loading = false;
    teamDetails:any=false;
    displayTeamDialog = false;

  
    constructor(
      private fb: FormBuilder,
      private http: HttpClient,
      private messageService: MessageService,
      private apiService:ApiService
    ) {}
  
    ngOnInit(): void {
      this.registrationForm = this.fb.group({
        username: ['', Validators.required],
        companyName: ['', Validators.required],
        participantName1: ['', Validators.required],
        participantName2: ['', Validators.required],
      });
    }
    submit(event: Event): void {
      event.preventDefault();
  
      if (this.registrationForm.valid) {
        this.loading = true;
  
        this.apiService.post('/register', this.registrationForm.value).pipe(
          catchError((error) => {
            this.loading = false;
            const errorMessage = error?.message || 'An unknown error occurred!';
            this.messageService.add({
              severity: 'error',
              summary: 'Registration Failed',
              detail: errorMessage
            });
            return throwError(() => error);
          })
        ).subscribe({
          next: (response: any) => {
            this.loading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Registration Successful',
              detail: 'Your registration was successful!'
            });
  
            if (response && response.data) {
              this.displayTeamDialog = true;
              this.teamDetails = response.data
              this.registrationForm.reset()
            }
          },
          error: () => {
            this.loading = false; 
          }
        });
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Validation Error',
          detail: 'Please fill out all required fields.'
        });
      }
    }


      closePinDialog(){
        this.displayTeamDialog = false;
      }
    
      
  }