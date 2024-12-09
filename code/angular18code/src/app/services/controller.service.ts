import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Productpost } from '../shared/productpost';
import { Product } from '../shared/product';
import { Categorypost } from '../shared/categorypost';
import { Category } from '../shared/category.model';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../shared/brand';
import { Tag } from '../shared/tag';
import { routeNames } from '../app.routes';
import { Tagpost } from '../shared/tagpost';
import { Brandpost } from '../shared/brandpost';
import { SpecificationPost } from '../shared/specification-post';
import { Specification } from '../shared/specification';
import { Colorpost } from '../shared/colorpost';
import { Savedcolorpost } from '../shared/savedcolorpost';

@Injectable({
  providedIn: 'root'
})

export class Controller {
  routeNames = routeNames;
  URLs = environment;
  toaster = inject(ToastrService);
  http = inject(HttpClient);

  productFormData : Productpost = new Productpost();
  productFormDataUpdate : Product  = new Product();

  categoryFormData : Categorypost = new Categorypost();
  categoryFormDataUpdate : Category = new Category();

  tagFormData : Tagpost = new Tagpost();
  tagFormDataUpdate : Tag =  new Tag();

  brandFormData : Brandpost = new Brandpost();
  brandFormDataUpdate : Brand =  new Brand();

  specificationFormData : SpecificationPost = new SpecificationPost();
  specificationFormDataUpdate : Specification = new Specification();

  colorFormData : Colorpost = new Colorpost();
  savedColorFormData : Savedcolorpost = new Savedcolorpost();

 //--

  categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  get categories(): Category[] {
    return this.categoriesSubject.getValue();
  }

  set categories(newCategorie: Category[]) {
    this.categoriesSubject.next(newCategorie); 
  }

  private brandsSubject = new BehaviorSubject<Brand[]>([]);
  brands$ = this.brandsSubject.asObservable();

  get brands(): Brand[] {
    return this.brandsSubject.getValue();
  }

  set brands(newbrand: Brand[]) {
    this.brandsSubject.next(newbrand); 
  }
    

  private tagsSubject = new BehaviorSubject<Tag[]>([]);
  tags$ = this.tagsSubject.asObservable();

  get tags(): Tag[] {
    return this.tagsSubject.getValue();
  }

  set tags(newTag : Tag[]){
    this.tagsSubject.next(newTag);
  }

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  get products(): Product[] {
    return this.productsSubject.getValue();
  }

  set products(newProduct : Product[]){
    this.productsSubject.next(newProduct);
  }

  private savedColorsSubject = new BehaviorSubject([]);
  savedColors$ = this.savedColorsSubject.asObservable();

  get savedColors(): any[] {
    return this.productsSubject.getValue();
  }

  set savedColors(newColor : []){
    this.savedColorsSubject.next(newColor);
  }



  preparation(){
    this.getAll(this.URLs.categoriesApiUrl).subscribe({
      next : response => {
        this.categoriesSubject.next(response),
        console.log('Categories:', response);
      } , error : error =>{
        console.error('Error fetching categories:', error);
      }
    });

    this.getAll(this.URLs.brandsApiUrl).subscribe({
      next : response => {
        this.brandsSubject.next(response);
        console.log('Brands :', response);
      } , error : error =>{
        console.error('Error fetching Brands:', error);
      }
    });

    this.getAll(this.URLs.tagsApiUrl).subscribe({
      next : response => {
        this.tagsSubject.next(response);
        console.log('Tags :', response);
      } , error : error =>{
        console.error('Error fetching tags:', error);
      }
    });

    this.getAll(this.URLs.productsApiUrl).subscribe({
      next : response => {
        this.productsSubject.next(response)
        console.log('products :', response);
      } , error : error =>{
        console.error('Error fetching products:', error);
      }
    });

    this.getAll(this.URLs.savedcolorsApiUrl).subscribe({
      next : response => {
        this.savedColorsSubject.next(response)
        console.log('savedColors :', response);
      } , error : error =>{
        console.error('Error fetching savedColors:', error);
      }
    });
  }

  get(url:string ,id : string  ){
    return this.http.get( url + "/" + id).pipe(catchError(this.handleError)); 
  }

  getAllCounts(url:string): Observable<any> {
    return this.http.get(url + "/count/10").pipe(catchError(this.handleError)); 
  }

  getAll(url:string): Observable<any> {
    return this.http.get(url).pipe(catchError(this.handleError)); 
  }

  post(url:string , object : any) {
    return this.http.post(url , object).pipe(catchError(this.handleError)); 
  }

  put(url:string , id :string ,object : any ) {
    return this.http.put(url + "/" + id, object).pipe(catchError(this.handleError)); 
  }
  
  delete(url:string , id : string){
    return this.http.delete(url +'/'+ id).pipe(catchError(this.handleError));
  }

  putProductStatus(id:string , attribute : string , status : string , product : any){
    return this.http.put(this.URLs.productsApiUrl + "/" + id  + '/' + attribute + '/' + status ,product ).pipe(catchError(this.handleError)); 
  }


  private handleError(error: any) {
    console.error('An error occurred:', error); 
    if (error.error && typeof error.error === 'string') {
      return throwError(() => new Error(error.error));
    } else if (error.message) {
      return throwError(() => new Error(error.message));
    } else {
      return throwError(() => new Error('An unknown error occurred.'));
    }
  }

  getCustomFormattedDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(6, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  timeAgo(inputDate: string | Date): string {
    const parsedDate = new Date(inputDate);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(inputDate).getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `since ${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `since ${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `since ${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `since ${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `since ${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `since ${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  }

  resetProduct(form :NgForm){
    form.form.reset();
    this.productFormData = new Productpost();
    this.productFormDataUpdate = new Product();
  }

  resetCategory(form :NgForm){
    form.form.reset();
    this.categoryFormDataUpdate = new Category();
    this.categoryFormData = new Categorypost();
  }

  resetTag(form :NgForm){
    form.form.reset();
    this.tagFormData = new Tagpost();
    this.tagFormDataUpdate = new Tag();
  }

  resetBrand(form :NgForm){
    form.form.reset();
    this.brandFormData = new Brandpost();
    this.brandFormDataUpdate = new Brand();
  }

  resetSavedColor(form :NgForm){
    form.form.reset();
    this.savedColorFormData = new Savedcolorpost();
  }

  resetColor(form :NgForm){
    form.form.reset();
    this.colorFormData = new Colorpost();
  }

  resetSpecification(form :NgForm){
    form.form.reset();
    this.specificationFormData = new SpecificationPost();
    this.specificationFormDataUpdate = new Specification();
  }

  //--
  setCategoryFormDataUpdate(category : Category){
    this.categoryFormDataUpdate = category
  }

  setTagFormUpdate(tag : Tag){
    this.tagFormDataUpdate = tag; 
  }

  setProductFormDataUpdate(product : Product){
    this.productFormDataUpdate = product;
  }

  setBrandFormDataUpdate(category: Brand) {
    this.brandFormDataUpdate = category;
  }

  setSpecificationFormDataUpdate(Specification : Specification){
    this.specificationFormDataUpdate = Specification;
  }

  
}