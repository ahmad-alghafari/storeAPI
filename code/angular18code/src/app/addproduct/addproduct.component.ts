import { Component, inject } from '@angular/core';
import { Controller } from '../services/controller.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
  service = inject(Controller);
  create(form : NgForm){
    if(form.valid){
      
      this.service.post( this.service.URLs.productsApiUrl, this.service.productFormData).subscribe({
        next : response => {
          console.log(response);
          const tempProduct =  [(response as Product) , ...this.service.products];
          this.service.products = tempProduct;

          this.service.resetProduct(form);
          this.service.toaster.success("add product", "Added Successfully", { progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
        } , error : error =>{
          console.error(error);
          this.service.toaster.error("add product", "Faild To Added Product", { progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
        }
      });
    }else{
      this.service.toaster.warning("add product", "Faild To Added Product with empty fealds", { progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
    }
  }
}
