export type ApiStatus = 'IDLE' | 'PEADING' | 'SUCCESS' | 'ERROR';

export const IDLE: ApiStatus = 'IDLE';
export const PEADING: ApiStatus = 'PEADING';
export const SUCCESS: ApiStatus = 'SUCCESS';
export const ERROR: ApiStatus = 'ERROR';

export const defaultApiStatuses: ApiStatus[] = [
  'IDLE',
  'PEADING',
  'SUCCESS',
  'ERROR',
];

export type ApiStatuses = Record<ApiStatus, ApiStatus>;

export const apiStatus: ApiStatuses = {
  IDLE,
  ERROR,
  PEADING,
  SUCCESS,
};
