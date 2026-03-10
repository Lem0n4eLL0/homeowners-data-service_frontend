import { Propertie } from '@/common/commonTypes';
import {
  GetMeResponce,
  GetProfileResponce,
  RefreshTokenResponce,
  RegistrationProfileRequest,
  RegistrationProfileResponce,
  RequestError,
  SendVerificationCodeRequest,
  SendVerificationCodeResponce,
  VerificationCodeRequest,
  VerificationCodeResponce,
} from '../apiTypes';
import {
  DTOGetMeResponce,
  DTOGetProfileResponce,
  DTOPropertie,
  DTORefreshTokenResponce,
  DTORegistrationProfileRequest,
  DTORegistrationProfileResponce,
  DTORequestError,
  DTOSendVerificationCodeRequest,
  DTOSendVerificationCodeResponce,
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

export const getProfileResponceMapper = (dto: DTOGetProfileResponce): GetProfileResponce => {
  return {
    id: dto.id,
    firstName: dto.firstName,
    lastName: dto.lastName,
    surname: dto.surname,
    properties: dto.properties.map(toPropertiesFromDTOMapper),
  };
};

export const toPropertiesFromDTOMapper = (dto: DTOPropertie): Propertie => {
  return {
    id: dto.id,
    street: dto.street,
    houseNumber: dto.houseNumber,
    corpus: dto.corpus,
    flatNumber: dto.flatNumber,
    personalAccountNumber: dto.personalAccountNumber,
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
    properties: dto.properties.map(toPropertiesFromDTOMapper),
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
