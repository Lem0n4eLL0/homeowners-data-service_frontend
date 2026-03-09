import {
  GetMeResponce,
  GetProfileResponce,
  RefreshTokenResponce,
  RequestError,
  SendVerificationCodeRequest,
  SendVerificationCodeResponce,
  VerificationCodeRequest,
  VerificationCodeResponce,
} from '../apiTypes';
import {
  DTOGetMeResponce,
  DTOGetProfileResponce,
  DTORefreshTokenResponce,
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
    properties: dto.properties,
  };
};

export const getMeResponceMapper = (dto: DTOGetMeResponce): GetMeResponce => {
  return {
    id: dto.id,
    phone: dto.phone,
    email: dto.email,
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
