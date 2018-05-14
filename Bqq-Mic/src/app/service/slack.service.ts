import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class SlackService {

  constructor() { }

  getSlackId(): Observable<string> {
    return Observable.create(obs => {
      obs.next("");
      obs.complete();
    });
  }

}
