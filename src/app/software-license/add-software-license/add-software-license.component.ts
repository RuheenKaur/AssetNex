import { Component } from '@angular/core';
import {AddSoftwareLicenseRequest} from '../models/add-software-model';
import {Router} from '@angular/router';
import { SoftwareLicenseService } from '../services/software.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-add-software-license',
  imports: [],
  templateUrl: './add-software-license.component.html',
  styleUrl: './add-software-license.component.css'
})


export class AddSoftwareLicenseComponent {
 model:AddSoftwareLicenseRequest;
 response: any;
  


  private addEDisposeAssetSubscription? : Subscription ;

constructor(private softwareLicenseService : SoftwareLicenseService, private router : Router  ) {
    
this.model = {
    
    Id: '',
    UserName: '',
    Request: '',
    EmployeeId: '',
    SoftwareName: '',
    OtherSoftware: '',
    DateApplied: '',
    };
  }

  goToSoftwareLicense()
  {
    this.router.navigateByUrl('/softwarelicense');
  }

  onFormSubmit() {
    // console.log('Form submitted:', this.model);
    
    // this. addEDisposeAssetSubscription= this.softwareLicenseService.addSoftwareLicense(this.model).subscribe({next : (response)=>
    // {      console.log('The software license is :', response);
    //  this.router.navigateByUrl('/admin/assets/edispose');
 
    // } ,

    alert('Your request has been sent to the admin.Kindly check your email for future updates!');

  
  }
    
 ngOnDestroy(): void {
   
   this?.addEDisposeAssetSubscription?.unsubscribe();
 }
}


//  }
// app.post('/submit-inventory', (req, res) => {
//   const { userName, request, employeeId, DateApplied, SoftwareName, OtherSoftware, comments } = req.body;

//   // Perform DB insert logic here:
//   db.query('INSERT INTO inventory (userName, request, employeeId, DateApplied, SoftwareName, OtherSoftware, comments) VALUES (?, ?, ?, ?, ?, ?, ?)', 
//     [userName, request, employeeId, DateApplied, SoftwareName, OtherSoftware, comments], 
//     (err, result) => {
//       if (err) {
//         res.status(500).send('Error saving to database');
//       } else {
//         res.send('Success!');
//       }
//     });
// });
