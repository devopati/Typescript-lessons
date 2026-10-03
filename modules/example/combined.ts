const avgFunc = (num1: number, num2: number): number => {
  return (num1 + num2) / 2;
};

/**
 *
 * @param num1
 * @param num2
 * @returns total/sum
 */
const increament = (num1: number, num2: number): number => {
  return num1 + num2;
};

const lesson = "Modules in TypeScript";

export interface Car {
  name: string;
  model: string;
  year: string;
  mileage?: number;
}

export { avgFunc, increament, lesson };
