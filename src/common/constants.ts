import { RequestStatus } from '@/api/apiTypes';
import { User } from './commonTypes';
import { composeValidatorsAND } from '@/hooks/useValidator';
import {
  isAcceptableCountSymbRange,
  isLetters,
  isNumbers,
  isSet,
  likeRegExp,
} from '@/features/Validator/ValidationFunctions';

export const LOCAL_STORAGE_ACCESS_TOKEN_ALIAS = 'accessToken';
export const TIMER_SEND_CODE_MESSAGE_TIME_S = 60;
export const READY_REQUEST_STATUS: RequestStatus = {
  status: 'READY',
  error: undefined,
};

export const EMPTY_USER: User = {
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

//Валидаторы
export const VALIDATORS = {
  STREET: composeValidatorsAND(isLetters(['-', ' ', '.']), isAcceptableCountSymbRange(1, 200)),
  HOUSE_NUMBER: composeValidatorsAND(isNumbers(), isAcceptableCountSymbRange(1, 20)),
  CORPUS: composeValidatorsAND(isLetters(['/']), isAcceptableCountSymbRange(0, 20)),
  FLAT_NUMBER: composeValidatorsAND(isNumbers(), isAcceptableCountSymbRange(1, 20)),
  PERSONAL_ACCOUNT_NUMBER: likeRegExp(
    PERSONAL_ACCOUT_NUMBER_REGEXP,
    'Номер лицевого счета должен состоять из 10 цифр'
  ),
  LAST_NAME: composeValidatorsAND(isLetters(), isAcceptableCountSymbRange(1, 100)),
  FIRST_NAME: composeValidatorsAND(isLetters(['-']), isAcceptableCountSymbRange(1, 100)),
  SURNAME: composeValidatorsAND(isLetters(), isAcceptableCountSymbRange(0, 100)),
  EMAIL: composeValidatorsAND(
    isAcceptableCountSymbRange(0, 100),
    likeRegExp(EMAIL_REGEXP, 'Неверный формат почты')
  ),
  PROPERTY_ID: isSet('Выберете объект недвижимости'),
  APPLICATIONS: {
    TITLE: isAcceptableCountSymbRange(1, 100),
    MESSAGE: isAcceptableCountSymbRange(1, 256),
  },
};
