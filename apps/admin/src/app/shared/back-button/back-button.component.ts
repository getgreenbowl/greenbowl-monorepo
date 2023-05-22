import { Location } from "@angular/common";
import { Component, Input } from "@angular/core";
import { GbButtonComponent } from "../button/button.component";

@Component({
  selector: 'back-button',
  standalone: true,
  imports: [GbButtonComponent],
  template: `<gb-button (handleClick)="goback()" variant="inverse" >{{text}}</gb-button>`
})
export class BackButtonComponent {
  constructor(private _location: Location) {}

  @Input() text = 'back'

  goback() {
    this._location.back();
  }

}
