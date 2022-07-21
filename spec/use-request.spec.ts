import { asyncScheduler, scheduled } from "rxjs";
import { renderHook } from "@testing-library/react-hooks";

import { useRequest } from "../src";

describe("useRequest", () => {
  const MOCK_DATA = "mock_data";

  it("should request at first update when return observable", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRequest(() => scheduled([MOCK_DATA], asyncScheduler))
    );
    await waitForNextUpdate();
    expect(result.current.data).toBe(MOCK_DATA);
  });

  it("should request at first update when return Promise", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useRequest(() => Promise.resolve(MOCK_DATA))
    );
    await waitForNextUpdate();
    expect(result.current.data).toBe(MOCK_DATA);
  });
});
