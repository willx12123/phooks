import { renderHook } from "@testing-library/react";

import { useObj } from "../src";

test("useObj", () => {
  const { result, rerender } = renderHook(() => useObj(() => ({ name: "Jackson", age: 20 })));
  const firstVal = result.current;
  rerender();
  const secondVal = result.current;
  rerender();
  const thirdVal = result.current;
  expect(firstVal).toEqual(secondVal);
  expect(firstVal).toEqual(thirdVal);
});
