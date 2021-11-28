import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'the-weathah';
  map = true;
  weather: any = [];

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getWeather()
      .subscribe(data => {
        this.weather = data;
        console.log(this.weather)
      })
  }
}
