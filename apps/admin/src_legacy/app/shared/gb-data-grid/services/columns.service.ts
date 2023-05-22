import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, map, shareReplay } from 'rxjs';
import { GbGridColumnsComponent } from '../components/base-table/columns';

@Injectable()
export class GridColumnService {
  private _columns = new BehaviorSubject<QueryList<GbGridColumnsComponent>|null>(null);

  columns$ = this._columns.asObservable().pipe(shareReplay());
  fields$ = this.columns$.pipe(
    map((columns) => columns?.map((item) => item.field))
  );
  totalColumns$ = this.columns$.pipe(map((columns) => columns?.length));

  updateColumns(columns: QueryList<GbGridColumnsComponent>) {
    this._columns.next(columns);
  }
}
