import { Component } from '@angular/core';
import { MENU } from './menu-data';

@Component({
  selector: 'gb-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menu = MENU
}
