import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './pages/products/orders/orders.component';
// import { CategoryComponent } from './pages/products/category/category.component';
// import { StoresComponent } from './pages/products/stores/stores.component';
import { DetailsComponent } from './pages/checkout/details/details.component';
import { NewproductComponent } from './pages/products/product/newproduct.component';
import { AuthGuard } from './pages/products/product/auth.guard';
import { LoginComponent } from './pages/products/product/login.component';
import { EditproductComponent } from './pages/products/product/editproduct/editproduct.component';
import { NewcategoryComponent } from './shared/components/categorias/newcategory.component';
import { EdicionComponent } from './pages/products/edicion/edicion.component';
import { NewstoreComponent } from './pages/store/newstore/newstore.component';
import { StoreComponent } from './pages/store/store.component';
import { EditstoreComponent } from './pages/store/editstore/editstore.component';
import { EditcategoryComponent } from './shared/components/categorias/editcategory/editcategory.component';
import { ViewdetailsComponent } from './pages/checkout/viewdetails/viewdetails.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'new-product', component: NewproductComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
  },
  { path: 'checkout', loadChildren: () => import('./pages/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'order', component: OrdersComponent},
  { path: 'store', component: StoreComponent},
  { path: 'details', component: DetailsComponent},
  { path: 'viewdetails', component: ViewdetailsComponent,canActivate: [AuthGuard]},
  { path: 'newStore', component: NewstoreComponent, canActivate: [AuthGuard]},
  { path: 'editStore', component: EditstoreComponent, canActivate: [AuthGuard]},
  { path: 'newProduct', component: NewproductComponent, canActivate: [AuthGuard]},
  { path: 'category', component: NewcategoryComponent, canActivate: [AuthGuard]},
  { path: 'editCategory', component: EditcategoryComponent, canActivate: [AuthGuard]},
  { path: 'edicion', component: EdicionComponent, canActivate: [AuthGuard] },
  { path: 'editproduct', component: EditproductComponent, canActivate: [AuthGuard] },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
