import { Button } from '@/components/Button';
import style from './AuthStepOne.module.scss';
import { Input } from '@/components/Input';
import { SyntheticEvent } from 'react';
import { useAppDispatch } from '../../../services/store';
import { setStepState } from '../../../services/slices/auth';

export const AuthStepOne = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(setStepState('AuthStepTwo'));
  };

  return (
    <div className={style['content']}>
      <form onSubmit={onSubmit} className={style['content__form']}>
        <div className={style['form__fields']}>
          <Input type="phone" name="phone_filed" placeholder="Номер телефона" />
          <Button option="blueButton">Далее</Button>
        </div>
      </form>
      <a href="##" className={style['content__demo']}>
        Демо-режим
      </a>
    </div>
  );
};
