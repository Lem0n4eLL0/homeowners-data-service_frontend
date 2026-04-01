import { LOCAL_STORAGE_ACCESS_TOKEN_ALIAS } from '@/common/constants';
import {
  baseHeaders,
  bulidURL,
  checkResponse,
  fetchWithCheckResponse,
  fetchWithRefresh,
} from './apiHelp';
import {
  CreateApplicationsRequest,
  CreateMeterRequest,
  CreateUserServicesRequest,
  GetMeResponce,
  HTTP_METHODS,
  PatchProfileRequest,
  RefreshTokenResponce,
  RegistrationProfileRequest,
  SendIndicationsRequest,
  SendVerificationCodeRequest,
  SendVerificationCodeResponce,
  VerificationCodeRequest,
} from './apiTypes';
import {
  createApplicationsResponceMapper,
  createMeterRequestToDTO,
  createPropertyToDTOMapper,
  createUserServicesRequestMapper,
  getMeResponceMapper,
  profileResponceMapper,
  refreshTokenResponceMapper,
  registrationProfileRequestMapper,
  registrationProfileResponceMapper,
  sendIndicationsRequestToDTO,
  sendVerificationCodeRequestMapper,
  sendVerificationCodeResponceMapper,
  toAccrualsFromDTOMapper,
  toApplicationFullFromDTOMapper,
  toIndicationsHistoryFromDTOMapper,
  toMeterFromDTOMapper,
  toPropertyFromDTOMapper,
  toServicesFromDTOMapper,
  toUserServicesFromDTOMapper,
  updateProfileRequestMapper,
  updatePropertyToDTOMapper,
  verificationCodeRequestMapper,
  verificationCodeResponceMapper,
} from './dto/mappers';
import {
  DTOAccruals,
  DTOApplicationFull,
  DTOIndicationsHistory,
  DTOMeter,
  DTOProfileResponce,
  DTOPropertie,
  DTORegistrationProfileResponce,
  DTOSendVerificationCodeResponce,
  DTOServices,
  DTOUserServices,
  DTOVerificationCodeResponce,
} from './dto/dto';
import { CreatePropertieRequest, UpdatePropertieRequest } from '@/common/commonTypes';

export const URL_API = import.meta.env.VITE_APP_API_URL || '';
export const URL_PREFIX = '/api/v1/';
export const refreshToken = () => {
  return fetch(`${URL_API}/api/v1/auth/refresh`, {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    credentials: 'include',
  })
    .then(res => checkResponse<RefreshTokenResponce>(res))
    .then(res => {
      const mappedRes = refreshTokenResponceMapper(res);
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS, mappedRes.token);
      return mappedRes;
    });
};

export const sendVerificationCode = (
  body: SendVerificationCodeRequest
): Promise<SendVerificationCodeResponce> => {
  return fetch(bulidURL('auth/sms/request'), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    body: JSON.stringify(sendVerificationCodeRequestMapper(body)),
  })
    .then(res => checkResponse<DTOSendVerificationCodeResponce>(res))
    .then(res => sendVerificationCodeResponceMapper(res));
};

export const verificationCode = (body: VerificationCodeRequest) => {
  return fetchWithCheckResponse<DTOVerificationCodeResponce>(bulidURL(`auth/sms/verify`), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    credentials: 'include',
    body: JSON.stringify(verificationCodeRequestMapper(body)),
  }).then(res => {
    const mappedRes = verificationCodeResponceMapper(res);
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS, mappedRes.token);
    return mappedRes;
  });
};

export const getMe = () => {
  return fetchWithRefresh<GetMeResponce>(bulidURL(`accounts/me`), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  }).then(res => {
    return getMeResponceMapper(res);
  });
};

export const getProfile = () => {
  return fetchWithRefresh<DTOProfileResponce>(bulidURL(`profile/me`), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  }).then(res => {
    return profileResponceMapper(res);
  });
};

export const updateProfile = (body: PatchProfileRequest) => {
  return fetchWithRefresh<DTOProfileResponce>(bulidURL(`profile`), {
    method: HTTP_METHODS.PATCH,
    headers: baseHeaders,
    body: JSON.stringify(updateProfileRequestMapper(body)),
  }).then(res => {
    return profileResponceMapper(res);
  });
};

export const registrationProfile = (body: RegistrationProfileRequest) => {
  return fetchWithRefresh<DTORegistrationProfileResponce>(bulidURL(`profile`), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    body: JSON.stringify(registrationProfileRequestMapper(body)),
  }).then(res => {
    return registrationProfileResponceMapper(res);
  });
};

export const createPropery = (body: CreatePropertieRequest) => {
  return fetchWithRefresh<DTOPropertie>(bulidURL(`profile/propertie`), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    body: JSON.stringify(createPropertyToDTOMapper(body)),
  }).then(res => {
    return toPropertyFromDTOMapper(res);
  });
};

export const updatePropery = (body: UpdatePropertieRequest) => {
  return fetchWithRefresh<DTOPropertie>(bulidURL(`profile/propertie/${body.id}`), {
    method: HTTP_METHODS.PATCH,
    headers: baseHeaders,
    body: JSON.stringify(updatePropertyToDTOMapper(body)),
  }).then(res => {
    return toPropertyFromDTOMapper(res);
  });
};

export const deletePropery = (id: string) => {
  return fetchWithRefresh<DTOPropertie>(bulidURL(`profile/propertie/${id}`), {
    method: HTTP_METHODS.DELETE,
    headers: baseHeaders,
  }).then(res => {
    return toPropertyFromDTOMapper(res);
  });
};

export const createApplication = (body: CreateApplicationsRequest) => {
  return fetchWithRefresh<DTOApplicationFull>(bulidURL(`applications`), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    body: JSON.stringify(createApplicationsResponceMapper(body)),
  }).then(res => {
    return toApplicationFullFromDTOMapper(res);
  });
};

export const getApplicationsHistory = () => {
  return fetchWithRefresh<Array<DTOApplicationFull>>(bulidURL(`applications/my`), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  }).then(res => {
    return res.map(el => toApplicationFullFromDTOMapper(el));
  });
};

export const getServices = () => {
  return fetchWithRefresh<Array<DTOServices>>(bulidURL(`services`), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  }).then(res => {
    return res.map(toServicesFromDTOMapper);
  });
};

export const createUserServices = (body: CreateUserServicesRequest) => {
  return fetchWithRefresh<DTOUserServices>(bulidURL(`services`), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    body: JSON.stringify(createUserServicesRequestMapper(body)),
  }).then(res => {
    return toUserServicesFromDTOMapper(res);
  });
};

export const getUserServices = () => {
  return fetchWithRefresh<Array<DTOUserServices>>(bulidURL(`services/my`), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  }).then(res => {
    return res.map(toUserServicesFromDTOMapper);
  });
};

export type DTOAccrualsResponce = {
  content: Array<DTOAccruals>;
};
export const getAccruals = () => {
  return fetchWithRefresh<DTOAccrualsResponce>(bulidURL(`accruals`), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  }).then(res => {
    return res.content.map(toAccrualsFromDTOMapper);
  });
};

export const getMeters = (propertyId: string) => {
  return fetchWithRefresh<Array<DTOMeter>>(bulidURL(`meters/property/${propertyId}`), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  }).then(res => {
    return res.map(toMeterFromDTOMapper);
  });
};

export const createMeters = (body: CreateMeterRequest) => {
  return fetchWithRefresh<DTOMeter>(bulidURL(`meters`), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    body: JSON.stringify(createMeterRequestToDTO(body)),
  }).then(res => {
    return toMeterFromDTOMapper(res);
  });
};

export const getIndicationsHistory = () => {
  return fetchWithRefresh<Array<DTOIndicationsHistory>>(bulidURL(`meters/history`), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  }).then(res => {
    return res.map(toIndicationsHistoryFromDTOMapper);
  });
};

export const sendIndicationsHistory = (body: SendIndicationsRequest) => {
  return fetchWithRefresh<DTOIndicationsHistory>(bulidURL(`meters/indications`), {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    body: JSON.stringify(sendIndicationsRequestToDTO(body)),
  }).then(res => {
    return toIndicationsHistoryFromDTOMapper(res);
  });
};

export const logoutMe = () => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS);

  return fetchWithRefresh(bulidURL(`auth/logout`), {
    method: HTTP_METHODS.DELETE,
    headers: {
      ...baseHeaders,
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: 'include',
  }).then(() => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS, '');
    location.reload();
  });
};
