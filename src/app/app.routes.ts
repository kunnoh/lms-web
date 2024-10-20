import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './guards/auth.guard';
import { innerGuard } from './guards/inner.guard';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    {
        path: "auth",
        loadComponent: () => import("./pages/auth/auth.component").then((c) => c.AuthComponent),
        canActivate: [innerGuard],
        children: [
            { path: "login", loadChildren: () => import("./pages/auth/login/login.component").then(c => c.LoginComponent) },
            { path: "register", loadChildren: () => import("./pages/auth/register/register.component").then(c => c.RegisterComponent) },
        ]
    },
    {
        path: "dashboard",
        loadComponent: () => import("./pages/dashboard/dashboard.component").then(c => c.DashboardComponent),
        canActivate: [authGuard],
        children: [
            { path: "profile", loadChildren: () => import("./pages/profile/profile.component").then(c => c.ProfileComponent) },
        ]
    },
    {
        path: "admin",
        loadComponent: () => import("./pages/admin/admin.component").then((c) => c.AdminComponent),
        canActivate: [authGuard],
        children: [
            { path: "profile", loadChildren: () => import("./pages/profile/profile.component").then(c => c.ProfileComponent) },
            { path: "users", loadChildren: () => import("./pages/user/user.component").then(c => c.UserComponent) },
        ]
    },
    { path: "**", component: NotfoundComponent },
];
