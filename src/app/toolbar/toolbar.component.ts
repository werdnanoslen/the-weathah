import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

/**
 * @title Toolbar overview
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() latlon!: {latitude: number, longitude: number};
  @Output() latlonEmitter: EventEmitter<any> = new EventEmitter();
  latlonString: string = '';

  inputChange(event: any) {
    this.latlonString = event.target.value;
    this.latlonChange();
  }

  latlonChange(): void {
    let regex = /[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)/;
    if (regex.test(this.latlonString)) {
      let latlon = this.latlonString.split(',');
      this.latlon = {
        latitude: Number(latlon[0]),
        longitude: Number(latlon[1])
      };
      this.latlonEmitter.emit(this.latlon);
    }
  }

  ngOnInit(): void {
    this.getPosition()
      .then((pos) => {
        this.latlon = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };
        let lat = this.latlon.latitude.toFixed(3);
        let lon = this.latlon.longitude.toFixed(3);
        this.latlonString = lat + ', ' + lon;
        this.latlonChange()
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  }
}
