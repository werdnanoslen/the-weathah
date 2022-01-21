import {Component, Input, SimpleChanges} from '@angular/core';

/**
 * @title Toolbar overview
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() position!: {latitude: number, longitude: number};
  locationString: string = '';

  ngOnChanges(changes: SimpleChanges) {
    let newPosition = changes['position'];
    if (newPosition && newPosition.currentValue) {
      this.position = newPosition.currentValue;
      let lat = this.position.latitude.toFixed(3);
      let lon = this.position.longitude.toFixed(3);
      this.locationString = lat + ', ' + lon;
    }
  }
}
