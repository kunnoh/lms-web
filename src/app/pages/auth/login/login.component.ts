import { Component, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm, FormBuilder, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // email = new FormControl("", [ Validators.required, Validators.email ]);
  // password = new FormControl("", [ Validators.required ]);
  errMsg: string | null = null;
  hide: boolean = true;
  loading: boolean = false;
  loginForm: FormGroup;
  
  authservice: AuthService = inject(AuthService);
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);

  constructor(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  // onSubmit(){
  //   if(this.loginForm.valid){
  //     this.loading = true;
  //     this.errMsg = null;
  //     this.authservice.loginApi({email: this.loginForm.value['email'], password: this.loginForm.value['password']}).subscribe({
  //       next: (res) => {
  //         console.log("RESPoNSE:\n\t",res);
  //         this.loading = false;
  //         localStorage.setItem("token", res.data.token);
  //         this.router.navigate(["/dashboard"]);
  //         this.authservice.isLoggedIn.update(() => true);
  //       },
  //       error: (err) => {
  //         this.loading = false;
  //         // console.log("ERR:\n\t", err);
  //         this.errMsg = err;
  //       }
  //     });
  //   }
  // }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true; // Start the loader
      this.errMsg = null; // Reset the error message
      
      this.authservice.loginApi({
        email: this.loginForm.value['email'], 
        password: this.loginForm.value['password']
      }).subscribe({
        next: (res) => {
          console.log("RESPONSE:\n\t", res);
          this.loading = false; // Stop the loader on success
          localStorage.setItem("token", res.data.token);
          this.router.navigate(["/dashboard"]);
          this.authservice.isLoggedIn.update(() => true);
        },
        error: (err) => {
          this.loading = false; // Stop the loader on error
          console.error("ERROR:\n\t", err);
          
          // Check if the error has a message to show to the user
          if (err.message) {
            this.errMsg = err.message; 
          } else {
            this.errMsg = "An unexpected error occurred.";
          }
        },
        complete: () => {
          // Ensure loading is false when the request completes
          this.loading = false;
        }
      });
    }
  }
  
}
