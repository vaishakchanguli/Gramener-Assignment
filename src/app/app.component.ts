import { Component, VERSION } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import { DataService } from './data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private weatherResults = '';
  constructor(private dataService: DataService) {}

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
