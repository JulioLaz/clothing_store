import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../interfaces/product.interface';
import { ProductsService } from '../services/products.service';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { DataJsonService } from 'src/app/shared/services/data-json.service';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.scss']
})
export class NewproductComponent implements OnInit {
  model:any = {
    id:'',
    name: '',
    price: 0,
    description: '',
    categoryId: 0,
    stock: 0,
    qty: 0,
    img:"",
    date:''
  }

  categorias: Category[] = [];
  constructor(
    private datajsonservice:DataJsonService,
    private categoryService:CategoryService,


  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  async onSubmit({ value: formData }: NgForm): Promise<void> {


    console.log('Guardar', formData);
    const data: Product = {
      ...formData,
      date: this.getCurrentDay(),
    }
    const respinseProduc = await this.datajsonservice.addProduct(data)
    console.log('Respuesta:',respinseProduc)
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }

  getCategories(): void {
    this.categoryService.getCategory().subscribe(
      (categories: Category[]) => {
        this.categorias = categories; // Asignar las categorías obtenidas del servicio
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
