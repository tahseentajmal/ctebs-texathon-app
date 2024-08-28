import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor-v2';
import { CacheService } from '../services/cache.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isStarted:boolean = false;
  isFullScreen: boolean = false;  
  isPaused:boolean = false;


  constructor(private cacheService:CacheService){
    let cache = this.cacheService.get('arena')
    if(cache){
      console.log(cache)
      if(cache.started){
        this.isStarted = true;
        this.isPaused =true;
      }
    }
    
  }


  

  @HostListener('document:fullscreenchange', [])
  onFullScreenChange() {
    if (!document.fullscreenElement) {
      this.isPaused = true;
      this.isFullScreen = false;
    }
  }

  requestFullscreen() {
      const elem = document.documentElement; 
  
  
      if (elem.requestFullscreen) {
        elem.requestFullscreen().then(()=>{
          this.isFullScreen = true;
        }).catch(err => {
          console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
        });
      }
    }




  startArena(){
    this.isStarted = true;
    this.requestFullscreen();
    this.cacheService.set('arena',{started:true})
    
  }

  resumeArena(){
    this.requestFullscreen()
    this.isPaused = false;
  }

}
