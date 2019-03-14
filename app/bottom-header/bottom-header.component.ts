import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllServiceService } from '../services/all-service.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { MessageModalComponent } from '../modals/message-modal/message-modal.component';

@Component({
  selector: 'app-bottom-header',
  templateUrl: './bottom-header.component.html',
  styleUrls: ['./bottom-header.component.css']
})
export class BottomHeaderComponent implements OnInit {

  constructor(private service: AllServiceService , private router:Router,private dialogService:DialogService) { }

  ngOnInit() {

  }
  goToSubmitProperty(){
    if(this.service.getAuthStatus()){
      this.router.navigate(['/dashboard/submit']);
    }
    else{
      let disposable = this.dialogService.addDialog(MessageModalComponent, {
        title: 'Access Denied',
        message: 'Please login to submit property details',
        gotoLogin:true
      }).subscribe((isConfirmed) => {
        if(isConfirmed){
             
        }
      });
    }
  }

}
