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
    <gb-column field="status" />
    <!-- columns -->

    <!-- Filters -->
    <gb-grid-filter label="Name" field="name" />
    <gb-grid-filter field="protien" type="number" />
    <gb-grid-filter field="price" type="number" />
    <gb-grid-filter field="carbs" type="number" />
    <gb-grid-filter field="createdAt" type="date" label="Created At" />
    <gb-grid-filter field="status" type="select" [items]="statusOptions" />
    <!-- Filters -->

    <!-- Action -->
    <gb-action icon="edit" (handleClick)="edit($event)" tooltip="Edit" />
    <!-- Action -->
  </gb-grid-shell> `,
})
export class ListComponent {
  constructor(private router: Router) {}

  statusOptions = ['Active', 'InActive'];

  addItem() {
    this.router.navigate(['/items/add']);
  }

  edit(e: any) {
    console.log(e, 'this is e');
  }
}
