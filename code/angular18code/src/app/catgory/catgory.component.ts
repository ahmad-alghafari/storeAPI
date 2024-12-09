import { Component , inject} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Category } from '../shared/category.model';
import { Controller } from '../services/controller.service';

@Component({
  selector: 'app-catgory',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './catgory.component.html',
  styleUrl: './catgory.component.css',
})
export class CatgoryComponent  {

  service = inject(Controller);
  filterCategories : any[] = [];

  constructor (){}

  ngOnInit(): void {
    this.service.categories$.subscribe((categories) => {
      this.filterCategories = [...categories];
    });
  }

  search(data:any){
    const dataLC : any = data.toLowerCase();
    this.filterCategories = this.filterCategories.filter(category => 
      category.name.toLowerCase().includes(dataLC) || 
      category.name.toLowerCase().includes(dataLC)
    );
  }

  create(form: NgForm){
    if(form.valid){
      this.service.post(this.service.URLs.categoriesApiUrl , this.service.categoryFormData)
      .subscribe({
        next : response  => {
          const updatedCategories = [...this.service.categories , (response as Category)];
          this.service.categories = updatedCategories;

          console.log(response);
          this.service.resetCategory(form);
          this.service.toaster.success("Added Successfully", "Fine" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        },
        error : error => {
          console.error(error);
          this.service.toaster.error("add a category" , "Fail Delete Category" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        }
      });
    }
  }

  destroy(id:any){
    this.service.delete(this.service.URLs.categoriesApiUrl ,id).subscribe({
      next : response => {
        // this.service.categories = this.service.categories.filter(category => category.id !== id);
        this.filterCategories =  this.filterCategories.filter(category => category.id !== id);
        this.service.toaster.success("delete a category" , "Deleted Successfilly" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      },
      error : error => {
        console.error(error);
        this.service.toaster.error("delete a category" , "Fail Delete Category" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      }
    });
  }

  update(form : NgForm){
    this.service.put(this.service.URLs.categoriesApiUrl , this.service.categoryFormDataUpdate.id , this.service.categoryFormDataUpdate).subscribe({
      next : data => {
        const index = this.service.categories.findIndex(category => category.id === this.service.categoryFormDataUpdate.id);
        // const indexx = this.filterCategories.findIndex(category => category.id === this.service.categoryFormDataUpdate.id);
        if (index !== -1) {
          const updatedCategories = [...this.service.categories];
          updatedCategories[index] = {
            ...this.service.categoryFormDataUpdate,
            updatedAt: this.service.getCustomFormattedDate(),
          };
          this.service.categories = updatedCategories;
        }
        // if (indexx !== -1) {
        //   this.filterCategories[indexx] = this.service.categoryFormDataUpdate;
        // }
        this.service.toaster.success("update a category" , "Updated Successfilly" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      },
      error : error => {
        console.error(error);
        this.service.toaster.error("update a category" , "Fail Update Category" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      },complete: () => {
        this.service.resetCategory(form);
      }
    });
  }
}
