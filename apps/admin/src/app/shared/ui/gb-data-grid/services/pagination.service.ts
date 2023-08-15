import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, shareReplay } from 'rxjs';
import { EmitterService } from './internal/event-emitter.service';

@Injectable()
export class PaginationService {
  constructor(private emitterService: EmitterService) {
    this.emitterService.register(this.selectedLimit$, 'limit');
    this.emitterService.register(this.page$, 'page');
  }

  private _selectedLimit = new BehaviorSubject(10);
  private _currentPage = new BehaviorSubject(1);
  private _collectionSize = new BehaviorSubject(0);

  selectedLimit$ = this._selectedLimit.asObservable().pipe(shareReplay());
  page$ = this._currentPage.asObservable().pipe(shareReplay());
  collectionSize$ = this._collectionSize.asObservable().pipe(shareReplay());
  //combining pagination data to single observable that emits an object
  pagination$ = combineLatest([
    this.page$,
    this.collectionSize$,
    this.selectedLimit$,
  ]).pipe(
    map(([page, collectionSize, limit]) => ({ page, collectionSize, limit }))
  );

  updateSelectedLimit(limit: number) {
    this._selectedLimit.next(limit);
  }

  updatePage(page: number) {
    this._currentPage.next(page);
  }

  updateCollectionSize(size: number) {
    this._collectionSize.next(size);
  }
}
