import { LOCAL_STORAGE_ACCESS_TOKEN_ALIAS } from '@/common/constants';
import {
  baseHeaders,
  bulidURL,
  checkResponse,
  fetchWithCheckResponse,
  fetchWithRefresh,
} from './apiHelp';
import {
  GetMeResponce,
  GetProfileResponce,
  HTTP_METHODS,
  RefreshTokenResponce,
  SendVerificationCodeRequest,
  SendVerificationCodeResponce,
  VerificationCodeRequest,
} from './apiTypes';
import {
  getMeResponceMapper,
  getProfileResponceMapper,
  refreshTokenResponceMapper,
  sendVerificationCodeRequestMapper,
  sendVerificationCodeResponceMapper,
  verificationCodeRequestMapper,
  verificationCodeResponceMapper,
} from './dto/mappers';
import { DTOSendVerificationCodeResponce, DTOVerificationCodeResponce } from './dto/dto';

export const URL_API = import.meta.env.VITE_APP_API_URL || '';
export const URL_PREFIX = '/api/v1/';
export const refreshToken = () => {
  return fetch(`${URL_API}/api/v1/auth/refresh`, {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
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
  return fetchWithRefresh<GetProfileResponce>(bulidURL(`profile/me`), {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  }).then(res => {
    return getProfileResponceMapper(res);
  });
};

export const logoutMe = () => {
  return fetchWithRefresh<GetMeResponce>(bulidURL(`auth/logout`), {
    method: HTTP_METHODS.DELETE,
    headers: baseHeaders,
  });
};
