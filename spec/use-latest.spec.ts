import { renderHook } from "@testing-library/react";

import { useLatest } from "../src";

describe("useLatest", () => {
  let i: number;

  const { result, rerender } = renderHook(() => useLatest(++i));

  const firstVal = result.current;
  rerender();
  const secondVal = result.current;
  rerender();
  const thirdVal = result.current;

  it("should be equal", () => {
    expect(firstVal).toEqual(secondVal);
    expect(firstVal).toEqual(thirdVal);
  });

  it("should has same current value which is latest value", () => {
    expect(firstVal.current).toEqual(i);
    expect(secondVal.current).toEqual(i);
    expect(thirdVal.current).toEqual(i);
  });
});
