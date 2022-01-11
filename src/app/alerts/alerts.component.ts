import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  @Input() alerts: any;
  parsedAlerts: {
    description: string,
    severity: string,
    expires: string
  }[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    let newAlerts = changes['alerts'];
    if (newAlerts && newAlerts.currentValue) {
      this.alerts = newAlerts.currentValue;
      let features: any = this.alerts.features;
      this.parsedAlerts = [];
      for (let f = 0; f < features.length; f++) {
        let feature = features[f];
        let description = feature.properties.description.replace('\n',' ');
        let severity = feature.properties.severity;
        let expires = new Date(feature.properties.expires);
        let month = expires.toLocaleString("en-US", { month: "short" });
        let day = `${month} ${expires.getDate()}, `;
        let minutes = String(expires.getMinutes()).padStart(2, "0");
        let time = `${expires.getHours()}:${minutes}`;
        let friendlyExpire = (this.isToday(expires)) ? time : day + time;
        console.log(friendlyExpire);
        this.parsedAlerts.push({
          description: description,
          severity: severity,
          expires: friendlyExpire
        });
      }
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
  }

}
