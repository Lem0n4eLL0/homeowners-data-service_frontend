import { Button } from '@/components/Button';
import style from './AuthStepOne.module.scss';
import { SyntheticEvent, useLayoutEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/store';
import {
  resetErrorStatusesAuth,
  selectStatusesAuth,
  sendVerificationCodeAuth,
} from '@/services/slices/auth';
import { FormElement } from '@/components/forms/FormElement';
import useValidator, { ValidationScheme } from '@/hooks/useValidator';
import { SendVerificationCodeRequest } from '@/api/apiTypes';
import { likeRegExp } from '@/features/Validator/ValidationFunctions';
import { PHONE_REGEXP } from '@/common/constants';
import { PhoneInput } from '@/components/forms/PhoneInput/PhoneInput';
import { ErrorField } from '@/components/forms/ErrorField';
import { PageRequestError } from '@/common/commonTypes';
import clsx from 'clsx';
import { selectUser } from '@/services/slices/user';
import { useNavigate } from 'react-router';

const sendVerificationCodeFormScheme: ValidationScheme<SendVerificationCodeRequest> = {
  phone: likeRegExp(PHONE_REGEXP, 'Неверный формат телефона'),
};

export const AuthStepOne = () => {
  const dispatch = useAppDispatch();
  const { phone } = useAppSelector(selectUser);
  const statuses = useAppSelector(selectStatusesAuth);
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const { isValid, value, validate, updateField } = useValidator<SendVerificationCodeRequest>({
    initialValue: { phone: phone ?? '' },
    scheme: sendVerificationCodeFormScheme,
    isInitValidate: true,
    validateIsToched: true,
    validateOnChange: true,
  });

  const requestError: PageRequestError = {
    isError: statuses.sendCodeStatus.status === 'ERROR',
    error: statuses.sendCodeStatus.error,
  };

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [isValide] = validate(true);
    if (!isValide) return;

    const result = await dispatch(sendVerificationCodeAuth(value));
    if (result.meta.requestStatus === 'fulfilled') {
      void navigate('/auth-step-two');
    }
  };

  const changePhoneHandler = (value: string) => {
    if (requestError.isError) {
      dispatch(resetErrorStatusesAuth());
    }
    updateField('phone', value);
  };

  return (
    <div className={style['content']}>
      <h1 className={style['content__title']}>Вход в личный кабинет</h1>
      <form
        name="auth_form_step_1"
        onSubmit={e => void onSubmit(e)}
        className={style['content__form']}
      >
        <div
          className={clsx(
            style['form__fields'],
            requestError.isError && style['form__fields_error']
          )}
        >
          <FormElement>
            {isError => (
              <PhoneInput
                type="phone"
                name="phone_filed"
                value={value.phone}
                ref={inputRef}
                isError={isError || requestError.isError}
                onChangeValue={changePhoneHandler}
              />
            )}
          </FormElement>
          {requestError.isError && requestError.error && (
            <ErrorField>{requestError.error.message}</ErrorField>
          )}
          <Button
            type="submit"
            option="BlueButton"
            disabled={!isValid}
            loading={{
              isLoading: statuses.sendCodeStatus.status === 'PENDING',
              loadingMessage: 'Отправка...',
            }}
          >
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
