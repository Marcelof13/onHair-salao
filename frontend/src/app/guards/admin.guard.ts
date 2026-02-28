import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if (!authService.isLoggedIn()) {
        return router.createUrlTree(['/admin-login']);
    }

    // Need to get the current user value to check role
    let isAuthorized = false;
    authService.currentUser$.subscribe(user => {
        if (user && user.role === 'ADMIN') {
            isAuthorized = true;
        }
    }).unsubscribe();

    if (isAuthorized) {
        return true;
    }

    // Not an admin, redirect somewhere
    return router.createUrlTree(['/login']);
};
