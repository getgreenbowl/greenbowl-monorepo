import { Injectable, QueryList } from '@angular/core';
import { BehaviorSubject, map, shareReplay } from 'rxjs';
import { EmitterService } from './internal/event-emitter.service';
import { GbActionComponent } from '../components/base-table/action';

@Injectable()
export class ActionService extends EmitterService {
  private _actions = new BehaviorSubject<QueryList<GbActionComponent> | null>(
    null
  );

  actions$ = this._actions.asObservable().pipe(shareReplay());
  hasActions$ = this.actions$.pipe(
    map((data) => !!data?.length),
    shareReplay()
  );

  updateActions(actions: QueryList<GbActionComponent>) {
    const _actions = actions.toArray();
    const result = [];
    for (const action of _actions) {
      action.action = action._action || action.action;
      action._action = null;
      result.push(action);
    }
    actions.reset(result);
    this._actions.next(actions);
  }
}
