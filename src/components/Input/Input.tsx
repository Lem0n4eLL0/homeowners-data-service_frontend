import { forwardRef, InputHTMLAttributes, useMemo } from 'react';
import commonStyle from '@styles/common.module.scss';
import style from './Input.module.scss';
import clsx from 'clsx';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  elementWidth?: number | string;
  elementHeight?: number | string;
  extraClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, IInput>((props, ref) => {
  const { type, elementWidth, elementHeight, extraClassName, ...rest } = props;
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
      className={clsx(inputBaseClassName, extraClassName, style['field'])}
      style={{ width: elementWidth, height: elementHeight }}
      {...rest}
    />
  );
});
