import { Injectable } from '@angular/core';
import { BehaviorSubject, share, shareReplay } from 'rxjs';

type ToolbarBaseOptions = Array<
  'add' | 'export' | 'clear-selection' | 'filters' | 'clear-filters'
>;

@Injectable()
export class GridConfigService {
  private _id = new BehaviorSubject('');
  private _title = new BehaviorSubject('');
  private _toolbarBaseOptions = new BehaviorSubject<ToolbarBaseOptions>([
    'add',
    'export',
    'clear-filters',
    'clear-selection',
    'filters',
  ]);

  id = this._id.asObservable().pipe(shareReplay());
  title = this._title.asObservable().pipe(shareReplay());
  toolBarOptions = this._toolbarBaseOptions.asObservable().pipe(shareReplay());

  updateID(id: string) {
    this._id.next(id);
  }

  updateTitle(title: string) {
    this._title.next(title);
  }

  hideToolbarOptions(hideOptions: ToolbarBaseOptions) {
    this._toolbarBaseOptions.next([
      ...new Set(this._toolbarBaseOptions.value.concat(hideOptions)),
    ]);
  }
}
