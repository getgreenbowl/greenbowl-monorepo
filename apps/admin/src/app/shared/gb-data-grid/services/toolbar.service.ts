import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { EmitterService } from './internal/event-emitter.service';
import { GbGridToolbarComponent } from '../components/toolbar/gb-toolbar';

@Injectable()
export class ToolbarService extends EmitterService {
  private _options = new BehaviorSubject<QueryList<GbGridToolbarComponent>|null>(null);

  options$ = this._options.asObservable().pipe(shareReplay());

  updateToolbar(incoming: QueryList<GbGridToolbarComponent>) {
    this._options.next(incoming);
  }
}
