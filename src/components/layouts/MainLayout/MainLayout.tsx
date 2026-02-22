import { ReactNode } from 'react';
import { Outlet } from 'react-router';
import style from './MainLayout.module.scss';

interface IMainLayout {
  header?: ReactNode;
  footer?: ReactNode;
}

export const MainLayout = (props: IMainLayout) => {
  const { header, footer } = props;
  return (
    <div className={style['page_wrapper']}>
      {header}
      <main className={style['content_wrapper']}>
        <Outlet />
      </main>
      {footer}
    </div>
  );
};
