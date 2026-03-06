import { forwardRef, InputHTMLAttributes, useMemo } from 'react';
import commonStyle from '@styles/common.module.scss';
import style from './Input.module.scss';
import clsx from 'clsx';

export interface IBaseInput extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  elementWidth?: number | string;
  elementHeight?: number | string;
  extraClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, IBaseInput>((props, ref) => {
  const { type, elementWidth, elementHeight, extraClassName, isError, ...rest } = props;
  const inputBaseClassName = useMemo(() => {
    switch (type) {
      case 'text':
      case 'password':
      case 'email':
      case 'phone':
        return commonStyle['form_field'];
      case 'checkbox':
        return style['field_checkbox'];
      default:
        return;
    }
  }, [type]);
  return (
    <input
      type={type}
      ref={ref}
      className={clsx(
        inputBaseClassName,
        extraClassName,
        style['field'],
        isError && commonStyle['form_field__error']
      )}
      style={{ width: elementWidth, height: elementHeight }}
      {...rest}
    />
  );
});
