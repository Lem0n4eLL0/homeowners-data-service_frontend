import { RequestStatus } from '@/api/apiTypes';

export const LOCAL_STORAGE_ACCESS_TOKEN_ALIAS = 'accessToken';
export const TIMER_SEND_CODE_MESSAGE_TIME_S = 60;
export const READY_REQUEST_STATUS: RequestStatus = {
  status: 'READY',
  error: undefined,
};
