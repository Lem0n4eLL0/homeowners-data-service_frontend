import { RequestError, User } from '@/api/apiTypes';

export type PageRequestError = {
  isError: boolean;
  error?: RequestError | undefined;
};

export type FullUser = {
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
  from: Date | null;
  to: Date | null;
};

export const SERVICE_STATUSES = {
  SENT: 'Отправлена',
  PROCESSED: 'В обработке',
  COMPLETED: 'Выполнена',
} as const;

export type ServiceStatus = keyof typeof SERVICE_STATUSES;

export type Services = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export type UserServices = {
  id: string;
  createdAt: string;
  serviceId: string;
  createdBy: User;
  property: Propertie;
  status: ServiceStatus;
};

export type UserServicesFull = {
  id: string;
  createdAt: string;
  service: Services;
  createdBy: User;
  property: Propertie;
  status: ServiceStatus;
};
