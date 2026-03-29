import clsx from 'clsx';
import { Line } from '../shells/Line';
import style from './LinksBar.module.scss';
import { NavLink } from 'react-router';

export type ILinkBase = {
  name: string;
  label: string;
};

export type ILinkTo = ILinkBase & {
  to: string;
  isActive?: never;
  navigate?: never;
};

export type ILinkNavigate = ILinkBase & {
  isActive: boolean;
  navigate: () => void;
  to?: never;
};

export type ILink = ILinkTo | ILinkNavigate;

type ILinksBar = {
  links: ILink[];
  extraClassName?: string;
  linkGap?: string | number;
};

export const LinksBar = (props: ILinksBar) => {
  const { extraClassName, links, linkGap } = props;
  return (
    <div className={clsx(style['content'], extraClassName)}>
      <ul className={style['content__list']} style={{ gap: linkGap }}>
        {links.map(el => {
          return (
            <li key={el.name}>
              {el.to ? (
                <NavLink
                  to={el.to}
                  className={({ isActive }) =>
                    clsx(
                      style['content__link'],
                      style['link'],
                      isActive && style['content__link_active']
                    )
                  }
                  end
                >
                  {el.label}
                </NavLink>
              ) : (
                <button
                  className={clsx(
                    style['content__link'],
                    style['buttons_bar'],
                    el.isActive && style['content__link_active']
                  )}
                  onClick={el.navigate}
                >
                  {el.label}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <Line extraClassName={style['content__line']} />
    </div>
  );
};
