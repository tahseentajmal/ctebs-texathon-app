import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../app/services/api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class TexathonResultsComponent {

  leaderboard : any[]  = []
  @ViewChild('tableContainer', { static: false }) tableContainer: any;
  
  constructor(
    private api: ApiService
  ){
    
  }

  ngOnInit(){
    this.api.get('/leaderboard')
    .subscribe(data => {
      this.leaderboard = data.data.leaderboard
    })
  }

  ngAfterViewInit() {
    this.startAutoScroll();
  }

  startAutoScroll() {
    let scrollAmount = 0;
    const scrollInterval = 50; // Speed of scroll in ms
    const container = document.getElementsByClassName('p-datatable-wrapper')[0];

    setInterval(() => {
      container.scrollTop = scrollAmount;
      scrollAmount += 1;
      if (this.isUserNearBottom(container)) {
        setTimeout(()=>{
          scrollAmount = 0; // Reset scroll
        },1000)
      }
    }, scrollInterval);
  }
  
  isUserNearBottom(scrollContainer:any) {
    const threshold = 0;
    const position = scrollContainer.scrollTop + scrollContainer.offsetHeight;
    const height = scrollContainer.scrollHeight;
    return position > height - threshold;
  }
}

const Products = [
  {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Elegant bamboo wristwatch with leather straps.',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
  },
  {
      id: '1001',
      code: 'nvklal433',
      name: 'Black Sunglasses',
      description: 'Stylish black sunglasses with UV protection.',
      image: 'black-sunglasses.jpg',
      price: 35,
      category: 'Accessories',
      quantity: 10,
      inventoryStatus: 'LOWSTOCK',
      rating: 4
  },
  {
      id: '1002',
      code: 'zz21cz3c1',
      name: 'Blue T-shirt',
      description: 'Comfortable blue cotton t-shirt.',
      image: 'blue-t-shirt.jpg',
      price: 20,
      category: 'Clothing',
      quantity: 15,
      inventoryStatus: 'INSTOCK',
      rating: 3
  },
  {
      id: '1003',
      code: '244wgerg2',
      name: 'Running Shoes',
      description: 'Lightweight running shoes with breathable mesh.',
      image: 'running-shoes.jpg',
      price: 80,
      category: 'Footwear',
      quantity: 8,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
  },
  {
      id: '1004',
      code: 'h456wer53',
      name: 'Leather Wallet',
      description: 'Premium leather wallet with multiple compartments.',
      image: 'leather-wallet.jpg',
      price: 45,
      category: 'Accessories',
      quantity: 30,
      inventoryStatus: 'INSTOCK',
      rating: 5
  }
];
