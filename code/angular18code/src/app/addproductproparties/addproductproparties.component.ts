import { Component, inject, Input } from '@angular/core';
import { Controller } from '../services/controller.service';
import { Router } from '@angular/router';
import { FormControl, FormsModule, NgForm  , NgModel} from '@angular/forms';
import { Colorpost } from '../shared/colorpost';

@Component({
  selector: 'app-addproductproparties',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addproductproparties.component.html',
})
export class AddproductpropartiesComponent {
  service = inject(Controller);
  router = inject(Router);

  product! : any;
  tagid =  new FormControl('');
  colorid = '';
  fromdata! : FormData ;

  @Input() set id(id:string){
    if (id && /^[0-9a-fA-F-]{36}$/.test(id)) {
      this.service.get(this.service.URLs.productsApiUrl,id).subscribe({
        next : data => {
          this.product = data;
          this.appendProductId();
          console.log(data);
        } , error : error => {
          console.error(error);
        }
      });
    } else {
      console.error('Invalid GUID!');
      this.router.navigate(['/products']);
    }
  }

  appendProductId(){
    this.fromdata  = new FormData();
    this.fromdata.append('productId',this.product.id);
  }

  setfiles(event : any){
    var file = event.target.files[0];
    this.appendProductId();
    this.fromdata.append('file',file,file.name);
  }

  createImage(){
    this.service.post(this.service.URLs.imagesApiUrl , this.fromdata).subscribe({
      next: response => {
        this.product.images.push(response);
        this.service.toaster.success("Image uploaded successfully" , "Upload Image" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      },
      error : error => {
        console.error(error);
        this.service.toaster.error("Failed to upload image" , "Upload Image" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      } , complete : () => {
        this.appendProductId();
      }
    });
  }

  destroyImage(id: string) {
    this.service.delete( this.service.URLs.imagesApiUrl,id).subscribe({
      next: () => {
        this.product.images = this.product.images.filter((image:any) => image.id !== id);
        this.service.toaster.success("Image deleted successfully" , "Delete Image" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});

      },
      error: (err) => {
        console.error('Deletion failed', err);
        this.service.toaster.error("Failed to delete image" , "Delete Image" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      }
    });
  }

  createSpecification(form :NgForm){
    if(form.valid){
      this.service.specificationFormData.productId = this.product.id;
      this.service.post(this.service.URLs.detailsApiUrl , this.service.specificationFormData).subscribe({
        next : response => {
          console.log(response);
          this.product.specifications.push(response);
          this.service.toaster.success("Details added successfully" , "Add Specifications" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
          this.service.resetSpecification(form);
        } , error : error => {
          console.error(error);
          this.service.toaster.error("Fail to added specification" , "Add Specifications" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        }
      });
    }else{
      this.service.toaster.error("Can't added empty specification" , "Add Specifications" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
    }
  }

  destroySpecifications(id : any){
    this.service.delete(this.service.URLs.detailsApiUrl,id).subscribe({
      next : () => {
          this.product.specifications =  this.product.specifications.filter((specification :any) => specification.id !== id);
          this.service.toaster.success("Details deleted successfully" , "Delete Specifications" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      } , error : error => {
        console.error(error);
        this,this.service.toaster.error("Fail deleted specification" , "Delete Specifications" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      }
    });
  }

  updateSpecification(form : NgForm){
    if(form.valid){
      this.service.put(this.service.URLs.detailsApiUrl , this.service.specificationFormDataUpdate.id , this.service.specificationFormDataUpdate).subscribe({
        next : response => {
          console.log(response);
          const index = this.product.specifications.findIndex((specification : any) => specification.id === this.service.specificationFormDataUpdate.id);
          if(index !== -1){
            this.product.specifications[index] = response ; 
          }
          this.service.toaster.success("Details updated successfully" , "Update Specifications" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
          this.service.resetSpecification(form);
        } , error : error => {
          console.error(error);
          this.service.toaster.error("Fail to update specifications" , "Update Specifications" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        }
      });
    }else{
      this.service.toaster.error("Can't update empty specifications" , "Update Specifications" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
    }
  }

  createProductTag(form :NgForm){
    if(form.valid){
      const exists = this.product.tags.some(
        (tag: any) => tag.tagId === this.tagid
      );
      if (exists) {
        this.service.toaster.warning(
          "This tag is already associated with the product",
          "Add Tag",
          {
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-bottom-right',
          }
        );
        return;
      }
      this.service.post(this.service.URLs.producttagsApiUrl, this.product.id).subscribe({
        next : response =>{ 
          console.log(response);
          this.product.tags.push(response);
          this.service.toaster.success("added auccessfully" , "Add Tag" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        },error : error => {
          console.error(error);
          this.service.toaster.error("Fail to add tag" , "Add Tag" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        }
      });
    }else{
      this.service.toaster.error(
        "Can't add empty tag" , 
        "Add Tag" , 
        {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
    }
  }

  destroyProductTag(id:string){
    this.service.delete( this.service.URLs.producttagsApiUrl, id).subscribe({
      next : () =>{
        this.product.tags = this.product.tags.filter((tag : any) => tag.id !== id);
        this.service.toaster.success("delete tag" , "Deleted Successfully" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      },error : error => {
        console.error(error);
        this.service.toaster.error("delete tag" , "Deleted Successfully" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      }
    });
  }

  createColor(form : NgForm){
    if(form.valid){
      this.service.colorFormData.productId = this.product.id; 
      this.service.post(this.service.URLs.colorsApiUrl,this.service.colorFormData).subscribe({
        next : response =>{
          console.log(response);
          this.product.colors.push(response);
          this.service.resetColor(form);
          this.service.toaster.success("add color" , "Added Successfully" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        },error : error => {
          console.error(error);
          this.service.toaster.error("Fail To Add Color ","Adding color"   , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        }
      });
    }else{
      this.service.toaster.error("Can't Add Color With Empty Input ","Adding color"   , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
    }
  }

  createColorTwo(form : NgForm ){
    if(form.valid){
      const  temp = this.service.savedColors.filter((color:any) => color.id == this.colorid);
      const  colorpost = new Colorpost();
      colorpost.name = temp[0].name;
      colorpost.value = temp[0].value;
      colorpost.productId = this.product.id;      
      this.service.post( this.service.URLs.colorsApiUrl, colorpost ).subscribe({
        next : response => {
          console.log(response);
          this.service.toaster.success("add color" , "Added Successfully" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
          this.product.colors.push(response);
          this.colorid = '';
        },error : error => {
          console.error(error);
          this.service.toaster.error("add color" , "Fail to add color." , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        }
      });
    }else{
      this.service.toaster.error("Can't Add Color With Empty Input ","Adding color"   , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
    }
  }

  destroyColor(id:string){
    this.service.delete( this.service.URLs.colorsApiUrl,id).subscribe({
      next : () =>{
        this.service.toaster.success("Added Successfully" , "Delete Color" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        this.product.colors = this.product.colors.filter((color : any) => color.id !== id);
      },error : error => {
        console.error(error);
        this.service.toaster.error("Can't Delete Successfully" , "Delete Color" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      }
    });
  }
  
}
