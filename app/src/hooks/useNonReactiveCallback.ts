import { useCallback, useEffect, useRef } from "react";

export function useNonReactiveCallback<T extends (...args: any[]) => any>(
  fn: T
): T {
  const ref = useRef<T>(fn);

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback(
    (...args: any[]) => {
      const latestFn = ref.current;
      return latestFn(...args);
    },
    [ref]
  ) as T;
}
