/**
 * TYPESCRIPT TYPES: EXERCISE SOLUTIONS
 *
 * Solutions to the exercises at the bottom of types.ts.
 * Try them yourself first!
 *
 * Run:    node types-solutions.ts
 * Check:  npm run check
 */

// ============================================================
// EXERCISE 1: average
// ============================================================
/**
 * An empty array has no average: 0 / 0 is NaN.
 * Returning 0 is a simple, common choice. Another option is to return
 * number | undefined, which forces the caller to handle the empty case.
 */

function average(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }
  let total = 0;
  for (const num of nums) {
    total += num;
  }
  return total / nums.length;
}

console.log("1. average:", average([10, 20, 30]), average([]));

// ERROR: average(["10", "20"]); // Error: string is not assignable to number

// ============================================================
// EXERCISE 2: TrafficLight
// ============================================================
/**
 * A literal type limits the value to exactly three strings.
 * The "never" check at the end makes TypeScript warn you if you add
 * a new colour to TrafficLight but forget to handle it in the switch.
 */

type TrafficLight = "red" | "yellow" | "green";

function next(light: TrafficLight): TrafficLight {
  switch (light) {
    case "green":
      return "yellow";
    case "yellow":
      return "red";
    case "red":
      return "green";
    default: {
      const unhandled: never = light;
      throw new Error(`Unknown light: ${unhandled}`);
    }
  }
}

console.log("2. next:", next("green"), next("yellow"), next("red"));

// ERROR: next("blue"); // Error: "blue" is not assignable to TrafficLight

// ============================================================
// EXERCISE 3: formatValue
// ============================================================
/**
 * Narrowing with typeof: inside each "if", TypeScript knows the exact type,
 * so it allows toUpperCase() only on strings and toFixed() only on numbers.
 */

function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value ? "yes" : "no"; // only boolean is left
}

console.log("3. formatValue:", formatValue("hello"), formatValue(3.14159), formatValue(true), formatValue(false));

// ============================================================
// EXERCISE 4: Book and BookPreview
// ============================================================

interface Book {
  title: string;
  author: string;
  year: number;
  rating?: number; // optional
}

type BookPreview = Pick<Book, "title" | "author">;

const book: Book = { title: "The River Between", author: "Ngũgĩ wa Thiong'o", year: 1965 };
const ratedBook: Book = { title: "Things Fall Apart", author: "Chinua Achebe", year: 1958, rating: 5 };
const preview: BookPreview = { title: book.title, author: book.author };

// ERROR: const badPreview: BookPreview = { title: "X", author: "Y", year: 2000 }; // Error: 'year' does not exist in BookPreview

console.log("4. Book:", book, ratedBook, preview);

// ============================================================
// EXERCISE 5: Counter class
// ============================================================

class Counter {
  private count: number = 0;

  public increment(): void {
    this.count++;
  }

  public reset(): void {
    this.count = 0;
  }

  public getCount(): number {
    return this.count;
  }
}

const counter = new Counter();
counter.increment();
counter.increment();
counter.increment();
console.log("5. Counter after 3 increments:", counter.getCount());
counter.reset();
console.log("5. Counter after reset:", counter.getCount());

// ERROR: counter.count = 100; // Error: Property 'count' is private and only accessible within class 'Counter'

/**
 * Note: "private" is only checked by TypeScript. In the compiled JavaScript,
 * count is a normal property. For privacy that also works at runtime,
 * JavaScript has #count (a private field).
 */

// ============================================================
// EXERCISE 6: lastItem
// ============================================================
/**
 * T | undefined because an empty array has no last item.
 */

function lastItem<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

const lastNumber = lastItem([1, 2, 3]); // number | undefined
const lastName = lastItem(["david", "john"]); // string | undefined
const lastOfEmpty = lastItem([]); // undefined

console.log("6. lastItem:", lastNumber, lastName, lastOfEmpty);

// Because the result might be undefined, TypeScript makes you check it:
// ERROR: lastName.toUpperCase(); // Error: 'lastName' is possibly 'undefined'
if (lastName !== undefined) {
  console.log("6. lastItem, after checking:", lastName.toUpperCase());
}

// ============================================================
// EXERCISE 7: changing any to unknown
// ============================================================
/**
 * Section 4 of types.ts, with "unknown" instead of "any":
 */

let anything: unknown = 10;
anything = "david"; // still OK
anything = true; // still OK
// ERROR: anything.toFixed(); // Error: 'anything' is of type 'unknown'

/**
 * Answer:
 * - The assignments still work. You can put ANY value into an unknown variable,
 *   just like with any.
 * - The only error is anything.toFixed(). In types.ts that line is commented out,
 *   so at first you see NO errors. Uncomment it to see the error.
 *   With unknown, TypeScript won't let you call methods or read properties
 *   until you check the type.
 * - That is the point: with "any", anything.toFixed() compiled and then crashed
 *   when run (true has no toFixed method). With "unknown", the mistake is caught
 *   before the program runs.
 *
 * The fix is to narrow first:
 */

if (typeof anything === "number") {
  console.log("7. unknown, after checking:", anything.toFixed(2));
} else {
  console.log("7. anything is not a number, it is a", typeof anything);
}
