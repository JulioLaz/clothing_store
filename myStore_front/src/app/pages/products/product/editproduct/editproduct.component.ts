import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { Subscription, from } from 'rxjs';
import { DataJsonService } from 'src/app/shared/services/data-json.service';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { ProductsService } from '../../services/products.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {

  private subscription: Subscription | undefined;

  displayedColumns: string[] = ['name', 'price', 'description', 'category','img', 'stock', 'actions'];

  products: Product[] = [];
  originalProduct: any; // Store a copy of the original product
  isProductModified = false; // Flag to track changes

  errorMessage = '';
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  filteredProducts_data: Product[] = [];
  selectedCategory: number = 1000;
  // private subscription: Subscription | undefined;

  data: Product[] = [];

  // Propiedades para el formulario de edición
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    description: '',
    categoryId: 0,
    stock: 0,
    qty: 0,
    date: '',
    img:''
  };
  categories: Category[] = []; // Asegúrate de importar la interfaz Category desde el lugar correcto
  dataservicejson: any;

  constructor(
    public dataService: DataJsonService,
    private datajsonservice: DataJsonService,
    private productService:ProductsService,
    public dialog: MatDialog
  ) { }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories(); // Llamamos a la función para obtener las categorías
  }

  getProducts(): void {
    this.datajsonservice.getProducts().subscribe((p: Product[]) => {
      console.log('EDIT desde firebase:', p);
      this.data = p;
    });
  }

  getCategories(): void {
    this.productService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  editProduct(product: Product): void {
    const promise = this.datajsonservice.updateProduct(product);
    const observable = from(promise);
    observable.subscribe(
      () => console.log('Producto actualizado con éxito.'),
      (error) => console.error('Error al actualizar el producto:', error)
    );
  }

  deleteProduct(product: Product): void {
    // Elimina el producto de la base de datos utilizando el servicio correspondiente
    this.dataService.delProduct(product).then(() => {
      console.log('Producto eliminado con éxito.');
    }).catch((error) => {
      console.error('Error al eliminar el producto:', error);
    });
  }

}
