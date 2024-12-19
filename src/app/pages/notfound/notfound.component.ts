import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
    selector: 'app-notfound',
    imports: [
        MatButtonModule,
        RouterLink
    ],
    templateUrl: './notfound.component.html',
    styleUrl: './notfound.component.css'
})
export class NotfoundComponent {

}
