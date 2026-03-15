import { CreatePropertieRequest, Propertie, UpdatePropertieRequest } from '@/common/commonTypes';
import {
  Application,
  ApplicationStatus,
  CreateApplicationsRequest,
  GetMeResponce,
  PatchProfileRequest,
  ProfileResponce,
  RefreshTokenResponce,
  RegistrationProfileRequest,
  RegistrationProfileResponce,
  RequestError,
  SendVerificationCodeRequest,
  SendVerificationCodeResponce,
  User,
  VerificationCodeRequest,
  VerificationCodeResponce,
} from '../apiTypes';
import {
  DTOApplication,
  DTOCreateApplicationsResponce,
  DTOCreatePropertieRequest,
  DTOGetMeResponce,
  DTOPatchProfileRequest,
  DTOProfileResponce,
  DTOPropertie,
  DTORefreshTokenResponce,
  DTORegistrationProfileRequest,
  DTORegistrationProfileResponce,
  DTORequestError,
  DTOSendVerificationCodeRequest,
  DTOSendVerificationCodeResponce,
  DTOUpdatePropertieRequest,
  DTOUser,
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
    createdAt: new Date(dto.createdAt),
    createdBy: toUserFromDTOMapper(dto.createdBy),
    status: dto.status as ApplicationStatus,
    propertyId: dto.propertyId,
    title: dto.title,
    message: dto.comment,
    responceMesage: dto.responceComment,
  };
};

export const toUserFromDTOMapper = (dto: DTOUser): User => {
  return {
    firstName: dto.firstName,
    lastName: dto.lastName,
    surname: dto.surname,
  };
};

export const errorMapper = (dto: DTORequestError): RequestError => {
  return {
    timestamp: new Date(dto.timestamp),
    path: dto.path,
    status: dto.status,
    error: dto.error,
    errorCode: dto.errorCode,
    message: dto.message,
  };
};
