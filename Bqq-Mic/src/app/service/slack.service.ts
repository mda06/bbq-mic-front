import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {SlackData} from "./slack.data";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {ProductService} from "./product.service";

@Injectable()
export class SlackService {

  private _token: string = null;
  private _username: string = null;
  private _userid: string = null;
  private _slackCode: string = null;
  private _redirectUri: string = "https://mic-bqq.azurewebsites.net";
  //private _redirectUri: string = "http://localhost:4200/";
  private slackData: SlackData = null;

  private useridSubject = new ReplaySubject<string>(1);
  useridSubject$ = this.useridSubject.asObservable();
  private mySuppliedInitialized = new ReplaySubject<boolean>(1);
  mySuppliedInitialized$ = this.mySuppliedInitialized.asObservable();

  constructor(private http: HttpClient, private productService: ProductService) {
    this.slackData = new SlackData();
  }

  init(code: string): Observable<string> {
    this._slackCode = code;
    console.log("Init for ", code);
    return Observable.create(obs => {
      this.http.get<any>("https://slack.com/api/oauth.access?code=" + this._slackCode
        + "&client_id=" + this.slackData.clientId
        + "&client_secret=" + this.slackData.clientSecret
        + "&redirect_uri=" + this._redirectUri).subscribe(data => {
        if (data.ok === true) {
          this._token = data.access_token;
          this._username = data.user.name;
          this._userid = data.user.id;
          console.log(this._userid);
          this.useridSubject.next(this._userid);
          this.productService.initMySupplies(this._userid).subscribe(suppliesReturns => {
            if(suppliesReturns)
              this.mySuppliedInitialized.next(true);
          });
          obs.next(this._username);
          obs.complete();
        } else {
          obs.error(data.error);
          obs.complete();
        }
      }, err => console.log(err));
    });
  }

  get slackCode() {
    return this._slackCode;
  }

  get clientId() {
    return this.slackData.clientId;
  }

  get redirectUri() {
    return this._redirectUri;
  }

}
