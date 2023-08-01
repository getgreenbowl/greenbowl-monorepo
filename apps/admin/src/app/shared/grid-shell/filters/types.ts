import { QueryList } from '@angular/core';
import { GbGridFilterComponent } from './components/grid-filter';

export type FilterType = QueryList<GbGridFilterComponent>;

export type AllowedFilterTypes = 'text' | 'number' | 'select' | 'date';

// type: filter.type,
// value: formValue,
// field: filter.field,
// condition: this.conditionForm.value[filter.field],

export type FilterData = {
  type: AllowedFilterTypes;
  value: number | string;
  field: string;
  condition:
    | 'Equals'
    | 'Between'
    | 'Not equals'
    | 'Greater than'
    | 'Less than'
    | 'Contains';
};
