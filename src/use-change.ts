import { useRef } from "react";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, map, tap } from "rxjs/operators";

import { useObj } from "./use-obj";

export interface Change<T> {
  readonly isFirstChange: boolean;
  readonly value: T;
}

export function useChange<T>(
  val: T,
  compareFn?: (previous: T, current: T) => boolean
): Observable<Change<T>> {
  const firstChangeRef = useRef(true);
  const source = useObj(() => new BehaviorSubject<T>(val));
  const change: Observable<Change<T>> = useObj(() =>
    source.pipe(
      distinctUntilChanged(compareFn),
      map((value): Change<T> => ({ isFirstChange: firstChangeRef.current, value })),
      tap(() => firstChangeRef.current && (firstChangeRef.current = false))
    )
  );
  source.next(val);
  return change;
}
