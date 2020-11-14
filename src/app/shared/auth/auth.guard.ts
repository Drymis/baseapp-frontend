import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // let currentUrlSegment = this.router.parseUrl(state.url).root.children['primary'].segments[0].path;
        if (currentUser) {
            if (!currentUser.token && !currentUser.accessToken) {
                // this.activatedRoute.routeConfig.children
                // route.paramMap.get(0);
                this.router.navigate(['/login/'], { queryParams: { returnUrl: state.url } });
                return false;
            }

            // check if route is restricted by role
            if (route.data.roles.indexOf(currentUser.role) === -1) {
                // role not authorised so redirect to login
                this.router.navigate(['/login/'], { queryParams: { returnUrl: state.url } });
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login/'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}