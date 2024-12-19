import { Component, effect, inject, Injector, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'; 
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-navbar',
    imports: [
        MatToolbarModule,
        MatButtonModule,
        RouterLink,
        RouterLinkActive,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        RouterOutlet,
        NgIf
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @ViewChild("drawer", { static: false })
  drawer!: MatDrawer;

  injector:  Injector = inject(Injector);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  islogged = false;

  ngOnInit(): void {
    effect(() => {
      this.islogged = this.authService.isLoggedIn();
    }, {injector: this.injector});
  }

  public logout() {
    localStorage.removeItem('token');
    this.authService.isLoggedIn.update(() => false);
    this.router.navigate(["/auth"]);
  }
}
