import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.scss']
})
export class EditcategoryComponent implements OnInit {
  categorias: Category[] = [];

  displayedColumns: string[] = ['name','actions'];


  constructor(
   private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategory().subscribe(
      (categorias: Category[]) => {
        this.categorias = categorias;
        console.log('CATERORY: ',this.categorias)
      },
      (error) => {
        console.error('Error fetching categorias:', error);
      }
      );
    }
  editCategory(category: any) {
    const promise = this.categoryService.updateCategories(category);
    const observable = from(promise);
    observable.subscribe(
      () =>{alert("category edited successfully"); console.log('Producto actualizado con éxito.')},
      (error) => console.error('Error al actualizar el producto:', error)
    );
  }

  deleteCategory(category: Category): void {
    this.categoryService.delCategory(category).then(() => {
      alert("category successfully removed!");
      console.log('category eliminado con éxito.');
    }).catch((error) => {
      console.error('Error al eliminar el category:', error);
    });
  }
  }
