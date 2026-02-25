import { InputHTMLAttributes, useMemo } from 'react';
import commonStyle from '@styles/common.module.scss';
import clsx from 'clsx';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  elementWidth?: number | string;
  elementHeight?: number | string;
  extraClassName?: string;
}

export const Input = (props: IInput) => {
  const { type, elementWidth, elementHeight, extraClassName, ...rest } = props;
  const inputBaseClassName = useMemo(() => {
    switch (type) {
      case 'text':
      case 'password':
      case 'email':
      case 'phone':
        return commonStyle['form_field'];
      default:
        return;
    }
  }, []);
  return (
    <input
      type={type}
      className={clsx(inputBaseClassName, extraClassName)}
      style={{ width: elementWidth, height: elementHeight }}
      {...rest}
    />
  );
};
