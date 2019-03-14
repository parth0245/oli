import { Component, OnInit } from '@angular/core';
import { AllServiceService } from '../services/all-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../register/register.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  mobile: string;
  password: string;

  constructor(public service: AllServiceService) { }

  ngOnInit() {

  }
  login(form) {
    this.service.login(this.email, this.password);
  }

}
