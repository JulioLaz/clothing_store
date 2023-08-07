import { ShoppingCartService } from './../../shared/services/shopping-cart.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { concatMap, delay, switchMap, tap, toArray } from 'rxjs/operators';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Product } from '../products/interfaces/product.interface';
import { Router } from '@angular/router';
import { ProductsService } from '../products/services/products.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  model = {
    name: 'Julio alberto',
    store: '',
    shippingAddress: '',
    city: ''
  };
  isDelivery = true;
  cart: Product[] = [];
  stores: Store[] = []

  constructor(
    private dataSvc: DataService,
    private shoppingCartSvc: ShoppingCartService,
    private router: Router,
    private productsSvc: ProductsService
  ) {
    this.checkIfCartIsEmpty();
  }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = value;
  }

  onSubmit({ value: formData }: NgForm): void {
    console.log('Guardar', formData);
    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      isDelivery: this.isDelivery
    }
    this.dataSvc.saveOrder(data)
      .pipe(
        switchMap(({ id: orderId }) => {
          const details = this.prepareDetails();
          const updateStockObservables = details.map(detail => {
            return this.productsSvc.updateStock(detail.productId, detail.updateStock);
          });
          return forkJoin(updateStockObservables).pipe(
            toArray(),
            concatMap(() => this.dataSvc.saveDetailsOrder({ details, orderId }))
          );
        }),
        tap(() => this.router.navigate(['/checkout/thank-you-page'])),
        delay(500),
        tap(() => this.shoppingCartSvc.resetCart()),
        delay(10),
        tap(() => window.location.reload()),

      )
      .subscribe();
  }

  private prepareDetails(): Details[] {
    const details: Details[] = [];
    this.cart.forEach((product: Product) => {
      const { id: productId, name: productName, qty: quantity, stock } = product;
      const updateStock = stock - quantity;
      details.push({ productId, productName, quantity, updateStock });
    });
    return details;
  }

  private getStores(): void {
    this.dataSvc.getStores().pipe(
      tap((stores: Store[]) => this.stores = stores))
      .subscribe()
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }

  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => this.cart = products)
      )
      .subscribe()
  }

  private checkIfCartIsEmpty(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => {
          if (Array.isArray(products) && !products.length) {
            this.router.navigate(['/products']);
          }
        })
      )
      .subscribe()
  }
}

