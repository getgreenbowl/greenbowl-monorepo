import { QueryList } from '@angular/core';
import { GbGridFilterComponent } from './components/grid-filter';

export type FilterType = QueryList<GbGridFilterComponent>;

export type AllowedFilterTypes = 'text' | 'number' | 'select' | 'date';
