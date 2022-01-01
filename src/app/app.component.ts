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
  points: any = [];
  weather: any = [];
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
        this.getPoints();
      })
      .catch((err) => {
        console.error(err.message);
        this.getPoints();
      });
  }

  updateLocation(): Promise<any> {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  }

  getPoints() {
    this.weatherService.getPoints(this.location)
      .subscribe(data => {
        this.points = data;
        console.log('points', this.points)
      })
  }
}
