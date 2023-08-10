import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { DetailsComponent } from './details/details.component';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';


@NgModule({
  declarations: [
    CheckoutComponent,
    DetailsComponent,
    ViewdetailsComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class CheckoutModule { }
