import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  template: `<gb-grid-shell gridTitle="Menu" apiURL="/items">
    <gb-toolbar icon="add" name="Add" (handleClick)="addItem()" />
    <!-- columns -->
    <gb-column field="id" alignment="left" />
    <gb-column field="name" alignment="left" />
    <gb-column field="fat" />
    <gb-column field="protien" />
    <gb-column field="price" />
    <gb-column field="carbs" />
    <!-- columns -->

    <gb-action icon="edit" (handleClick)="edit($event)" tooltip="Edit" />
  </gb-grid-shell> `,
})
export class ListComponent {
  constructor(private router: Router) {}

  addItem() {
    this.router.navigate(['/menu/add']);
  }

  edit(e: any) {
    console.log(e, 'this is e');
  }
}
