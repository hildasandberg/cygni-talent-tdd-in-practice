import { useEffect, useState } from 'react';
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';

export interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (error: unknown) => void;
}

// Create an object that allows the promise to be resolved or rejected more flexibly
export function createDeferred<T = void>(): Deferred<T> {
  let resolve!: Deferred<T>['resolve'];
  let reject!: Deferred<T>['reject'];
  // This works because the promise callback is guaranteed to be executed synchronously
  const promise = new Promise<T>((_resolve, _reject) => {
    // @ts-ignore
    resolve = _resolve;
    reject = _reject;
  });
  return { resolve, reject, promise };
}

export function useRequest<T>(
  request: (signal: AbortSignal) => PromiseLike<T>,
) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    setLoading(true);
    setError(undefined);

    request(signal).then(
      data => {
        if (!signal.aborted) {
          batchedUpdates(() => {
            setLoading(false);
            setData(data);
          });
        }
      },
      error => {
        if (!signal.aborted) {
          batchedUpdates(() => {
            setLoading(false);
            setError(error);
          });
        }
      },
    );

    return () => {
      abortController.abort();
    };
  }, [request]);

  return [data, { loading, error }] as const;
}

export function useDebouncedValue<A, B = A>(
  delay: number,
  value: A,
  initialValue: A | B = value,
) {
  const [debouncedValue, setDebouncedValue] = useState<A | B>(initialValue);

  useEffect(() => {
    const timeout = setTimeout(batchedUpdates, delay, setDebouncedValue, value);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
