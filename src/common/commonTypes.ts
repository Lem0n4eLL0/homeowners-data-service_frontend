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

export const ACCRUALS_STATUSES = {
  PAID: 'Оплачено',
  NOT_PAID: 'Не оплачено',
} as const;

export type AccrualStatus = keyof typeof ACCRUALS_STATUSES;

export type AccrualTopic = {
  name: string;
  code: string;
};

export type Period = {
  start: string;
  end: string;
};

export type Accruals = {
  id: string;
  createdAt: string;
  accrualTopic: Array<AccrualTopic>;
  accrualInterval: Period;
  totalSum: number;
  paidAmount: number;
  paidStatus: AccrualStatus;
  propertyId: string;
};
