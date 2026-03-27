/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

import { useLocation } from 'react-router';
import style from './ErrorPage.module.scss';

export const ErrorPage = () => {
  const { state } = useLocation();
  const error = state?.error;

  return (
    <div className={style['content']}>
      <span className={style['content__code']}>{error?.code ?? 404}</span>
      <span className={style['content__message']}>
        {error?.message ?? 'Resource was not found'}
      </span>
    </div>
  );
};
