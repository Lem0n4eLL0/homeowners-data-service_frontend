import { ValidationFunc } from '@/hooks/useValidator';

export const lowerThan =
  (max: number): ValidationFunc<number> =>
  value => {
    const isValid = value < max;
    return [isValid, { message: `Значение должно быть меньше чем ${max}` }];
  };

export const moreThan =
  (min: number): ValidationFunc<number> =>
  value => {
    const isValid = value > min;
    return [isValid, { message: `Значение должно быть больше чем ${min}` }];
  };

export const isLength =
  (length: number): ValidationFunc<string> =>
  value => {
    const isValid = value.length === length;
    return [isValid, { message: `Длина значения должна быть равна ${length}` }];
  };

export const isSet =
  (message?: string): ValidationFunc<boolean | undefined> =>
  (value: boolean | undefined) => {
    return [value ?? true, { message: message ?? `Обязательно для заполнения` }];
  };

export const isEmpty =
  (message?: string): ValidationFunc<string> =>
  (value: string) => {
    return [value.length === 0, { message: message ?? `Обязательно для заполнения2` }];
  };

export const notNull =
  (message?: string): ValidationFunc<string> =>
  (value: string | undefined) => {
    const isValid = value !== undefined && value.length !== 0;
    return [isValid, { message: message ?? `Обязательно для заполнения` }];
  };

export const likeRegExp =
  (regExp: RegExp, message?: string): ValidationFunc<string> =>
  value => {
    const isValid = regExp.test(value);
    return [isValid, { message: message ?? 'Формат значения не соответствует' }];
  };
