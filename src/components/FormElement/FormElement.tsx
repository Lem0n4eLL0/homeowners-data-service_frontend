import style from './FormElement.module.scss';
import clsx from 'clsx';

interface IFormElement {
  children: React.ReactNode;
  label?: string;
  isRequired?: boolean;
  width?: number | string;
  error?: string;
  extraClassName?: string;
}

export const FormElement = (props: IFormElement) => {
  const { children, label, width, error, extraClassName, isRequired = false } = props;

  return (
    <div className={clsx(extraClassName, style['content'])}>
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
        {children}
      </label>
      {error !== undefined && <span className={style['field_error']}>{error}</span>}
    </div>
  );
};
