import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Color } from '../shared/color';
import { Controller } from '../services/controller.service';

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.css'
})

export class ColorsComponent  {
  service = inject(Controller);
  filterColors : any[] = [];
  constructor (){
    this.filterColors = this.service.savedColors;
  }
  search(data:any){
    const searchTerm : any = data.toLowerCase();
    this.filterColors = this.service.savedColors.filter(color => 
      color.name.toLowerCase().includes(searchTerm) ||
      color.value.toLowerCase().includes(searchTerm)
    );
  }

  create(form: NgForm){
    if(form.valid){
      this.service.post(this.service.URLs.savedcolorsApiUrl , this.service.savedColorFormData).subscribe({
        next : data  => {
          console.log(data);
          this.service.savedColors.push(data as Color); 
          this.service.resetSavedColor(form);
          this.service.toaster.success("add a category", "Color Added Successfully" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        },
        error : error => {
          console.error(error);
          this.service.toaster.error("add a category" , "Fail Delete Color" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        }
      });
    }else{
        this.service.toaster.error("add a category" , "Can't save empty faild" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
    }
  }

  destroy(id:any){
    this.service.delete(this.service.URLs.savedcolorsApiUrl ,id).subscribe({
      next : response => {
        // this.service.savedColors =  this.service.savedColors.filter(color =>  color.id !== id);
        this.filterColors =  this.filterColors.filter(color =>  color.id !== id);
        this.service.toaster.success("delete a category" , "Deleted Successfilly" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      },
      error : error => {
        console.error(error);
        this.service.toaster.error("delete a category" , "Fail Delete Category" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      }
    });
  }
}
