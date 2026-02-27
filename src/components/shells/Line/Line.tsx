import { useMemo } from 'react';

type Orientation = 'vertical' | 'horizontal';

interface ILine {
  orientation?: Orientation;
  size?: number | string;
  weigth?: number;
  color?: string;
  extraClassName?: string;
}

export const Line = (props: ILine) => {
  const { orientation = 'horizontal', size = '100%', weigth = 1, color, extraClassName } = props;

  const [lineWeigth, lineHeigth] = useMemo(() => {
    switch (orientation) {
      case 'horizontal':
        return [size, weigth];
      case 'vertical':
        return [weigth, size];
    }
  }, [orientation, weigth, size]);

  return (
    <div
      className={extraClassName}
      style={{ width: lineWeigth, height: lineHeigth, backgroundColor: color }}
    ></div>
  );
};
