import { BehaviorSubject } from 'rxjs';
import { Emitter } from '../../types';
import { EventEmitter } from '@angular/core';

export class EmitterService implements Emitter {
  private _emitter = new BehaviorSubject<EventEmitter<any> | null>(null);

  emit(value: any) {
    const emitter = this._emitter.getValue();
    if (emitter) {
      emitter.emit(value);
    }
  }

  updateEmitter(emitter: EventEmitter<any>) {
    this._emitter.next(emitter);
  }
}
