import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            let headers: any = {};

            if (currentUser.token) {
                headers.token = currentUser.token;
            }
            if (currentUser.accessToken) {
                headers.Authorization = `Bearer ${currentUser.accessToken}`;
            }

            request = request.clone({
                setHeaders: headers
            });
        }

        return next.handle(request);
    }
}