import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private selectedCategorySubject = new BehaviorSubject<string>('all'); // Default category
  public selectedCategory$: Observable<string> = this.selectedCategorySubject.asObservable();

  constructor(
    private firestore: Firestore
  ) { }

  updateCategory(category: string): void {
    // this.categorySelected = category;
    this.selectedCategorySubject.next(category);
  }

    ///  FIRESTORE  ///
    addCategory(category: Category) {
      const catRef = collection(this.firestore, 'category');
      return addDoc(catRef, category)
    }

    getCategory(): Observable<Category[]> {
      const catRef = collection(this.firestore, 'category');
      return collectionData(catRef, { idField: 'id' }) as Observable<Category[]>;
    }

    updateCategories(category: Category) {
      const catDocRef = doc(this.firestore, `category/${category.id}`);
      const catData = { ...category };
      return updateDoc(catDocRef, catData);
    }

    delCategory(category: Category) {
      const catDocRef = doc(this.firestore, `category/${category.id}`)
      return deleteDoc(catDocRef)
    }

}
