import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface WeatherRequest {
  latitude: string;
  longitude: string;
}

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  constructor(
    private http: HttpClient
  ) { }

  getWeather(weatherRequest?: WeatherRequest) {
    const url = 'https://api.weather.gov/';
    return this.http.get(url);
  }
}
