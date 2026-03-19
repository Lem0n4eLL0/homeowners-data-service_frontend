import style from './InformationField.module.scss';

type IInformationField = {
  lable?: React.ReactNode;
  children: React.ReactNode;
};

export const InformationField = (props: IInformationField) => {
  const { children, lable } = props;

  return (
    <div className={style['content']}>
      <span className={style['content__lable']}>{lable}</span>
      <div className={style['content__block']}>
        <span className={style['content__value']}>{children}</span>
      </div>
    </div>
  );
};
