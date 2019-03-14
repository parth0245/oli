import { Component, OnInit } from '@angular/core';
import { PropertyServices } from '../services/property.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  saleProperty:any=[];
  rentProperty:any=[];
  PGProperty:any=[];
  constructor(private propertyService:PropertyServices) { }

  ngOnInit() {
    this.getFeaturedSaleProperty();
    this.getFeaturedRentProperty();
    this.getFeaturedPGProperty();
  }

  getFeaturedSaleProperty(){
    this.propertyService.getAllSaleProperties().subscribe(data=>{
      console.log(data);
      this.saleProperty=data;
    },error=>{
      console.log(error);
    });
  }

  getFeaturedRentProperty(){
    this.propertyService.getAllRentProperties().subscribe(data=>{
      console.log(data);
      this.rentProperty=data;
    },error=>{
      console.log(error);
    });
  }

  getFeaturedPGProperty(){
    this.propertyService.getAllPGProperties().subscribe(data=>{
      console.log(data);
      this.PGProperty=data;
    },error=>{
      console.log(error);
    });
  }

}
