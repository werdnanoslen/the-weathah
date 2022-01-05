import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from "../environments/environment";

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
    let baseUrl = 'https://www.airnowapi.org/aq/forecast/latLong/?format=application/json';
    let lat = `&latitude=${coords.latitude}`;
    let lon = `&longitude=${coords.longitude}`;
    let key = `&API_KEY=${environment.aqiKey}`;
    let fullUrl = baseUrl + lat + lon + key;
    let res: any;
    return this.http.get(fullUrl);
  }

}
