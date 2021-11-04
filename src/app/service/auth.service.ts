import { User, UserManager } from 'oidc-client';
import { environment } from 'src/environments/environment';


export { User };

export class AuthService {

  private userManager: UserManager;

  constructor() {
    const settings = {
      authority: environment.stsAuthority,
      client_id: environment.clientId,
      redirect_uri: `${environment.clientRoot}auth-callback`,
      silent_redirect_uri: `${environment.clientRoot}auth-callback`,
      post_logout_redirect_uri: `${environment.clientRoot}private/user-profile`,
      response_type: 'id_token token',
      scope: environment.clientScope
    };
    this.userManager = new UserManager(settings);
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public loginCallback(): Promise<User | null> {
    return this.userManager.signinRedirectCallback();
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}