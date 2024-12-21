import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { isAuthenticated } from './guards/auth.guard';
import { innerGuard } from './guards/inner.guard';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    {
        path: "auth",
        loadComponent: () => import("./pages/auth/auth.component").then((c) => c.AuthComponent),
        canActivate: [innerGuard]
    },
    {
        path: "dashboard",
        loadComponent: () => import("./pages/dashboard/dashboard.component").then(c => c.DashboardComponent),
        canActivate: [isAuthenticated],
        children: [
            { path: "profile", loadComponent: async () => await import("./pages/profile/profile.component").then(c => c.ProfileComponent) },
            { path: "users", loadComponent: async () => await import("./pages/user/user.component").then(c => c.UserComponent) },
        ]
    },
    {
        path: "admin",
        loadComponent: () => import("./pages/admin/admin.component").then((c) => c.AdminComponent),
        canActivate: [isAuthenticated],
        children: [
            { path: "profile", loadComponent: async () => await import("./pages/profile/profile.component").then(c => c.ProfileComponent) },
            { path: "users", loadComponent: async () => await import("./pages/user/user.component").then(c => c.UserComponent) },
        ]
    },
    { path: "**", component: NotfoundComponent },
];
