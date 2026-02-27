import clsx from 'clsx';
import { ButtonHTMLAttributes, useMemo } from 'react';
import style from './Button.module.scss';
type ButtonOption = 'BlueButton' | 'DeleteButton' | 'LinkButton';
interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  option: ButtonOption;
  width?: number | string;
}

export const Button = (props: IButton) => {
  const { children, option, width, className, ...rest } = props;

  const extraClassName = useMemo(() => {
    switch (option) {
      case 'BlueButton':
        return clsx(style['button'], style['button_blue']);
      case 'DeleteButton':
        return clsx(style['button'], style['button_delete']);
      case 'LinkButton':
        return style['button_link'];
      default:
        return;
    }
  }, [option]);

  return (
    <button className={clsx(className, extraClassName)} style={{ width: width }} {...rest}>
      {children}
    </button>
  );
};
