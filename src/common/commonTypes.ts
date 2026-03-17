import { RequestError } from '@/api/apiTypes';

export type PageRequestError = {
  isError: boolean;
  error?: RequestError | undefined;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  surname: string;
  phone: string;
  email: string | undefined;
  properties: Array<Propertie>;
};

export type Propertie = {
  id: string;
  street: string;
  houseNumber: string;
  corpus: string;
  flatNumber: string;
  personalAccountNumber: string;
};

export type CreatePropertieRequest = Omit<Propertie, 'id'>;
export type UpdatePropertieRequest = Propertie;

export type DateRange = {
  from?: Date;
  to?: Date;
};
