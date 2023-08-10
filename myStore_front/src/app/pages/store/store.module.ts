import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditstoreComponent } from './editstore/editstore.component';
import { NewstoreComponent } from './newstore/newstore.component';
import { StoreComponent } from './store.component';



@NgModule({
  declarations: [
EditstoreComponent,
NewstoreComponent,
StoreComponent

  ],
  imports: [
    CommonModule
  ],
  exports:[
    NewstoreComponent,
    StoreComponent,
    EditstoreComponent
  ]
})
export class StoreModule { }
