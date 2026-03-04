import { Input } from '@/components/Input';
import style from './AuthStepTwo.module.scss';
import commonStyle from '@styles/common.module.scss';
import { FormElement } from '@/components/FormElement';
import { Timer } from '@/components/Timer';
import { Button } from '@/components/Button';
import { useAppDispatch, useAppSelector } from '@/services/store';
import {
  backToStepOne,
  selectDataAuth,
  selectIsAccountExists,
  selectStatusesAuth,
  sendVerificationCodeAuth,
  verificationCodeAuth,
} from '@/services/slices/auth';
import useTimer from '@/hooks/useTimer';
import { Time } from '@/features/Timer/Time';
import { TIMER_SEND_CODE_MESSAGE_TIME_S } from '@/common/constants';
import { SyntheticEvent, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';

export const AuthStepTwo = () => {
  const dispatch = useAppDispatch();
  const { phone } = useAppSelector(selectDataAuth);
  const { sendCodeStatus } = useAppSelector(selectStatusesAuth);
  const isUserExist = useAppSelector(selectIsAccountExists);

  const initialTime = useMemo(() => new Time(TIMER_SEND_CODE_MESSAGE_TIME_S), []);
  const { state, time, timer } = useTimer({ time: initialTime });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    timer.start();
  }, []);

  const changePhoneNumber = () => {
    dispatch(backToStepOne());
  };

  // Запрос на отправку кода
  const sendCodeAgain = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (phone) {
      await dispatch(sendVerificationCodeAuth({ phone }));
      if (sendCodeStatus.status !== 'ERROR') {
        timer.start();
      }
    } else {
      console.log('По какой-то причине номер телефона отсутствует на втором шаге авторизации');
    }
  };

  // Запрос на подтвержедение кода
  const verifyCode = (e: SyntheticEvent) => {
    e.preventDefault();
    void dispatch(verificationCodeAuth({ phone: '', code: '' }));
  };

  return (
    <div className={style['content']}>
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

      <div className={clsx(style['form_verification_code'])}>
        <FormElement extraClassName={style['form__password_input']}>
          <Input type="text" ref={inputRef} placeholder="Одноразовый пароль" />
        </FormElement>
        <div className={style['form__send_code_wrapper']}>
          {state === 'Process' ? (
            <Timer value={time} accuracy={'minuts'} extraClassName={style['content__timer']} />
          ) : (
            <Button
              type="submit"
              form="auth_form_send_code"
              option="LinkButton"
              name="send_again_code_message_button"
              className={style['content__send-code-button']}
            >
              Повторно отправить пароль
            </Button>
          )}
        </div>
        <Button type="submit" form="auth_form_verify_code" option="BlueButton">
          Войти
        </Button>
      </div>
      {isUserExist && (
        <div className={style['content__agreement']}>
          <FormElement extraClassName={style['agreement__checkbox']}>
            <Input type="checkbox" name="agreement" />
          </FormElement>
          <span className={style['agreement__description']}>
            Я согласен c{' '}
            <a href="##" className={commonStyle['base_link']}>
              Пользовательским соглашением
            </a>{' '}
            и{' '}
            <a href="##" className={commonStyle['base_link']}>
              Политикой обработки персональных данных.
            </a>
          </span>
        </div>
      )}
      <form
        id="auth_form_send_code"
        name="auth_form_send_code"
        className={commonStyle['hidden']}
        onSubmit={void sendCodeAgain}
      ></form>
      <form
        id="auth_form_verify_code"
        name="auth_form_verify_code"
        className={commonStyle['hidden']}
        onSubmit={void verifyCode}
      ></form>
    </div>
  );
};
