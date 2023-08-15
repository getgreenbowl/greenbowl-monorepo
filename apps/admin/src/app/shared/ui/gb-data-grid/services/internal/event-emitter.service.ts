import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmitterService {
  private registeredEmitters = new BehaviorSubject<
    Record<string, Observable<any>>
  >({});
  registeredEmitters$ = this.registeredEmitters.asObservable();

  register(observable: Observable<any>, key: string) {
    this.registeredEmitters.next({
      ...this.registeredEmitters.value,
      [key]: observable,
    });
  }

  getEmitterValues() {
    const values = Object.values(this.registeredEmitters.value);
    return combineLatest(values);
  }
}
