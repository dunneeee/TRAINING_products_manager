type WithAsyncFc<T> = () => T | Promise<T>;

type WithAsyncReturns<TData = unknown, Terror = unknown> = Promise<{
  response: TData | null;
  error: Terror | unknown;
}>;

export const withAsync = async <TData = unknown, TError = unknown>(
  fn: WithAsyncFc<TData>
): WithAsyncReturns<TData, TError> => {
  try {
    if (typeof fn !== 'function') {
      throw new Error('fn is not a function');
    }
    const res = await fn();
    return {
      response: res,
      error: null,
    };
  } catch (e) {
    return {
      error: e,
      response: null,
    };
  }
};
