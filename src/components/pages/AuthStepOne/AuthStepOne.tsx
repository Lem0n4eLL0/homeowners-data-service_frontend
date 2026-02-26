import { Input } from '@/components/Input';
import style from './AuthStepOne.module.scss';
import logoURL from '@assets/logo.svg';
import { Button } from '@/components/Button';
import { AppLinks } from '@/components/AppLinks';
import { Line } from '@/components/shells/Line';

export const AuthStepOne = () => {
  return (
    <div className={style['content_wrapper']}>
      <div className={style['content']}>
        <img
          src={logoURL}
          alt="Центр экологических технологий"
          className={style['content__logo']}
        />
        <form className={style['content__form']}>
          <h1 className={style['form__title']}>Вход в личный кабинет</h1>
          <div className={style['form__fields']}>
            <Input type="phone" name="phone_filed" placeholder="Номер телефона" />
            <Button option="blueButton">Далее</Button>
          </div>
        </form>
        <div className={style['content__additional-info']}>
          <a href="##" className={style['content__demo']}>
            Демо-режим
          </a>
          <Line extraClassName={style['content__line']} />
          <a href="##" className={style['content__link']}>
            Служба поддержки
          </a>
        </div>
        <AppLinks />
      </div>
    </div>
  );
};
