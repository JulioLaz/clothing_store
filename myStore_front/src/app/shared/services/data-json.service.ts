import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class DataJsonService {

  private dataUrl = 'assets/data.json'; // Ruta al archivo data.json

  constructor(
    private http: HttpClient,
    private firestore: Firestore
  ) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }

  ///  FIRESTORE  ///
  addProduct(product: Product) {
    const productRef = collection(this.firestore, 'product');
    return addDoc(productRef, product)
  }

  getProducts(): Observable<Product[]> {
    const productRef = collection(this.firestore, 'product');
    return collectionData(productRef, { idField: 'id' }) as Observable<Product[]>;
  }

  updateProduct(product: Product) {
    const productDocRef = doc(this.firestore, `product/${product.id}`);
    const productData = { ...product };
    // delete productData.id; // Remove the 'id' field, as it should not be updated
    return updateDoc(productDocRef, productData);
  }

  delProduct(product: Product) {
    const productDocRef = doc(this.firestore, `product/${product.id}`)
    return deleteDoc(productDocRef)
  }

}
