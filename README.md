# phooks - Powerful react hooks

## about effect

### useChange

Combine state/props with rxjs, transfer them to Observable.

```ts
import { distinctUntilChange, Observable } from "rxjs/operators";
import { useObservable } from "rxjs-hooks";

interface User {
  id: string;
}

const Foo: React.FC<{ user: User }> = ({ user }) => {
  const userChange$: Observable<User> = useChange(user);
  const user$ = useObservable(() => userChange$.pipe(
    filter(({ id }) => id !== ""),
    distinctUntilChange(({ id: id_prev }, { id: id_curr }) => id_prev === id_curr)),
    // do something...
  );

  return (
    //
  );
};
```
