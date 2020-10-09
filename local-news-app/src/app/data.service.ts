import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private locationUrl = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong='; 
  private weatherUrl = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/';
  //https://www.metaweather.com/api/location/search/?lattlong=36.96,-122.02

  constructor(private http: HttpClient) { }

  getWoeid(latt, long): Observable<any[]> {
    return this.http.get<any[]>(this.locationUrl + latt + ',' + long);
  }

  getWeatherDetails(woeid: string): Observable<any> {
    return this.http.get<any>(this.weatherUrl + woeid);
  }
}
