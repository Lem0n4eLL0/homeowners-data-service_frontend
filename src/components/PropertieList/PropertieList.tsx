import { Propertie } from '@/common/commonTypes';
import style from './PropertieList.module.scss';
import commonStyle from '@styles/common.module.scss';
import { properieFormatter } from '@/utils/utils';
import clsx from 'clsx';
import plus from '@assets/plus_icon.svg';
import { Link, useLocation, useNavigate } from 'react-router';

type IPropertieList = {
  propertie: Array<Propertie>;
  disabled?: boolean;
  extraClassName?: string;
};

export const PropertieList = (props: IPropertieList) => {
  const { propertie, extraClassName, disabled = true } = props;
  const location = useLocation();
  const navigator = useNavigate();

  const addProperyHandler = () => {
    void navigator('properties/add', {
      state: {
        backgroundLocation: location,
      },
    });
  };

  return (
    <div className={clsx(style['content'], extraClassName, disabled && style['element_disable'])}>
      <ul className={clsx(style['content__list'], commonStyle['scroll'])}>
        {propertie.map(el => {
          return (
            <li key={el.id} className={style['list__element']}>
              {disabled ? (
                <span
                  className={clsx(style['list__link'], style['list__link_disabled'])}
                  aria-disabled="true"
                >
                  <span className={style['list__text']}>{properieFormatter(el)}</span>
                </span>
              ) : (
                <Link
                  to={`properties/edit/${el.id}`}
                  state={{ backgroundLocation: location }}
                  className={style['list__link']}
                >
                  <span className={style['list__text']}>{properieFormatter(el)}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      {!disabled && (
        <button type="button" className={style['content__button']} onClick={addProperyHandler}>
          <img src={plus} alt="добавить" className={style['plus']} />
        </button>
      )}
    </div>
  );
};
