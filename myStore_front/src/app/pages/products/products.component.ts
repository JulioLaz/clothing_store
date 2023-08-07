import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product } from './interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Subscription } from 'rxjs';
import { DataJsonService } from 'src/app/shared/services/data-json.service';

@Component({
  selector: 'app-products',
  template: `
    <section class="products">
    <app-product
      (addToCartClick)="addToCart($event)"
      [product]="product"
      *ngFor="let product of filteredProducts_data"
    ></app-product>
  </section>
  `,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit,OnDestroy  {
  products: Product[] = [];
  errorMessage = '';
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  filteredProducts_data: Product[] = [];
  selectedCategory: string = 'all';
  private subscription: Subscription | undefined;

  data: Product[] = [];

  constructor(
    private shoppingCartSvc: ShoppingCartService,
    private categoryService: CategoryService,
    private datajsonservice:DataJsonService
  ) { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getProducts();
    // this.getData();

    this.subscription = this.categoryService.selectedCategory$.subscribe((category: string) => {
      if (category=='cECMkaT2TnfoSJQuDE8W'){category='1'};
      if (category=='LO4ndabS8AP2DKR25m0T'){category='3'};
      if (category=='kCh0sj4xH50V8Mrepset'){category='2'};
      this.selectedCategory = category;
      this.filterProductsByCategory_JSON(this.selectedCategory);
      console.log('CAMBIANDO CATEGORIAS desde service',this.selectedCategory);
    });
  }

  getProducts():void{
    this.datajsonservice.getProducts().subscribe(p=>{
      console.log('products desde firebase:',p)
      this.data = p;
      this.filterProductsByCategory_JSON(this.selectedCategory)

    })
  }
// obtener de data.json la DDBB:
  // getData(): void {
  //   this.datajsonservice.getData().subscribe((data) => {
  //     this.data = data.products;
  //     this.filterProductsByCategory_JSON(this.selectedCategory)
  //     console.log('Data', this.data)
  //     console.log('selectedCategory', this.selectedCategory)
  //   });
  // }

  addToCart(product: Product): void {
    console.log('Add to cart', product);
    const productToAdd = this.filteredProducts_data.find(p => p.id === product.id);
    console.log('Add to cart', product.id);
    console.log('filteredProducts', this.filteredProducts);
    console.log('productToAdd', productToAdd);

    if (productToAdd) {
      this.shoppingCartSvc.updateCart(productToAdd);
    }
  }

  filterProductsByCategory_JSON(category: string): void {
    console.log('Category: ', category)
    if (category === 'all' ) {
      this.filteredProducts_data = this.data;
      console.log('Data-producto: ', this.data)
      console.log('Category: ', category)
    } else {
      // this.filteredProducts_data = this.data.filter(p => p.categoryId);
      this.filteredProducts_data = this.data.filter(p => p.categoryId.toString() === category);
      console.log('Category: ', category)
      console.log('Data-producto: ', this.filteredProducts_data)
    }
  }

}
