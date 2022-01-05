import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';

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

}
