import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, DetailsOrder } from '../interfaces/order.interface';
import { Store } from '../interfaces/stores.interface';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private apiURL = 'http://localhost:3000';
  order:Order[]=[];

  constructor(
    private http: HttpClient,
    private firestore: Firestore
    ) { }

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiURL}/stores`)
  }

  // saveOrder(order: Order): Observable<Order> {
  //   return this.http.post<Order>(`${this.apiURL}/orders`, order);
  // }

  // saveDetailsOrder(details: DetailsOrder): Observable<DetailsOrder> {
  //   return this.http.post<DetailsOrder>(`${this.apiURL}/detailsOrders`, details);
  // }

  getOrder(): Observable<Order[]> {
    console.log('Desde service getOrder:',this.order)
    return this.http.get<Order[]>(`${this.apiURL}/orders`);
  }


  /// FIRESTORE ///
  saveOrder(order: Order) {
    const orderRef = collection(this.firestore, 'order');
    return addDoc(orderRef, order);
  }

  saveDetailsOrder(detailsOrder: DetailsOrder) {
    const detailsRef = collection(this.firestore, 'details'); // Or the appropriate collection name
    return addDoc(detailsRef, detailsOrder);
  }


}
