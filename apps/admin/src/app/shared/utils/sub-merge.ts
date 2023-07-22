const isFunction = (fn: any) => typeof fn === 'function';
export type Nullable<T> = T | null | undefined;

export interface SubscriptionLike {
  unsubscribe(): void;
}

/**
 * Subscription merge that holds Observable subscriptions
 * until you call unsubscribe on it in ngOnDestroy.
 */
export class SubMerge {
  protected _subs: Nullable<SubscriptionLike>[] = [];

  set merge(subscription: Nullable<SubscriptionLike>) {
    this._subs.push(subscription);
  }

  unsubscribe() {
    this._subs.forEach(
      (sub) => sub && isFunction(sub.unsubscribe) && sub.unsubscribe()
    );
    this._subs = [];
  }
}
