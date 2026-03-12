import { Propertie } from '@/common/commonTypes';
import style from './PropertieList.module.scss';
import { properieFormatter } from '@/utils/utils';
import clsx from 'clsx';
import plus from '@assets/plus_icon.svg';
import { Link, useLocation } from 'react-router';

type IPropertieList = {
  propertie: Array<Propertie>;
  disabled?: boolean;
  extraClassName?: string;
};

export const PropertieList = (props: IPropertieList) => {
  const { propertie, extraClassName, disabled = true } = props;
  const location = useLocation();

  return (
    <div className={clsx(style['content'], extraClassName, disabled && style['element_disable'])}>
      <ul className={style['content__list']}>
        {propertie.map(el => {
          return (
            <li key={el.id} className={style['list__element']}>
              <Link
                to={`/propertie/${el.id}`}
                state={{ backgroundLocation: location }}
                className={clsx(style['list__link'], disabled && style['list__link_disabled'])}
              >
                <span className={style['list__text']}>{properieFormatter(el)}</span>
              </Link>
            </li>
          );
        })}
        {!disabled && (
          <li className={style['list__element_button']}>
            <button type="button" className={style['list__button']}>
              <img src={plus} alt="добавить" className={style['plus']} />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
