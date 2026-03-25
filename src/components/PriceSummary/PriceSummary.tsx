import { priceFormatter } from '@/utils/utils';
import style from './PriceSummary.module.scss';
import clsx from 'clsx';

type IPriceSummary = {
  lable?: string;
  price: string | number;
  extraClassName?: string;
};

export const PriceSummary = (props: IPriceSummary) => {
  const { lable = 'Итог', price, extraClassName } = props;
  return (
    <div className={clsx(style['content'], extraClassName)}>
      <span className={style['content_lable']}>{`${lable}:`}</span>
      <span className={style['content_price']}>
        {typeof price === 'number' ? priceFormatter(price) : price}
      </span>
    </div>
  );
};
