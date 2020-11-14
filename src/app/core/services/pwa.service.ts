import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable()
export class PwaService {

  public promptEvent;

  constructor(
    private swUpdate: SwUpdate,
    // public dialog: MatDialog,
    ) {
    window.addEventListener('beforeinstallprompt', event => {
      console.log(event);
      event.preventDefault();
      this.promptEvent = event;
    });

    swUpdate.available.subscribe(event => {
      console.log('Application will update.');
      // this.alertService.info('Application will update in 3 seconds.');
      setTimeout(() => {
        window.location.reload();
      }, 0);
    });
  }
}
