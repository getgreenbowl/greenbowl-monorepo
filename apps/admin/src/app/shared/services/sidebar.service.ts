import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, shareReplay, combineLatest, map } from 'rxjs';
import { Menu } from 'src/app/layout/helpers/sidebar/menu-data';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  ls = inject(LocalStorageService);
  private menu = new BehaviorSubject(Menu);
  private archive = new BehaviorSubject<number[]>(
    this.ls.get('archiveMenu') || []
  );
  private sidebarOpen = new BehaviorSubject(true);

  mainMenu$ = combineLatest([
    this.menu.asObservable(),
    this.archive.asObservable(),
  ]).pipe(
    map(([menu, archived]) => {
      return menu.filter((m) => !archived.includes(m.id));
    })
  );

  archived$ = combineLatest([
    this.menu.asObservable(),
    this.archive.asObservable(),
  ]).pipe(
    map(([menu, archived]) => {
      return menu.filter((m) => archived.includes(m.id));
    })
  );

  sidebarOpen$ = this.sidebarOpen.asObservable().pipe(shareReplay());

  toggleSidebar() {
    const currentValue = this.sidebarOpen.value;
    this.sidebarOpen.next(!currentValue);
  }

  archiveMenu(id: number) {
    const archive = this.archive.value;
    archive.push(id);
    this.archive.next(archive);
    this.ls.set('archiveMenu', archive);
  }

  unarchiveMenu(id: number) {
    const archive = this.archive.value;
    archive.splice(
      archive.findIndex((i) => i === id),
      1
    );
    this.archive.next(archive);
    this.ls.set('archiveMenu', archive);
  }
}
