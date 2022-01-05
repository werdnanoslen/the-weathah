import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input() weather: any;
  description: string = '';
  temperature: string = '';
  tempQualifier: string = '';
  windSpeed: string = '';
  airQuality: string = '';
  precipitationAmount: string = '';
  precipitationType: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['weather'].firstChange) return;
    this.weather = changes['weather'].currentValue;
    console.log(`current conditions: ${this.weather.id}`);
    let w = this.weather.properties;

    this.description = w.textDescription;
    this.temperature = `${w.temperature.value} ºC`;
    this.tempQualifier = `(feels like ${w.heatIndex.value | w.windChill.value} ºC)`;
    this.windSpeed = `${w.windSpeed.value} kph`;
  }

}
