import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { Menu } from './menu-data';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gb-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  ls = inject(LocalStorageService);
  router = inject(Router);
  sidebarService = inject(SidebarService);

  @Output() changeTheme = new EventEmitter();
  @Input() theme = 'light';

  archiveMenu: number[] = this.ls.get('archiveMenu') || [];
  menu = this.filterArchivedMenu(Menu);

  handleArchiveMenu(id: number) {
    this.archiveMenu.push(id);
    this.ls.set('archiveMenu', this.archiveMenu);
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  private filterArchivedMenu(menu: typeof Menu) {
    return menu.filter((m) => !this.archiveMenu.includes(m.id));
  }
}
