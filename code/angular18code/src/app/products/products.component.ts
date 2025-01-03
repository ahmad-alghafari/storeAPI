import { Component, inject } from '@angular/core';
import { Controller } from '../services/controller.service';
import { RouterLink  } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule ,
    CurrencyPipe 
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  service = inject(Controller);
  filterProducts : Product [] = [];
  deleteProductId! : string;

  ngOnInit() : void{
    this.service.products$.subscribe((products) =>{
      this.filterProducts = [...products];
    });
  }
  
  search(data:any){
    const searchTerm : any = data.toLowerCase();
    this.service.products$.subscribe((products)=>{
      this.filterProducts = products.filter(prod => 
        prod.name.toLowerCase().includes(searchTerm) ||
        prod.description.toLowerCase().includes(searchTerm) ||
        prod.price.toString().includes(searchTerm)
      );
    });
  }

  sortByUpdatedAtAsc() {
    this.filterProducts = [...this.filterProducts].sort((a, b) =>
      new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    );
  }

  sortByUpdatedAtDesc() {
    this.filterProducts = [...this.filterProducts].sort((a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  

  sortByPriceAsc() {
    const sortedProducts = [...this.service.products].sort((a, b) => a.price - b.price);
    this.service.products = sortedProducts;
  }
  
  sortByPriceDesc() {
    const sortedProducts = [...this.service.products].sort((a, b) => b.price - a.price);
    this.service.products = sortedProducts;
  }

  defult(){
    this.filterProducts = this.service.products;
  }
 
  

  update(form : NgForm){
    if(form.valid){
      this.service.put(this.service.URLs.productsApiUrl , this.service.productFormDataUpdate.id ,  this.service.productFormDataUpdate).subscribe({
        next : response => {
          const index = this.service.products.findIndex(product => product.id === this.service.productFormDataUpdate.id);
          const indexx = this.filterProducts.findIndex(product => product.id === this.service.productFormDataUpdate.id);
          this.service.products[index] = response as Product;
          this.filterProducts[indexx] = response as Product;

          this.service.toaster.success("update a product", "Updated Successfilly", { progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
          this.service.resetProduct(form);
        } , error : error => {
          console.error(error);
          this.service.toaster.error("update a product", error.message || "Failed to update", { progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
        }
      });
    }else{
      this.service.toaster.error("update a product", "Can't Update With Empty Input", { progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
    }
  }

  updateProductStatus( id : string , attribute : string , status : string , product : any){
    const newStatus : string = status == 'true' ? 'false' : 'true';
    this.service.putProductStatus(id,attribute,newStatus,product).subscribe({
      next : response =>{
        const index = this.service.products.findIndex(product => product.id === id);
        const indexx = this.filterProducts.findIndex(product => product.id === id);
        this.service.products[index] =(response as Product);
        this.filterProducts[indexx] =(response as Product);
        this.service.toaster.success("change " + attribute +" successfilly",  "update a product", { progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
      }, error : error =>{
        console.error(error);
        this.service.toaster.error("fail to change " + attribute ,  "Update A Product", { progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
      }
    });
  }

  destroy(){
    if(this.deleteProductId){
      this.service.delete(this.service.URLs.productsApiUrl , this.deleteProductId).subscribe({
        next : response =>{
          this.service.products = this.service.products.filter(prod => prod.id !==this.deleteProductId);
          this.deleteProductId = '';
          console.log(response);
          this.service.toaster.success("Delete Product" , "product deleted successfully" ,{ progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
        }, error : error => {
          console.error(error);
          this.service.toaster.error("Delete Product" , "fail to delete product" ,{ progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
        }
      });
    }else{
      this.service.toaster.error("Delete Product" , "fail to delete product" ,{ progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
    }
  }
  
}
