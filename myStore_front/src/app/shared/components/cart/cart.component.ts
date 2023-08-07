import { Component } from "@angular/core";
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
@Component({
  selector: 'app-cart',
  template: `
  <ng-container *ngIf="{ total: total$ | async, quantity: quantity$ | async } as dataCart">
    <ng-container>
      <button mat-flat-button style="display: flex;">
        <mat-icon  >add_shopping_cart</mat-icon>
        <span *ngIf="dataCart.total">
            {{dataCart.total | currency}}
            ({{dataCart.quantity}})
        </span>
      </button>
    </ng-container>
  </ng-container>`
})
export class CartComponent {

  quantity$ = this.shoppingCartSvc.quantityAction$;
  total$ = this.shoppingCartSvc.totalAction$;
  constructor(private shoppingCartSvc: ShoppingCartService) { }
}
