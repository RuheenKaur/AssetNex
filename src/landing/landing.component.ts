import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-landing',
  imports: [FormsModule,CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent  {
constructor (private router: Router){}

goToLogin() {
  this.router.navigateByUrl('/login'); 
}

goToAbout(){
  this.router.navigateByUrl('/about');
}
}








// UI Fix Plan (White + Pastel Look, Fresh for Review)Colors & Fonts
// Background: #fdfdfd or light pastel gradients.

// Primary Accent: Light pastel blue (#d0e7f9), green (#daf5dc), or lilac (#e8ddf9).

// Buttons: Use Bootstrap's pastel-colored button classes (btn-outline-info, btn-outline-success).

// Fonts: Google Fonts like Poppins, Inter, or Nunito.





// Charts for Usage Metrics (Use Chart.js)
// Show on Dashboard:

// html
// Copy
// Edit
// <canvas id="disposalChart"></canvas>
// <script>
//   const ctx = document.getElementById('disposalChart');
//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: ['Jan', 'Feb', 'Mar'],
//       datasets: [{
//         label: 'E-Waste Requests',
//         data: [10, 20, 12],
//         backgroundColor: '#a0d8ef'
//       }]
//     }
//   });
// </script>



// 2. UI Fix Plan (White + Pastel Look, Fresh for Review)
//  Colors & Fonts
// Background: #fdfdfd or light pastel gradients.

// Primary Accent: Light pastel blue (#d0e7f9), green (#daf5dc), or lilac (#e8ddf9).

// Buttons: Use Bootstrap's pastel-colored button classes (btn-outline-info, btn-outline-success).

// Fonts: Google Fonts like Poppins, Inter, or Nunito.


// html

// 📊 Charts for Usage Metrics (Use Chart.js)
// Show on Dashboard:

// html
// Copy
// Edit
// <canvas id="disposalChart"></canvas>
// <script>
//   const ctx = document.getElementById('disposalChart');
//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: ['Jan', 'Feb', 'Mar'],
//       datasets: [{
//         label: 'E-Waste Requests',
//         data: [10, 20, 12],
//         backgroundColor: '#a0d8ef'
//       }]
//     }
//   });
// </script>