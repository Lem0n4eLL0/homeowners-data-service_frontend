import { LinksBar } from '@/components/LinksBar';
import { Outlet } from 'react-router';
import style from './TitleLinksLayout.module.scss';
import { ILink } from '@/components/LinksBar/LinksBar';

type ITitleLinksLayout = {
  title: string;
  links?: Array<ILink>;
  linksGap?: string | number;
};

export const TitleLinksLayout = (props: ITitleLinksLayout) => {
  const { title, links, linksGap } = props;

  return (
    <div className={style['content__wrapper']}>
      <h1 className={style['content__title']}>{title}</h1>
      {links ? (
        <div className={style['content']}>
          <LinksBar links={links} linkGap={linksGap ?? ''} />
          <Outlet />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};
