import { Button } from '@/components/Button';
import style from './AuthStepOne.module.scss';
import { Input } from '@/components/Input';
import { SyntheticEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { selectIsBlockedCodeMessage, setStepState } from '../../../services/slices/auth';
import { FormElement } from '@/components/FormElement';

export const AuthStepOne = () => {
  const dispatch = useAppDispatch();
  const isBlockedCodeMessage = useAppSelector(selectIsBlockedCodeMessage);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(setStepState('AuthStepTwo'));
  };

  return (
    <div className={style['content']}>
      <form name="auth_form_step_1" onSubmit={onSubmit} className={style['content__form']}>
        <div className={style['form__fields']}>
          <FormElement>
            <Input type="phone" name="phone_filed" placeholder="Номер телефона" />
          </FormElement>
          <Button option="BlueButton" disabled={isBlockedCodeMessage}>
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
