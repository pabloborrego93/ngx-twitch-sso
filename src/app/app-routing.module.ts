import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { UserProfileComponent } from './private/user-profile/user-profile.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [{
      path: 'signin', component: SigninComponent
    }, {
      path: 'auth-callback', component: AuthCallbackComponent
    }, {
      path: 'private/user-profile', component: UserProfileComponent
    }, {
      path: '**', redirectTo: 'signin', pathMatch: 'full',
    }]
  }, {
      path: '**', redirectTo: 'signin', pathMatch: 'full',
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
