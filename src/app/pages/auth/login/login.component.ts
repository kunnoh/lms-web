import { Component, inject } from '@angular/core';
import { MatFormFieldModule} from '@angular/material/form-field';
import { Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup} from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../services/loading.service/loading.service';

@Component({
    selector: 'app-signin',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
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
  loadingSvc = inject(LoadingService);

  constructor(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        this.loadingSvc.loadingOn;
        await this.authservice.loginApi({
          email: this.loginForm.value['email'], 
          password: this.loginForm.value['password']
        });
  
        await this.router.navigate(["/dashboard"]);
      } catch (e) {
        console.error(e);
      } finally {
        // this.loadingSvc.loadingOff();
      }
    }
  }
}
