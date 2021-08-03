import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private API_KEY = '9ooxBVMRUg8SzNPKWGhSzLkmp0WcBir7';
  private headers;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers
      .set('Access-Control-Allow-Origin', '*')
      .set('Content-Type', 'application/json')
      .set('Access-Control-Expose-Headers', 'Content-Length');
  }

  public getWeatherData(key) {
    let uri = `https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${key}?apikey=${
      this.API_KEY
    }`;
    console.log('in service' + key);
    debugger;
    return this.http.get<any>(uri);
  }

  public search(searchText) {
    let uri = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${
      this.API_KEY
    }&q=${searchText}`;
    return this.http.get<any>(uri).pipe(take(10));
  }
}
