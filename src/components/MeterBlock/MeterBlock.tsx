import { Meter, METER_TYPES } from '@/common/commonTypes';
import style from './MeterBlock.module.scss';
import coldWaterIcon from '@assets/water_icon.svg';
import hotWaterIcon from '@assets/hot_water_icon.svg';
import gasIcon from '@assets/gas_icon.svg';
import lightningIcon from '@assets/lightning_icon.svg';
import { useMemo } from 'react';
import { assertNever, meterSerialNumberFormatter } from '@/utils/utils';
import clsx from 'clsx';

type IMeterBlock = {
  meter: Meter;
  className?: string;
  onClick?: (meter: Meter) => void;
};

export const MeterBlock = (props: IMeterBlock) => {
  const { meter, className, onClick } = props;
  const iconSrc = useMemo(() => {
    switch (meter.type) {
      case 'COLD_WATER':
        return coldWaterIcon;
      case 'HOT_WATER':
      case 'HEATING':
        return hotWaterIcon;
      case 'ELECTRICITY':
        return lightningIcon;
      case 'GAS':
        return gasIcon;
      default:
        assertNever(meter.type);
    }
  }, []);

  return (
    <div className={clsx(className, style['content'])} onClick={() => onClick && onClick(meter)}>
      <img src={iconSrc} alt="Иконка" className={style['content__icon']} />
      <div className={style['content__information']}>
        <span className={style['content__serial_number']}>
          {meterSerialNumberFormatter(meter.serialNumber)}
        </span>
        <span className={style['content__type']}>{METER_TYPES[meter.type]}</span>
      </div>
    </div>
  );
};
