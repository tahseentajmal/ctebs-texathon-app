import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterOutlet } from "@angular/router";
import { MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG } from "ngx-monaco-editor-v2";
import { ApiService } from "../../../../services/api.service";
import { MessageService } from "primeng/api";
import { catchError, throwError } from "rxjs";

@Component({ 
standalone:true,
imports:[CommonModule,ReactiveFormsModule,FormsModule,MatProgressSpinnerModule],
selector: 'cap-start',
templateUrl: './start.component.html',
styleUrls: ['./start.component.scss']})
export class   CapStartComponent{

    loginForm!:FormGroup
    loading = false

    @Input() showResume:boolean = false;
    passwordFieldType: string = 'password';
    
    @Output() startChanged:EventEmitter<boolean> = new EventEmitter<boolean>()
    @Output() resumeChanged:EventEmitter<boolean> = new EventEmitter<boolean>()

    constructor(private fb: FormBuilder,
                private apiService:ApiService,
                private messageService:MessageService
        ) {}


    togglePasswordVisibility(): void {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      }

    start(){
        this.startChanged.emit(true);
    }

    resume(){
        this.resumeChanged.emit(true)
    }

  
}