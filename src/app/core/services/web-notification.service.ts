import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebNotificationService {

  readonly VAPID_PUBLIC_KEY = 'BDKL2Ho6Vseru18E0pNHz8I7pAOg-43D9gX2erks59GnmN30bOigwkNvVwdff-a2UDQhhFjUHrY29o4w-M-OBBk';

  constructor(
    private http: HttpClient,
    private swPush: SwPush,
  ) {
  }

  subscribeToNotification() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.sendToServer(sub))
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  sendToServer(params: any) {
    console.log(params);
    this.http.post(environment.serverAPI + '/notifications-subscribe', { notification: params }).subscribe();
  }

  testNotification(userCode, title, body, icon, url) {
    const bodyParams = {
      user: userCode,
      title: title,
      body: body,
      icon: icon,
      url: url,
    }
    return this.http.post(environment.serverAPI + '/notification', bodyParams).toPromise();
  }
}