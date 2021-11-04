import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TwitchService {

  private url: string = `https://id.twitch.tv/oauth2`;

  constructor(private httpClient: HttpClient) {  }

  getUserInfo(token: string) {
    const finalUrl = this.url+'/userinfo';
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get(finalUrl, { headers: headers });
  }

  getUserFollows(token: string, usernameId: string) {
    const url = `https://api.twitch.tv/helix/users/follows?from_id=${usernameId}`;
    let headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Client-Id', environment.clientId);
    return this.httpClient
      .get(url, { headers: headers });
  }

}
