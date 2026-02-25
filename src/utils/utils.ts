// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export function assertNever(_: never): void {
  throw new Error('Not possible');
}
