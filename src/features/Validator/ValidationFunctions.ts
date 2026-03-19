import { ValidationFunc } from '@/hooks/useValidator';

export const lowerThan =
  (max: number): ValidationFunc<string> =>
  value => {
    const isValid = value.length < max;
    return [isValid, { message: `Значение должно быть меньше чем ${max}` }];
  };

export const moreThan =
  (min: number): ValidationFunc<string> =>
  value => {
    const isValid = value.length > min;
    return [isValid, { message: `Значение должно быть больше чем ${min}` }];
  };

export const isAcceptableCountSymbRange =
  (min: number, max: number): ValidationFunc<string> =>
  value => {
    const isValid = value.length >= min && value.length <= max;
    return [
      isValid,
      { message: `Значение должно быть в диапазоне от ${min} до ${max} включительно` },
    ];
  };

export const isLetters = (additionalChars: string[] = []): ValidationFunc<string> => {
  return value => {
    if (!value) {
      return [true, { message: '' }];
    }

    const allowedSpecialChars = new Set(additionalChars);

    const isValid = value.split('').every(char => {
      const isLetter = /^[a-zA-Zа-яА-ЯёЁ]$/.test(char);
      const isAllowedSpecial = allowedSpecialChars.has(char);
      return isLetter || isAllowedSpecial;
    });

    const endMessage =
      additionalChars.length !== 0 ? ` и символов: [${additionalChars.join()}]` : '';
    return [
      isValid,
      { message: isValid ? '' : `Значение должно состоять только из букв${endMessage}` },
    ];
  };
};

export const isNumbers = (additionalChars: string[] = []): ValidationFunc<string> => {
  return value => {
    if (!value) {
      return [true, { message: '' }];
    }

    const allowedSpecialChars = new Set(additionalChars);

    const isValid = value.split('').every(char => {
      const isNumber = !isNaN(+char) && char !== ' ';
      const isAllowedSpecial = allowedSpecialChars.has(char);
      return isNumber || isAllowedSpecial;
    });

    return [
      isValid,
      {
        message: isValid
          ? ''
          : `Значение должно состоять только из цифр и символов ${additionalChars.join()}`,
      },
    ];
  };
};

export const isLength =
  (length: number): ValidationFunc<string> =>
  value => {
    const isValid = value.length === length;
    return [isValid, { message: `Длина значения должна быть равна ${length}` }];
  };

export const isSet =
  <T>(message?: string): ValidationFunc<T> =>
  (value: T) => {
    const isValueSet = value !== null && value !== undefined && value !== '';
    return [isValueSet, { message: message ?? `Обязательно для заполнения` }];
  };

export const isEmpty =
  (message?: string): ValidationFunc<string> =>
  (value: string) => {
    return [value.length === 0, { message: message ?? `` }];
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
