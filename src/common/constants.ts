import { APPLICATION_STATUSES, ApplicationStatus, RequestStatus } from '@/api/apiTypes';
import {
  DateRange,
  FullUser,
  Meter,
  METER_TYPES,
  MeterType,
  Propertie,
  SERVICE_STATUSES,
  ServiceStatus,
} from './commonTypes';
import { composeValidatorsAND, composeValidatorsOR } from '@/hooks/useValidator';
import {
  isAcceptableCountSymbRange,
  isEmpty,
  isLetters,
  isLettersAndNumbers,
  isNumbers,
  isSet,
  likeRegExp,
} from '@/features/Validator/ValidationFunctions';
import { OptionType } from '@/components/forms/AppSelect/AppSelect';

export const LOCAL_STORAGE_ACCESS_TOKEN_ALIAS = 'accessToken';
export const TIMER_SEND_CODE_MESSAGE_TIME_S = 60;
export const READY_REQUEST_STATUS: RequestStatus = {
  status: 'READY',
  error: undefined,
};

export const EMPTY_USER: FullUser = {
  id: '',
  firstName: '',
  lastName: '',
  surname: '',
  properties: [],
  phone: '',
  email: undefined,
};

// Регулярные выражения
export const PHONE_REGEXP = /^\+7\d{10}$/;
export const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PERSONAL_ACCOUT_NUMBER_REGEXP = /^\d{10}$/;
export const CHECK_CODE_REGEXP = /^\d{6}$/;
export const METER_VALUE_REGEXP = /^\d+\.\d{3}$/;
export const SERIAL_NUMBER_REGEXP = /^\d{6}$/;

//Валидаторы
export const VALIDATORS = {
  STREET: composeValidatorsAND(
    isLettersAndNumbers(['-', ' ', '.']),
    isAcceptableCountSymbRange(1, 200)
  ),
  HOUSE_NUMBER: composeValidatorsAND(isLettersAndNumbers(), isAcceptableCountSymbRange(1, 20)),
  CORPUS: composeValidatorsAND(isLettersAndNumbers(['/']), isAcceptableCountSymbRange(0, 20)),
  FLAT_NUMBER: composeValidatorsAND(isNumbers(), isAcceptableCountSymbRange(1, 20)),
  PERSONAL_ACCOUNT_NUMBER: likeRegExp(
    PERSONAL_ACCOUT_NUMBER_REGEXP,
    'Номер лицевого счета должен состоять из 10 цифр'
  ),
  LAST_NAME: composeValidatorsAND(isLetters(['-']), isAcceptableCountSymbRange(1, 100)),
  FIRST_NAME: composeValidatorsAND(isLetters(['-']), isAcceptableCountSymbRange(1, 100)),
  SURNAME: composeValidatorsAND(isLetters(['-']), isAcceptableCountSymbRange(0, 100)),
  EMAIL: composeValidatorsOR(isEmpty(), likeRegExp(EMAIL_REGEXP, 'Неверный формат почты')),
  PROPERTY_ID: isSet<Propertie | null>('Выберете объект недвижимости'),
  APPLICATIONS: {
    TITLE: isAcceptableCountSymbRange(1, 100),
    MESSAGE: isAcceptableCountSymbRange(1, 500),
  },
  METER_SERIAL_NUMBER: likeRegExp(SERIAL_NUMBER_REGEXP, 'Номер счетчика состоит из 6 цифр'),
  METER_TYPE: isSet<MeterType | null>('Выберете тип счетчика'),
  METER_ID: isSet<Meter | null>('Выберете счетчик'),
  METER_VALUE: likeRegExp(METER_VALUE_REGEXP, 'Формат данных для счетчика: 100.000'),
};

// Опции элемента Select
export const emptyOption = <T extends { id: string }>(): OptionType<T> => ({
  value: undefined,
  label: 'Пусто',
});

export type FilteredStatus = { id: string; status: ApplicationStatus };
export type FilteredDateRange = { id: string; date: DateRange };
export type FilteredServiceStatus = { id: string; status: ServiceStatus };
export type FilteredMeterType = { id: string; type: MeterType };

export const STATUS_APPLICATION_BASE_OPTIONS = [
  ...Object.keys(APPLICATION_STATUSES).map<OptionType<FilteredStatus>>((el, index) => ({
    value: { id: String(index), status: el as ApplicationStatus },
    label: APPLICATION_STATUSES[el as ApplicationStatus],
  })),
];

export const STATUS_SERVICE_BASE_OPTIONS = [
  ...Object.keys(SERVICE_STATUSES).map<OptionType<FilteredServiceStatus>>((el, index) => ({
    value: { id: String(index), status: el as ServiceStatus },
    label: SERVICE_STATUSES[el as ServiceStatus],
  })),
];

export const TYPE_METER_BASE_OPTIONS = [
  ...Object.keys(METER_TYPES).map<OptionType<FilteredMeterType>>((el, index) => ({
    value: { id: String(index), type: el as MeterType },
    label: METER_TYPES[el as MeterType],
  })),
];

// Ошибки

export const ERRORS = {
  CLIENT: 'неизвестная ошибка ни клиенте',
  TEAPOT: 'я — чайник',
};
