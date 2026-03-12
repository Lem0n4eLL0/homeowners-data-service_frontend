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

export type DTOProfileResponce = {
  id: string;
  firstName: string;
  lastName: string;
  surname: string;
  email: string;
  phone: string;
  properties: Array<DTOPropertie>;
};

export type DTOPropertie = {
  id: string;
  street: string;
  houseNumber: string;
  corpus: string;
  flatNumber: string;
  personalAccountNumber: string;
};

export type DTORegistrationProfileRequest = {
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

export type DTORegistrationProfileResponce = {
  id: string;
  firstName: string;
  lastName: string;
  surname: string;
  properties: Array<DTOPropertie>;
};

export type DTOPatchProfileRequest = {
  firstName: string;
  lastName: string;
  surname: string;
  email: string;
};

export type DTORequestError = {
  timestamp: string;
  path: string;
  status: number;
  error: string;
  errorCode: string;
  message: string;
  requestId: string;
};
