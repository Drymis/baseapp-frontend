import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm;
  public signupForm;
  public recoverForm;
  public isLoading = false;
  public signupErrors = null;
  public loginErrors = false;
  public pageState = 'login';
  public returnUrl;
  public serverAPI = environment.serverAPI;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    this.loginForm = this.fb.group(
      {
        mail: ['', Validators.required],
        password: ['', Validators.required],
      }
    );
    this.signupForm = this.fb.group(
      {
        username: ['', Validators.required],
        mail: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      }
    );
    this.recoverForm = this.fb.group(
      {
        mail: ['', Validators.required],
      }
    );
  }

  ngOnInit() {
    this.returnUrl = location.origin + this.route.snapshot.queryParams.returnUrl;
    // console.log(this.returnUrl)

    // console.log(this.route.snapshot.queryParams.returnUrl.split('?token=')[0])
    const splittedReturnUrl = this.route.snapshot.queryParams.returnUrl.split('?token=');
    if (splittedReturnUrl[1]) {

      // removing facebook security fragment
      const accessToken = splittedReturnUrl[1].replace('#_=_', '');
      this.returnUrl = location.origin + splittedReturnUrl[0];
      this.userService.infoUser(null, accessToken).then((userData: any) => {
        const currentUser = {
          user: userData.code,
          accessToken,
          email: userData.email,
          role: userData.role,
          provider: userData.provider ? userData.provider : null,
          username: userData.username ? userData.username : null,
          photo: userData.photo ? userData.photo : null,
        };
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        location.href = this.returnUrl;
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  public login() {
    this.isLoading = true;
    this.loginErrors = false;
    const vals = this.loginForm.value;
    this.authenticationService.login(vals.mail, vals.password).then((data) => {
      location.href = this.returnUrl;
    }).catch((err) => {
      console.log(err);
      this.loginErrors = err;
      this.isLoading = false;
    });
  }

  signup() {
    this.isLoading = true;
    this.signupErrors = false;
    const vals = this.signupForm.value;
    if (JSON.stringify(vals.password) !== JSON.stringify(vals.confirmPassword)) {
      this.signupErrors = 'The password confirmation does not match.';
      this.isLoading = false;
      return;
    }
    // alert("continue");
    this.userService.signupUser(vals.username, vals.mail, vals.password).then((data) => {
      this.authenticationService.login(vals.mail, vals.password).then((data) => {
        location.href = this.returnUrl;
      }).catch((err) => {
        console.log(err);
        this.signupErrors = err;
        this.isLoading = false;
      });
    }).catch((err) => {
      console.log(err);
      this.signupErrors = err;
      this.isLoading = false;
    });
    // this.isLoading = true;
    // this.userService.userRecover(vals.mail).then(() => {
    //   this.alertService.success('Password recover instructions have been sent to your email');
    //   this.isRecoveringPassword = false;
    //   this.isLoading = false;
    // }).catch((e) => {
    //   this.alertService.danger(e);
    //   this.isLoading = false;
    // });
  }

  changePageState(value) {
    this.pageState = value;
  }

  recoverPassword() {
    const vals = this.recoverForm.value;
    alert('not implemented yet');
    // this.isLoading = true;
    // this.userService.userRecover(vals.mail).then(() => {
    //   this.alertService.success('Password recover instructions have been sent to your email');
    //   this.isRecoveringPassword = false;
    //   this.isLoading = false;
    // }).catch((e) => {
    //   this.alertService.danger(e);
    //   this.isLoading = false;
    // });
  }

}
