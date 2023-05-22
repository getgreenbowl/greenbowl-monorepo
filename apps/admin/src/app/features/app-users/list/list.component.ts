import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  template: `
  <gb-grid-shell
    gridTitle="App users"
    apiURL="/posts"
  >
    <gb-action icon="fa-light fa-pen" tooltip="Edit" />

    <!-- columns -->
    <gb-column field="id" alignment="right" title="ID" />
    <gb-column field="title" alignment="left" />
    <gb-column field="userId" />
    <!-- columns -->
  </gb-grid-shell>`,
})
export class AppUserListComponent {}
