import clsx from 'clsx';
import { Line } from '../shells/Line';
import style from './LinksBar.module.scss';
import { SyntheticEvent, useState } from 'react';

type ILink = {
  name: string;
  label: string;
  onClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
};

type ILinksBar = {
  active: string;
  links: ILink[];
  extraClassName?: string;
};

export const LinksBar = (props: ILinksBar) => {
  const { active, extraClassName, links } = props;
  const [activeLink, setActiveLink] = useState<string>(active);

  return (
    <div className={clsx(style['content'], extraClassName)}>
      <ul className={style['content__list']}>
        {links.map((el, index) => {
          return (
            <li key={`${index}-${el.name}`}>
              <button
                className={clsx(
                  style['content__link'],
                  activeLink === el.name && style['content__link_active']
                )}
                onClick={e => {
                  setActiveLink(el.name);
                  el.onClick(e);
                }}
              >
                {el.label}
              </button>
            </li>
          );
        })}
      </ul>
      <Line extraClassName={style['content__line']} />
    </div>
  );
};
