import { LOCAL_STORAGE_ACCESS_TOKEN_ALIAS } from '@/common/constants';
import { baseHeaders, checkResponse, fetchWithCheckResponse, fetchWithRefresh } from './apiHelp';
import {
  GetMeResponce,
  HTTP_METHODS,
  RefreshTokenResponce,
  SendVerificationCodeRequest,
  SendVerificationCodeResponce,
  VerificationCodeRequest,
} from './apiTypes';
import {
  getMeResponceMapper,
  refreshTokenResponceMapper,
  sendVerificationCodeRequestMapper,
  sendVerificationCodeResponceMapper,
  verificationCodeRequestMapper,
  verificationCodeResponceMapper,
} from './dto/mappers';
import { DTOSendVerificationCodeResponce, DTOVerificationCodeResponce } from './dto/dto';

export const URL_API = import.meta.env.VITE_APP_API_URL || '';

export const refreshToken = () => {
  return fetch(`${URL_API}/auth/refresh`, {
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
  return fetch(`${URL_API}/auth/sms/request`, {
    method: HTTP_METHODS.POST,
    headers: baseHeaders,
    body: JSON.stringify(sendVerificationCodeRequestMapper(body)),
  })
    .then(res => checkResponse<DTOSendVerificationCodeResponce>(res))
    .then(res => sendVerificationCodeResponceMapper(res));
};

export const verificationCode = (body: VerificationCodeRequest) => {
  return fetchWithCheckResponse<DTOVerificationCodeResponce>(`${URL_API}/auth/sms/verify`, {
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
  return fetchWithRefresh<GetMeResponce>(`${URL_API}/accounts/me`, {
    method: HTTP_METHODS.GET,
    headers: baseHeaders,
  }).then(res => {
    return getMeResponceMapper(res);
  });
};

// Тестовые
// export const sendVerificationCode = (
//   body: SendVerificationCodeRequest
// ): Promise<SendVerificationCodeResponce> => {
//   return Promise.resolve({ accountExists: true });
// };

// export const verificationCode = (
//   body: VerificationCodeRequest
// ): Promise<VerificationCodeResponce> => {
//   return Promise.resolve({ token: 'accessToken' });
// };
