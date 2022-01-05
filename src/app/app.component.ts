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
  location!: {latitude: number, longitude: number};

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.updateLocation()
      .then((pos) => {
        this.location = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }
        this.getWeather();
        this.getAQI();
      })
      .catch((err) => {
        console.error(err.message);
        this.getWeather();
        this.getAQI();
      });
  }

  updateLocation(): Promise<any> {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  }

  getWeather() {
    this.weatherService.getWeather(this.location)
      .subscribe(data => {
        this.weather = data;
      })
  }

  getAQI() {
    this.weatherService.getAQI(this.location)
      .subscribe(data => {
        this.aqi = data;
      })
  }
}
