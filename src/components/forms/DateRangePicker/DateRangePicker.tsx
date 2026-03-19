import clsx from 'clsx';
import style from './DateRangePicker.module.scss';
import commonStyle from '@styles/common.module.scss';
import { DateRange } from '@/common/commonTypes';

type DateRangePickerProps = {
  value: DateRange;
  onChange: (range: DateRange) => void;
};

const isValidDate = (date: Date): boolean => {
  return !isNaN(date.getTime());
};

export const DateRangePicker = ({ value, onChange }: DateRangePickerProps) => {
  return (
    <div className={style['content']}>
      <span className={style['content__lable']}>Дата</span>
      <div className={style['content__inputs']}>
        <input
          type="date"
          value={
            value.from && isValidDate(value.from) ? value.from.toISOString().split('T')[0] : ''
          }
          onChange={e => onChange({ ...value, from: new Date(e.target.value) })}
          className={clsx(style['content__field'], commonStyle['form_field'])}
        />
        <input
          type="date"
          value={value.to && isValidDate(value.to) ? value.to.toISOString().split('T')[0] : ''}
          onChange={e => onChange({ ...value, to: new Date(e.target.value) })}
          className={clsx(style['content__field'], commonStyle['form_field'])}
        />
      </div>
    </div>
  );
};
