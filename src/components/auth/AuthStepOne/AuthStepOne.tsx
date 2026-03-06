import { Button } from '@/components/Button';
import style from './AuthStepOne.module.scss';
import { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { selectDataAuth, sendVerificationCodeAuth } from '@/services/slices/auth';
import { FormElement } from '@/components/FormElement';
import useValidator, { ValidationScheme } from '@/hooks/useValidator';
import { SendVerificationCodeRequest } from '@/api/apiTypes';
import { likeRegExp } from '@/features/Validator/ValidationFunctions';
import { PHONE_REGEXP } from '@/common/constants';
import { PhoneInput } from '@/components/PhoneInput/PhoneInput';
import { phoneFormatter } from '@/utils/utils';

const sendVerificationCodeFormScheme: ValidationScheme<SendVerificationCodeRequest> = {
  phone: likeRegExp(PHONE_REGEXP, 'Неверный формат телефона'),
};

export const AuthStepOne = () => {
  const dispatch = useAppDispatch();
  const { phone } = useAppSelector(selectDataAuth);
  const [isShowError, setIsShowError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const { isValid, value, errors, validate, updateField } =
    useValidator<SendVerificationCodeRequest>({
      initialValue: { phone: phone ?? '' },
      scheme: sendVerificationCodeFormScheme,
      isInitValidate: true,
      validateIsToched: true,
      validateOnChange: true,
    });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const [isValide] = validate(true);
    if (!isValide) return;

    void dispatch(sendVerificationCodeAuth(value));
  };

  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateField('phone', phoneFormatter(value));
  };

  return (
    <div className={style['content']}>
      <form name="auth_form_step_1" onSubmit={onSubmit} className={style['content__form']}>
        <div className={style['form__fields']}>
          <FormElement error={isShowError ? errors.phone?.message : undefined}>
            {isError => (
              <PhoneInput
                type="phone"
                name="phone_filed"
                value={value.phone}
                ref={inputRef}
                isError={isError}
                onChange={onChangePhone}
              />
            )}
          </FormElement>
          <Button type="submit" option="BlueButton" disabled={!isValid}>
            Далее
          </Button>
        </div>
      </form>
      <a href="##" className={style['content__demo']}>
        Демо-режим
      </a>
    </div>
  );
};
