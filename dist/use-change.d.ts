import { Observable } from "rxjs";
export interface Change<T> {
    readonly isFirstChange: boolean;
    readonly value: T;
}
export declare function useChange<T>(val: T, compareFn?: (previous: T, current: T) => boolean): Observable<Change<T>>;
