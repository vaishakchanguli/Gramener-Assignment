# Weather Report
[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-ivy-suz1jg)

Appraoch: 

A typeahead is used to search for city names.
The city names are loaded as the user types in. 
On selecting the city name, another request is sent to an external source to get 12H weather report(some problem with hr API)
On recieving, the weather details are displayed on the card, on hourly bases.

All the backed communication handled inside a service.

UI:
Bootstrap and ng-bootstrap is used to design the UI controls

API:
API's are used form https://developer.accuweather.com/ domain.
2 API's used to implement the weather report app.

NOTE: There is a daily limit on API calls usage form https://developer.accuweather.com. If it's not working i request you to visit this application the next day.


#Vaishak