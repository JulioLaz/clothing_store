import { ShoppingCartService } from './../../shared/services/shopping-cart.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { concatMap, delay, switchMap, tap, toArray } from 'rxjs/operators';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { Details, DetailsOrder, Order } from 'src/app/shared/interfaces/order.interface';
import { Product } from '../products/interfaces/product.interface';
import { Router } from '@angular/router';
import { ProductsService } from '../products/services/products.service';
import { StoreService } from 'src/app/shared/services/store.service';
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
  stores: Store[] = [];
  total!: number;

  constructor(
    private dataSvc: DataService,
    private shoppingCartSvc: ShoppingCartService,
    private router: Router,
    private productsSvc: ProductsService,
    private storeserveice: StoreService,
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

  // onSubmit({ value: formData }: NgForm): void {
  //   console.log('Guardar', formData);
  //   const data: Order = {
  //     ...formData,
  //     date: this.getCurrentDay(),
  //     isDelivery: this.isDelivery
  //   }
  //   this.dataSvc.saveOrder(data)
  //     .pipe(
  //       switchMap(({ id: orderId }) => {
  //         const details = this.prepareDetails();
  //         const updateStockObservables = details.map(detail => {
  //           return this.productsSvc.updateStock(detail.productId, detail.updateStock);
  //         });
  //         return forkJoin(updateStockObservables).pipe(
  //           toArray(),
  //           concatMap(() => this.dataSvc.saveDetailsOrder({ details, orderId }))
  //         );
  //       }),
  //       tap(() => this.router.navigate(['/checkout/thank-you-page'])),
  //       delay(500),
  //       tap(() => this.shoppingCartSvc.resetCart()),
  //       delay(10),
  //       tap(() => window.location.reload()),

  //     )
  //     .subscribe();
  // }

  onSubmit({ value: formData }: NgForm): void {
    console.log('Guardar', formData);
    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      isDelivery: this.isDelivery
    };

    this.dataSvc.saveOrder(data)
      .then(({ id: orderId }) => {
        const details = this.prepareDetails();
        const total = details.reduce((acc, detail) => acc + detail.total_purchase_value, 0);
        const date= this.getCurrentDay();

        const updateStockPromises = details.map(detail => {
          return this.productsSvc.updateStock(detail.productId, detail.updateStock);
        });
        return Promise.all(updateStockPromises)

          .then(() => {
            const detailsOrder: DetailsOrder = {
              details,
              orderId,
              total,
              date
            };
            return this.dataSvc.saveDetailsOrder(detailsOrder);
          });
      })
      .then(() => {
        this.router.navigate(['/checkout/thank-you-page']);
        return Promise.resolve();
      })
      .then(() => {
        return new Promise<void>(resolve => {
          setTimeout(() => {
            this.shoppingCartSvc.resetCart();
            resolve();
          }, 500);
        });
      })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 10);
      })
      .catch(error => {
        console.error('Error en el proceso:', error);
      });
  }


  private prepareDetails(): Details[] {
    const details: Details[] = [];
    this.cart.forEach((product: Product) => {
      const { id: productId, name: productName, qty: quantity, stock, price } = product;
      const updateStock = stock - quantity;
      const total_purchase_value = parseFloat((quantity * price).toFixed(2));
      details.push({ productId, productName, quantity, updateStock, price, total_purchase_value });
    });
    return details;
  }

  private getStores(): void {
    this.storeserveice.getStore().pipe(
      tap((stores: Store[]) => this.stores = stores))
      .subscribe()
  }
  // private getStores(): void {
  //   this.dataSvc.getStores().pipe(
  //     tap((stores: Store[]) => this.stores = stores))
  //     .subscribe()
  // }

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

