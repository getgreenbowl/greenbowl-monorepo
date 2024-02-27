import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';

@Component({
  selector: 'gb-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  ls = inject(LocalStorageService);
  router = inject(Router);
  sidebarService = inject(SidebarService);

  @Output() changeTheme = new EventEmitter();
  @Input() theme = 'light';

  search = new FormControl('');

  private subs = new SubSink();

  ngOnInit(): void {
    this.searchTermValueChanges();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  private searchTermValueChanges() {
    this.subs.sink = this.search.valueChanges.subscribe((term) =>
      this.sidebarService.filterMenu(term)
    );
  }
}
