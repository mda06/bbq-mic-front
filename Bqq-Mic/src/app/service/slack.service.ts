import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {SlackData} from "./slack.data";

@Injectable()
export class SlackService {
  private _token: string = null;
  private _username: string = null;
  private _userid: string = null;
  private _slackCode: string = null;
  private slackData: SlackData = null;

  constructor(private http: HttpClient) {
    this.slackData = new SlackData();
  }

  getSlackId(): Observable<string> {
    return Observable.create(obs => {
      obs.next("");
      obs.complete();
    });
  }

  init(code: string): Observable<string> {
    this._slackCode = code;
    return Observable.create(obs => {
      this.http.get<any>("https://slack.com/api/oauth.access?code=" + this._slackCode
        + "&client_id=" + this.slackData.clientId
        + "&client_secret=" + this.slackData.clientSecret
        + "&redirect_uri=http://localhost:4200/home").subscribe(data => {
        if (data.ok === true) {
          this._token = data.access_token;
          this._username = data.user.name;
          this._userid = data.user.id;
          obs.next(this._username);
        } else {
          obs.error("Data is not ok");
        }
        obs.complete();
      }, err => console.log(err));
    });
  }

  get slackCode() {
    return this._slackCode;
  }

  get clientId() {
    return this.slackData.clientId;
  }

  get username(): Observable<string> {
    return Observable.create(obs => {
      /*while(isNullOrUndefined(this._username)) {

      }*/

      obs.next(null);
      obs.complete();
    });
  }

  get userid(): string {
    return this._userid;
  }
}
