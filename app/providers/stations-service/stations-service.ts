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
        function sortStations(arr) {
          return arr.map(el => {
            el.Lines = [];
            el.Lines.push(el.LineCode1);
            if (el.LineCode2) el.Lines.push(el.LineCode2);
            if (el.LineCode3) el.Lines.push(el.LineCode3);
            if (el.LineCode4) el.Lines.push(el.LineCode4);
            return el;
          }).sort((a, b) => {
            if (a.Name < b.Name) return -1;
            else if (b.Name < a.Name) return 1;
            else return 0;
          }); 
        }

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
                this.data = sortStations(data.Stations);
                console.log(this.data);
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

