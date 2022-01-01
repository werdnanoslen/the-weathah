import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  constructor(
    private http: HttpClient
  ) { }

  // Points is the location metadata, including a forecast url
  getPoints(coords?: any) {
    const baseUrl = 'https://api.weather.gov/points';
    const url = `${baseUrl}/${coords.latitude},${coords.longitude}`;
    return this.http.get(url);
  }

  getWeather() {

  }
}
