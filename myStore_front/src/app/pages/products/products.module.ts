import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';

import { MaterialModule } from './../../material.module';
import { OrdersComponent } from './orders/orders.component';
import { StoresComponent } from './stores/stores.component';
import { NewproductComponent } from './product/newproduct.component';
import { FormsModule } from '@angular/forms';
import { EditproductComponent } from './product/editproduct/editproduct.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { EdicionComponent } from './edicion/edicion.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    OrdersComponent,
    // CategoryComponent,
    StoresComponent,
    NewproductComponent,
    EditproductComponent,
    EdicionComponent,
    // NewcategoryComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    FormsModule,
    MatTableModule,
    MatDialogModule

  ]
})
export class ProductsModule { }
