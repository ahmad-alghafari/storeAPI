import { Component, inject } from '@angular/core';
import { Controller } from '../services/controller.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-showproducts',
  standalone: true,
  imports: [RouterLink , CurrencyPipe , NgClass],
  templateUrl: './showproducts.component.html',
  styleUrl: './showproducts.component.css'
})
export class ShowproductsComponent {
  service = inject(Controller);
  gridOrList  : string = 'list';
  filterProducts : Product [] = [];

  ngOnInit() : void{
    this.service.products$.subscribe((products) =>{
      this.filterProducts = [...products];
    });
  }

  switchGrid(){
    if(this.gridOrList == 'grid'){
      return;
    }
    this.gridOrList = 'grid';
  }

  switchList(){
    if(this.gridOrList == 'list'){
      return;
    }
    this.gridOrList = 'list';
  }

  search(data:any){
    const dataLO : any = data.toString().toLowerCase(); 
    this.filterProducts = this.service.products.filter(product => 
      product.name.toLowerCase().includes(dataLO) ||
      product.price.toString().toLowerCase().includes(dataLO) 
    );
  }
}
