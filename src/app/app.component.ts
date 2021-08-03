import { Component, VERSION } from '@angular/core';
import { fromEvent, Observable, OperatorFunction,of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
  catchError
} from 'rxjs/operators';
import { DataService } from './data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  results = [];
  model: any;
  searching = false;
  searchFailed = false;

  constructor(private dataService: DataService) {}

search: OperatorFunction<string,  readonly {LocalizedName}[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.dataService.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  formatter = (x:{LocalizedName: string}) =>  x.LocalizedName;

onItemSelection(event){
 this.dataService.getWeatherData(event.item.Key).subscribe((response)=>{
    this.results = response;
 })
}
}
