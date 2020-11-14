import { BackofficeComponent } from './pages/backoffice/backoffice.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { FrontofficeComponent } from './frontoffice.component';
import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { StorageService } from 'src/app/core/services/storage.service';
import { BackofficeUserComponent } from './components/backoffice/backoffice-user/backoffice-user.component';
import { LoginComponent } from './pages/user/login/login.component';

export const MY_CUSTOM_FORMATS = {
  parseInput: 'll',
  fullPickerInput: 'll',
  datePickerInput: 'll',
  timePickerInput: 'll',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'll',
  monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
  declarations: [
    FrontofficeComponent,
    BackofficeComponent,
    BackofficeUserComponent,
    LoginComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FrontofficeRoutingModule,
  ],
  providers: [
    StorageService,
  ]
})
export class FrontofficeModule { }
