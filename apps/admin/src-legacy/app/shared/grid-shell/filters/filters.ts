import { OverlayRef } from '@angular/cdk/overlay';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubSink } from 'subsink';
import { SgbButtonComponent } from '../../ui/button';
import { GbInputComponent } from '../../ui/form/input';
import { FilterService } from './filter.service';
import { FilterType } from './types';
import { NgFor, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'gb-grid-filters',
  imports: [SgbButtonComponent, GbInputComponent, NgFor, NgIf],
  templateUrl: './filters.component.html',
})
export class GbFilterPanelComponent implements OnInit, OnDestroy {
  private overlayRef = inject(OverlayRef);
  private filterService = inject(FilterService);
  private fb = inject(FormBuilder);

  private subs = new SubSink();

  filters!: FilterType;
  filterForm!: FormGroup;
  get controls() {
    return this.filterForm?.controls;
  }

  @Output() search = new EventEmitter();

  ngOnInit(): void {
    this.subs.sink = this.overlayRef.backdropClick().subscribe({
      next: () => this.overlayRef.dispose(),
    });

    this.subs.sink = this.filterService.filters$.subscribe((filter) => {
      if (filter instanceof QueryList) {
        this.assignFilters(filter);
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  close() {
    this.overlayRef.dispose();
  }

  handleSearch() {
    this.search.emit(this.filterForm.value);
    this.overlayRef.dispose();
  }

  private assignFilters(filters: FilterType) {
    const rawFilters = filters.toArray();
    const form: Record<string, any[]> = {};
    for (const filter of rawFilters) {
      form[filter.field] = [null];
    }
    this.filterForm = this.fb.group(form);
    this.filters = filters;
  }
}
