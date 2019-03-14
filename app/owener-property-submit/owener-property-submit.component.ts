import { Component, OnInit, Input } from '@angular/core';
import { AllServiceService } from '../services/all-service.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from './mime-type.validator';
import { PropertyServices } from '../services/property.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-owener-property-submit',
  templateUrl: './owener-property-submit.component.html',
  styleUrls: ['./owener-property-submit.component.css']
})
export class OwenerPropertySubmitComponent implements OnInit {
  sale: boolean = false;
  rent: boolean = false;
  pg: boolean = false;

  bedrooms: Array<number> = [];
  balconies: Array<any> = [];
  furnishedStatus: Array<string> = [];
  setBedroomTo: any;
  setBalconiesTo: any;
  setFloorsTo: any;
  setFurnishedStatus: any;
  propertyStatus: any;

  username: string;
  email: string;
  mobile: string;
  propertyFor: string = 'sale';

  propertyTypes: Array<any>;
  selectedPropertyType: number;
  propertylocations: Array<any>;
  selectedpropertyLocation: string;
  societyName: string;
  address: string;
  totalFloors: number;
  selectedFloor: number;
  bathroomsCount: number;

  constructionAllowed: string;
  openSides: string;
  pgAvailableFor: string = 'female';
  pgOccupancy: string = 'sharing';
  pgAge: string = "0";
  pgtenants: string = "3";
  pgBathroom: string = "1";
  pgBalcony: string = "2";
  pgCommonArea: string = "1";

  propertyCoveredArea: string;
  propertyCoveredAreaUnit: string = 'ft';
  propertyCarpetArea: string;
  propertyCarpetAreaUnit: string = 'ft';
  propertyAvailabilityType: string;

  availableFromForRent: string;
  ageOfConstruction: string;
  salePropAvailableMonth: string;
  salePropAvailableYear: string;

  days: Array<number> = [];
  months: Array<String> = ['January', 'Feruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octomber', 'November', 'December'];
  years: Array<number> = [];
  year: number;
  date: Date = new Date();

  caption: string;
  parking: string;

  pgFurnishing: any = [];
  propertyPrice: number;
  propertyMainPrice: number;
  propertyOtherPrice: number;
  propertyElectricityPrice: number;
  laundryCharges: number;
  securityCharges: number;
  noticePeriod: string;
  agreeToPost: boolean = false;
  form: FormGroup;
  imagePreview: any;
  beedroom1imagePreview: any;
  beedroom2imagePreview: any;
  beedroom3imagePreview: any;
  bathroom1imagePreview: any;
  bathroom2imagePreview: any;
  bathroom3imagePreview: any;
  balcony1imagePreview: any;
  balcony2imagePreview: any;
  extraimagePreview: any;
  hallimagePreview: any;
  kitchenimagePreview: any;

  selectedPropertyTypePG: number = 5;
  propertyDesc: string;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    showClearDateBtn: false,
    editableDateField: false
  };
  public salePropAvailability: any = {
    date: {
      year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()
    },
    formatted: this.date.getDate() + "/" + (this.date.getMonth() + 1) + "/" + this.date.getFullYear()
  };

  public rentPropAvailability: any = {
    date: {
      year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()
    },
    formatted: this.date.getDate() + "/" + (this.date.getMonth() + 1) + "/" + this.date.getFullYear()
  };

  onDateChanged(event: IMyDateModel) {
    console.log(event);
  }

  constructor(private service: AllServiceService, private propertyService: PropertyServices, private router: Router, private loaderService: LoaderService) {
    for (var i = 0; i < 10; i++) {
      this.bedrooms[i] = i + 1;
      this.balconies[i] = i + 1;
    }
    for (var i = 0; i < 31; i++) {
      this.days[i] = i + 1;
    }
    this.furnishedStatus[0] = "Furnished";
    this.furnishedStatus[1] = "Unfurnished";
    this.furnishedStatus[2] = "Semi-Furnished";
    this.propertyTypes = [
      { id: 1, name: "Flat" },
      { id: 2, name: "Individual House" },
      { id: 3, name: "Villa" },
      { id: 4, name: "Multistory appartment" }
    ];
    this.selectedPropertyType = 1;
    this.totalFloors = 0;
    this.selectedFloor = 0;
    this.parking = 'no';
    this.bathroomsCount = 1;
    this.constructionAllowed = 'no';
    this.openSides = "1";
    this.propertyAvailabilityType = 'resale';
    this.propertyStatus = 'readytomove';
    this.ageOfConstruction = '0 years';
    this.availableFromForRent = 'immediate';
    this.propertylocations = [
      { id: 0, name: 'Geeta Bhavan' }
    ]
    this.year = this.date.getFullYear();
    for (var i = 0; i <= 3; i++) {
      this.years[i] = this.year + i;
    }
    this.pgFurnishing = [{
      id: 1, name: 'TV', selected: false,
    },
    {
      id: 2, name: 'AC', selected: false,
    },
    {
      id: 3, name: 'Washing Machine', selected: false,
    },
    {
      id: 4, name: 'Bed', selected: false,
    },
    {
      id: 5, name: 'Wifi', selected: false,
    },
    {
      id: 6, name: 'Cooler', selected: false,
    }
      ,
    {
      id: 7, name: 'Geyser', selected: false,
    }
      ,
    {
      id: 8, name: 'Fridge', selected: false,
    }
      ,
    {
      id: 9, name: 'Study Table', selected: false,
    }
    ];

  }

  selectFurnished(index) {
    this.setFurnishedStatus = index;
  }
  selectBedrooms(index) {
    this.setBedroomTo = index;
  }
  selectBalconies(index) {
    this.setBalconiesTo = index;
  }

  ngOnInit() {
    this.getUserDetails();
    this.setFor('sale');
    this.selectBedrooms(1);
    this.selectBalconies(1);
    this.selectFurnished('Unfurnished');
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      bedroom1: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      bedroom2: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      bedroom3: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      bathroom1: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      bathroom2: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      bathroom3: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      balcony1: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      balcony2: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      hall: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      kitchen: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      extra: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
    });


  }

  getUserDetails() {
    setTimeout(() => {
      this.loaderService.display(true);
    }, 200);
    setTimeout(() => {
      this.service.getUserData().subscribe(
        (data) => {
          this.loaderService.display(false);
          var userData = data["user"];
          this.username = userData.name;
          this.email = userData.email;
          this.mobile = userData.mobile;
        },
        (error) => {
          this.router.navigate(['/login']);
          this.loaderService.display(false);
        }
      );
    }, 1000);
  }

  setPropertyAvailabilityType(type) {
    //  this.propertyAvailabilityType = type;
  }

  setFor(prop) {
    if (prop == 'sale') {
      this.sale = true;
      this.rent = false;
      this.pg = false;
    }
    else if (prop == 'rent') {
      this.sale = false;
      this.rent = true;
      this.pg = false;
    }
    else {//pg
      this.sale = false;
      this.rent = false;
      this.pg = true;
      this.noticePeriod = "0";
    }
  }

  saveProperty() {
    if (this.agreeToPost) {
      return;
    }
    this.loaderService.display(true);
    var propertyPGObject = {};
    var propertyObject = {
      date: this.date.getDate() + "/" + (this.date.getMonth() + 1) + "/" + this.date.getFullYear(),
      propertyCaption: this.caption,
      parking: this.parking,
      email: this.email,
      mobile: this.mobile,
      propertyFor: this.propertyFor,
      propertyType: this.selectedPropertyType,
      propertyLocation: this.selectedpropertyLocation,
      societyName: this.societyName,
      address: this.address,
      propertyBedrooms: this.setBedroomTo,
      propertyBalconies: this.setBalconiesTo,
      propertyTotalFloors: this.totalFloors,
      propertyYourFloor: this.selectedFloor,
      propertyFurnishedStatus: this.setFurnishedStatus,
      propertyBathrooms: this.bathroomsCount,
      propertyCoveredArea: this.propertyCoveredArea,
      propertyCoveredAreaUnit: this.propertyCoveredAreaUnit,
      propertyCarpetArea: this.propertyCarpetArea,
      propertyCarpetAreaUnit: this.propertyCarpetAreaUnit,
      propertyPrice: this.propertyPrice,
      propertyMainPrice: this.propertyMainPrice,
      propertyOtherPrice: this.propertyOtherPrice,
      propertyDesc: this.propertyDesc,
      images: [
        { name: 'main', file: this.form.value.image },
        { name: 'bedroom1', file: this.form.value.bedroom1 },
        { name: 'bedroom2', file: this.form.value.bedroom2 },
        { name: 'bedroom3', file: this.form.value.bedroom3 },
        { name: 'bathroom1', file: this.form.value.bathroom1 },
        { name: 'bathroom2', file: this.form.value.bathroom2 },
        { name: 'bathroom3', file: this.form.value.bathroom3 },
        { name: 'balcony1', file: this.form.value.balcony1 },
        { name: 'balcony2', file: this.form.value.balcony2 },
        { name: 'hall', file: this.form.value.hall },
        { name: 'kitchen', file: this.form.value.kitchen },
        { name: 'extra', file: this.form.value.extra },
      ]
    }
    if (this.propertyFor == 'sale') {
      propertyObject["propertyConstructionAllowed"] = this.constructionAllowed;
      propertyObject["propertyOpenSides"] = this.openSides;
      propertyObject["availablility"] = this.propertyAvailabilityType;
      propertyObject["propertyStatus"] = this.propertyStatus;
      propertyObject["ageOrAvailableFrom"] = this.propertyStatus == 'readytomove' ? this.ageOfConstruction : this.salePropAvailability.formatted;
      propertyObject["dateAvailableFrom"] = this.salePropAvailability.formatted;
      this.getSaveProperty(propertyObject);
    }
    else if (this.propertyFor == 'rent') {
      propertyObject["propertyConstructionAllowed"] = 'no';
      propertyObject["propertyOpenSides"] = 0;
      propertyObject["availablility"] = this.availableFromForRent;
      propertyObject["propertyStatus"] = 'readytomove';
      propertyObject["ageOrAvailableFrom"] = this.ageOfConstruction;
      propertyObject["dateAvailableFrom"] = this.rentPropAvailability.formatted;
      this.getSaveProperty(propertyObject);
    } else {
      var pgFurnishStatus = [];
      this.pgFurnishing.forEach(element => {
        if (element.selected) {
          pgFurnishStatus.push(element.name);
        }
        else {
          pgFurnishStatus.push('');
        }
      });
      propertyPGObject = {
        date: this.date.getDate() + "/" + (this.date.getMonth() + 1) + "/" + this.date.getFullYear(),
        propertyCaption: this.caption,
        parking: this.parking,
        email: this.email,
        mobile: this.mobile,
        propertyFor: this.propertyFor,
        propertyType: this.selectedPropertyTypePG,
        propertyLocation: this.selectedpropertyLocation,
        societyName: this.societyName,
        address: this.address,
        propertyTotalFloors: this.totalFloors,
        propertyYourFloor: this.selectedFloor,
        propertyFurnishedStatus: pgFurnishStatus,
        // propertyFurnishedStatus: this.pgFurnishing,
        pgAvailableFor: this.pgAvailableFor,
        pgOccupancy: this.pgOccupancy,
        pgAge: this.pgAge,
        pgtenants: this.pgtenants,
        propertyBathrooms: this.pgBathroom,
        pgBalcony: this.pgBalcony,
        pgCommonArea: this.pgCommonArea,
        propertyPrice: this.propertyPrice,
        propertyMainPrice: this.propertyMainPrice,
        propertyElectricityPrice: this.propertyElectricityPrice,
        laundryCharges: this.laundryCharges,
        securityCharges: this.securityCharges,
        noticePeriod: this.noticePeriod,
        propertyDesc: this.propertyDesc,
        images: [
          { name: 'main', file: this.form.value.image },
          { name: 'bedroom1', file: this.form.value.bedroom1 },
          { name: 'bathroom1', file: this.form.value.bathroom1 },
          { name: 'balcony1', file: this.form.value.balcony1 },
          { name: 'extra', file: this.form.value.kitchen },
          { name: 'extra', file: this.form.value.extra },
        ]
      }
      console.log(propertyPGObject);
      this.getSavePG(propertyPGObject);
    }
  }
  getSavePG(propertyObject) {
    this.propertyService.savePGProperty(propertyObject).subscribe(data => {
      // this.router.navigate(['/dashboard/packages']);
      this.loaderService.display(false);
    }, err => {
      this.loaderService.display(false);
    })
  }
  getSaveProperty(propertyObject) {
    this.propertyService.saveProperty(propertyObject).subscribe(data => {
      // this.router.navigate(['/dashboard/packages']);
      this.loaderService.display(false);
    }, err => {
      this.loaderService.display(false);
    })
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  bedroom1ImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ bedroom1: file });
    this.form.get("bedroom1").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.beedroom1imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  bedroom2ImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ bedroom2: file });
    this.form.get("bedroom2").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.beedroom2imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  bedroom3ImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ bedroom3: file });
    this.form.get("bedroom3").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.beedroom3imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }



  bathroom1ImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ bathroom1: file });
    this.form.get("bathroom1").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.bathroom1imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  bathroom2ImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ bathroom2: file });
    this.form.get("bathroom2").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.bathroom2imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  bathroom3ImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ bathroom3: file });
    this.form.get("bathroom3").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.bathroom3imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  balcony1ImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ balcony1: file });
    this.form.get("balcony1").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.balcony1imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  balcony2ImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ balcony2: file });
    this.form.get("balcony2").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.balcony2imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }


  hallImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ hall: file });
    this.form.get("hall").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.hallimagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }


  kitchenImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ kitchen: file });
    this.form.get("kitchen").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.kitchenimagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  extraImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ extra: file });
    this.form.get("extra").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.extraimagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
