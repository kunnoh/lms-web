import { Component, ViewEncapsulation } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
    imports: [
        MatTabsModule,
        LoginComponent,
        RegisterComponent,
        RouterOutlet
    ],
    encapsulation: ViewEncapsulation.None
})

export class AuthComponent {

}
