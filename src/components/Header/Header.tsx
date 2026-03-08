import { NavLink } from 'react-router';
import style from './Header.module.scss';
import logo from '@assets/logo.svg';
import logout from '@assets/exit_icon.svg';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { logoutMeAuth, selectDataAuth } from '@/services/slices/auth';
import { phoneFormatterView } from '@/utils/utils';
import { SyntheticEvent } from 'react';
import { LOCAL_STORAGE_ACCESS_TOKEN_ALIAS } from '@/common/constants';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { phone } = useAppSelector(selectDataAuth);

  const logoutFormHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(logoutMeAuth());
    if (result.meta.requestStatus === 'fulfilled') {
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_ALIAS, '');
      location.reload();
    }
  };

  return (
    <div className={style['content']}>
      <img src={logo} alt="Центр технических технологий" className={style['content__logo']} />
      <ul className={style['content__links']}>
        <li>
          <NavLink
            to="readings"
            className={({ isActive }) =>
              clsx(style['content__link'], isActive && style['content__link_active'])
            }
          >
            Показания
          </NavLink>
        </li>
        <li>
          <NavLink
            to="accruals"
            className={({ isActive }) =>
              clsx(style['content__link'], isActive && style['content__link_active'])
            }
          >
            Начисления
          </NavLink>
        </li>
        <li>
          <NavLink
            to="applications"
            className={({ isActive }) =>
              clsx(style['content__link'], isActive && style['content__link_active'])
            }
          >
            Заявки
          </NavLink>
        </li>
        <li>
          <NavLink
            to="services"
            className={({ isActive }) =>
              clsx(style['content__link'], isActive && style['content__link_active'])
            }
          >
            Услуги
          </NavLink>
        </li>
        <li>
          <NavLink
            to="news"
            className={({ isActive }) =>
              clsx(style['content__link'], isActive && style['content__link_active'])
            }
          >
            Новости
          </NavLink>
        </li>
      </ul>
      <div className={style['content__account']}>
        <NavLink
          to="profile"
          className={({ isActive }) =>
            clsx(
              style['content__phone'],
              style['content__link'],
              isActive && style['content__link_active']
            )
          }
        >
          {phoneFormatterView(phone ?? '+70000000000')}
        </NavLink>
        <form
          name="logout_form"
          className={style['content__logout-form']}
          onSubmit={e => void logoutFormHandler(e)}
        >
          <button type="submit" className={style['content__logout-button']}>
            <img src={logout} alt="logout" />
          </button>
        </form>
      </div>
    </div>
  );
};
