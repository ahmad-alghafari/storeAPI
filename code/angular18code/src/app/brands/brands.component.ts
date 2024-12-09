import { Component, inject } from '@angular/core';
import { Brand } from '../shared/brand';
import { FormsModule, NgForm } from '@angular/forms';
import { Controller } from '../services/controller.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  service = inject(Controller);
  filterBrands : any[] = [];
  constructor() {
    this.filterBrands = this.service.brands ; 
  }
  ngOnInit(): void {
    
    this.filterBrands = this.service.brands ; 

  }

  search(data:any){
    const dataLC : any = data.toLowerCase();
    this.filterBrands = this.service.brands.filter(brand => 
      brand.name.toLowerCase().includes(dataLC) || 
      brand.name.toLowerCase().includes(dataLC)
    );
  }


  create(form: NgForm) {
    if (form.valid) {
      this.service.post(this.service.URLs.brandsApiUrl , this.service.brandFormData).subscribe({
          next: response => {
            console.log(response);
            this.service.brands.push(response as Brand);
            this.filterBrands.push(response);
            this.service.toaster.success("Added Successfully", "Fine", { progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
            this.service.resetBrand(form);
          },
          error: error => {
            console.error(error);
            this.service.toaster.error("add a brand", "Fail add Brand", { progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
          }
        });
    }
  }

  destroy(id: any) {
    this.service.delete( this.service.URLs.brandsApiUrl, id).subscribe({
      next: () => {
        this.service.brands = this.service.brands.filter(brand => brand.id !== id);
        this.filterBrands = this.filterBrands.filter(brand => brand.id !== id);
        this.service.toaster.success("delete a brand", "Deleted Successfilly", { progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
      },
      error: error => {
        console.error(error);
        this.service.toaster.error("delete a brand", "Fail Delete Brand", { progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
      }
    });
  }

  update(form: NgForm) {
    this.service.put(this.service.URLs.brandsApiUrl , this.service.brandFormDataUpdate.id , this.service.brandFormDataUpdate).subscribe({
      next: response => {
        const index = this.service.brands.findIndex(brand => brand.id === this.service.brandFormDataUpdate.id);
        const indexx = this.filterBrands.findIndex(brand => brand.id === this.service.brandFormDataUpdate.id);

        this.service.brandFormDataUpdate.updatedAt = this.service.getCustomFormattedDate();
        if (index !== -1) {
          this.service.brands[index] = this.service.brandFormDataUpdate;
        }
        if (indexx !== -1) {
          this.filterBrands[indexx] = this.service.brandFormDataUpdate;
        }
        this.service.toaster.success("update a brand", "Updated Successfilly", { progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
      },
      error: error => {
        console.error(error);
        this.service.toaster.error("update a brand", "Fail Update Brand", { progressBar: true, progressAnimation: 'increasing', positionClass: 'toast-bottom-right' });
      } , complete : () =>{
        this.service.resetBrand(form);
      },
    });
  }
}
