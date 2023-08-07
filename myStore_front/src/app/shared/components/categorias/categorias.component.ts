import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '../../interfaces/category.interface';
import { DataJsonService } from '../../services/data-json.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categorias',
  templateUrl: 'categorias.component.html',
  styleUrls: ['categorias.component.scss']
})

export class CategoriasComponent implements OnInit {
  categories: Category[] = [];
  data: Category[] = [];
  errorMessage!: string;
  categorias:any=[];
  all: string='all';

  @Output() categoriasSelected = new EventEmitter<string>();

  constructor(
    private categoryService:CategoryService,
    public dataService:DataJsonService
    ) { }

  ngOnInit(): void {
    this.getCategories();

    this.dataService.getData().subscribe((data) => {
      // this.categorias = data.categories;
      // this.data = data.categories;
      // this.filterProductsByCategory_JSON(this.selectedCategory)
      // console.log('Data-categorias', this.categorias)
    });
  }



  getCategories(): void {
    this.categoryService.getCategory().subscribe(
      (categories: Category[]) => {
        this.categorias = categories;
        console.log('CATERORY: ',this.categorias)
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
      );
    }
    selectedCategory: string | undefined; // Propiedad para almacenar la categoría seleccionada

    changeCategory(category: string): void {
      this.selectedCategory = category;
      this.categoriasSelected.emit(category);
      console.log('CATEGORIAS ID: ',this.selectedCategory)
    }

  }

