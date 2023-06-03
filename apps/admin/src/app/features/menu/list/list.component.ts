import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  template: `<gb-grid-shell
    gridTitle="Menu"
    apiURL="/items"
    (toolbarEvents)="toolbarClick($event)"
  >
    <!-- columns -->
    <gb-column field="id" alignment="left" />
    <gb-column field="name" />
    <gb-column field="calories" />
    <gb-column field="energy" />
    <gb-column field="fat" />
    <gb-column field="protien" />
    <gb-column field="price" />
    <gb-column field="carbs" />
  </gb-grid-shell> `,
})
export class ListComponent {
  constructor(private router: Router) {}

  // actions [
  //   {
  //     icon: 'fa-light fa-pen',
  //     tooltip: 'edit',
  //   },
  // ];

  toolbarClick({ id }: { id: string; name: string }) {
    if (id === 'add') {
      this.router.navigate(['/menu/add']);
    }
  }
}
