import { Component, inject, Input } from '@angular/core';
import { Controller } from '../services/controller.service';
import { Router } from '@angular/router';
import { FormControl, FormsModule, NgForm  , NgModel} from '@angular/forms';
import { Colorpost } from '../shared/colorpost';
import { Image } from '../shared/image';
import { Product } from '../shared/product.model';
import { Specification } from '../shared/specification';
import { Color } from '../shared/color';
import { Producttag } from '../shared/producttag.mode';

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
  tagFormdata : Producttag = new Producttag();
  colorid  : string = "";
  fromdata! : FormData;

  @Input() set id(id:string){
    if (id && /^[0-9a-fA-F-]{36}$/.test(id)) {
      this.service.get(this.service.URLs.productsApiUrl,id).subscribe({
        next : data => {
          this.product = data as Product;
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
        this.product.images.push(response as Image);
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
          this.product.details.push(response as Specification);
          this.service.toaster.success("Add Specifications", "Details added successfully", {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
          this.service.resetSpecification(form);
        } , error : error => {
          console.error(error);
          this.service.toaster.error("Add Specifications", "Fail to added specification" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        }
      });
    }else{
      this.service.toaster.error("Add Specifications", "Can't added empty specification" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
    }
  }

  destroySpecifications(id : any){
    this.service.delete(this.service.URLs.detailsApiUrl,id).subscribe({
      next : () => {
          this.product.details =  this.product.details.filter((specification :any) => specification.id !== id);
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
          const index = this.product.details.findIndex((specification : any) => specification.id === this.service.specificationFormDataUpdate.id);
          if(index !== -1){
            this.product.details[index] = response as Specification ; 
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
        (tag: any) => tag.tagId === this.tagFormdata.tagid
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
      console.log("id : "  +  this.tagFormdata.tagid);
      this.tagFormdata.productId = this.product.id;
      this.service.post(this.service.URLs.producttagsApiUrl,this.tagFormdata ).subscribe({
        next : response =>{ 
          console.log(response);
          this.product.tags.push(response);
          this.service.toaster.success("Add Tag","added auccessfully"   , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        },error : error => {
          console.error(error);
          this.service.toaster.error( "Add Tag","Fail to add tag"  , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        }
      });
    }else{
      this.service.toaster.error("Add Tag" , "Can't add empty tag" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
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
          this.product.colors.push(response as Color);
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
          this.product.colors.push(response as Color);
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
        this.product.colors = this.product.colors.filter((color : Color) => color.id !== id);
      },error : error => {
        console.error(error);
        this.service.toaster.error("Can't Delete Successfully" , "Delete Color" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      }
    });
  }
  
}
