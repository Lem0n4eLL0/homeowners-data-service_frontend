// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export function assertNever(_: never): void {
  throw new Error('Not possible');
}

export function typedKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

export const phoneFormatter = (value: string): string => {
  // format: +7 (000) 000-00-00
  let result = '';
  let numArray = value.split('').filter(el => !isNaN(+el) && el !== ' ');

  if (numArray.length === 0) return '';
  else result = '+7';
  numArray = numArray.slice(1, 11);
  result = numArray.reduce((pre, cur, ind) => {
    let postfix = cur;
    if (ind === 0) {
      postfix = ' (' + cur;
    } else if (ind === 3) {
      postfix = ') ' + cur;
    } else if (ind === 6 || ind === 8) {
      postfix = '-' + cur;
    }
    return pre + postfix;
  }, result);
  console.log(result);
  return result;
};
