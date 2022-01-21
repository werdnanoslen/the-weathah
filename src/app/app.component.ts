import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'the-weathah';
  map: boolean = true;
  weather: any;
  aqi: any;
  latlon!: {latitude: number, longitude: number};
  alerts: any;

  constructor(
    private weatherService: WeatherService
  ) { }

  latlonEmitterHandler(latlon: {latitude: number, longitude: number}) {
    this.latlon = latlon;
    console.log(this.latlon)
    this.getWeather();
    this.getAQI();
    this.getAlerts();
  }

  getWeather() {
    this.weatherService.getWeather(this.latlon)
      .subscribe(data => {
        this.weather = data;
      })
  }

  getAQI() {
    this.weatherService.getAQI(this.latlon)
      .subscribe(data => {
        this.aqi = data;
      })
  }

  getAlerts() {
    this.weatherService.getAlerts(this.latlon)
      .subscribe(data => {
        this.alerts = data;
      })
  }
}
