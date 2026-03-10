import clsx from 'clsx';
import style from './ErrorField.module.scss';

type IErrorField = {
  children: React.ReactNode;
  width?: string | number;
  className?: string;
};

export const ErrorField = (props: IErrorField) => {
  const { children, width, className } = props;
  return (
    <span className={clsx(style['error'], className)} style={{ width: width }}>
      {children}
    </span>
  );
};
