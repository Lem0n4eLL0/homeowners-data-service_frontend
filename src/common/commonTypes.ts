import { RequestError } from '@/api/apiTypes';

export type PageRequestError = {
  isError: boolean;
  error?: RequestError | undefined;
};
