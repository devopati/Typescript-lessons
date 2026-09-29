//1. function average()

function average(nums: number[]): number {
  if (nums.length === 0) {
    console.log("The array is empty, returning 0");
    return 0;
  }

  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i] ?? 0;
  }

  let average = sum / nums.length;
  console.log(average);
  return average;
}

average([]); // returns 0

//2. Create a type  TrafficLight  that only allows "red", "yellow" or "green".
// Write a function  next(light: TrafficLight): TrafficLight  that returns the next colour.

type TrafficLight = "red" | "yellow" | "green";

const next = (light: TrafficLight) => {
  if (light === "red") {
    let nextlight = "yellow";
    console.log(nextlight);
  } else if (light === "green") {
    let nextlight = "red";
    console.log(nextlight);
  } else {
    let nextlight = "green";
    console.log(nextlight);
  }
};

next("green"); // returns "green"

//3. Write a function  formatValue(value: string | number | boolean): string
// that returns strings in uppercase, numbers with 2 decimal places, and booleans as "yes"/"no".

function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return value ? "yes" : "no";
  }
}

console.log(formatValue("hello"));
console.log(formatValue(12.5));
console.log(formatValue(true));

//4. Create an interface  Book  with title, author, year and an optional rating.
// Then create a type  BookPreview  that has only title and author (use Pick).

interface Book {
  title: string;
  author: string;
  year: number;
}

type BookPreview = Pick<Book, "title" | "author">;

const previews: BookPreview = {
  title: "The Pragmatic Programmer",
  author: "David Thomas",
};

console.log(`I have been reading ${previews.title} by ${previews.author}`);

//5. Write a class  Counter  with a private count, and methods  increment(),  reset()
//and  getCount().  Show that  counter.count = 100  is an error.

class Counter {
  private count: number;

  constructor(count: number) {
    this.count = count;
  }

  increment(count: number) {
    console.log((this.count += count));
  }

  reset() {
    this.count = 0;
  }

  getCount() {
    console.log(this.count);
    return this.count;
  }
}

const counter = new Counter(5);
counter.increment(1);
counter.reset();
console.log("count is:", counter.getCount());

//6. Write a generic function  lastItem<T>(items: T[]): T | undefined.

function lastItem<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

console.log(lastItem([1, 2, 3, 4, 5, 6]));

//7.  Change  let anything: any  in section 4 to  unknown.  Which lines now show errors, and why?


// ============================================================
// 4. ANY VS UNKNOWN
// ============================================================
/**
 * Both can hold any value. The difference is what you can DO with the value:
 *   any:     TypeScript stops checking. Mistakes are only found when the program crashes.
 *   unknown: TypeScript makes you check the type before you use it. Safer.
 *
 * Use unknown when you really don't know the type (e.g. data from an API).
 */

let anything: any = 10;
anything = "david";
anything = true;
// anything.toFixed(); // compiles fine, but CRASHES when run: true.toFixed is not a function

let mystery: unknown = 10;
mystery = "david";
// ERROR: mystery.toUpperCase(); // Error: 'mystery' is of type 'unknown'

// Check the type first, then TypeScript lets you use it:
if (typeof mystery === "string") {
  console.log("4. unknown, after checking:", mystery.toUpperCase());
}