import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Router, RouterOutlet } from "@angular/router";
import { MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG } from "ngx-monaco-editor-v2";
import { MessageService } from "primeng/api";
import { catchError, interval, switchMap, takeUntil, throwError ,Subject} from "rxjs";
import { CardModule } from 'primeng/card';
import { ButtonModule } from "primeng/button";
import { HttpParams } from "@angular/common/http";
import { ApiService } from "../../services/api.service";



@Component({ 
standalone:true,
imports:[CommonModule,CardModule,ButtonModule,MatProgressSpinnerModule,MatIconModule],
selector: 'texathon-dashboard',
templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.scss']})
export class   DashboardComponent{



    @Input() showResume:boolean = false;
    passwordFieldType: string = 'password';
    team:any={};
    openRound :any = {}
    scores:any=[0,0,0,0]
    totalScores:any = [60,100,40,100]
    allowedRounds :any=[];

    
    rounds=[{name:'Tech Trivia',duration:'15min',isOnline:true,image:'tech-trivia.png',url:'/round1',cacheKey:'round1'},
    {name:'Onam Odyssey',duration:'1hr',isOnline:true,image:'code-pookalam.png',isSurprise:true,url:'/round2',cacheKey:'round2'},
    {name:'Mystery Mechanism',duration:'15min',isOnline:false,image:'mystery-mechanism.png',isSurprise:true},
    {name:'Code Combat Arena',duration:'1hr',isOnline:false,image:'coding-rounds.png'}]

    @Output() startChanged:EventEmitter<boolean> = new EventEmitter<boolean>()
    @Output() resumeChanged:EventEmitter<boolean> = new EventEmitter<boolean>()


    private unsubscribe$ = new Subject<void>();

    ngOnInit(){


      this.fetchAllowedRounds()
        
          interval(3000).pipe(
            switchMap(async () => this.fetchAllowedRounds()),
            takeUntil(this.unsubscribe$) 
          ).subscribe(
          (data:any) => {

            },
            error => {
              console.error(error); 
            }
          );
    }

 

  fetchAllowedRounds(){
    try{
      this.apiService.get(`/allowedRounds`).pipe(catchError((err)=>{
        return throwError(() => err)
      })).subscribe({
        next: (response: any) => {
          if (response && response.data) {
            if(response.data.allowedRounds){
              this.allowedRounds = response?.data?.allowedRounds
              
            }
          }
        },
        error: (err:any) => {
        }
      })
    }catch(err){
      console.log(err)
    }
  }

  

  getTransformStyle(index: number): any {
    let scale = 'scale' + '(' + 0.85 + ')';

    if(this.allowedRounds.includes(index+1) ){
      scale= 'scale(1)';
    }
    
    return {
      transform: scale
    };
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

    constructor(
                private router:Router,
                private messageService:MessageService,
                private apiService:ApiService
                
        ) {
          
            
        }

    loading:boolean = false;


    
   
    start(){
        this.startChanged.emit(true);
    }

    resume(){
        this.resumeChanged.emit(true)
    }

   

  

  
  
}