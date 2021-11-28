import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  temperature = 0;
  heatIndex = 0;
  windSpeed = 0;
  airQuality = 0;
  precipitationAmount = 0;
  precipitationType = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

}