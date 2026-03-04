import { Button } from '@/components/Button';
import style from './AuthStepOne.module.scss';
import { Input } from '@/components/Input';
import { SyntheticEvent, useEffect, useRef } from 'react';
import { useAppDispatch } from '@/services/store';
import { sendVerificationCodeAuth } from '@/services/slices/auth';
import { FormElement } from '@/components/FormElement';

export const AuthStepOne = () => {
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    void dispatch(sendVerificationCodeAuth({ phone: '89171647381' }));
  };

  return (
    <div className={style['content']}>
      <form name="auth_form_step_1" onSubmit={onSubmit} className={style['content__form']}>
        <div className={style['form__fields']}>
          <FormElement>
            <Input type="phone" name="phone_filed" ref={inputRef} placeholder="Номер телефона" />
          </FormElement>
          <Button type="submit" option="BlueButton">
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
