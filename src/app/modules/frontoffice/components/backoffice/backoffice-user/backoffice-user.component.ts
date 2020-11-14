import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';
import { PortfolioUtility } from 'src/app/shared/utilities/portfolio-utility';

@Component({
  selector: 'app-backoffice-user',
  templateUrl: './backoffice-user.component.html',
  styleUrls: ['./backoffice-user.component.scss']
})

export class BackofficeUserComponent implements OnInit {

  public currentUser;
  public users;
  public userForm;
  public panelOpenState;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.users = [this.currentUser];
    this.userForm = null;
    this.panelOpenState = false;
  }

  ngOnInit() {
    this.userService.listUsers().then((users: User[]) => {
      this.users = users;
      console.log(users)
    }).catch((err) => {
      console.log('err', err);
    });
    // this.userForm = PortfolioUtility.objectToForm(this.currentUser);
  }

  logout() {
    this.authenticationService.logout();
    location.reload();
  }
}
