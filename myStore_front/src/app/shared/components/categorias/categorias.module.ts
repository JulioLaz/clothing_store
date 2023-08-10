import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasComponent } from './categorias.component'; // Asegúrate de importar correctamente el componente
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ProductComponent } from 'src/app/pages/products/product/product.component';
import { HeaderComponent } from '../header/header.component';
import { NewcategoryComponent } from './newcategory.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';

@NgModule({
  declarations: [CategoriasComponent, NewcategoryComponent, EditcategoryComponent],
  imports: [
    CommonModule,
    CategoriasModule,
    CategoriasComponent,
    ProductsComponent,
    ProductComponent,
    HeaderComponent
  ],
  exports: [CategoriasComponent]
})
export class CategoriasModule { }

