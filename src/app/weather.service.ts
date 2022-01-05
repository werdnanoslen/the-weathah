import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  constructor(
    private http: HttpClient,
  ) { }

  getWeather(coords: any) {
    let baseUrl = 'https://api.weather.gov/points';
    let pointsUrl = `${baseUrl}/${coords.latitude},${coords.longitude}`;
    let points: any;
    let observationStations: any;
    return this.http.get(pointsUrl).pipe(mergeMap(pData => {
      points = pData;
      let stationsUrl = `${points.id}/stations`;
      return this.http.get(stationsUrl).pipe(mergeMap(sData => {
        observationStations = sData;
        let oStationUrl = observationStations.observationStations[0];
        let weatherUrl = `${oStationUrl}/observations/latest`;
        return this.http.get(weatherUrl);
      }));
    }));
  }

  getAQI(coords: any) {
    // TODO: https://medium.com/@kudresov/a-better-way-to-inject-environmental-variables-in-angular-d3b2d01a3c5e#5f94
    let aqiKey = '';
    let baseUrl = 'https://www.airnowapi.org/aq/forecast/latLong/?format=application/json';
    let lat = `&latitude=${coords.latitude}`;
    let lon = `&longitude=${coords.longitude}`;
    let key = `&API_KEY=${aqiKey}`;
    let fullUrl = baseUrl + lat + lon + key;
    let res: any;
    return this.http.get(fullUrl);
  }

}
