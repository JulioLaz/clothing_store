import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Store } from '../interfaces/stores.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private firestore: Firestore
  ) { }

      ///  FIRESTORE  ///
      addStore(store: Store) {
        const catRef = collection(this.firestore, 'store');
        return addDoc(catRef, store)
      }

      getStore(): Observable<Store[]> {
        const storeRef = collection(this.firestore, 'store');
        return collectionData(storeRef, { idField: 'id' }) as Observable<Store[]>;
      }

      updateStore(store: Store) {
        const storeDocRef = doc(this.firestore, `store/${store.id}`);
        const storeData = { ...store };
        return updateDoc(storeDocRef,storeData);
      }

      delStore(store: Store) {
        const storeDocRef = doc(this.firestore, `store/${store.id}`)
        return deleteDoc(storeDocRef)
      }
}


