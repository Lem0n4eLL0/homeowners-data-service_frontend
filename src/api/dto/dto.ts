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
  propertyId: string;
  street: string;
  houseNumber: string;
  corpus: string;
  flatNumber: string;
  personalAccountNumber: string;
};

export type DTOCreatePropertieRequest = Omit<DTOPropertie, 'propertyId'>;
export type DTOUpdatePropertieRequest = Omit<DTOPropertie, 'propertyId'>;

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

export type DTOCreateApplicationsResponce = {
  propertyId: string;
  title: string;
  comment: string;
};

export type DTOUser = {
  firstName: string;
  lastName: string;
  surname: string;
};

export type DTOApplication = {
  id: string;
  createdAt: string;
  createdBy: DTOUser;
  status: string;
  propertyId: string;
  title: string;
  comment: string;
};

export type DTOApplicationFull = {
  id: string;
  createdAt: string;
  createdBy: DTOUser;
  status: string;
  property: DTOPropertie;
  title: string;
  comment: string;
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

export type DTOServices = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type DTOCreateUserServicesRequest = {
  propertyId: string;
  additionalServiceId: string;
};

export type DTOUserServices = {
  id: string;
  createdAt: string;
  additionalServiceId: string;
  personalDataDto: DTOUser;
  property: DTOPropertie;
  status: string;
};

export type DTOAccrualTopic = {
  name: string;
  code: string;
};

export type DTOPeriod = {
  start: string;
  end: string;
};

export type DTOAccruals = {
  id: string;
  createdAt: string;
  services: Array<DTOAccrualTopic>;
  period: DTOPeriod;
  totalSum: number;
  paidAmount: number;
  paidStatus: string;
  propertyId: string;
};

export type DTOMeter = {
  id: string;
  serialNumber: string;
  type: string;
  propertyId: string;
};

export type DTOIndicationsHistory = {
  id: string;
  createdAt: string;
  meter: DTOMeter;
  value: number;
};

export type DTOSendIndicationsRequest = {
  metersId: string;
  value: number;
};

export type DTOCreateMeterRequest = {
  type: string;
  serialNumber: string;
};
