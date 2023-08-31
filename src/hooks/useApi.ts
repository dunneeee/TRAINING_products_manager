import { useState } from 'react';
import { useApiStatus } from '.';
import { ERROR, PEADING, SUCCESS } from '@/constants';

type UseApiConfig<T> = {
  initialData?: T;
};

type ApiFunction<T = unknown> = (...args: unknown[]) => Promise<T> | T;

const useApi = <TData = unknown, TError = unknown>(
  fn: ApiFunction<TData>,
  config: UseApiConfig<TData> = {}
) => {
  const { initialData } = config;
  const [data, setData] = useState<TData | undefined>(initialData);
  const [error, setError] = useState<TError | unknown>(undefined);
  const { status, setStatus, ...normalisedStatuses } = useApiStatus();

  const execute = async <A>(...args: A[]) => {
    try {
      setStatus(PEADING);
      const data = await fn(...args);
      setData(data);
      setStatus(SUCCESS);
      return {
        data,
        error: null,
      };
    } catch (e) {
      setError(e);
      setStatus(ERROR);
      return {
        data: null,
        error: e,
      };
    }
  };

  return {
    data,
    error,
    status,
    setStatus,
    execute,
    setData,
    ...normalisedStatuses,
  };
};

export default useApi;
