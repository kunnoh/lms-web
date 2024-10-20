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
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errMsg = null;
      
      this.authservice.loginApi({
        email: this.loginForm.value['email'], 
        password: this.loginForm.value['password']
      }).subscribe({
        next: (res) => {
          console.log("RESPONSE:\n\t", res);
          localStorage.setItem("token", res.data.token);
          this.router.navigate(["/dashboard"]);
          this.authservice.isLoggedIn.update(() => true);
        },
        error: (err) => {
          this.loading = false;
          this.errMsg = err; 
          console.error("ERROR:\n\t", err);
          console.error("ERROR MSG:\n\t", err);
        },
        complete: () => {
          this.loading = false;
          this.errMsg = null;
        }
      });
    }
  }
}
