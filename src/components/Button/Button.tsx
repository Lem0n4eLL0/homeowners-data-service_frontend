import clsx from 'clsx';
import { ButtonHTMLAttributes, useMemo } from 'react';
import style from './Button.module.scss';
type ButtonOption = 'BlueButton' | 'BlueInheritButton' | 'DeleteButton' | 'LinkButton';

type ButtonLoading = {
  isLoading: boolean;
  loadingMessage?: React.ReactNode;
};
interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  option: ButtonOption;
  loading?: ButtonLoading;
  width?: number | string;
}

export const Button = (props: IButton) => {
  const {
    children,
    option,
    loading = { isLoading: false, loadingMessage: 'Загрузка...' },
    width,
    disabled,
    className,
    ...rest
  } = props;

  const extraClassName = useMemo(() => {
    switch (option) {
      case 'BlueButton':
        return clsx(style['button'], style['button_blue']);
      case 'DeleteButton':
        return clsx(style['button'], style['button_delete']);
      case 'BlueInheritButton':
        return clsx(style['button'], style['button_blue_inherit']);
      case 'LinkButton':
        return style['button_link'];
      default:
        return;
    }
  }, [option]);

  return (
    <button
      className={clsx(className, extraClassName)}
      style={{ width: width }}
      disabled={disabled || loading.isLoading}
      {...rest}
    >
      {loading.isLoading ? (loading.loadingMessage ?? children) : children}
    </button>
  );
};
