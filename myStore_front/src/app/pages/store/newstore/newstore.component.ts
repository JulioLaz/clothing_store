import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-newstore',
  templateUrl: './newstore.component.html',
  styleUrls: ['./newstore.component.scss']
})
export class NewstoreComponent implements OnInit {
  model:any = {
    id:'',
    name: '',
    address: '',
    city:'',
    openingHours:'',
    date:''
  }

  constructor(
    private storeservice:StoreService,
  ) { }

  ngOnInit(): void {
  }

  async onSubmit({ value: formData }: NgForm): Promise<void> {

    console.log('Guardar', formData);
    const data: Store = {
      ...formData,
      date: this.getCurrentDay(),
    }
    const respinseProduc = await this.storeservice.addStore(data)
    console.log('Respuesta:',respinseProduc)
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }
}
