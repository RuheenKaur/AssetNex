import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../services/inventory.service';
import { AddAssetRequest } from '../models/add-assets-model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-asset',
  imports: [FormsModule],
  templateUrl: './add-asset.component.html',
  styleUrl: './add-asset.component.css'
})
export class AddAssetComponent  {

  model: AddAssetRequest;
  response : any;
 

  private addAssetSubscription? : Subscription ;

  constructor(private inventoryService : InventoryService, private router : Router  ) {
    
    this.model = {
    
      id:'',
      name:'',
      serialNumber: '',
      department: '',
      dateOfIssue: '',
      warrantyDate: '' ,
      userId :'',
      user: '',
      status: '',
      assetTypeId: '',
      assetType: '', 

    };
  }



  onFormSubmit() {
    console.log('Form submitted:', this.model);
    // Add your form handling logic here
    this. addAssetSubscription= this.inventoryService.addAssets(this.model).subscribe({next : (response)=>
    {      console.log('The asset is :', response);
     this.router.navigateByUrl('/admin/assets');
 
    } ,
  }
    )};
 ngOnDestroy(): void {
   //throw new Error('Method not implemented');
   this?.addAssetSubscription?.unsubscribe();

 }
}





