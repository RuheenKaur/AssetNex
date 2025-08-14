import { Component, OnDestroy, OnInit } from '@angular/core';
import { SoftwareLicenseService } from '../services/software.service';
import {FormsModule} from '@angular/forms';
import { Subscription } from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {UpdateSoftwareLicenseRequest} from '../models/update-software-license.model';
import {Router} from '@angular/router';
import { SoftwareLicense } from '../models/software-model';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-update-software-license',
  imports: [CommonModule,FormsModule],
  templateUrl: './update-software-license.component.html',
  styleUrl: './update-software-license.component.css'
})
export class UpdateSoftwareLicenseComponent implements OnDestroy,OnInit {

    Id: string | null=null;
    UserName: string | null=null;
    Request: string | null=null;
    EmployeeId: string | null=null;
    SoftwareName:string | null=null;
    OtherSoftware:string | null=null;
    DateApplied:string | null= null;

  softwareLicense? : SoftwareLicense;
  paramsSubscription ? : Subscription;
  updateSoftwareLicenseSubscription? : Subscription;
  deleteSoftwareLicenseSubscription? : Subscription;

  constructor(private route : ActivatedRoute , private router : Router , private softwareLicenseService: SoftwareLicenseService)
  {

  }

  OnFormSubmit(): void 
  {
     
  }

     ngOnInit(): void {
   this. paramsSubscription= this.route.paramMap.subscribe({
      next :(params)=>
        {this. Id=  params.get('id');

        if (this.Id){
          this.softwareLicenseService.getSoftwareLicenseById(this.Id)
          .subscribe({
      next :(response)=>{
        this.softwareLicense=response;
      }
        });
      }
    }
        });
      }
  onSubmit(): void

  {

  // console.log(this.assets);
  // console.log ('Submitted asset: ' + this.assets;

  const updateSoftwareLicenseRequest : UpdateSoftwareLicenseRequest//interface 
  =
 
  {
 
    Id: this.softwareLicense?.Id??'',
    UserName: this.softwareLicense?.UserName??'',
    Request: this.softwareLicense?.Request??'',
    EmployeeId: this.softwareLicense?.EmployeeId??'',
    SoftwareName:this.softwareLicense?.SoftwareName??'',
    OtherSoftware:this.softwareLicense?.OtherSoftware??'',
    DateApplied: this.softwareLicense?.DateApplied??'',

  };

  //pass this object to a service
  if (this.Id)
  {
  const editSoftwareLicenseSubscription = this.softwareLicenseService.updateSoftwareLicense(this.Id, updateSoftwareLicenseRequest).subscribe({
  next : (response) => {
    this.router.navigateByUrl('/assets/software-license');
  }
   
  }  );
  }
  }

  onDelete(): void
{
 if (this.Id)
  {
  const deleteSoftwareLicenseSubscription = this.softwareLicenseService.deleteSoftwareLicense(this.Id).subscribe({
  next : () =>
     {
    this.router.navigateByUrl('/assets/software-license');
    }
  }); } 
}

 ngOnDestroy(): void 

  {
    this.paramsSubscription?.unsubscribe();
    this.updateSoftwareLicenseSubscription?.unsubscribe();
    this.deleteSoftwareLicenseSubscription?.unsubscribe();
  }

goToSoftwareLicense()
{
  this.router.navigateByUrl('/assets/software-license');
}


  }


 




