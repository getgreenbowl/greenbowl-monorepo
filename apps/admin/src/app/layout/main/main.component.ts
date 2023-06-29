import { Component } from '@angular/core';
import { ThemeType } from 'src/app/shared/models/mode';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  theme: ThemeType = 'light';
  constructor(private ls: LocalStorageService) {
    const theme = this.ls.get('mode') || 'light';
    this.changeTheme(theme);
  }

  changeTheme(updatedTheme: ThemeType) {
    document.body.classList.remove(this.theme);
    document.body.classList.add(updatedTheme);
    this.theme = updatedTheme;
    this.ls.set('mode', updatedTheme);
  }
}
