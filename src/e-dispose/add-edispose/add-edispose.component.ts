import { Component } from '@angular/core';
import { FormsModule} from'@angular/forms';
import{EDisposeService} from '../services/e-dispose.service';
 import { AddDisposeAssetRequest} from '../models/add-e-dispose.model';
 import {Subscription} from 'rxjs';
 import {Router} from '@angular/router';

@Component({
  selector: 'app-add-edispose',
  imports: [FormsModule],
  templateUrl: './add-edispose.component.html',
  styleUrl: './add-edispose.component.css',
})
export class AddEdisposeComponent {

  model:AddDisposeAssetRequest;
  


  private addEDisposeAssetSubscription? : Subscription ;

constructor(private edisposeService : EDisposeService, private router : Router  ) {
    
this.model = {
    

AssetTypeId:'',
AssetName:'',
AssetType:'',
Reason:'',
DisposedOn: '',//date
DisposedBy: '',//name or email
Condition:'',
DateOfIssue:'',
WarrantyDate: '',
Status:'',
    };
  }

  goToEDispose()
  {
    this.router.navigateByUrl('/ewaste/disposable-assets');
    
  }
  onFormSubmit() {
    console.log('Form submitted:', this.model);
    // Add your form handling logic here
    this. addEDisposeAssetSubscription= this.edisposeService.addDisposedAssets(this.model).subscribe({next : (response)=>
    {      console.log('The e-diposed asset is :', response);
     this.router.navigateByUrl('/admin/ewaste/disposable-assets');
 
    } ,


  }
  
    )};
 ngOnDestroy(): void {
   //throw new Error('Method not implemented');
   this?.addEDisposeAssetSubscription?.unsubscribe();

 }
}





