import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/models/dialog-data';
import { iconPath } from 'src/app/shared/icons/iconPath.js';

@Component({
  selector: 'app-pwa-dialog',
  templateUrl: './pwa-dialog.component.html',
  styleUrls: ['./pwa-dialog.component.scss']
})
export class PwaDialogComponent implements OnInit {

  public icon = iconPath;

  constructor(
    public dialogRef: MatDialogRef<PwaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }


  ngOnInit() {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
