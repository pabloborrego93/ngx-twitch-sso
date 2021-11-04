import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/service/auth.service';
import { TwitchService } from 'src/app/service/twitch.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  public currentUser: User | undefined;
  public follows: any | undefined;

  constructor(
    private authService: AuthService,
    private twitchService: TwitchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getUser()
      .then((user: User | null) => {
        if(user !== null) {
          this.currentUser = user;
          this.getUserFollows();
        } else {
          this.router.navigate(['signin']);
        }
      });
  }

  getUserFollows() {
    if(this.currentUser?.access_token && this.currentUser?.profile?.sub) {
      this.twitchService.getUserFollows(
        this.currentUser?.access_token,
        this.currentUser?.profile?.sub
      ).subscribe((response: any) => this.follows = response);
    } else {
      this.router.navigate(['signin']);
    }
  }

}
