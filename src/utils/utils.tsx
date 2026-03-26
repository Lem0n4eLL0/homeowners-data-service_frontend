import { APPLICATION_STATUSES, ApplicationStatus, User } from '@/api/apiTypes';
import {
  ACCRUALS_STATUSES,
  AccrualStatus,
  Period,
  Propertie,
  SERVICE_STATUSES,
} from '@/common/commonTypes';
import commonStyle from '@styles/common.module.scss';
import { format } from 'date-fns';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export function assertNever(_: never): void {
  throw new Error('Not possible');
}

export function typedKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

export const phoneFormatterView = (value: string): string => {
  // format: +7 (000) 000-00-00
  let result = '';
  let numArray = value.split('').filter(el => !isNaN(+el) && el !== ' ');

  if (numArray.length === 0) return '';
  else result = '+7';
  numArray = numArray.slice(1, 11);
  result = numArray.reduce((pre, cur, ind) => {
    let postfix = cur;
    if (ind === 0) {
      postfix = ' (' + cur;
    } else if (ind === 3) {
      postfix = ') ' + cur;
    } else if (ind === 6 || ind === 8) {
      postfix = '-' + cur;
    }
    return pre + postfix;
  }, result);
  return result;
};

export const phoneFormatterValue = (value: string): string => {
  // format: +70000000000
  let result = '';
  const numArray = value.split('').filter(el => !isNaN(+el) && el !== ' ');

  if (numArray.length === 0) return '';
  else result = '+7';

  result += numArray.slice(1, 11).join('');
  return result;
};

export const properieFormatter = (propertie: Propertie): string => {
  const parts = [
    propertie.street && `ул. ${propertie.street}`,
    propertie.houseNumber && `д. ${propertie.houseNumber}`,
    propertie.corpus && `к. ${propertie.corpus}`,
    propertie.flatNumber && `кв. ${propertie.flatNumber}`,
  ].filter(Boolean);

  return parts.join(', ');
};

export const userFormatter = (user: User): React.ReactNode => {
  return `${user.firstName} ${user.lastName} ${user.surname}`;
};

export const statusApplicationFormatter = (status: ApplicationStatus): React.ReactNode => {
  const value = SERVICE_STATUSES[status];
  switch (status) {
    case 'COMPLETED':
      return <span className={commonStyle['status_completed']}>{value}</span>;
    case 'PROCESSED':
      return <span className={commonStyle['status_processed']}>{value}</span>;
    case 'SENT':
      return <span className={commonStyle['status_sent']}>{value}</span>;
    default:
      return value;
  }
};

export const statusServicesFormatter = (status: ApplicationStatus): React.ReactNode => {
  const value = APPLICATION_STATUSES[status];
  switch (status) {
    case 'COMPLETED':
      return <span className={commonStyle['status_completed']}>{value}</span>;
    case 'PROCESSED':
      return <span className={commonStyle['status_processed']}>{value}</span>;
    case 'SENT':
      return <span className={commonStyle['status_sent']}>{value}</span>;
    default:
      return value;
  }
};

export const statusAccrualsFormatter = (status: AccrualStatus): React.ReactNode => {
  const value = ACCRUALS_STATUSES[status];
  switch (status) {
    case 'PAID':
      return <span className={commonStyle['status_paid']}>{value}</span>;
    case 'NOT_PAID':
      return <span className={commonStyle['status_not_paid']}>{value}</span>;
    default:
      return value;
  }
};

export const textareaFormatter = (value: string): string => {
  return value.slice(0, 500);
};

export const codeFormatter = (value: string): Array<string> => {
  let result = [] as Array<string>;

  result = value
    .split('')
    .filter(el => {
      return !isNaN(+el) && el !== ' ';
    })
    .slice(0, 6);
  return result;
};

export const priceFormatter = (value: number): string => {
  const arr = String(value).split('.');

  return `${arr[0]}.${arr[1] ?? '00'}₽`;
};

export const personalAccountNumberFormatter = (value: string): string => {
  return value
    .split('')
    .filter(el => {
      return !isNaN(+el) && el !== ' ';
    })
    .slice(0, 10)
    .join('');
};

export const periodFormatter = (value: Period): string => {
  const startDate = new Date(value.start);
  const endDate = new Date(value.end);
  return `${dateFormatter(startDate)} – ${dateFormatter(endDate)}`;
};

export const dateFormatter = (date: Date): string => {
  return format(date, 'dd.MM.yyyy');
};

export const formatChargeLabel = (dateStr: string): string => {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    console.warn(`Invalid date: ${dateStr}`);
    return 'Начислено за —';
  }

  const months = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ];

  const monthIndex = date.getMonth();
  const monthName = months[monthIndex];

  return `Начислено за ${monthName}`;
};
