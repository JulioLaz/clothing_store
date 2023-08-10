import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
// import { error } from 'console';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-editstore',
  templateUrl: './editstore.component.html',
  styleUrls: ['./editstore.component.scss']
})
export class EditstoreComponent implements OnInit {
  displayedColumns: string[] = ['name', 'address', 'city', 'openingHours','actions'];

  store: Store[] = [];
  model: any = {
    id: '',
    name: '',
    address: '',
    city: '',
    openingHours: '',
    date: ''
  }

  constructor(
    private storeservice: StoreService
  ) { }

  ngOnInit(): void {
    this.getStore();
  }

  getStore(): void {
    this.storeservice.getStore().subscribe((data: Store[]) => {
      this.store = data;
      console.log("STORES:",data)
    },
      (error) => { alert('Error: ' + error) }
    )
  }
  editStore(store: any) {
    const promise = this.storeservice.updateStore(store);
    const observable = from(promise);
    observable.subscribe(
      () =>{alert("Store edited successfully"); console.log('Producto actualizado con éxito.')},
      (error) => console.error('Error al actualizar el producto:', error)
    );
  }

  deleteStore(store: Store): void {
    this.storeservice.delStore(store).then(() => {
      alert("Store successfully removed!");
      console.log('Store eliminado con éxito.');
    }).catch((error) => {
      console.error('Error al eliminar el store:', error);
    });
  }

}
