import { ChangeEventHandler, forwardRef, ReactNode, useEffect, useMemo, useState } from 'react';
import style from './CodeInput.module.scss';
import { codeFormatter } from '@/utils/utils';
import { ValueBlock } from './ValueBlock';
import { ValueBlockState } from './ValueBlock/ValueBlock';
import { Line } from '@/components/shells/Line';

interface ICodeInput {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  width?: string | number;
}

const renderLists = (
  valueArray: string[],
  isFocused: boolean
): [firstList: ReactNode[], secondList: ReactNode[]] => {
  const nextIndex = valueArray.length;
  const result: ReactNode[] = [];

  for (let i = 0; i < 6; i++) {
    const state: ValueBlockState =
      i === nextIndex && isFocused ? 'NEXT' : i < nextIndex ? 'FULL' : 'EMPTY';
    result.push(
      <ValueBlock state={state} isFocused={isFocused} key={i}>
        {state === 'FULL' && valueArray[i]}
      </ValueBlock>
    );
  }

  return [result.slice(0, 3), result.slice(3, 6)];
};

export const CodeInput = forwardRef<HTMLInputElement, ICodeInput>((props, ref) => {
  const { value, onChange, width } = props;
  const [isFocused, setIsFocused] = useState(false);

  const [strValue, firstList, secondList] = useMemo(() => {
    const valueArray = codeFormatter(value);
    const [firstList, secondList] = renderLists(valueArray, isFocused);

    console.log(valueArray);
    return [valueArray.join(''), firstList, secondList];
  }, [value, isFocused]);

  const handleFocus = (_: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
  };

  const handleBlur = (_: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
  };

  useEffect(() => {});

  return (
    <>
      <div className={style['content']} style={{ width: width }}>
        <div className={style['input__wrapper']}>
          <div className={style['list']}>{...firstList}</div>
          <Line size="10px" weigth="2px" borderRadius="6px" extraClassName={style['line']} />
          <div className={style['list']}>{...secondList}</div>
        </div>
        <input
          type="text"
          value={strValue}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={style['content__input']}
          ref={ref}
        />
      </div>
    </>
  );
});
