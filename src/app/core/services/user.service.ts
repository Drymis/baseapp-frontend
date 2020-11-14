import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    public infoUser(userToken?, accessToken?) {
        let headers: any = {
            'Content-Type': 'application/json',
        };
        if (userToken) {
            headers.token = userToken;
        }
        if (accessToken) {
            headers.Authorization = `Bearer ${accessToken}`;
        }

        return this.http.get(environment.serverAPI + '/users/me', { headers } ).toPromise();
    }

    public loginUser(email, password) {
        return this.http.post(`${environment.serverAPI}/users/login`, {email, password}).toPromise();
    }

    public signupUser(username, email, password) {
        return this.http.post(`${environment.serverAPI}/users/signup`, {username, email, password}).toPromise();
    }

    public listUsers() {
        return this.http.get(`${environment.serverAPI}/users`).toPromise();
    }

    public getUser(userId: string) {
        return this.http.get(`${environment.serverAPI}/users/${userId}`).toPromise();
    }

    public createUser(user: User) {
        return this.http.post(environment.serverAPI + '/users', {user} ).toPromise();
    }

    public updateUser(userId: number, user: User) {
        return this.http.post(`${environment.serverAPI}/users/${userId}`, {user} ).toPromise();
    }

    public deleteUser(userId: number) {
        return this.http.post(`${environment.serverAPI}/users/${userId}/delete`, null).toPromise();
    }
}