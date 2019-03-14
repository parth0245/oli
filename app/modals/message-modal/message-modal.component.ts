import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Router } from '@angular/router';

export interface ConfirmModel {
  title: string;
  message: string;
  gotoLogin: boolean;
}

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit {
  title: string;
  message: string;
  gotoLogin: boolean = false;
  constructor(dialogService: DialogService,private router:Router) {
    super(dialogService);
  }
  confirm() {
    this.result = true;
    this.close();
  }
  ngOnInit() {

  }
  gotoLoginHandler() {
    this.router.navigate(['login']);
    this.result = true;
    this.close();
  }

}
