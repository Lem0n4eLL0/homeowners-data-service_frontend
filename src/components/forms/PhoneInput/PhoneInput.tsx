import { ChangeEvent, forwardRef } from 'react';
import { Input } from '../Input';
import style from './PhoneInput.module.scss';
import { phoneFormatterValue, phoneFormatterView } from '@/utils/utils';
import { IBaseInput } from '../Input/Input';

interface IPhoneInput extends IBaseInput {
  type: 'phone';
  value: string;
  onChangeValue: (value: string) => void;
}

export const PHONE_PLACEHOLDER = '+7 (000) 000-00-00';

export const PhoneInput = forwardRef<HTMLInputElement, IPhoneInput>((props, ref) => {
  const { value, onChangeValue, width, placeholder = PHONE_PLACEHOLDER, ...rest } = props;

  const changePhoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeValue(phoneFormatterValue(e.target.value));
  };

  return (
    <div style={{ width: width }} className={style['phone__wrapper']}>
      {/* <div className={clsx(commonStyle['form_field'])}>
        { value.length === 0 ?
          <span className={style['phone__placeholder']}>{PHONE_PLACEHOLDER}</span> :
          <span>{phoneFormatterView(value)}</span>
        }
      </div> */}
      <Input
        value={phoneFormatterView(value)}
        {...rest}
        placeholder={placeholder}
        ref={ref}
        onChange={changePhoneHandler}
      />
    </div>
  );
});
