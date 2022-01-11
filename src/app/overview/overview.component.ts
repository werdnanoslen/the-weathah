import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input() weather: any;
  @Input() aqi: any;
  description: string = '';
  temperature: string = '';
  tempQualifier: string = '';
  windSpeed: string = '';
  airQuality: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    let newWeather = changes['weather'];
    if (newWeather && newWeather.currentValue) {
      this.weather = newWeather.currentValue;
      let w: any = this.weather.properties;
      this.description = w.textDescription;
      this.temperature = `${Math.round(w.temperature.value)} ºC`;
      let heatIndex: number = w.heatIndex.value;
      let windChill: number = w.windChill.value;
      if (heatIndex !== null) {
        this.tempQualifier = `(feels like ${Math.round(heatIndex)} ºC)`;
      } else if (windChill !== null) {
        this.tempQualifier = `(feels like ${Math.round(windChill)} ºC)`;
      }
      this.windSpeed = `${Math.round(w.windSpeed.value)} kph`;
    }

    let newAQI = changes['aqi'];
    if (newAQI && newAQI.currentValue) {
      this.aqi = newAQI.currentValue[0];
      this.airQuality = `${this.aqi.Category.Name} (${this.aqi.AQI})`;
    }
  }

}
