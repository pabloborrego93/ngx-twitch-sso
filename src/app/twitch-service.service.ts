import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TwitchServiceService {

  private url: string = `https://id.twitch.tv/oauth2`;

  constructor(private httpClient: HttpClient) {  }

  getUserInfo(token: string) {
    const finalUrl = this.url+'/userinfo';
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient
      .get(finalUrl, { headers: headers });
  }

}
