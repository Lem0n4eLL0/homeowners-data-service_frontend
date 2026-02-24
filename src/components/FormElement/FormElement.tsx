import style from './FormElement.module.scss';
import clsx from 'clsx';
import { useMemo } from 'react';

interface IFormElement {
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  label?: string;
  onChange?: () => void;
  isDisabled?: boolean;
  isRequired?: boolean;
  width?: number | string;
  inputHeight?: number | string;
  error?: string;
}

export const FormElement = (props: IFormElement) => {
  const {
    type,
    label,
    width,
    error,
    inputHeight,
    isDisabled = false,
    isRequired = false,
    ...rest
  } = props;

  const inputBaseClassName = useMemo(() => {
    switch (type) {
      case 'text':
      case 'password':
      case 'email':
      case 'phone':
        return style['input_field'];
      default:
        return;
    }
  }, []);

  return (
    <div className={style['content']}>
      <label className={style['label']} style={{ width: width }}>
        {label !== undefined && (
          <span
            className={clsx(
              style['label_content'],
              isRequired && label && style['label_content_required']
            )}
          >
            {label}
          </span>
        )}
        <input
          type={type}
          className={inputBaseClassName}
          disabled={isDisabled}
          required={isRequired}
          style={{ height: inputHeight }}
          {...rest}
        />
      </label>
      {error !== undefined && <span className={style['field_error']}>{error}</span>}
    </div>
  );
};
