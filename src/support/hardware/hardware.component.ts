import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hardware',
  imports: [],
  templateUrl: './hardware.component.html',
  styleUrl: './hardware.component.css'
})
export class HardwareComponent {

  constructor (private router :Router) {

  }

  goToHardware()
  {
    this.router.navigateByUrl('/assets/hardware');
    
  }
}
