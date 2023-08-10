import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/pages/products/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  products: Product[] = [];
productData: { [id: number]: { qty: number; stock: number } } = {};

  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

  get totalAction$(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  get quantityAction$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }

  get cartAction$(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  updateCart(product: Product): void {
    console.log('ESTOY EN CARD SERVEICE')
    this.addToCart(product);
    this.quantityProducts();
    this.calcTotal();
  }

  resetCart(): void {
    this.cartSubject.next([]);
    this.totalSubject.next(0);
    this.quantitySubject.next(0);
    this.products = [];
  }

  clearCart(): void {
    this.products = [];
    this.cartSubject.next(this.products);
    this.quantitySubject.next(0);
    this.totalSubject.next(0);
  }


  addToCart(product: Product): void {
    const isProductInCart = this.products.find(({ id }) => id === product.id);

    if (isProductInCart) {
       isProductInCart.qty += 1;
    } else {
      this.products.push({ ...product, qty: 1 });
    }

    this.cartSubject.next(this.products);
  }

  quantityProducts(): void {
    const quantity = this.products.reduce((acc, prod) => acc += prod.qty, 0);
    this.quantitySubject.next(quantity);
  }

  removeFromCart(product: Product): void {
    const index = this.products.findIndex(({ id }) => id === product.id);

    if (index !== -1) {
      this.products.splice(index, 1);
      this.cartSubject.next(this.products);
      this.quantityProducts();
      this.calcTotal();
    }
  }
  private calcTotal(): void {
    const total = this.products.reduce((acc, prod) => acc += (prod.price * prod.qty), 0);
    this.totalSubject.next(total);
  }
}
