import { Component, OnDestroy, OnInit } from '@angular/core';
import {EDisposeService} from '../services/e-dispose.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {DisposeDetails} from '../models/e-dispose.model';
import {RouterModule} from '@angular/router';
import { UpdateDisposeAssetRequest } from '../models/update-e-dispose.model';

@Component({
  selector: 'app-update-edispose',
  imports: [FormsModule],
  templateUrl: './update-edispose.component.html',
  styleUrl: './update-edispose.component.css'
})
export class UpdateEdisposeComponent implements OnInit , OnDestroy {


Id: string | null=null;
AssetTypeId:string | null=null;
AssetName:string | null=null;
AssetType:string | null=null;
Reason:string | null=null;
DisposedOn: string | null=null;
DisposedBy: string | null=null;
Condition:string | null=null;
DateOfIssue:string | null=null;
WarrantyDate: string | null=null;
Status:string | null=null;
 disposeDetails? : DisposeDetails;
  paramsSubscription ? : Subscription;
  updateDisposedAssetsSubscription? : Subscription;
  deleteDisposedAssetsSubscription? : Subscription;

  constructor(private route : ActivatedRoute , private router : Router , private edisposeService: EDisposeService)
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
          this.edisposeService.getDisposedAssetsById(this.Id)
          .subscribe({
      next :(response)=>{
        this.disposeDetails=response;
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

  const updateDisposedAssetRequest: UpdateDisposeAssetRequest//interface 
  =
 
  {
    Id: this.disposeDetails?.id ?? '',
    AssetTypeId: this.disposeDetails?.assetTypeId ?? '',
    AssetName: this.disposeDetails?.assetName ?? '',
    AssetType: this.disposeDetails?.assetType ?? '',
    Reason: this.disposeDetails?.reason ?? '',
    DisposedOn: this.disposeDetails?.disposedOn ?? '',
    DisposedBy: this.disposeDetails?.disposedBy ?? '',
    Condition: this.disposeDetails?.condition ?? '',
    DateOfIssue: this.disposeDetails?.dateOfIssue ?? '',
    WarrantyDate: this.disposeDetails?.warrantyDate ?? '',
    Status:this.disposeDetails?.status??'',
  };  

  //pass this object to a service
  if (this.Id)
  {
  const editDisposedAssetSubscription = this.edisposeService.updateDisposedAssets(this.Id, updateDisposedAssetRequest).subscribe({
  next : (response) => {
    this.router.navigateByUrl('api/admin/ewaste/disposable-assets');
  }
   
  }  );
  }
  }

  onDelete(): void
{
 if (this.Id)
  {
  const deleteDisposedAssetSubscription = this.edisposeService.deleteDisposedAssets(this.Id).subscribe({
  next : () =>
     {
    this.router.navigateByUrl('/admin/ewaste/disposable-assets');
    }
   
  }); } 
}

 ngOnDestroy(): void 

  {
    this.paramsSubscription?.unsubscribe();
    this.updateDisposedAssetsSubscription?.unsubscribe();
    this.deleteDisposedAssetsSubscription?.unsubscribe();
  }




  }

 




