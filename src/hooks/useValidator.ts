import { typedKeys } from '@/utils/utils';
import { useCallback, useMemo, useState } from 'react';

export type ValidationFunc<T> = (value: T) => [boolean, ValidatorError];

export type ValidationScheme<T extends object> = Partial<{
  [K in keyof T]: ValidationFunc<T[K]>;
}>;

export type ValidatorError = {
  message: string;
};

export type ReturnValidatorErrors<T> = Partial<{
  [K in keyof T]: ValidatorError;
}>;

export type ValidatorResult<T> = [isValid: boolean, errors: ReturnValidatorErrors<T>];

interface IValidator<T extends object> {
  initialValue: T;
  scheme: ValidationScheme<T>;
  validateOnChange?: boolean;
}

function useValidator<T extends object>({ initialValue, scheme, validateOnChange }: IValidator<T>) {
  const [value, setValue] = useState<T>(initialValue);

  const updateField = <K extends keyof T>(key: K, newValue: T[K]) => {
    setValue(prev => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const validate = useCallback(
    (val: T): ValidatorResult<T> => {
      const validateErrors: ReturnValidatorErrors<T> = {};
      let isValid = true;

      typedKeys(scheme).forEach(key => {
        const validator = scheme[key];
        if (!validator) return;
        const [fieldIsValid, error] = validator(val[key]);

        if (!fieldIsValid) {
          isValid = false;
          validateErrors[key] = error;
        }
      });
      return [isValid, validateErrors];
    },
    [value, scheme]
  );

  const [isValid, errors] = useMemo(() => {
    if (!validateOnChange) {
      return [true, {} as ReturnValidatorErrors<T>];
    }
    return validate(value);
  }, [value, validateOnChange, validate]);

  return {
    value,
    isValid,
    errors,
    validate: () => validate(value),
    updateField,
  };
}

export default useValidator;
