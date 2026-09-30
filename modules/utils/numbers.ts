/**
 * utils/numbers.ts
 */

export function formatMoney(amount: number): string {
  return `KES ${amount.toFixed(2)}`;
}

export function isEven(value: number): boolean {
  return value % 2 === 0;
}
