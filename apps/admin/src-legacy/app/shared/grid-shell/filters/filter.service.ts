import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, inject } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { FilterType } from './types';
import { GbFilterPanelComponent } from './filters';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  overlay = inject(Overlay);

  private filters = new BehaviorSubject<FilterType | []>([]);
  filters$ = this.filters.asObservable().pipe(shareReplay());

  updateFilters(filters: FilterType) {
    this.filters.next(filters);
  }

  openFilterPanel() {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().right().top(),
      hasBackdrop: true,
    });

    const injector = this.getFilterInjector(overlayRef);
    const filterPanel = new ComponentPortal(
      GbFilterPanelComponent,
      null,
      injector
    );
    return overlayRef.attach(filterPanel);
  }

  private getFilterInjector(ref: OverlayRef) {
    const tokens = new WeakMap();

    tokens.set(OverlayRef, ref);

    return Injector.create({
      providers: [{ provide: OverlayRef, useValue: ref }],
    });
  }
}
