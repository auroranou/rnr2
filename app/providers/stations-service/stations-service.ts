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

        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("api_key", WMATA_API_KEY);
    }

    load() {
        if (this.data) {
          return Promise.resolve(this.data);
        }

        this.options = new RequestOptions({
            method: RequestMethod.Get,
            url: '/wmataApi' +  '/Rail.svc/json/jStations',
            headers: this.headers
        });

        return new Promise(resolve => {
            this.http.request(new Request(this.options))
            .map(res => res.json())
            .subscribe(data => {
                this.data = data;
                resolve(this.data);
            });
        });
    }

    getNextTrain(stationCode) {
        this.options = new RequestOptions({
            method: RequestMethod.Get,
            url: '/wmataApi' + `/StationPrediction.svc/json/GetPrediction/${stationCode}`,
            headers: this.headers
        });

        return new Promise(resolve => {
            this.http.request(new Request(this.options))
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            });
        });
    }

    getTripInformation(startStation, endStation) {
        this.options = new RequestOptions({
            method: RequestMethod.Get,
            url: '/wmataApi' + `/Rail.svc/json/jSrcStationToDstStationInfo?FromStationCode=${startStation}&ToStationCode=${endStation}`,
            headers: this.headers
        });

        return new Promise(resolve => {
            this.http.request(new Request(this.options))
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            });
        });
    }    
}

