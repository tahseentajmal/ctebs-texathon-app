import { Component, OnInit } from "@angular/core";
import { Form, FormControl } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from "rxjs";
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
    pin: string | null = null;
    displayPinDialog = false;
  
    constructor(
      private fb: FormBuilder,
      private http: HttpClient,
      private messageService: MessageService,
      private apiService:ApiService
    ) {}
  
    ngOnInit(): void {
      this.registrationForm = this.fb.group({
        teamName: ['', Validators.required],
        companyName: ['', Validators.required],
        participantName1: ['', Validators.required],
        participantName2: ['', Validators.required],
      });
    }
    submit(event: Event): void {
        event.preventDefault();
        
        if (this.registrationForm.valid) {
          this.loading = true;
          this.apiService.post('/register', this.registrationForm.value)
          .subscribe((response: any) => {
                
            console.log(response)
            this.messageService.add({
                severity: 'warn',
                summary: 'Validation Error',
                detail: 'Please fill out all required fields.'
              });

          });
            
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Validation Error',
            detail: 'Please fill out all required fields.'
          });
        }
      }
  }