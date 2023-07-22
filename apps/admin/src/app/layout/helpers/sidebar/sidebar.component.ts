import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Menu } from './menu-data';

@Component({
  selector: 'gb-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() changeTheme = new EventEmitter();
  @Input() theme = 'light';

  menu = Menu;
}
