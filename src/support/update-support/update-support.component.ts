import { Component, OnInit } from '@angular/core';
import {SupportService} from '../services/support.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {Support} from '../models/support.model';
import {RouterModule} from '@angular/router';
import { updateSupport } from '../models/updateSupport.model';

@Component
({
  selector: 'app-update-support',
  imports: [FormsModule],
  templateUrl: './update-support.component.html',
  styleUrl: './update-support.component.css'
})


export class UpdateSupportComponent implements OnInit {

id:string| null=null;
userName: string | null=null;
email:string | null=null;
employeeId :string | null=null;
department:string | null=null;
requestType:string | null=null;
support? : Support;
supports: Support[]=[];
paramsSubscription ? : Subscription;
updateSupportSubscription? : Subscription;
deleteSupportSubscription? : Subscription;

  constructor(private route : ActivatedRoute , private router : Router , private supportService: SupportService)
  {}

  OnFormSubmit(): void 
  {}


   ngOnInit(): void {
   this. paramsSubscription= this.route.paramMap.subscribe({
    next :(params)=>
    {this. id=  params.get('id');

        if (this.id){
          this.supportService.getSupportById(this.id)
          .subscribe({
      next :(response)=>{
        this.supports= response;
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

  const updateSupport: updateSupport//interface 
  =
 
  {
    id: this.support?.id ?? '',
    userName: this.support?.userName ?? '',
    email: this.support?.email?? '',
    employeeId: this.support?.employeeId ?? '',
    department:this.support?.email??'',
    requestType:this.support?.email??
'',   
  };

  //pass this object to a service
  if (this.id)
  {
  const editSupportSubscription = this.supportService.updateSupport(this.id, updateSupport).subscribe({
  next : (response) => 
  {
    this.router.navigateByUrl('api/admin/assets/softwae-license/update');
  }
   
  }  );
  }
  }


  onDelete(): void
{
 if (this.id)
  {
  const deleteSupportSubscription = this.supportService.deleteSupport(this.id).subscribe({
  next : () =>
     {
    this.router.navigateByUrl('/api/admin/assets/software-license/update');
    }
   
  }); } 
}

 ngOnDestroy(): void 

  {
    this.paramsSubscription?.unsubscribe();
    this.updateSupportSubscription?.unsubscribe();
    this.deleteSupportSubscription?.unsubscribe();
  }
  }






