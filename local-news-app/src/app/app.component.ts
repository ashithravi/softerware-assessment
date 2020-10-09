import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'local-news-app';
  woeid = '';
  weatherInfo = {
    weather_state_abbr: ''
  };

  constructor(private data: DataService) {}

  ngOnInit() {
    if (navigator.geolocation) {
      console.log('test');
      navigator.geolocation.getCurrentPosition(position => {
        console.log('position ', position);
        this.data.getWoeid(position.coords.latitude, position.coords.longitude).subscribe(response => {
          if (response && response.length) {
            this.woeid = response[0].woeid;
            this.data.getWeatherDetails(this.woeid).subscribe(weatherDetails => {
              console.log('weatherDetails ', weatherDetails);
              this.weatherInfo = weatherDetails && weatherDetails.consolidated_weather && weatherDetails.consolidated_weather[0];
              console.log('weatherDetails[0] ', this.weatherInfo);
            });
          }
        });
      });
    } else { 
      //x.innerHTML = "Geolocation is not supported by this browser.";

      //https://www.metaweather.com/api/location/search/?lattlong=12.9698066,77.7499632

      //https://www.metaweather.com/api/location/search/?lattlong=36.96,-122.02
    }

  }

  getWeatherImg() {
    return "/assets/" + this.weatherInfo.weather_state_abbr + ".svg";
  }
}
