import { Component } from '@angular/core';

@Component({
  selector: 'app-data-charts',
  templateUrl: './data-charts.component.html',
  styleUrls: ['./data-charts.component.scss'],
})
export class DataChartsComponent {
  mockItem = {
    id: 1,
    name: 'Vishal acharya',
    pinCode: 390012,
    value: 1000,
    recieved: new Date(),
  };
  mock = new Array(10).fill(this.mockItem);
}
