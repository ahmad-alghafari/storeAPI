import { Brand } from "./brand";
import { Category } from "./category.model";
import { Tag } from "./tag";
import { Image } from "./image";
import { Specification } from "./specification";
import { Color } from "./color";


export class Product {
    id = "";
    name = "";
    description = "";
    brandId ="";
    categoryId ="";
    price=0;
    availability="";
    new="";
    show="";
    createdAt ='';
    updatedAt ='';
    details : Specification[] = [];
    warranty = [];
    tags : any[] = [];
    colors  : Color[]= [];
    images : Image[] = [];
    brand : Brand = new Brand();
    category : Category = new Category();
}
