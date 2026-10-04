/**
 * math.ts: NAMED EXPORTS
 *
 * Put "export" in front of anything you want other files to use.
 * Anything WITHOUT "export" stays private to this file.
 */

export const PI = 3.14159;

export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function circleArea(radius: number): number {
  return round(PI * radius * radius);
}

// Not exported: other files can't import this. It's a private helper.
function round(value: number): number {
  return Math.round(value * 100) / 100;
}

export function subtract(a: number, b: number): number {
  return a - b;
}
