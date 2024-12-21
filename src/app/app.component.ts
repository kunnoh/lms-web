import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared-components/navbar/navbar.component";

@Component({
    selector: 'app-root',
    imports: [NavbarComponent],
    template: `
    <app-navbar>
  `
})
export class AppComponent {
  title = 'LMS';
}
