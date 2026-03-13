import { LOCAL_STORAGE_ACCESS_TOKEN_ALIAS } from '@/common/constants';
import { DTORequestError } from './dto/dto';
import { errorMapper } from './dto/mappers';
import { RequestError } from './apiTypes';
import { refreshToken, URL_API, URL_PREFIX } from './api';

export const baseHeaders = {
  'Content-Type': 'application/json;charset=utf-8',
};

export const baseRequestInit: RequestInit = {
  headers: baseHeaders,
};

export const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.status === 204) {
    return null as T;
  }

  if (res.ok) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.json() as Promise<T>;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const error: DTORequestError = await res.json();
  // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
  return Promise.reject(errorMapper(error));
};

export const fetchWithCheckResponse = <T>(info: RequestInfo, options: RequestInit): Promise<T> => {
  return fetch(info, options).then(res => checkResponse<T>(res));
};

export const fetchWithAccess = <T>(info: RequestInfo, options: RequestInit): Promise<T> => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS);
  if (options.headers) {
    (options.headers as { [key: string]: string })['Authorization'] = `Bearer ${accessToken}`;
  }
  return fetch(info, options).then(res => checkResponse<T>(res));
};

export const fetchWithRefresh = <T>(info: RequestInfo, options: RequestInit): Promise<T> => {
  options.credentials = 'include';
  return fetchWithAccess<T>(info, options).catch((e: RequestError) => {
    if (e.error === 'Unauthorized') {
      return refreshToken()
        .then(() => {
          return fetchWithAccess<T>(info, options);
        })
        .catch((e: RequestError) => {
          if (e.errorCode === 'REFRESH_TOKEN_EXPIRED') {
            localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS, '');
            window.location.reload();
          }
          throw e;
        });
    }
    throw e;
  });
};

export const bulidURL = (postfix: string) => {
  return `${URL_API}${URL_PREFIX}${postfix}`;
};
