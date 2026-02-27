import style from './AuthPage.module.scss';
import logoURL from '@assets/logo.svg';
import { AppLinks } from '@/components/AppLinks';
import { Line } from '@/components/shells/Line';
import { AuthStepOne } from '@/components/auth/AuthStepOne';
import { useAppSelector } from '../../../services/store';
import { selectStepState } from '../../../services/slices/auth';
import { AuthStepTwo } from '@/components/auth/AuthStepTwo';

export const AuthPage = () => {
  const stepAuthState = useAppSelector(selectStepState);

  return (
    <div className={style['content_wrapper']}>
      <div className={style['content']}>
        <img
          src={logoURL}
          alt="Центр экологических технологий"
          className={style['content__logo']}
        />
        <h1 className={style['content__title']}>Вход в личный кабинет</h1>
        {stepAuthState === 'AuthStepOne' && <AuthStepOne />}
        {stepAuthState === 'AuthStepTwo' && <AuthStepTwo />}
        <div className={style['content__additional-info']}>
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
