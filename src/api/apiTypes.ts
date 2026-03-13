import { Propertie } from '@/common/commonTypes';

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export enum ErrorCode {
  INTERNAL_SERVER_ERROR,
  MISSING_PARAMETER,
  INVALID_INPUT,
  TOKEN_EXPIRED,
  REFRESH_TOKEN_EXPIRED,
  REFRESH_TOKEN_NOT_FOUND,
  EMAIL_TOKEN_EXPIRED,
  INVALID_EMAIL_TOKEN,
  AUTHORIZATION_ERROR,
  ACCESS_DENIED,
  BAD_CREDENTIALS,
  ACCOUNT_BLOCKED,
  ACCOUNT_DISABLED,
  TOO_MANY_RESEND_VERIFICATION,
  USER_ALREADY_ACTIVATION,
  USER_NOT_FOUND,
  USER_EMAIL_ALREADY_USED,
  PERSONAL_DATA_CONSENT_REQUIRED,
}

export type RequestError = {
  timestamp: Date;
  path: string;
  status: number;
  error: string;
  errorCode: string;
  message: string;
};

export type FetchStatus = 'READY' | 'PENDING' | 'ERROR' | 'SUCCESS';

export type RequestStatus = {
  status: FetchStatus;
  error?: RequestError | undefined;
};

export type SendVerificationCodeRequest = {
  phone: string;
};

export type SendVerificationCodeResponce = {
  accountExists: boolean;
};

export type RefreshTokenResponce = {
  token: string;
};

export type VerificationCodeRequest = {
  phone: string;
  code: string;
  personalDataConsent?: boolean | undefined;
};

export type VerificationCodeResponce = {
  token: string;
};

export type GetMeResponce = {
  id: string;
  phone: string;
  email: string;
};

export type RegistrationProfileRequest = {
  firstName: string;
  lastName: string;
  surname: string;
  street: string;
  houseNumber: string;
  corpus: string;
  flatNumber: string;
  email: string;
  personalAccountNumber: string;
};

export type RegistrationProfileResponce = {
  id: string;
  firstName: string;
  lastName: string;
  surname: string;
  properties: Array<Propertie>;
};

export type ProfileResponce = {
  id: string;
  firstName: string;
  lastName: string;
  surname: string;
  email: string;
  phone: string;
  properties: Array<Propertie>;
};

export type PatchProfileRequest = {
  firstName: string;
  lastName: string;
  surname: string;
  email: string;
};
