import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { TwitchServiceService } from './twitch-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(
    public oidcSecurityService: OidcSecurityService,
    private twitchService: TwitchServiceService
    ) {}

  public auth: any = {
    'isAuthenticated': null,
    'userData': null,
    'accessToken': null,
    'idToken': null
  };

  public userInfo: any;

  checkAuth() {
    this.oidcSecurityService
    .checkAuth()
    .subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
      this.auth.isAuthenticated = isAuthenticated;
      this.auth.userData = userData;
      this.auth.accessToken = accessToken;
      this.auth.idToken = idToken;
      console.log(isAuthenticated);
      console.log(userData);
      console.log(accessToken);
      console.log(idToken);
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }

  getUserInfo() {
    const accessToken = this.oidcSecurityService.getAccessToken();
    const idToken = this.oidcSecurityService.getIdToken();
    console.log(accessToken);
    console.log(idToken);
    this.twitchService.getUserInfo(accessToken)
    .subscribe((res) => this.userInfo = res);
  }

}
