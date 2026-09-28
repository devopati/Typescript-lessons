/**
 * TYPESCRIPT TYPES: LESSON NOTES
 *
 * How to run this file:
 *   node types.ts          runs the code (Node removes the types, it does NOT check them)
 *   npx tsc --noEmit       checks the types without running anything
 *
 * Lines marked ERROR are commented out because they cause an error.
 * Uncomment them one at a time to see what TypeScript says, then comment them again.
 *
 * Tip: in VS Code, hover over any variable to see the type TypeScript gave it.
 *
 * CONTENTS
 *   1.  Basic types
 *   2.  Inferred vs explicit types
 *   3.  Arrays and tuples
 *   4.  any vs unknown
 *   5.  null and undefined
 *   6.  Functions (void, never, optional and default parameters)
 *   7.  Object types and optional properties
 *   8.  Type aliases
 *   9.  Literal types
 *   10. Union types and narrowing
 *   11. Intersection types
 *   12. Interfaces
 *   13. Types vs interfaces
 *   14. Optional chaining (?.) and nullish coalescing (??)
 *   15. Non-null assertion (!) and type assertion (as)
 *   16. Classes
 *   17. Generics
 *   18. Utility types
 */

// ============================================================
// 1. BASIC TYPES
// ============================================================
/**
 * The types you will use most:
 *   number      10, -3.5, 0.1        (whole numbers and decimals are both "number")
 *   string      "hello", 'any text'
 *   boolean     true, false
 *   null        null                 (no value, on purpose)
 *   undefined   undefined            (no value assigned yet)
 *   any         turns type checking off (avoid it)
 *   unknown     could be anything, but you must check before using it
 *   void        a function that returns nothing
 *   never       a function that never finishes (e.g. it always throws)
 */

const age: number = 25;
const firstName: string = "David";
const isStudent: boolean = true;

console.log("1. Basic types:", age, firstName, isStudent);

// ERROR: const wrongAge: number = "25"; // Error: Type 'string' is not assignable to type 'number'

// ============================================================
// 2. INFERRED VS EXPLICIT TYPES
// ============================================================
/**
 * Explicit: you write the type yourself.   let score: number = 10;
 * Inferred: TypeScript works it out from the value.   let score = 10;
 *
 * Both give "score" the type number. If the value makes the type obvious,
 * you can let TypeScript infer it.
 */

let city = "Nairobi"; // inferred: string
let score: number = 10; // explicit: number

city = "Mombasa"; // OK: still a string
// ERROR: city = 42; // Error: Type 'number' is not assignable to type 'string'

console.log("2. Inferred vs explicit:", city, score);

// ============================================================
// 3. ARRAYS AND TUPLES
// ============================================================
/**
 * Array: a list of any length where every item has the same type.
 *   string[]  and  Array<string>  mean the same thing.
 *
 * Tuple: a fixed-length list where each position has its own type.
 *   [string, number] means "exactly 2 items: a string, then a number".
 */

const numbers = [1, 2, 3, 4, 5]; // inferred: number[]
const names: string[] = ["david", "john", "jane"];
const scores: Array<number> = [90, 85, 77];

names.push("mary"); // OK
// ERROR: names.push(10); // Error: number is not assignable to string

const student: [string, number] = ["david", 10];
// ERROR: const badStudent: [string, number] = ["david", "10"]; // Error: position 2 must be a number
// ERROR: const tooLong: [string, number] = ["david", 10, true]; // Error: tuple has only 2 items

console.log("3. Arrays and tuples:", numbers, names, scores, student);

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

// ============================================================
// 5. NULL AND UNDEFINED
// ============================================================
/**
 * undefined: a variable exists but has no value yet.
 * null:      you deliberately set "no value".
 *
 * With strict mode on, a string can NOT be null or undefined unless you say so.
 */

let middleName: string | undefined = undefined; // may or may not have a middle name
let spouse: string | null = null;

// ERROR: let lastName: string = null; // Error: null is not assignable to string

console.log("5. null and undefined:", middleName, spouse);

// ============================================================
// 6. FUNCTIONS
// ============================================================
/**
 * Give each parameter a type. The return type goes after the brackets.
 *   function name(param: type): returnType { ... }
 */

function add(a: number, b: number): number {
  return a + b;
}

// Arrow function version
const multiply = (a: number, b: number): number => a * b;

// ERROR: add(1, "2"); // Error: "2" is not a number
// ERROR: add(1);      // Error: Expected 2 arguments, but got 1

// Optional parameter (?): can be left out. Its type becomes string | undefined.
function greet(name: string, title?: string): string {
  if (title) {
    return `Hello, ${title} ${name}`;
  }
  return `Hello, ${name}`;
}

// Default parameter: used when the argument is left out
function power(base: number, exponent: number = 2): number {
  return base ** exponent;
}

// void: the function returns nothing
function logMessage(message: string): void {
  console.log("6. void function says:", message);
}

// never: the function never finishes normally (it always throws)
function throwError(message: string): never {
  throw new Error(message);
}

console.log("6. Functions:", add(2, 3), multiply(2, 3), greet("David"), greet("David", "Mr."), power(3), power(2, 5));
logMessage("hi");
// throwError("Something went wrong"); // uncomment to see the program stop with an error

// ============================================================
// 7. OBJECT TYPES AND OPTIONAL PROPERTIES
// ============================================================
/**
 * An object type lists each property and its type.
 * A "?" after a property name makes it optional (it can be missing).
 */

// Inferred
const person = {
  occupation: "developer",
  address: { street: "123 Main St", city: "New York", state: "NY" },
  likes: ["coding", "reading", "traveling"],
};

// Explicit (same shape, written out)
const person2: {
  occupation: string;
  address: { street: string; city: string; state: string };
  likes: string[];
  nickname?: string; // optional
} = {
  occupation: "developer",
  address: { street: "123 Main St", city: "New York", state: "NY" },
  likes: ["coding", "reading", "traveling"],
  // nickname is optional, so leaving it out is fine
};

// ERROR: person.age = 30; // Error: Property 'age' does not exist on this object
// ERROR: person.occupation = 5; // Error: occupation is a string

console.log("7. Objects:", person.occupation, person2.likes);

// ============================================================
// 8. TYPE ALIASES
// ============================================================
/**
 * "type" gives a type a name so you can reuse it instead of writing it out every time.
 */

type Car = {
  year: number;
  make: string;
  model: string;
};

const car1: Car = { year: 2020, make: "Toyota", model: "Camry" };
const car2: Car = { year: 2018, make: "Honda", model: "Civic" };

// ERROR: const car3: Car = { year: 2021, make: "Mazda" }; // Error: Property 'model' is missing

/**
 * Note: an alias for a basic type, like  type CarYear = number,
 * is only a new name. It does NOT add any checking: any number is accepted as a CarYear.
 */

console.log("8. Type aliases:", car1, car2);

// ============================================================
// 9. LITERAL TYPES
// ============================================================
/**
 * A literal type allows only exact values, not every string or number.
 * Combined with | ("or"), it lists every allowed value.
 * This is often simpler than an enum.
 */

type Direction = "up" | "down" | "left" | "right";
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

let move: Direction = "up";
move = "left"; // OK
// ERROR: move = "forward"; // Error: "forward" is not one of the allowed values

const roll: DiceRoll = 4;

// const vs let: a const can never change, so TypeScript infers the exact value
const fixedColor = "red"; // type: "red"
let changingColor = "red"; // type: string

console.log("9. Literal types:", move, roll, fixedColor, changingColor);

// ============================================================
// 10. UNION TYPES AND NARROWING
// ============================================================
/**
 * A union type (A | B) means the value can be EITHER type.
 *
 * You can only use what both types have in common, so to use a string method
 * you first check which type you have. This is called "narrowing".
 */

type StringOrNumber = string | number;

function describe(value: StringOrNumber): string {
  // ERROR: return value.toUpperCase(); // Error: toUpperCase does not exist on type number

  if (typeof value === "string") {
    return value.toUpperCase(); // here TypeScript knows value is a string
  }
  return value.toFixed(2); // here it must be a number
}

console.log("10. Narrowing:", describe("david"), describe(3.14159));

// A function that returns "value is string" is a type guard: a reusable check
function isString(value: unknown): value is string {
  return typeof value === "string";
}

const input: unknown = "hello";
if (isString(input)) {
  console.log("10. Type guard:", input.toUpperCase());
}

/**
 * Discriminated union: each type has a shared property ("kind") with a
 * different literal value. Checking it tells TypeScript which type you have.
 */
type CircleShape = { kind: "circle"; radius: number };
type SquareShape = { kind: "square"; side: number };
type AnyShape = CircleShape | SquareShape;

function area(shape: AnyShape): number {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2; // shape is CircleShape here
  }
  return shape.side ** 2; // shape is SquareShape here
}

console.log("10. Discriminated union:", area({ kind: "circle", radius: 1 }), area({ kind: "square", side: 3 }));

// ============================================================
// 11. INTERSECTION TYPES
// ============================================================
/**
 * An intersection (A & B) combines types: the value must have
 * ALL the properties of A AND all the properties of B.
 */

type Person = { name: string; age: number };
type Employee = { employeeId: number };
type EmployeePerson = Person & Employee;

const worker: EmployeePerson = { name: "David", age: 30, employeeId: 1234 };
// ERROR: const badWorker: EmployeePerson = { name: "David", age: 30 }; // Error: employeeId is missing

console.log("11. Intersection:", worker);

// ============================================================
// 12. INTERFACES
// ============================================================
/**
 * An interface is another way to name an object type.
 * Use "extends" to build a new interface on top of an existing one.
 */

interface Rectangle {
  height: number;
  width: number;
}

const rectangle: Rectangle = { height: 10, width: 20 };

interface Shape {
  color: string;
}

interface Circle extends Shape {
  radius: number; // a Circle has color AND radius
}

const circle: Circle = { color: "red", radius: 10 };

console.log("12. Interfaces:", rectangle, circle);

// ============================================================
// 13. TYPES VS INTERFACES
// ============================================================
/**
 * For object shapes they are almost the same. The real differences:
 *
 * 1. "type" can name ANY type: unions, literals, tuples, basic types.
 *    "interface" can only describe objects (and classes).
 *
 * 2. Interfaces with the same name MERGE into one. Types cannot:
 *    declaring the same type name twice is an error.
 *
 * 3. Both can be extended:  interface B extends A { }   or   type B = A & { }
 *
 * Common rule of thumb: use interface for object shapes, type for everything else.
 */

// Interface merging: these three declarations become ONE Animal interface
interface Animal {
  name: string;
}
interface Animal {
  age: number;
}
interface Animal {
  sound: string;
}

const dog: Animal = { name: "Rex", age: 5, sound: "bark" }; // needs all three properties

// A type can do things an interface cannot:
type ID = string | number; // union
type Point2D = [number, number]; // tuple

const userId: ID = 101;
const startPoint: Point2D = [0, 0];

// ERROR: type Car = { wheels: number }; // Error: Duplicate identifier 'Car' (types don't merge)

console.log("13. Types vs interfaces:", dog, userId, startPoint);

// ============================================================
// 14. OPTIONAL CHAINING (?.) AND NULLISH COALESCING (??)
// ============================================================
/**
 * ?.  Optional chaining: read a property that might not exist.
 *     If the thing before ?. is null or undefined, the result is undefined
 *     instead of crashing.
 *
 * ??  Nullish coalescing: give a default value if the left side is null or undefined.
 *     Different from ||, which also replaces 0, "" and false:
 *       0 ?? 5  → 0
 *       0 || 5  → 5
 */

interface House {
  sqft: number;
  name?: string;
  yard?: { sqft: number };
}

function printYardSize(house: House): void {
  // ERROR: const size = house.yard.sqft; // Error: 'house.yard' is possibly undefined

  // Optional chaining: undefined if there is no yard
  const yardSize = house.yard?.sqft;

  if (yardSize !== undefined) {
    console.log(`14. Yard size: ${yardSize} sqft`);
  } else {
    console.log("14. Yard size is not available");
  }

  // Nullish coalescing: fall back to 0 if there is no yard
  const yardSizeOrZero = house.yard?.sqft ?? 0;
  console.log(`14. Yard size (default 0): ${yardSizeOrZero} sqft`);
}

const houseWithoutYard: House = { sqft: 2000, name: "My House" };
const houseWithYard: House = { sqft: 2000, yard: { sqft: 500 } };

printYardSize(houseWithoutYard);
printYardSize(houseWithYard);

// ============================================================
// 15. NON-NULL ASSERTION (!) AND TYPE ASSERTION (as)
// ============================================================
/**
 * Both tell TypeScript "trust me, I know better". TypeScript does NOT check them.
 * If you are wrong, the program can crash at runtime. Prefer a real check (section 10).
 *
 * !   "this value is not null or undefined"
 * as  "treat this value as this type"
 */

function getGreeting(): string | undefined {
  return "Hello";
}

// ERROR: const greeting: string = getGreeting(); // Error: string | undefined is not assignable to string
const greeting: string = getGreeting()!; // ! removes undefined from the type

// Safer: check it yourself
const checkedGreeting = getGreeting();
if (checkedGreeting !== undefined) {
  console.log("15. Checked:", checkedGreeting.toUpperCase());
}

// "as": common with data whose type TypeScript can't know, like parsed JSON
const data: unknown = JSON.parse('{"name": "David", "age": 30}');
const parsedPerson = data as Person;

console.log("15. Assertions:", greeting, parsedPerson.name);

// ============================================================
// 16. CLASSES
// ============================================================
/**
 * Access modifiers control who can use a property or method:
 *   public     anyone (this is the default)
 *   private    only code inside this class
 *   protected  this class and classes that extend it
 *   readonly   can be set in the constructor, then never changed
 *
 * "implements" makes a class promise to have everything an interface lists.
 */

interface Describable {
  describe(): string;
}

class BankAccount implements Describable {
  public readonly owner: string;
  private balance: number;
  protected accountType: string = "savings";

  constructor(owner: string, openingBalance: number) {
    this.owner = owner;
    this.balance = openingBalance;
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }

  public getBalance(): number {
    return this.balance;
  }

  public describe(): string {
    return `${this.owner}'s ${this.accountType} account: ${this.balance}`;
  }
}

class BusinessAccount extends BankAccount {
  constructor(owner: string, openingBalance: number) {
    super(owner, openingBalance);
    this.accountType = "business"; // OK, protected is allowed in a subclass
    // ERROR: this.balance = 0;          // Error: balance is private to BankAccount
  }
}

const account = new BankAccount("David", 100);
account.deposit(50);

// ERROR: account.balance = 1000000; // Error: 'balance' is private
// ERROR: account.owner = "John";    // Error: 'owner' is read-only

const business = new BusinessAccount("Acme Ltd", 5000);

console.log("16. Classes:", account.getBalance(), account.describe(), business.describe());

// ============================================================
// 17. GENERICS
// ============================================================
/**
 * Generics let you write code that works with many types while keeping them checked.
 * <T> is a placeholder for a type that is chosen when the code is used.
 */

// Without generics you would need one function per type, or lose the type with any.
function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

const firstNumber = firstItem([10, 20, 30]); // T is number
const firstName2 = firstItem(["a", "b"]); // T is string

// More than one type parameter
function createPair<S, T>(v1: S, v2: T): [S, T] {
  return [v1, v2];
}

// You CAN write the types yourself...
const pair1 = createPair<string, number>("david", 10);
// ...but usually TypeScript infers them from the arguments:
const pair2 = createPair("david", 10); // also [string, number]

// Constraints: "extends" limits which types are allowed
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest("apple", "fig"); // OK: strings have length
longest([1, 2, 3], [1]); // OK: arrays have length
// ERROR: longest(10, 20);   // Error: number has no 'length' property

console.log("17. Generic functions:", firstNumber, firstName2, pair1, pair2, longest("apple", "fig"));

// Generic interface
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const userResponse: ApiResponse<Person> = { success: true, data: { name: "David", age: 30 } };
const listResponse: ApiResponse<string[]> = { success: true, data: ["a", "b"] };

// Generic class
class NamedValue<T> {
  private value: T | undefined;
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public setValue(value: T): void {
    this.value = value;
  }

  public getValue(): T | undefined {
    return this.value;
  }

  public toString(): string {
    return `${this.name}: ${this.value}`;
  }
}

const namedNumber = new NamedValue<number>("myNumber");
namedNumber.setValue(10);
// ERROR: namedNumber.setValue("ten"); // Error: this NamedValue holds numbers

console.log("17. Generic interface and class:", userResponse.data.name, listResponse.data, namedNumber.toString());

// ============================================================
// 18. UTILITY TYPES
// ============================================================
/**
 * Built-in generic types that create a new type from an existing one.
 */

interface Point {
  x: number;
  y: number;
}

interface User {
  name: string;
  age: number;
  email: string;
  phone?: string;
}

// Partial<T>: every property becomes optional.
// Useful for "update" functions where you only pass what changed.
function updateUser(user: User, changes: Partial<User>): User {
  return { ...user, ...changes };
}
const user: User = { name: "David", age: 30, email: "david@example.com" };
const olderUser = updateUser(user, { age: 31 });

// Required<T>: every property becomes required, even optional ones.
// ERROR: const incomplete: Required<User> = user; // Error: 'phone' is missing
const complete: Required<User> = { ...user, phone: "0700000000" };

// Readonly<T>: no property can be changed.
const fixedPoint: Readonly<Point> = { x: 1, y: 2 };
// ERROR: fixedPoint.x = 5; // Error: cannot assign to 'x' because it is a read-only property

// Record<Keys, Value>: an object where every key has the same value type.
// Useful for lookup tables.
const ages: Record<string, number> = { David: 30, John: 25, Jane: 28 };
type Grade = "A" | "B" | "C";
const gradeCounts: Record<Grade, number> = { A: 5, B: 10, C: 3 }; // must have exactly A, B and C

// Pick<T, Keys>: keep only some properties of an object type.
type UserContact = Pick<User, "name" | "email">;
const contact: UserContact = { name: "David", email: "david@example.com" };

// Omit<T, Keys>: remove some properties from an object type.
type PublicUser = Omit<User, "email" | "phone">;
const publicUser: PublicUser = { name: "David", age: 30 };

/**
 * Omit/Pick work on the PROPERTIES of an object type.
 * Exclude/Extract work on the MEMBERS of a union type.
 */
type Primitive = string | number | boolean;
type NotBoolean = Exclude<Primitive, boolean>; // string | number
type OnlyBoolean = Extract<Primitive, boolean>; // boolean

// NonNullable<T>: remove null and undefined from a type.
type MaybeName = string | null | undefined;
type DefinitelyName = NonNullable<MaybeName>; // string

// ReturnType<T>: the type a function returns.
function getPerson() {
  return { name: "David", age: 30 };
}
type PersonFromFunction = ReturnType<typeof getPerson>; // { name: string; age: number }

// InstanceType<T>: the type of object a class creates.
type AccountObject = InstanceType<typeof BankAccount>; // same as BankAccount

const notBoolean: NotBoolean = 42;
const definitelyName: DefinitelyName = "David";
const personFromFunction: PersonFromFunction = getPerson();
const accountObject: AccountObject = new BankAccount("Jane", 10);

console.log("18. Utility types:", olderUser.age, complete.phone, fixedPoint, ages, gradeCounts, contact, publicUser);
console.log("18. More utility types:", notBoolean, definitelyName, personFromFunction, accountObject.describe());

// ============================================================
// EXERCISES
// ============================================================
/**
 * 1. Write a function  average(nums: number[]): number  that returns the average.
 *    What should it return for an empty array?
 *
 * 2. Create a type  TrafficLight  that only allows "red", "yellow" or "green".
 *    Write a function  next(light: TrafficLight): TrafficLight  that returns the next colour.
 *
 * 3. Write a function  formatValue(value: string | number | boolean): string
 *    that returns strings in uppercase, numbers with 2 decimal places, and booleans as "yes"/"no".
 *
 * 4. Create an interface  Book  with title, author, year and an optional rating.
 *    Then create a type  BookPreview  that has only title and author (use Pick).
 *
 * 5. Write a class  Counter  with a private count, and methods  increment(),  reset()
 *    and  getCount().  Show that  counter.count = 100  is an error.
 *
 * 6. Write a generic function  lastItem<T>(items: T[]): T | undefined.
 *
 * 7. Change  let anything: any  in section 4 to  unknown.  Which lines now show errors, and why?
 */
