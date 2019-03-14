import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { AllServiceService } from '../services/all-service.service';
import { Router } from '@angular/router';
import { PropertyServices } from '../services/property.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  showProfileData: boolean = true;
  showSalePropertyData: boolean = true;
  showRentPropertyData: boolean = true;
  showPgPropertyData: boolean = true;
  username: string;
  email: string;
  mobile: string;
  saleProperties:any=[];
  rentProperties:any=[];
  pgProperties:any=[];
  constructor(private loaderService: LoaderService, private propertyService: PropertyServices, private service: AllServiceService, private router: Router) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.service.getUserData().subscribe(
      (data) => {
        var userData = data["user"];
        this.username = userData.name;
        this.email = userData.email;
        this.mobile = userData.mobile;
        this.showProfileData = false;
        this.getSalePropertyByUser();
        this.getPgPropertyByUser();
        this.getRentPropertyByUser();
      },
      (error) => {
        this.router.navigate(['/login']);
      }
    );
  }

  getSalePropertyByUser() {
    this.propertyService.getSalePropertyByUser(this.email).subscribe(
      data => {
        console.log(data);
        this.saleProperties=data;
      },
      error => {
        console.log(error);
      },
      () => {
        this.showSalePropertyData=false;
        console.log('finally');
      }
    );
  }


  getRentPropertyByUser() {
    this.propertyService.getRentPropertyByUser(this.email).subscribe(
      data => {
        console.log(data);
        this.rentProperties=data;
      },
      error => {
        console.log(error);
      },
      () => {
        this.showRentPropertyData=false;
      }
    );
  }


  getPgPropertyByUser() {
    this.propertyService.getPgPropertyByUser(this.email).subscribe(
      data => {
        console.log(data);
        this.pgProperties=data;
      },
      error => {
        console.log(error);
      },
      () => {
        this.showPgPropertyData=false;
      }
    );
  }

}
