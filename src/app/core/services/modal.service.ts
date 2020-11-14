import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PwaDialogComponent } from 'src/app/shared/components/pwa-dialog/pwa-dialog.component';

@Injectable()
export class ModalService {

  constructor(
    public dialog: MatDialog,
    ) {
  }

  openInstallationConfirmationDialog(title: string, text: string, type: string) {
    const dialogRef = this.dialog.open(PwaDialogComponent, {
      width: '300px',
      data: {title: title, text: text}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.promptEvent.prompt();
        return true;
      } else {
        return false;
      }
    });
  }
}
