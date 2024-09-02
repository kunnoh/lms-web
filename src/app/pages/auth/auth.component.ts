import { Component, ViewEncapsulation } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  imports: [
    MatTabsModule,
    LoginComponent,
    RegisterComponent
  ],
  encapsulation: ViewEncapsulation.None
})

export class AuthComponent {

}
