import clsx from 'clsx';
import { TextareaHTMLAttributes } from 'react';
import commonStyle from '@styles/common.module.scss';
import style from './Textarea.module.scss';

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  isError: boolean;
  maxSymb: number;
  value: string;
}

export const Textarea = (props: ITextarea) => {
  const { isError, maxSymb, value, ...rest } = props;

  return (
    <div className={style['content']}>
      <textarea
        className={clsx(
          style['textarea'],
          commonStyle['form_field'],
          isError && commonStyle['form_field__error']
        )}
        value={value}
        {...rest}
      />
      <span className={clsx(style['counter'], isError && style['counter__full'])}>
        {`${value.length}/${maxSymb}`}
      </span>
    </div>
  );
};
