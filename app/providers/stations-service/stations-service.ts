import { Injectable } from '@angular/core';
import { Http, Request, Headers, RequestMethod, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { WMATA_API_KEY } from '../../providers/constants/constants';

/*
  Generated class for the StationsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StationsService {
  data: any;
    options: any;
    headers: any;

  constructor(private http: Http) {
    this.data = null;
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("api_key", WMATA_API_KEY);

    this.options = new RequestOptions({
        method: RequestMethod.Get,
        url: '/wmataApi' +  '/Rail.svc/json/jStations',
        headers: this.headers
    });

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.request(new Request (this.options))
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
}

