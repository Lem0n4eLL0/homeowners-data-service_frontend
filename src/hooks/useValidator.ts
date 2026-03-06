import { typedKeys } from '@/utils/utils';
import { useLayoutEffect, useState } from 'react';

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

export function composeValidators<T>(...validators: ValidationFunc<T>[]): ValidationFunc<T> {
  return (value: T) => {
    for (const validator of validators) {
      const result = validator(value);
      if (!result[0]) return result;
    }
    return [true, { message: '' }];
  };
}

interface IValidator<T extends object> {
  initialValue: T;
  scheme: ValidationScheme<T>;
  isInitValidate?: boolean;
  validateOnChange?: boolean;
  validateIsToched?: boolean;
}

function useValidator<T extends object>(props: IValidator<T>) {
  const { initialValue, scheme, isInitValidate, validateOnChange, validateIsToched } = props;
  const [value, setValue] = useState<T>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errors, setErrors] = useState<ReturnValidatorErrors<T>>({});
  const [isTouched, setIsTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const updateField = <K extends keyof T>(key: K, newValue: T[K]) => {
    const newValueObj = {
      ...value,
      [key]: newValue,
    };

    const newTouched = {
      ...isTouched,
      [key]: true,
    };

    setValue(newValueObj);
    setIsTouched(newTouched);
    console.log(newValueObj);
    if (validateOnChange) {
      const result = runValidation(newValueObj, newTouched);
      setIsValid(result[0]);
      setErrors(result[1]);
    }
  };

  const runValidation = (
    val: T,
    isTouched: Partial<Record<keyof T, boolean>>,
    isValidateAll: boolean = false
  ): ValidatorResult<T> => {
    const validateErrors: ReturnValidatorErrors<T> = {};
    let isValid = true;

    typedKeys(scheme).forEach(key => {
      if (!isValidateAll && validateIsToched && !isTouched[key]) return;

      const validator = scheme[key];
      if (!validator) return;
      const [fieldIsValid, error] = validator(val[key]);

      if (!fieldIsValid) {
        isValid = false;
        validateErrors[key] = error;
      }
    });
    return [isValid, validateErrors];
  };

  const validate = (isValidateAll: boolean = false): ValidatorResult<T> => {
    const result = runValidation(value, isTouched, isValidateAll);
    setErrors(result[1]);
    setIsValid(result[0]);
    return result;
  };

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isInitValidate) validate(true);
  }, []);

  return {
    value,
    isValid,
    errors,
    validate,
    updateField,
  };
}

export default useValidator;
