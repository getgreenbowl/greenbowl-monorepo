import { Component } from '@angular/core';

@Component({
  selector: 'gb-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menu = [
    {
      name: 'Analytics',
      link: '/',
    },
    {
      name: 'Menu management',
      link: '/menu',
    },
    {
      name: 'App users',
      link: '/app-users',
    },
    {
      name: 'Subscription',
      link: '/subscription',
    },

  ] as const;
}
