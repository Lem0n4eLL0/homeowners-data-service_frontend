import { User } from '@/common/commonTypes';

export type DTOSendVerificationCodeRequest = {
  phone: string;
};

export type DTOSendVerificationCodeResponce = {
  accountExists: boolean;
};

export type DTORefreshTokenResponce = {
  token: string;
};

export type DTOVerificationCodeRequest = {
  phone: string;
  code: string;
  personalDataConsent: boolean | undefined;
};

export type DTOVerificationCodeResponce = {
  token: string;
};

export type DTOGetMeResponce = {
  id: string;
  phone: string;
  email: string;
};

export type DTOGetProfileResponce = User;

export type DTORequestError = {
  timestamp: string;
  path: string;
  status: number;
  error: string;
  errorCode: string;
  message: string;
  requestId: string;
};
