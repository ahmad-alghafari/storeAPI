import { Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { CatgoryComponent } from './catgory/catgory.component';
import { TagsComponent } from './tags/tags.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductsComponent } from './products/products.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ShowproductComponent } from './showproduct/showproduct.component';
import { AddproductpropartiesComponent } from './addproductproparties/addproductproparties.component';
import { ColorsComponent } from './colors/colors.component';
import { ShowproductsComponent } from './showproducts/showproducts.component';

export const routeNames = {
    home: '',
    categories: 'admin/categories',
    tags: 'admin/tags',
    brands: 'admin/brands',
    products: 'admin/products',
    showProduct: 'admin/product/:id',
    showProducts : 'products',
    createProduct: 'admin/create/product',
    productProperties: 'admin/product/proparties/:id',
    colors: 'admin/colors',
    
    notFound: '**',
};

export const routes: Routes = [
    { path : routeNames.home , redirectTo :routeNames.products , pathMatch : 'full' },
    { path: routeNames.categories, component: CatgoryComponent },
    { path: routeNames.tags, component: TagsComponent },
    { path: routeNames.brands, component: BrandsComponent },
    { path: routeNames.colors, component: ColorsComponent },
    { path: routeNames.products, component: ProductsComponent },
    { path: routeNames.showProduct, component: ShowproductComponent },
    { path: routeNames.createProduct, component: AddproductComponent },
    { path: routeNames.productProperties, component: AddproductpropartiesComponent },
    { path: routeNames.showProducts, component: ShowproductsComponent },

    {path : routeNames.notFound , component : NotfoundComponent}
];

