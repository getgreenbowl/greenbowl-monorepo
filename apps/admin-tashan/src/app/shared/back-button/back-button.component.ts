import { Location } from "@angular/common";
import { Component, Input } from "@angular/core";
import { GbButtonComponent } from "../button/button.component";

@Component({
  selector: 'back-button',
  standalone: true,
  imports: [GbButtonComponent],
  template: `<gb-button (onClick)="goback()" variant="inverse" >{{text}}</gb-button>`
})
export class BackButtonComponent {
  constructor(private _location: Location) {}

  @Input() text: string = 'back'

  goback() {
    this._location.back();
  }

}
