import { Injectable } from "@angular/core";
import { BehaviorSubject, map, shareReplay } from "rxjs";



@Injectable()
export class GridDataService {
  private _data = new BehaviorSubject<any[]>([]);
  private _totalCount = new BehaviorSubject<number>(0);

  data$ = this._data.asObservable().pipe(shareReplay());
  totalCount$ = this._totalCount.asObservable().pipe(shareReplay())

  hasData$ = this.data$.pipe(map((data) => !!data.length));

  updateData(data: any[]) {
    this._data.next(data)
  }

  updateTotalCount(count: number) {
    this._totalCount.next(count);
  }


}
