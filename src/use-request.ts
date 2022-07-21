import { useCallback, useEffect, useState } from "react";
import {
  filter,
  finalize,
  interval,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  tap,
} from "rxjs";

import { isNumber } from "./utils/type-check/is-number";

import { useLatest } from "./use-latest";
import { useObj } from "./use-obj";
import { useChange } from "./use-change";

export function useRequest<T>(
  fn: () => Promise<T> | Observable<T>,
  options?: { requestInterval?: number }
) {
  const fnLatest = useLatest(fn);

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const requestEventSource$ = useObj(() => new Subject<void>());
  const requestEvent$ = useObj(() =>
    requestEventSource$.pipe(
      tap(() => setLoading(true)),
      finalize(() => setLoading(false)),
      switchMap(() => fnLatest.current())
    )
  );

  const requestInterval$ = useChange(options?.requestInterval);

  useEffect(() => {
    const subscriptions = new Subscription();

    const requestEventSub = requestEvent$.subscribe({
      next: (res) => {
        console.log("i ame here")
        setData(res);
        setError(null);
      },
      error: setError,
    });
    subscriptions.add(requestEventSub);

    const requestIntervalSub = requestInterval$
      .pipe(
        switchMap((val) => (isNumber(val) ? interval(val) : of(null))),
        filter((v) => v !== null)
      )
      .subscribe(request);
    subscriptions.add(requestIntervalSub);

    request();

    return () => subscriptions.unsubscribe();
  }, []);

  const request = useCallback(() => requestEventSource$.next(), []);

  return {
    data,
    doRequest: request,
    loading,
    error,
  };
}
