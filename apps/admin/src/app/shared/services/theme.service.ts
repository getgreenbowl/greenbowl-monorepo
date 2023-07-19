import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private ls: LocalStorageService) {
    this.changeTheme(this.ls.get('mode'));
  }

  private theme = new BehaviorSubject<Theme>('light');
  theme$ = this.theme.asObservable().pipe(shareReplay());

  changeTheme(theme: Theme) {
    document.body.classList.remove(this.theme.value);
    document.body.classList.add(theme);
    this.theme.next(theme);
    this.ls.set('mode', theme);
  }
}
