import clsx from 'clsx';
import { ButtonHTMLAttributes, useMemo } from 'react';
import style from './Button.module.scss';
type ButtonOption = 'blueButton' | 'errorButton';
interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  option: ButtonOption;
  width?: number | string;
}

export const Button = (props: IButton) => {
  const { children, option, width, ...rest } = props;

  const className = useMemo(() => {
    switch (option) {
      case 'blueButton':
        return style['button_blue'];
      case 'errorButton':
        return style['button_error'];
      default:
        return;
    }
  }, [option]);

  return (
    <button className={clsx(style['button'], className)} style={{ width: width }} {...rest}>
      {children}
    </button>
  );
};
