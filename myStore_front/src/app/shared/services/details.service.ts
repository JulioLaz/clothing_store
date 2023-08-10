import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { DetailsOrder } from '../interfaces/order.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(
    private firestore:Firestore
  ) { }

  getDetails(): Observable<DetailsOrder[]> {
    const detailsRef = collection(this.firestore, 'details');
    return collectionData(detailsRef, { idField: 'id' }) as Observable<DetailsOrder[]>;
  }
}
