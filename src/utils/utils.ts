// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export function assertNever(_: never): void {
  throw new Error('Not possible');
}

export function typedKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}
