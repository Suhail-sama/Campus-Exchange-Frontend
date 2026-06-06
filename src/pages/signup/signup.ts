import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html'
})
export class SignupComponent {
  // Payload automatically includes all required fields
  user = {
    fullName: '',
    email: '',
    password: '',
    dob: '',
    panNumber: ''
  };

  onSubmit() {
    console.log('Signup Payload:', this.user);
    // Add your registration API call here
  }
}
