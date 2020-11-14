import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  isEnabled = this.swPush.isEnabled;
  isGranted = Notification.permission === 'granted';

  constructor(
    private swPush: SwPush,
  ) { }

  ngOnInit() {
  }
}
