import * as combined from "./combined.ts";
//import type { Car } from "./combined.ts";
// Calculate scores of two subjects and output both sum and avg

const eng = 89;
const math = 95;

export const sum = combined.increament(eng, math);
//const avg = combined.avgFunc(eng, math);

console.log(combined.lesson);

// let myCar: Car;

// myCar={
//     name:"Toyota",
//     model:"Corolla",
//     // year:"2020",
//     // mileage:15000
// }

// console.log(sum, avg);
