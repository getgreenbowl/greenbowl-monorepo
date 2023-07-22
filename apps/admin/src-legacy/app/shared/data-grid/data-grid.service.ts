import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map,  shareReplay } from 'rxjs';
import {
  actionButtonType,
  filterEmitterType,
  GRID_OPTIONS,
  headerObject,
} from './data-grid.type';
import { toggleInArray } from './utils';

type DensityType = 'conjusted' | 'normal' | 'comfortable';

const initFilterValues = {
  page: 1,
  limit:10,
  firstChange: true,
};

@Injectable({
  providedIn: 'root',
})
export class DataGridService {
  private _filterEmitter = new BehaviorSubject<filterEmitterType>({
    ...initFilterValues,
  });
  private _headers = new BehaviorSubject<headerObject[]>([]);
  private _data = new BehaviorSubject<any[]>([]);
  private _filterDropdownData = new BehaviorSubject<any>(null);
  private _actionbuttons = new BehaviorSubject<actionButtonType[]>([]);
  private _allSelected = new BehaviorSubject<boolean>(false);
  private _excludedEntries = new BehaviorSubject<number[]>([]);
  private _includedEntries = new BehaviorSubject<number[]>([]);
  private _showFilters = new BehaviorSubject<boolean>(false);
  private _density = new BehaviorSubject<DensityType>('normal');
  private _defaultSelectState = new BehaviorSubject<{
    allSelect: boolean,
    includedEntries: number[],
    excludedEntries: number[]
  }>({
    allSelect: false,
    includedEntries: [],
    excludedEntries: []
  })

  getFilter$ = this._filterEmitter.asObservable();
  headers$ = this._headers.asObservable().pipe(shareReplay());
  data$ = this._data.asObservable().pipe(shareReplay());
  actionButtons$ = this._actionbuttons.asObservable();
  allSelected$ = this._allSelected.asObservable();
  excludedEntries$ = this._excludedEntries.asObservable();
  includeEntries$ = this._includedEntries.asObservable();
  showfilter$ = this._showFilters.asObservable();
  density$ = this._density.asObservable();

  private _updateExcluded(id: number) {
    const arr = toggleInArray(this._excludedEntries.value, id);
    this._excludedEntries.next([...arr]);
  }

  private _updateIncluded(id: number) {
    const arr = toggleInArray(this._includedEntries.value, id);
    this._includedEntries.next([...arr]);
  }

  initialSelected(arr:any) {
    const defaultValue = {...this._defaultSelectState.value}
    this._defaultSelectState.next({...defaultValue, includedEntries: arr})
    this._includedEntries.next(arr);
  }

  private _updateEmitterValues(
    key: 'sort' | 'filters' | 'limit' | 'page',
    value: any
  ) {
    const filterObj = {
      ...this._filterEmitter.value,
      [key]: value,
      latestChange: key,
      firstChange: false,
    };

    this._filterEmitter.next(filterObj);
  }

  updateDensity(event: any) {
    this._density.next(event.target.value);
  }

  resetSelection() {
    const {excludedEntries, includedEntries, allSelect} = this._defaultSelectState.value;
    this._excludedEntries.next(excludedEntries);
    this._includedEntries.next(includedEntries);
    this._allSelected.next(allSelect);
    this._filterEmitter.next({ ...initFilterValues });
    // this._filterEmitter.complete();
  }

  clearFilter() {
    this._updateEmitterValues('filters', false);
    this._showFilters.next(false);
  }

  getCurrentState() {
    return {
      filters: this._filterEmitter.value,
      excluded: this._excludedEntries.value,
      included: this._includedEntries.value,
      selectAll: this._allSelected.value,
    };
  }

  //determine if single data is selected
  dataChecked(id: number) {
    return combineLatest([
      this.allSelected$,
      this.excludedEntries$,
      this.includeEntries$,
    ]).pipe(
      map(([allSelection, ex, inc]) => {
        if (allSelection && !ex.includes(id)) {
          return true;
        }
        if (!allSelection && inc.includes(id)) {
          return true;
        }
        return false;
      }),
      shareReplay(1)
    );
  }

  toggleFilterVisibility() {
    this._showFilters.next(!this._showFilters.value);
  }

  toggleSelectAll(event:any) {
    this._excludedEntries.next([]);
    this._includedEntries.next([]);
    this._allSelected.next(event.target.checked);
  }

  isExcluded = (id: number, returnType: 'boolean' | 'index' = 'boolean') => {
    const arr = this._excludedEntries.value;
    if (returnType == 'boolean') {
      return arr.includes(id);
    }
    return arr.findIndex((x) => x == id);
  };

  isIncluded = (id: number, returnType: 'boolean' | 'index' = 'boolean') => {
    const arr = this._includedEntries.value;
    if (returnType == 'boolean') {
      return arr.includes(id);
    }
    return arr.findIndex((x) => x == id);
  };

  selectedCount(totalCount: number) {
    return combineLatest([
      this.allSelected$,
      this.excludedEntries$,
      this.includeEntries$,
    ]).pipe(
      map(([allSelected, excluded, included]) => {
        if (allSelected) {
          return totalCount - excluded.length;
        }
        return included.length;
      })
    );
  }

  selectedEntriesData() {
    return combineLatest([
      this.allSelected$,
      this.excludedEntries$,
      this.includeEntries$,
    ]).pipe(
      map(([allSelected, excluded, included]) => {
        return { allSelected, excluded, included };
      })
    );
  }

  handleDataCheck(id: number) {
    if (this._allSelected.value) {
      this._updateExcluded(id);
      return;
    }
    this._updateIncluded(id);
  }

  hasActions() {
    if (!this._actionbuttons.value) {
      return false;
    }
    return this._actionbuttons.value?.length;
  }

  updateActionButtons(actions: actionButtonType[]) {
    this._actionbuttons.next(actions);
  }

  toggleVisibility(index: number) {
    const headers = this._headers.value;
    headers[index].visible = !headers[index].visible;
    this.updateHeaders(headers);
  }

  getFilterItems(key: string) {
    if (!this._filterDropdownData.value) {
      return [];
    }
    return this._filterDropdownData.value[key];
  }

  updateFilterItems(items: any[] | undefined) {
    if (!items) return;
    this._filterDropdownData.next(items);
  }

  updateHeaders(headers: headerObject[]) {
    this._headers.next(headers);
  }

  updateData(data: any[]) {
    this._data.next(data);
  }

  //handle sort change;
  handleSortChange(sortOptions: { [key: string]: 'ASC' | 'DESC' | undefined }) {
    this._updateEmitterValues('sort', sortOptions);
  }

  handleFilterChange(filter: { [key: string]: any }) {
    let val = {};
    if (this._filterEmitter.value?.filters) {
      val = this._filterEmitter.value.filters;
    }

    const sanitizedFilter = {
      ...val,
      ...filter,
    }
    // if (sanitizedFilter) {
    //   sanitizedFilter = sanitizedFilter;
    // } else {
    //   this.resetSelection();
    // }

    this._updateEmitterValues('filters', sanitizedFilter);
  }

  handlePageChange(page: number) {
    this._updateEmitterValues('page', page);
  }

  handleLimitChange(limit: number) {
    this._updateEmitterValues('limit', limit);
  }

  handleHeaderOptions(
    obj: { name: string; type: string; value: any },
    header: headerObject
  ) {
    const {  type, value } = obj;
    if (type == GRID_OPTIONS.SORT) {
      this.handleSortChange({ [header.name]: value });
    }
  }
}
