import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hide: boolean = true;
  errMsg = null;
  loading: boolean = false;
  registerForm: FormGroup;

  authService: AuthService = inject(AuthService);
  fb: FormBuilder = inject(FormBuilder);

  constructor(){
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      idnumber: ['', Validators.required],
    });
  }

  onSubmit(){
    if(this.registerForm.valid){
      this.loading = true;
      this.errMsg = null;

      this.authService.registerApi(this.registerForm.value).subscribe({
        next: (res) => {
          this.loading = false;
          console.log(res);
        },
        error: (err) => {
          // console.log(err);
          this.loading = false;
          this.errMsg = err;
        },
        complete: () => {
          this.loading = false;
          this.errMsg = null;
        }
      })
    }
  }
}
