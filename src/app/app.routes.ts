import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './guards/auth.guard';
import { innerGuard } from './guards/inner.guard';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "dashboard", loadComponent: () => import("./pages/dashboard/dashboard.component").then((c) => c.DashboardComponent), canActivate: [authGuard]},
    { path: "auth", loadComponent: () => import("./pages/auth/auth.component").then((c) => c.AuthComponent), canActivate: [innerGuard]},
    { path: "admin", loadComponent: () => import("./pages/admin/admin.component").then((c) => c.AdminComponent), canActivate: [authGuard] },
    { path: "users", loadComponent: () => import("./pages/user/user.component").then((c) => c.UserComponent), canActivate: [authGuard]},
    { path: "profile", loadComponent: () => import("./pages/profile/profile.component").then((c) => c.ProfileComponent), canActivate: [authGuard]},
    { path: "**", component: NotfoundComponent },
];
