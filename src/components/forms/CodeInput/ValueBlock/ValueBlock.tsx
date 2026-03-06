import { Line } from '@/components/shells/Line';
import style from './ValueBlock.module.scss';
import clsx from 'clsx';

export type ValueBlockState = 'EMPTY' | 'NEXT' | 'FULL';

interface IValueBlock {
  state: ValueBlockState;
  isFocused?: boolean;
  children?: React.ReactNode;
}

export const ValueBlock = (props: IValueBlock) => {
  const { state, isFocused, children } = props;
  return (
    <div className={clsx(style['content'], isFocused && style['content__focused'])}>
      {state === 'FULL' && children}
      {state === 'NEXT' && (
        <Line size="18px" weigth="1px" borderRadius="6px" extraClassName={style['content__line']} />
      )}
    </div>
  );
};
