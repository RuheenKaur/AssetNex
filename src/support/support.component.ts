import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Support } from './models/support.model';
import { Observable } from 'rxjs';
import { SupportService } from './services/support.service';
import {Router} from '@angular/router';
import {RouterModule} from '@angular/router';



@Component({
  selector: 'app-support',
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})

export class SupportComponent implements OnInit {

  model:Support;
  myTickets:any [] = [];
   support$? : Observable<Support[]>;

  constructor(private supportService: SupportService, private router: Router)

  {

  this.model={

    id: '',
    userName: '',
    email:'',
    employeeId:'',
    department:'',
    requestType:'',
  };
  }


OnSubmit() {
console.log('Support form submitted:' , this.model);

};

 ngOnInit(): void 
   {
    this.support$=this.supportService.getAllSupport();

   }

   goToSoftware()
   {
    this.router.navigateByUrl('softwarelicense/add');
   }

    goToHardware()
   {
    this.router.navigateByUrl('assets/support/hardware');
   }

submitTicket() {
console.log('myTickets');
}

};


