import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  stores: Store[] = []
  constructor(private dataSvc:DataService) { }

  ngOnInit(): void {
    this.getStores()
  }

  private getStores(): void {
    this.dataSvc.getStores().pipe(
      tap((stores: Store[]) => this.stores = stores))
      .subscribe()
  }

}
