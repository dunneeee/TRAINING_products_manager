import { useMemo, useState } from 'react';

import { ApiStatus, IDLE, defaultApiStatuses } from '@/constants';

type Statuses = Record<`is${Capitalize<Lowercase<ApiStatus>>}`, boolean>;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const perpareStatuses = (currentStatus: ApiStatus) => {
  const statuese = {} as Statuses;
  for (const status of defaultApiStatuses) {
    const normalizedStatus = `is${capitalize(
      status.toLowerCase()
    )}` as keyof Statuses;
    statuese[normalizedStatus] = status === currentStatus;
  }
  return statuese;
};

const useApiStatus = (currentStatus: ApiStatus = IDLE) => {
  const [status, setStatus] = useState<ApiStatus>(currentStatus);

  const statuses = useMemo(() => perpareStatuses(status), [status]);

  return {
    status,
    setStatus,
    ...statuses,
  };
};

export default useApiStatus;
