import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/pages/products/services/products.service';
import { Category } from '../../interfaces/category.interface';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-newcategory',
  templateUrl: './newcategory.component.html',
  styleUrls: ['./newcategory.component.scss']
})
export class NewcategoryComponent implements OnInit {

  model:any = {
    id:'',
    name: ''
  }

  categorias: Category[] = [];
  constructor(
    private productsService: ProductsService,
    private categoryService:CategoryService

  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  async onSubmit({ value: formData }: NgForm): Promise<void> {
    console.log('Guardar', formData);
    const data: Category = {...formData}
    const responseCat = await this.categoryService.addCategory(data)
    console.log('Respuesta:',responseCat)
  }

  getCategories(): void {
    this.productsService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categorias = categories; // Asignar las categorías obtenidas del servicio
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
