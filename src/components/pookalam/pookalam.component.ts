import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnter,
  CdkDragMove,
  CdkDropList,
  CdkDropListGroup,
  DragRef,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ApiService } from '../../app/services/api.service';
@Component({
  selector: 'app-pookalam',
  templateUrl: './pookalam.component.html',
  styleUrls: ['./pookalam.component.scss'],
})
export class PookalamComponent {

  constructor(private api: ApiService){

  }

  images: any[] = [
    { url: 'https://via.placeholder.com/150?text=Image+1', position: 1 },
    { url: 'https://via.placeholder.com/150?text=Image+2', position: 2 },
    { url: 'https://via.placeholder.com/150?text=Image+3', position: 3 },
    { url: 'https://via.placeholder.com/150?text=Image+4', position: 4 },
    { url: 'https://via.placeholder.com/150?text=Image+5', position: 5 },
    { url: 'https://via.placeholder.com/150?text=Image+6', position: 6 },
    { url: 'https://via.placeholder.com/150?text=Image+7', position: 7 },
    { url: 'https://via.placeholder.com/150?text=Image+8', position: 8 },
    { url: 'https://via.placeholder.com/150?text=Image+9', position: 9 },
    { url: 'https://via.placeholder.com/150?text=Image+10', position: 10 },
    { url: 'https://via.placeholder.com/150?text=Image+11', position: 11 },
    { url: 'https://via.placeholder.com/150?text=Image+12', position: 12 },
    { url: 'https://via.placeholder.com/150?text=Image+13', position: 13 },
    { url: 'https://via.placeholder.com/150?text=Image+14', position: 14 },
    { url: 'https://via.placeholder.com/150?text=Image+15', position: 15 },
    { url: 'https://via.placeholder.com/150?text=Image+16', position: 16 },
    { url: 'https://via.placeholder.com/150?text=Image+17', position: 17 },
    { url: 'https://via.placeholder.com/150?text=Image+18', position: 18 },
    { url: 'https://via.placeholder.com/150?text=Image+19', position: 19 },
    { url: 'https://via.placeholder.com/150?text=Image+20', position: 20 },
    { url: 'https://via.placeholder.com/150?text=Image+21', position: 21 },
    { url: 'https://via.placeholder.com/150?text=Image+22', position: 22 },
    { url: 'https://via.placeholder.com/150?text=Image+23', position: 23 },
    { url: 'https://via.placeholder.com/150?text=Image+24', position: 24 },
    { url: 'https://via.placeholder.com/150?text=Image+25', position: 25 },
  ];

  @ViewChild(CdkDropList) placeholder!: CdkDropList;

  private target: CdkDropList|null = null;
  private targetIndex!: number;
  private source: CdkDropList|null = null;
  private sourceIndex!: number;
  private dragRef: DragRef|null = null;
  public submitted = false;

  items: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  boxWidth = '500px';
  boxHeight = '500px';

  ngOnInit(){
    let images = []
    this.api.get('/submissions/round2').subscribe(
      data => {
        let sorted = data.data.sort((img1:any,img2:any)=> img2.round2 - img1.round2)
        this.images = sorted
        this.setPositions();
        setTimeout(()=>{

          this.renderPreview();
        },1000)
      }
    )
  }

  setPositions(){
    this.images.forEach((img,index) => img['position'] = index+1)
  }

  renderPreview() {
    this.images.forEach(image => {
      const iframe = document.getElementById('preview' + image.teamId) as HTMLIFrameElement;
      
      if (iframe) {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          try {
            doc.open();
            doc.write(image.code);
            doc.close();
          } catch (error) {
            console.error('Error rendering preview:', error);
          }
        } else {
          console.error('Iframe document is not accessible.');
        }
      } else {
        console.error('Iframe with id "preview"' + image.teamId +' not found.');
      }
    })
  }

  ngAfterViewInit() {
    const placeholderElement = this.placeholder.element.nativeElement;

    placeholderElement.style.display = 'none';
    placeholderElement.parentNode?.removeChild(placeholderElement);
  }

  add() {
    this.items.push(this.items.length + 1);
  }

  shuffle() {
    this.items.sort(function () {
      return 0.5 - Math.random();
    });
  }

  onDropListDropped() {
    if (!this.target) {
      this.renderPreview();
      return;
    }

    const placeholderElement: any =
      this.placeholder.element.nativeElement;
    const placeholderParentElement: any =
      placeholderElement.parentElement;

    placeholderElement.style.display = 'none';

    placeholderParentElement.removeChild(placeholderElement);
    placeholderParentElement.appendChild(placeholderElement);
    if(this.source)
    placeholderParentElement.insertBefore(
      this.source.element.nativeElement,
      placeholderParentElement.children[this.sourceIndex]
    );

    if (this.placeholder._dropListRef.isDragging() && this.dragRef) {
      this.placeholder._dropListRef.exit(this.dragRef);
    }

    this.target = null;
    this.source = null;
    this.dragRef = null;

    if (this.sourceIndex !== this.targetIndex) {
      moveItemInArray(this.images, this.sourceIndex, this.targetIndex);
      this.setPositions();
    }
    setTimeout(()=> {

      this.renderPreview();
    },500)
  }

  onDropListEntered({ item, container }: CdkDragEnter) {
    if (container == this.placeholder) {
      return;
    }

    const placeholderElement: HTMLElement =
      this.placeholder.element.nativeElement;
    const sourceElement: HTMLElement = item.dropContainer.element.nativeElement;
    const dropElement: HTMLElement = container.element.nativeElement;
    const dragIndex: number = Array.prototype.indexOf.call(
      dropElement.parentElement?.children,
      this.source ? placeholderElement : sourceElement
    );
    const dropIndex: number = Array.prototype.indexOf.call(
      dropElement.parentElement?.children,
      dropElement
    );

    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = item.dropContainer;

      placeholderElement.style.width = this.boxWidth + 'px';
      placeholderElement.style.height = this.boxHeight + 40 + 'px';

      sourceElement.parentElement?.removeChild(sourceElement);
    }

    this.targetIndex = dropIndex;
    this.target = container;
    this.dragRef = item._dragRef;

    placeholderElement.style.display = '';

    dropElement.parentElement?.insertBefore(
      placeholderElement,
      dropIndex > dragIndex ? dropElement.nextSibling : dropElement
    );

    this.placeholder._dropListRef.enter(
      item._dragRef,
      item.element.nativeElement.offsetLeft,
      item.element.nativeElement.offsetTop
    );
  }

  submit(){
    let updates:any = [];
    this.images.forEach(image => {
      updates.push({
        teamId: image.teamId,
        round:"round2",
        score: 100 - (image.position - 1)*10
      })
    })
    let body = {updates:updates}

    this.api.post("/score",body)
    .subscribe( data=> {
      this.submitted = true;
      alert(data.message)
    });
    
  }
}