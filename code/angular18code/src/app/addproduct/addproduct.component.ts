import { Component, inject } from '@angular/core';
import { Controller } from '../services/controller.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
  service = inject(Controller);
  addProduct(form : NgForm){
    if(form.valid){
      this.service.post(this.service.URLs.productsApiUrl , this.service.productFormData).subscribe({
        next : response => {
          console.log(response);
          this.service.toaster.success("add product", "Added Successfully", { progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
          // this.service.products.push(response);
          this.service.resetProduct(form);
        } , error : error =>{
          console.error(error);
          this.service.toaster.error("can't add product", "Faild To Added Product", { progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
        }
      });
    }
  }
}
