import { renderHook } from "@testing-library/react";

import { useChange } from "../src";

describe("useChange", () => {
  it("should be equal", () => {
    let i: number;

    const { result, rerender } = renderHook(() => useChange(++i));

    const firstVal = result.current;
    rerender();
    const secondVal = result.current;
    rerender();
    const thirdVal = result.current;

    expect(firstVal).toEqual(secondVal);
    expect(firstVal).toEqual(thirdVal);
  });

  it("should can be observe", (done) => {
    let i: number;

    const { result, rerender } = renderHook(() => useChange(++i));

    const MAX_RENDER_TIMES = 3;
    let renderTimes = 1;

    result.current.subscribe((val) => {
      expect(val.value).toEqual(i);
      renderTimes === MAX_RENDER_TIMES && done();
    });

    for (; renderTimes <= MAX_RENDER_TIMES; renderTimes++) {
      rerender();
    }
  });
});
