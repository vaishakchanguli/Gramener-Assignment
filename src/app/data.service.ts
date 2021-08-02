import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataService {
  private API_KEY = '9ooxBVMRUg8SzNPKWGhSzLkmp0WcBir7';
  constructor(private http: HttpClient) {}

  public getWeatherData(searchText) {
    let uri = `${searchText}`;
    console.log('in service' + searchText);
    debugger;
    return this.http.get<any>(uri);
  }
}
