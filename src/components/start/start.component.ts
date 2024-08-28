import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterOutlet } from "@angular/router";
import { MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG } from "ngx-monaco-editor-v2";

@Component({ 
selector: 'texathon-start',
templateUrl: './start.component.html',
styleUrls: ['./start.component.scss']})
export class TexathonStartComponent{


    @Input() showResume:boolean = false;
    
    @Output() startChanged:EventEmitter<boolean> = new EventEmitter<boolean>()
    @Output() resumeChanged:EventEmitter<boolean> = new EventEmitter<boolean>()

    start(){
        this.startChanged.emit(true)
        
    }

    resume(){
        this.resumeChanged.emit(true)
    }

  
}