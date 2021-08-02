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
  weatherResults = '';
   model: any;
  searching = false;
  searchFailed = false;

  constructor(private dataService: DataService) {}

search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
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


  ngAfterViewInit() {
    console.log('initial');
    const searchBox = document.getElementById('search-box') as HTMLInputElement;
    debugger;
    const typeahead = fromEvent(searchBox, 'input')
      .pipe(
        map(e => (e.target as HTMLInputElement).value),
        filter(text => text.length > 2),
        debounceTime(10),
        distinctUntilChanged(),
        switchMap(searchTerm => this.dataService.getWeatherData(searchTerm))
      )
      .subscribe(response => {
        console.log('response');
      });
  }
}
