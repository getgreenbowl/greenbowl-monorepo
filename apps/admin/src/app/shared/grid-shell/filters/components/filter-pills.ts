import { Component, inject } from '@angular/core';
import { GbBadgeComponent } from 'src/app/shared/ui/badge';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FilterService } from '../filter.service';

@Component({
  selector: 'gb-filter-pills',
  standalone: true,
  imports: [GbBadgeComponent, NgFor, NgIf, AsyncPipe],
  template: `<div
    class="flex gap-2 mb-2"
    *ngIf="filterService.filterData$ | async as filterData"
  >
    <div
      class="flex border-dashed border-[1.3px] p-1 rounded-sm items-center justify-center gap-1"
      *ngFor="let filter of filterData"
    >
      <gb-badge
        [text]="filter.field"
        class="rounded-sm capitalize"
        variant="secondary"
      />
      <div
        data-orientation="vertical"
        role="none"
        class="shrink-0 bg-border w-[1px] mx-2 h-4"
      ></div>

      <gb-badge
        [text]="filter.condition"
        class="rounded-sm"
        variant="secondary"
      />
      <div
        data-orientation="vertical"
        role="none"
        class="shrink-0 bg-border w-[1px] mx-2 h-4"
      ></div>
      <gb-badge
        [text]="filter.value.toString()"
        class="rounded-sm"
        variant="secondary"
      />
    </div>
  </div>`,
})
export class GbFilterPillsComponent {
  filterService = inject(FilterService);
}
