import { Component, OnDestroy, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription} from 'rxjs';
import { ActivatedRoute} from '@angular/router';
import { Assets } from '../models/inventory-model';
import { UpdateAssetRequest} from '../models/update-assets-model';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-update-asset',
  imports: [FormsModule],
  templateUrl: './update-asset.component.html',
  styleUrl: './update-asset.component.css'
})
export class UpdateAssetComponent implements OnDestroy,OnInit {


  id : string | null=null;
  Name: string | null= null;
  SerialNumber : string | null=null;
  Department : string | null=null;
  DateOfIssue: string | null=null;
  WarrantyDate :string | null=null;
  UserId: string |null= null;
  User : string | null=null;
  Status: string | null=null;
   AssetTypeId : string | null= null;
  AssetType : string | null=null;
  assets? : Assets;
  paramsSubscription ? : Subscription;
  updateAssetsSubscription? : Subscription;
  deleteAssetsSubscription? : Subscription;

  constructor(private route : ActivatedRoute , private router : Router , private inventoryService: InventoryService)
  {

  }

  OnFormSubmit(): void 
  {
     
  }

     ngOnInit(): void {
   this. paramsSubscription= this.route.paramMap.subscribe({
      next :(params)=>
        {this. id=  params.get('id');

        if (this.id){
          this.inventoryService.getAssetById(this.id)
          .subscribe({
      next :(response)=>{
        this.assets=response;
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

  const updateCategoryRequest: UpdateAssetRequest = 
  {
    id: this.assets?. id ?? '',
    Name : this.assets?.name ?? '' , 
    SerialNumber: this.assets?.serialNumber ?? '',
    Department : this.assets?.department ??'',
    DateOfIssue: this.assets?. dateOfIssue ??'',  
    WarrantyDate: this.assets?.warrantyDate ?? '',
    Status : this.assets?.status ?? '',
    User : this.assets?. user ?? '',
    UserId: this.assets?.userId ?? '',
    AssetType: this.assets?.assetType??'',
    AssetTypeId: this.assets?.assetTypeId ??'',
  };
  //pass this object to a service
  if (this.id)
  {
  const editCategorySubscription = this.inventoryService.updateAssets(this.id, updateCategoryRequest).subscribe({
  next : (response) => {
    this.router.navigateByUrl('api/admin/assets');
  }
   
  }  );
  }
  }

  onDelete(): void
{
 if (this.id)
  {
  const deleteCategorySubscription = this.inventoryService.deleteCategory(this.id).subscribe({
  next : (response) =>
     {
    this.router.navigateByUrl('/admin/assets');
    }
   
  }); } 
}

 ngOnDestroy(): void 

  {
    this.paramsSubscription?.unsubscribe();
    this.updateAssetsSubscription?.unsubscribe();
    this.deleteAssetsSubscription?.unsubscribe();
  }

  
//update category in edit category and a model ts file , form-service-calling api-updating 


  }

 


  


  




