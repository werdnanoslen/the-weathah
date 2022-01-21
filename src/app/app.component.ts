import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'the-weathah';
  map: boolean = true;
  weather: any;
  aqi: any;
  position!: {latitude: number, longitude: number};
  alerts: any;

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.updatePosition()
      .then((pos) => {
        this.position = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }
        this.getWeather();
        this.getAQI();
        this.getAlerts();
      })
      .catch((err) => {
        console.error(err.message);
        this.getWeather();
        this.getAQI();
        this.getAlerts();
      });
  }

  updatePosition(): Promise<any> {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  }

  getWeather() {
    this.weatherService.getWeather(this.position)
      .subscribe(data => {
        this.weather = data;
      })
  }

  getAQI() {
    this.weatherService.getAQI(this.position)
      .subscribe(data => {
        this.aqi = data;
      })
  }

  getAlerts() {
    this.weatherService.getAlerts(this.position)
      .subscribe(data => {
        this.alerts = data;
      })
  }
}
