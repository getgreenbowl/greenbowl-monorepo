import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'gb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  theme$ = inject(ThemeService).theme$;
  sidebarService = inject(SidebarService);

  sidebarOpen = true;
  private subs = new SubSink();

  ngOnInit(): void {
    this.subs.sink = this.sidebarService.sidebarOpen$.subscribe(
      (value) => (this.sidebarOpen = value)
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
