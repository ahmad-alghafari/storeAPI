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

  ngOnInit(): void {
    this.service.savedColors$.subscribe((colors) => {
      this.filterColors = [...colors];
    });
  }

  search(data:any){
    const searchTerm  = data.toLowerCase();
    this.service.savedColors$.subscribe((colors) => {
      this.filterColors = colors.filter(colors => 
        colors.name.toLowerCase().includes(searchTerm) ||
        colors.value.toLowerCase().includes(searchTerm)
      );
    });
  }

  create(form: NgForm){
    if(form.valid){
      this.service.post(this.service.URLs.savedcolorsApiUrl , this.service.savedColorFormData).subscribe({
        next : response  => {
          console.log(response);

          const updatedColors = [...this.service.savedColors , response ];
          this.service.savedColors = updatedColors;
 
          this.service.resetSavedColor(form);
          this.service.toaster.success("add a Color", "Color Added Successfully" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        },
        error : error => {
          console.error(error);
          this.service.toaster.error("add a Color" , "Fail Delete Color" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        }
      });
    }else{
        this.service.toaster.error("add a Color" , "Can't save empty faild" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
    }
  }

  destroy(id:any){
    this.service.delete(this.service.URLs.savedcolorsApiUrl ,id).subscribe({
      next : () => {
        this.service.savedColors =  this.service.savedColors.filter(color =>  color.id !== id);
        this.service.toaster.success("delete a Color" , "Deleted Successfilly" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      },
      error : error => {
        console.error(error);
        this.service.toaster.error("delete a Color" , "Fail Delete Color" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      }
    });
  }
}
