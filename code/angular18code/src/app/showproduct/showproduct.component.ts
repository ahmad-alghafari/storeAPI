import { Component, inject, Input } from '@angular/core';
import { Controller } from '../services/controller.service';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-showproduct',
  standalone: true,
  templateUrl: './showproduct.component.html',
  styleUrl: './showproduct.component.css'
})
export class ShowproductComponent {
  service = inject(Controller);
  router = inject(Router);
  product! : any ; 

  @Input() set id(id: string) {
    if (id && /^[0-9a-fA-F-]{36}$/.test(id)) {
      this.service.get(this.service.URLs.productsApiUrl,id).subscribe({
        next : response => {
          console.log(response);
          this.product = response;
        } , error : error => {
          console.error(error);
        }
      });
    } else {
      console.error('Invalid GUID!');
      this.router.navigate(['/products']);
    }
  }
  
}
