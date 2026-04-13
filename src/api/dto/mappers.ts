import {
  Accruals,
  AccrualStatus,
  AccrualTopic,
  CreatePropertieRequest,
  IndicationsHistory,
  Meter,
  MeterType,
  Period,
  Propertie,
  Services,
  ServiceStatus,
  UpdatePropertieRequest,
  UserServices,
} from '@/common/commonTypes';
import {
  Application,
  ApplicationFull,
  ApplicationStatus,
  CreateApplicationsRequest,
  CreateMeterRequest,
  CreateUserServicesRequest,
  GetMeResponce,
  PatchProfileRequest,
  ProfileResponce,
  RefreshTokenResponce,
  RegistrationProfileRequest,
  RegistrationProfileResponce,
  RequestError,
  SendIndicationsRequest,
  SendVerificationCodeRequest,
  SendVerificationCodeResponce,
  User,
  VerificationCodeRequest,
  VerificationCodeResponce,
} from '../apiTypes';
import {
  DTOAccruals,
  DTOAccrualTopic,
  DTOApplication,
  DTOApplicationFull,
  DTOCreateApplicationsResponce,
  DTOCreateMeterRequest,
  DTOCreatePropertieRequest,
  DTOCreateUserServicesRequest,
  DTOGetMeResponce,
  DTOIndicationsHistory,
  DTOMeter,
  DTOPatchProfileRequest,
  DTOPeriod,
  DTOProfileResponce,
  DTOPropertie,
  DTORefreshTokenResponce,
  DTORegistrationProfileRequest,
  DTORegistrationProfileResponce,
  DTORequestError,
  DTOSendIndicationsRequest,
  DTOSendVerificationCodeRequest,
  DTOSendVerificationCodeResponce,
  DTOServices,
  DTOUpdatePropertieRequest,
  DTOUser,
  DTOUserServices,
  DTOVerificationCodeRequest,
  DTOVerificationCodeResponce,
} from './dto';

export const sendVerificationCodeRequestMapper = (
  value: SendVerificationCodeRequest
): DTOSendVerificationCodeRequest => {
  return {
    phone: value.phone,
  };
};

export const sendVerificationCodeResponceMapper = (
  dto: DTOSendVerificationCodeResponce
): SendVerificationCodeResponce => {
  return {
    accountExists: dto.accountExists,
  };
};

export const refreshTokenResponceMapper = (dto: DTORefreshTokenResponce): RefreshTokenResponce => {
  return {
    token: dto.token,
  };
};

export const verificationCodeRequestMapper = (
  value: VerificationCodeRequest
): DTOVerificationCodeRequest => {
  return {
    phone: value.phone,
    code: value.code,
    personalDataConsent: value.personalDataConsent,
  };
};

export const verificationCodeResponceMapper = (
  dto: DTOVerificationCodeResponce
): VerificationCodeResponce => {
  return {
    token: dto.token,
  };
};

export const profileResponceMapper = (dto: DTOProfileResponce): ProfileResponce => {
  return {
    id: dto.id,
    firstName: dto.firstName,
    lastName: dto.lastName,
    surname: dto.surname,
    email: dto.email,
    phone: dto.phone,
    properties: dto.properties.map(toPropertyFromDTOMapper),
  };
};

export const toPropertyFromDTOMapper = (dto: DTOPropertie): Propertie => {
  return {
    id: dto.propertyId,
    street: dto.street,
    houseNumber: dto.houseNumber,
    corpus: dto.corpus,
    flatNumber: dto.flatNumber,
    personalAccountNumber: dto.personalAccountNumber,
  };
};

export const toDTOfromProperty = (value: Propertie): DTOPropertie => {
  return {
    propertyId: value.id,
    street: value.street,
    houseNumber: value.houseNumber,
    corpus: value.corpus,
    flatNumber: value.flatNumber,
    personalAccountNumber: value.personalAccountNumber,
  };
};

export const createPropertyToDTOMapper = (
  value: CreatePropertieRequest
): DTOCreatePropertieRequest => {
  return {
    street: value.street,
    houseNumber: value.houseNumber,
    corpus: value.corpus,
    flatNumber: value.flatNumber,
    personalAccountNumber: value.personalAccountNumber,
  };
};

export const updatePropertyToDTOMapper = (
  value: UpdatePropertieRequest
): DTOUpdatePropertieRequest => {
  return {
    street: value.street,
    houseNumber: value.houseNumber,
    corpus: value.corpus,
    flatNumber: value.flatNumber,
    personalAccountNumber: value.personalAccountNumber,
  };
};

export const getMeResponceMapper = (dto: DTOGetMeResponce): GetMeResponce => {
  return {
    id: dto.id,
    phone: dto.phone,
    email: dto.email,
  };
};

export const registrationProfileRequestMapper = (
  value: RegistrationProfileRequest
): DTORegistrationProfileRequest => {
  return {
    firstName: value.firstName,
    lastName: value.lastName,
    surname: value.surname,
    street: value.street,
    houseNumber: value.houseNumber,
    corpus: value.corpus,
    flatNumber: value.flatNumber,
    email: value.email,
    personalAccountNumber: value.personalAccountNumber,
  };
};

export const registrationProfileResponceMapper = (
  dto: DTORegistrationProfileResponce
): RegistrationProfileResponce => {
  return {
    id: dto.id,
    firstName: dto.firstName,
    lastName: dto.lastName,
    surname: dto.surname,
    properties: dto.properties.map(toPropertyFromDTOMapper),
  };
};

export const updateProfileRequestMapper = (
  value: PatchProfileRequest
): Partial<DTOPatchProfileRequest> => {
  return {
    firstName: value.firstName,
    lastName: value.lastName,
    surname: value.surname,
    email: value.email,
  };
};

export const createApplicationsResponceMapper = (
  value: CreateApplicationsRequest
): DTOCreateApplicationsResponce => {
  return {
    propertyId: value.propertyId,
    title: value.title,
    comment: value.message,
  };
};

export const toApplicationFromDTOMapper = (dto: DTOApplication): Application => {
  return {
    id: dto.id,
    createdAt: new Date(dto.createdAt).toISOString(),
    createdBy: toUserFromDTOMapper(dto.createdBy),
    status: dto.status as ApplicationStatus,
    propertyId: dto.propertyId,
    title: dto.title,
    message: dto.comment,
  };
};

export const toApplicationFullFromDTOMapper = (dto: DTOApplicationFull): ApplicationFull => {
  return {
    id: dto.id,
    createdAt: new Date(dto.createdAt).toISOString(),
    createdBy: toUserFromDTOMapper(dto.createdBy),
    status: dto.status as ApplicationStatus,
    property: toPropertyFromDTOMapper(dto.property),
    title: dto.title,
    message: dto.comment,
  };
};

export const toUserFromDTOMapper = (dto: DTOUser): User => {
  return {
    firstName: dto.firstName,
    lastName: dto.lastName,
    surname: dto.surname,
  };
};

export const toServicesFromDTOMapper = (dto: DTOServices): Services => {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    price: dto.price,
  };
};

export const toUserServicesFromDTOMapper = (dto: DTOUserServices): UserServices => {
  return {
    id: dto.id,
    createdAt: dto.createdAt,
    serviceId: dto.additionalServiceId,
    createdBy: toUserFromDTOMapper(dto.personalDataDto),
    property: toPropertyFromDTOMapper(dto.property),
    status: dto.status as ServiceStatus,
  };
};

export const createUserServicesRequestMapper = (
  value: CreateUserServicesRequest
): DTOCreateUserServicesRequest => {
  return {
    propertyId: value.propertyId,
    additionalServiceId: value.serviceId,
  };
};

export const toAccrualsFromDTOMapper = (dto: DTOAccruals): Accruals => {
  return {
    id: dto.id,
    createdAt: dto.createdAt,
    accrualTopic: dto.services.map(toAccrualTopicFromDTOMapper),
    accrualInterval: toPeriodFromDTOMapper(dto.period),
    totalSum: dto.totalSum,
    paidAmount: dto.paidAmount,
    paidStatus: dto.paidStatus as AccrualStatus,
    propertyId: dto.propertyId,
  };
};

export const toPeriodFromDTOMapper = (dto: DTOPeriod): Period => {
  return {
    start: dto.start,
    end: dto.end,
  };
};

export const toAccrualTopicFromDTOMapper = (dto: DTOAccrualTopic): AccrualTopic => {
  return {
    name: dto.name,
    code: dto.code,
  };
};

export const toMeterFromDTOMapper = (dto: DTOMeter): Meter => {
  return {
    id: dto.id,
    serialNumber: dto.serialNumber,
    type: dto.type as MeterType,
    propertyId: dto.propertyId,
  };
};

export const toIndicationsHistoryFromDTOMapper = (
  dto: DTOIndicationsHistory
): IndicationsHistory => {
  return {
    id: dto.id,
    createdAt: dto.createdAt,
    meter: toMeterFromDTOMapper(dto.meter),
    value: dto.value,
  };
};

export const sendIndicationsRequestToDTO = (
  value: SendIndicationsRequest
): DTOSendIndicationsRequest => {
  return {
    meterId: value.meterId,
    value: value.value,
  };
};

export const createMeterRequestToDTO = (value: CreateMeterRequest): DTOCreateMeterRequest => {
  return {
    propertyId: value.propertyId,
    type: value.type,
    serialNumber: value.serialNumber,
  };
};

export const errorMapper = (dto: DTORequestError): RequestError => {
  return {
    timestamp: new Date(dto.timestamp).toISOString(),
    path: dto.path,
    status: dto.status,
    error: dto.error,
    errorCode: dto.errorCode,
    message: dto.message,
  };
};
