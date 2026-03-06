import { RequestStatus } from '@/api/apiTypes';

export const LOCAL_STORAGE_ACCESS_TOKEN_ALIAS = 'accessToken';
export const TIMER_SEND_CODE_MESSAGE_TIME_S = 60;
export const READY_REQUEST_STATUS: RequestStatus = {
  status: 'READY',
  error: undefined,
};

// Регулярные выражения
export const PHONE_REGEXP = /^\+7\d{10}$/;
export const CHECK_CODE_REGEXP = /^\d{6}$/;
