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

export type DTORequestError = {
  timestamp: string;
  path: string;
  status: number;
  error: string;
  errorCode: number;
  message: string;
  requestId: string;
};
