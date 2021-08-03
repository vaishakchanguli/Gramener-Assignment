import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fromEvent, Observable, OperatorFunction, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private API_KEY = '9ooxBVMRUg8SzNPKWGhSzLkmp0WcBir7';
  constructor(private http: HttpClient) {}

  public getWeatherData(searchText) {
    let uri = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${
      this.API_KEY
    }&q=${searchText}`;
    console.log('in service' + searchText);
    debugger;
    return this.http.get<any>(uri);
  }

  public search(searchText) {
    let uri = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${
      this.API_KEY
    }&q=${searchText}`;
    //return this.http.get<any>(uri).pipe(
    //map(()=>{}));
    console.log('here');
    return of([{ name: 'man', country: 'india', key: 122 }]);
  }
}
