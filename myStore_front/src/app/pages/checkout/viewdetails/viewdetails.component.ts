import { Component, OnInit } from '@angular/core';
import { DetailsService } from 'src/app/shared/services/details.service';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.scss']
})
export class ViewdetailsComponent implements OnInit {
  data!: any;
  detalle!: any[];
  sumTotal: number=0;
  fecha: any;
  // [x: string]: any;
  constructor(
    private detailsService: DetailsService
  ) { }

  ngOnInit(): void {
    this.getDetails()
  }

  getDetails(): void {
    this.detailsService.getDetails().subscribe(
      ((data: any) => {
        this.data = data;
        // console.log('DETALLES DE COMPRA: ', this.data);

        this.data.forEach((element: any) => {
          // console.log('Product Id:', element.details);
          this.detalle = element.details;
          this.fecha = element.date;
          this.sumTotal += element.total;
          this.sumTotal=parseFloat((this.sumTotal).toFixed(2));
        });

      }
      )
    )
  }

  print() {
    window.print();
  }

}
