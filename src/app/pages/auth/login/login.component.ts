import { Component, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
// import { AuthService } from '../../../services/auth/auth.service';

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
  errMsg: string | null = "";
  hide: boolean = true;
  email: string = "";
  password:string = "";
  loading: boolean = false;

  authservice: AuthService = inject(AuthService);
  router: Router = inject(Router);

  constructor(){

  }

  onSubmit(){
    console.log(this.email); 
    console.log(this.password);
    this.loading = true;
    this.errMsg = null;
    this.authservice.loginApi({email: this.email, password: this.password}).subscribe({
      next: (res) => {
        console.log("RESPoNSE:\n\t",res);
        this.loading = false;
        localStorage.setItem("token", res.data.token);
        this.router.navigate(["/dashboard"]);
        this.authservice.isLoggedIn.update(() => true);
      },
      error: (err) => {
        this.loading = false;
        console.log("ERR:\n\t", err);
        this.errMsg = err;
      }
    })

  }
  
}
