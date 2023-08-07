import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  errorMessage!: string;
  ordenes:any=[];
  
  constructor(
    private dataService:DataService
  ) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(): void {
    this.dataService.getOrder().subscribe(
      (order: Order[]) => {
        this.orders.push(order[2]);
        this.errorMessage = '';
        this.ordenes=order;
        console.log('ordenes:',this.ordenes)// Limpia el mensaje de error en caso de éxito
      },
      (error) => {
        this.errorMessage = 'Error al cargar las órdenes. Por favor, intenta de nuevo más tarde.';
        console.error('Error al obtener órdenes:', error);
      }
    );
  }

}
