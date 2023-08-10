import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  store: Store[] = []

  constructor(
    private storeserveice:StoreService
    ) { }

  ngOnInit(): void {
    this.getStores()
  }

  private getStores(): void {
    this.storeserveice.getStore().subscribe(
      (store: Store[]) => {
        this.store = store;
        console.log('STORES: ',this.store)
      },
      (error) => {
        console.error('Error fetching stores:', error);
      }
      );
    }

}
