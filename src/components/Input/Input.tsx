import { InputHTMLAttributes, useMemo } from 'react';
import commonStyle from '@styles/common.module.scss';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  elementWidth?: number | string;
}

export const Input = (props: IInput) => {
  const { type, elementWidth, ...rest } = props;
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
    <input type={type} className={inputBaseClassName} style={{ width: elementWidth }} {...rest} />
  );
};
