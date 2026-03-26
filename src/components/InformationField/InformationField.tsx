import style from './InformationField.module.scss';

type IInformationField = {
  lable?: React.ReactNode;
  isStandartWrapper?: boolean;
  children: React.ReactNode;
};

export const InformationField = (props: IInformationField) => {
  const { children, isStandartWrapper = true, lable } = props;

  return (
    <div className={style['content']}>
      {lable ?? <span className={style['content__lable']}>{lable}</span>}
      {isStandartWrapper ? (
        <div className={style['content__block']}>
          <span className={style['content__value']}>{children}</span>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
