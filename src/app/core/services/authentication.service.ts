import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { resolve } from 'path';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(
        private userService: UserService,
    ) { }

    public login(email: string, password: string) {
        // new Promise()
        return new Promise((resolve, reject) => {

            this.userService.loginUser(email, password).then((response: any) => {
                const token = response.token;

                // login successful if there's a jwt token in the response
                if (token) {

                    this.userService.infoUser(token, null).then((userData: any) => {
                        const currentUser = {
                            user: userData.code,
                            token,
                            email: userData.email,
                            role: userData.role,
                            provider: userData.provider ? userData.provider : null,
                            username: userData.username ? userData.username : null,
                            photo: userData.photo ? userData.photo : null,
                        };

                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                        resolve();

                    }).catch((err) => {
                        reject(err);
                        console.log(err);
                    });

                } else {
                    reject("No token in response");
                }

            }).catch((err) => {
                // alert(err)
                reject(err);
                console.log(err);
            });
        })
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}