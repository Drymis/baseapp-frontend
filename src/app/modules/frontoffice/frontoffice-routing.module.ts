import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontofficeComponent } from './frontoffice.component';
import { AuthGuard } from 'src/app/shared/auth/auth.guard';
import { Role } from 'src/app/core/enums/role';
import { BackofficeComponent } from './pages/backoffice/backoffice.component';
import { LoginComponent } from './pages/user/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: FrontofficeComponent,
    children: [
      {
        path: '',
        component: BackofficeComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.admin, Role.applicant] }
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
