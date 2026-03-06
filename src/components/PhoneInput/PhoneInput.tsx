import { forwardRef, InputHTMLAttributes } from 'react';
import { Input } from '../Input';
import style from './PhoneInput.module.scss';
import { phoneFormatter } from '@/utils/utils';

interface IPhoneInput extends InputHTMLAttributes<HTMLInputElement> {
  type: 'phone';
  value: string;
  isError?: boolean;
  elementWidth?: number | string;
  elementHeight?: number | string;
  extraClassName?: string;
}

export const PHONE_PLACEHOLDER = '+7 (000) 000-00-00';

export const PhoneInput = forwardRef<HTMLInputElement, IPhoneInput>((props, ref) => {
  const { value, width, placeholder = PHONE_PLACEHOLDER, ...rest } = props;
  return (
    <div style={{ width: width }} className={style['phone__wrapper']}>
      <Input value={phoneFormatter(value)} {...rest} placeholder={placeholder} ref={ref} />
    </div>
  );
});
