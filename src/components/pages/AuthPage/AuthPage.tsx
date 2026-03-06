import style from './AuthPage.module.scss';
import commonStyle from '@styles/common.module.scss';
import logoURL from '@assets/logo.svg';
import { AppLinks } from '@/components/AppLinks';
import { Line } from '@/components/shells/Line';
import { AuthFlow } from '@/components/auth/AuthFlow';

export const AuthPage = () => {
  return (
    <div className={style['content_wrapper']}>
      <div className={style['content']}>
        <img
          src={logoURL}
          alt="Центр экологических технологий"
          className={style['content__logo']}
        />
        <AuthFlow />
        <div className={style['content__additional-info']}>
          <Line extraClassName={style['content__line']} />
          <a href="##" className={commonStyle['base_link']}>
            Служба поддержки
          </a>
        </div>
        <AppLinks />
      </div>
    </div>
  );
};
