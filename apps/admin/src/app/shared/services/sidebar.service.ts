import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private menu = new BehaviorSubject([]);
  private sidebarOpen = new BehaviorSubject(true);

  sidebarOpen$ = this.sidebarOpen.asObservable().pipe(shareReplay());

  toggleSidebar() {
    const currentValue = this.sidebarOpen.value;
    this.sidebarOpen.next(!currentValue);
  }
}
