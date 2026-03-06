import { LOCAL_STORAGE_ACCESS_TOKEN_ALIAS } from '@/common/constants';
import { baseHeaders, checkResponse, fetchWithCheckResponse } from './apiHelp';
import {
  HTTP_METHODS,
  RefreshTokenResponce,
  SendVerificationCodeRequest,
  SendVerificationCodeResponce,
  VerificationCodeRequest,
} from './apiTypes';
import {
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
