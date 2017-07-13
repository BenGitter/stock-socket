import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class StockService {

  constructor(private http:Http) { }

  getQuoteData(quote:string){
    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    return this.http.get("/api/quote/"+quote, {headers})
      .map(res => res.json());
  }
}
