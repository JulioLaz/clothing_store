import { CartComponent } from './shared/components/cart/cart.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductsModule } from './pages/products/products.module';
import { CategoriasComponent } from './shared/components/categorias/categorias.component';
import { CategoryService } from './shared/services/category.service';
import { ProductsService } from './pages/products/services/products.service';
import { LoginComponent } from './pages/products/product/login.component';
import { MatButtonModule } from '@angular/material/button';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { MatTableModule } from '@angular/material/table';
import { NewcategoryComponent } from './shared/components/categorias/newcategory.component';
import { NewstoreComponent } from './pages/store/newstore/newstore.component';
import { StoreComponent } from './pages/store/store.component';
import { EditstoreComponent } from './pages/store/editstore/editstore.component';
import { EditcategoryComponent } from './shared/components/categorias/editcategory/editcategory.component';
// import { ViewdetailsComponent } from './pages/checkout/viewdetails/viewdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    CategoriasComponent,
    NewcategoryComponent,
    EditcategoryComponent,
    LoginComponent,
    NewstoreComponent,
    StoreComponent,
    EditstoreComponent,
    // ViewdetailsComponent

 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProductsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())

  ],
  exports:[HeaderComponent],
  providers: [CategoryService,ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
