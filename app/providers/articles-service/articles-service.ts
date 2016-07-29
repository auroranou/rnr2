import { Injectable } from '@angular/core';
import { Http, Request, Headers, RequestMethod, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ArticlesService provider.
*/
@Injectable()
export class ArticlesService {
  data: any;
  options: any;
  headers: any;

  constructor(private http: Http) {
    this.data = null;

    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
  }

  getArticles(tripTime) {
    let length;

    if (tripTime < 15) {
      length = 'short';
    } else if (tripTime < 30) {
      length = 'medium';
    } else if (tripTime < 45) {
      length = 'long';
    } else {
      length = 'longest';
    }

    this.options = new RequestOptions({
      method: RequestMethod.Get,
      url: 'longreadsApi' + `/longreads/${length}`,
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
}

