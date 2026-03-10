import { RequestStatus } from '@/api/apiTypes';
import { User } from './commonTypes';

export const LOCAL_STORAGE_ACCESS_TOKEN_ALIAS = 'accessToken';
export const TIMER_SEND_CODE_MESSAGE_TIME_S = 60;
export const READY_REQUEST_STATUS: RequestStatus = {
  status: 'READY',
  error: undefined,
};

export const EMPTY_USER: User = {
  id: '',
  firstName: '',
  lastName: '',
  surname: '',
  properties: [],
  phone: '',
  email: undefined,
};

// Регулярные выражения
export const PHONE_REGEXP = /^\+7\d{10}$/;
export const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PERSONAL_ACCOUT_NUMBER_REGEXP = /^\d{10}$/;
export const CHECK_CODE_REGEXP = /^\d{6}$/;
