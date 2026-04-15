import { Input } from '@/components/forms/Input';
import style from './AuthStepTwo.module.scss';
import commonStyle from '@styles/common.module.scss';
import { FormElement } from '@/components/forms/FormElement';
import { Timer } from '@/components/shells/Timer';
import { Button } from '@/components/Button';
import { useAppDispatch, useAppSelector } from '@/services/store';
import {
  backToStepOne,
  resetErrorStatusesAuth,
  selectIsAccountExists,
  selectStatusesAuth,
  sendVerificationCodeAuth,
  verificationCodeAuth,
} from '@/services/slices/auth';
import useTimer from '@/hooks/useTimer';
import { Time } from '@/features/Timer/Time';
import {
  CHECK_CODE_REGEXP,
  PHONE_REGEXP,
  TIMER_SEND_CODE_MESSAGE_TIME_S,
} from '@/common/constants';
import { ChangeEvent, SyntheticEvent, useLayoutEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { CodeInput } from '@/components/forms/CodeInput';
import useValidator, { ValidationScheme } from '@/hooks/useValidator';
import { VerificationCodeRequest } from '@/api/apiTypes';
import { isSet, likeRegExp } from '@/features/Validator/ValidationFunctions';
import { codeFormatter } from '@/utils/utils';
import { ErrorField } from '@/components/forms/ErrorField';
import { PageRequestError } from '@/common/commonTypes';
import { selectUser } from '@/services/slices/user';
import { Link, useNavigate } from 'react-router';

const sendVerificationCodeFormScheme: ValidationScheme<VerificationCodeRequest> = {
  phone: likeRegExp(PHONE_REGEXP, 'Неверный формат телефона'),
  code: likeRegExp(CHECK_CODE_REGEXP, 'Неверный формат кода'),
  personalDataConsent: isSet<boolean | undefined>(),
};

export const AuthStepTwo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { phone } = useAppSelector(selectUser);
  const { sendCodeStatus, verifyCodeStatus } = useAppSelector(selectStatusesAuth);
  const isUserExist = useAppSelector(selectIsAccountExists);

  const initialTime = useMemo(() => new Time(TIMER_SEND_CODE_MESSAGE_TIME_S), []);
  const { state, time, timer } = useTimer({ time: initialTime });

  const { isValid, value, updateField, errors } = useValidator<VerificationCodeRequest>({
    initialValue: {
      phone: phone ?? '',
      code: '',
      personalDataConsent: isUserExist,
    },
    scheme: sendVerificationCodeFormScheme,
    isInitValidate: true,
    validateIsToched: false,
    validateOnChange: true,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const requestError: PageRequestError = {
    isError: sendCodeStatus.status === 'ERROR' || verifyCodeStatus.status === 'ERROR',
    error: sendCodeStatus.error || verifyCodeStatus.error,
  };

  useLayoutEffect(() => {
    inputRef.current?.focus();
    timer.start();
  }, []);

  const changePhoneNumber = () => {
    dispatch(backToStepOne());
    void navigate('/auth-step-one');
  };

  const onChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    const value = codeFormatter(e.target.value);
    if (requestError.isError) {
      dispatch(resetErrorStatusesAuth());
    }
    updateField('code', value.join(''));
  };

  const onChangeAgreement = (e: ChangeEvent<HTMLInputElement>) => {
    updateField('personalDataConsent', e.target.checked);
  };

  // Запрос на отправку кода
  const sendCodeAgain = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phone) {
      await dispatch(sendVerificationCodeAuth({ phone }));
      if (sendCodeStatus.status !== 'ERROR') {
        timer.start();
      }
    }
  };

  const verifyCode = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    void dispatch(verificationCodeAuth(value));
  };

  return (
    <div className={style['content']}>
      <h1 className={style['content__title']}>Вход в личный кабинет</h1>
      <div className={style['content__info']}>
        <span className={style['content__description']}>
          Пожалуйста, введите одноразовый пароль отправленный на номер {phone}
        </span>
        <Button
          type="button"
          className={style['content__change-phone-button']}
          option="LinkButton"
          onClick={changePhoneNumber}
        >
          Поменять номер
        </Button>
      </div>

      <div
        className={clsx(
          style['form_verification_code'],
          isUserExist && style['form_verification_code_account_exists']
        )}
      >
        <CodeInput value={value.code} onChange={onChangeCode} ref={inputRef} />
        <div
          className={clsx(
            style['form__send_code_wrapper'],
            requestError.isError && style['form__send_code_wrapper_error']
          )}
        >
          {state === 'Process' ? (
            <Timer value={time} accuracy={'minuts'} extraClassName={style['content__timer']} />
          ) : (
            <Button
              type="submit"
              form="auth_form_send_code"
              option="LinkButton"
              name="send_code_button"
              className={style['content__send-code-button']}
            >
              Повторно отправить пароль
            </Button>
          )}
        </div>
        {requestError.isError && requestError.error && (
          <ErrorField className={style['request_error']}>{requestError.error.message}</ErrorField>
        )}
        <Button
          type="submit"
          name="verify_code_button"
          form="auth_form_verify_code"
          option="BlueButton"
          loading={{
            isLoading: sendCodeStatus.status === 'PENDING' || verifyCodeStatus.status === 'PENDING',
            loadingMessage: 'Загрузка...',
          }}
          disabled={!isValid}
        >
          Войти
        </Button>
      </div>
      {!isUserExist && (
        <div className={style['content__agreement']}>
          <FormElement extraClassName={style['agreement__checkbox']}>
            <Input
              type="checkbox"
              name="agreement"
              checked={value.personalDataConsent}
              onChange={onChangeAgreement}
            />
          </FormElement>
          <span className={style['agreement__description']}>
            Я согласен c{' '}
            <Link to="/agreement" className={commonStyle['base_link']}>
              Пользовательским соглашением
            </Link>{' '}
            и{' '}
            <Link to="/agreement" className={commonStyle['base_link']}>
              Политикой обработки персональных данных.
            </Link>
          </span>
        </div>
      )}
      <form
        id="auth_form_send_code"
        name="auth_form_send_code"
        className={commonStyle['hidden']}
        onSubmit={e => void sendCodeAgain(e)}
      ></form>
      <form
        id="auth_form_verify_code"
        name="auth_form_verify_code"
        className={commonStyle['hidden']}
        onSubmit={e => void verifyCode(e)}
      ></form>
    </div>
  );
};
