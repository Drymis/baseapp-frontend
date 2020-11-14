import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PwaService } from 'src/app/core/services/pwa.service';
import { PwaDialogComponent } from 'src/app/shared/components/pwa-dialog/pwa-dialog.component';
import { PortfolioUtility } from 'src/app/shared/utilities/portfolio-utility';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-frontoffice-component',
  templateUrl: './frontoffice.component.html'
})
export class FrontofficeComponent {

  private isGranted;

  public constructor(
    public dialog: MatDialog,
    private pwaService: PwaService,
  ) {
    if (!PortfolioUtility.isIOS() && environment.notifications) {
      this.isGranted = Notification.permission === 'granted'
      setTimeout(() => {
        if (this.pwaService.promptEvent) {
          this.openInstallationConfirmationDialog();
          PortfolioUtility.askForNPerm();
        }
        if (!this.isGranted) {
          this.openNotificationPermissionReminderDialog();
        }
      }, 1500);
    }
  }

  openInstallationConfirmationDialog(): void {
    const dialogRef = this.dialog.open(PwaDialogComponent, {
      width: '300px',
      data: {
        title: 'App installation',
        text: `App installation is required for a better user experience. \nInstall the app?`,
        type: 'installation'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pwaService.promptEvent.prompt();
      }
    });
  }

  openNotificationPermissionReminderDialog(): void {
    const dialogRef = this.dialog.open(PwaDialogComponent, {
      width: '300px',
      data: {
        title: 'App notifications',
        text: `In order for the App to work properly, notifications need to be enabled. Navigate to Settings -> Site settings -> Notifications and allow this App.`
      }
    });
  }
}

