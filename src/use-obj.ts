import { useRef } from "react";

export function useObj<T>(newFn: () => T): T {
  const objRef = useRef<T | null>(null);
  objRef.current === null && (objRef.current = newFn());
  return objRef.current;
}
