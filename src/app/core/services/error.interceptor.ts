import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService,
        ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    // alert(err.error.message);
                    console.log("UNAUTHORIZED");
                    this.authenticationService.logout();
                    location.reload(true);
                }

                if (err.status === 500) {
                    console.log("INTERNAL SERVER ERROR");
                    // console.log(err.error);
                }

                if (err.status === 403) {
                    // alert(err.error.message);
                    console.log("FORBIDDEN");
                    this.authenticationService.logout();
                    location.reload(true);
                }

                if (err.status === 0) {
                    console.log("May be CORS error");
                }


                console.log("Status: " + err.status + "\nError: " + err.error.message);
                // this.alertService.danger("Status: " + err.status + "\nError: " + err.error.message);

                const error = err.error || err.error.message || err.statusText;
                return throwError(error);
            }
        }))
    }
}