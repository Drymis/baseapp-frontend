import { GoogleButtonComponent } from './components/google-button/google-button.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MaterialModule } from './utilities/material-module';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconArrowForwardComponent } from './icons/icon-arrow-forward/icon-arrow-forward.component';
import { IconDoneComponent } from './icons/icon-done/icon-done.component';
import { YoutubeEmbedPipe } from './custom-pipes/youtube-embed.pipe';
import { SanitizePipe } from './custom-pipes/sanitize.pipe';
import { IconShareComponent } from './icons/icon-share/icon-share.component';
import { IconStarComponent } from './icons/icon-star/icon-star.component';
import { NgInitDirective } from './directives/ng-init.directive';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { IconComponent } from './icons/icon/icon.component';
import { NotRoundedIntegerPipe } from './custom-pipes/not-rounded-integer.pipe';
import { SafeHtmlPipe } from './custom-pipes/safe-html.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { PwaDialogComponent } from './components/pwa-dialog/pwa-dialog.component';
import { NotificationComponent } from './components/notification/notification.component';
import { MediaUploadPreviewComponent } from './components/media-upload-preview/media-upload-preview.component';
import { FacebookButtonComponent } from './components/facebook-button/facebook-button.component';

@NgModule({
  declarations: [
    IconArrowForwardComponent,
    IconDoneComponent,
    IconShareComponent,
    IconStarComponent,
    YoutubeEmbedPipe,
    SanitizePipe,
    NotRoundedIntegerPipe,
    SafeHtmlPipe,
    NgInitDirective,
    IconComponent,
    ConfirmationDialogComponent,
    PwaDialogComponent,
    NotificationComponent,
    SnackbarComponent,
    MediaUploadPreviewComponent,
    GoogleButtonComponent,
    FacebookButtonComponent,

  ],

  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    MatRippleModule,
    MatDialogModule,

    // Custom components
    YoutubeEmbedPipe,
    SanitizePipe,
    NgInitDirective,
    NotRoundedIntegerPipe,
    SafeHtmlPipe,
    ConfirmationDialogComponent,
    PwaDialogComponent,
    NotificationComponent,
    MediaUploadPreviewComponent,
    GoogleButtonComponent,
    FacebookButtonComponent,

    IconComponent,
    IconArrowForwardComponent,
    IconDoneComponent,
    IconShareComponent,
    IconStarComponent,
    MaterialModule,
    SnackbarComponent,
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    PwaDialogComponent,
  ],
  providers: [
    {provide: MatDialogRef, useValue: {}}
  ]
})
export class SharedModule { }
