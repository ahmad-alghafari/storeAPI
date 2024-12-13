import { Component, inject } from '@angular/core';
import { Tag } from '../shared/tag';
import { NgForm , FormsModule } from '@angular/forms';
import { Controller } from '../services/controller.service';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})

export class TagsComponent {
  service = inject(Controller);
  filterTags : any[] = [];

  ngOnInit(): void {
    this.service.tags$.subscribe((tags) => {
      this.filterTags = [...tags];
    });
  }

  search(data:any){
    const searchTerm : any = data.toLowerCase();
    this.service.tags$.subscribe((tags) => {
      this.filterTags = tags.filter(tag => 
        tag.name.toLowerCase().includes(searchTerm) ||
        tag.description.toLowerCase().includes(searchTerm)
      );
    });
  }
  

  create(form: NgForm){
    if(form.valid){
      this.service.post(this.service.URLs.tagsApiUrl , this.service.tagFormData).subscribe({
        next : response  => {

          const updatedTags = [(response as Tag) , ...this.service.tags];
          this.service.tags = updatedTags ;

          console.log(response);
          this.service.resetTag(form);
          this.service.toaster.success("Added Successfully", "Fine" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        },
        error : error => {
          console.error(error);
          this.service.toaster.error("add a tag" , "Fail Delete Tag" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        }
      });
    }
  }

  destroy(id:any){
    this.service.delete(this.service.URLs.tagsApiUrl , id).subscribe({
      next : () => {
        this.service.tags =  this.service.tags.filter(tag => tag.id !== id);
        this.service.toaster.success("delete a tag" , "Deleted Successfilly" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      },
      error : error => {
        console.error(error);
        this.service.toaster.error("delete a tag" , "Fail Delete Tag" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
      }
    });
  }

  update(form : NgForm){
    this.service.put(this.service.URLs.tagsApiUrl , this.service.tagFormDataUpdate.id , this.service.tagFormDataUpdate).subscribe({
      next : () => {
        const index = this.service.tags.findIndex(tag => tag.id === this.service.tagFormDataUpdate.id);
        this.service.tagFormDataUpdate.updatedAt = this.service.getCustomFormattedDate();
        if (index !== -1) {
          this.service.tags[index] = {
            ...this.service.tagFormDataUpdate
          };
        }
        this.service.toaster.success("update a tag" , "Updated Successfilly" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        this.service.resetTag(form);
      },
      error : error => {
        console.error(error);
        this.service.toaster.error("update a tag" , "Fail Update Tag" , {progressBar: true , progressAnimation : 'increasing' , positionClass : 'toast-bottom-right'});
        this.service.resetTag(form);
      }
    });
  }
}
