import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { DataJsonService } from 'src/app/shared/services/data-json.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  quantity: number = 0;
  total$ = this.shoppingCartSvc.totalAction$;
  cart$ = this.shoppingCartSvc.cartAction$;

  @Input() product!: Product;
  @Output() addToCartClick = new EventEmitter<Product>();

  constructor(
    private shoppingCartSvc: ShoppingCartService,
    private datajsonservice:DataJsonService,
  ) { }

  ngOnInit(): void {
    const productData = this.shoppingCartSvc.productData[this.product.id];
    if (productData) {
      this.quantity = productData.qty;
      this.product.stock = productData.stock;
    }
  }

  onClick(): void {
    this.addToCartClick.emit(this.product);
    if (this.product.stock > 0) {
      this.product.stock -= 1;
      this.quantity += 1;
      console.log("Stock",this.product.stock,this.quantity)
      this.shoppingCartSvc.productData[this.product.id] = {
        qty: this.quantity,
        stock: this.product.stock
      }
    }
  }

  async onclickDelProduc(product:Product){
  const response = await this.datajsonservice.delProduct(product)
    console.log('Response: ', response)
  }


  onUndoClick(): void {
    if (this.quantity > 0) {
      this.product.stock += this.quantity;
      this.quantity = 0;
      this.shoppingCartSvc.productData[this.product.id] = {
        qty: this.quantity,
        stock: this.product.stock
      };
      this.shoppingCartSvc.removeFromCart(this.product);
    }
  }
}


