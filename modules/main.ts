/**
 * MODULES (IMPORT / EXPORT) AND TSCONFIG: LESSON NOTES
 *
 * Files in this lesson:
 *   tsconfig.json       compiler settings, every option explained (read it first)
 *   package.json        "type": "module" tells Node.js these files use import/export
 *   math.ts             named exports
 *   models.ts           exported types and interfaces
 *   Logger.ts           a default export
 *   utils/strings.ts    exporting a list at the bottom of the file
 *   utils/numbers.ts    more named exports
 *   utils/index.ts      re-exports ("barrel" file)
 *   main.ts             this file: imports and uses all of the above
 *
 * Run it directly:       node modules/main.ts         (or: npm run modules)
 * Compile it:            npx tsc -p modules           (or: npm run build:modules)
 * Run the compiled JS:   node modules/dist/main.js
 * Check types only:      npx tsc -p modules --noEmit
 *
 * Lines marked ERROR are commented out because they cause an error.
 * Uncomment them one at a time to see what TypeScript says, then comment them again.
 *
 * CONTENTS
 *   1.  Scripts vs modules
 *   2.  Named imports
 *   3.  Renaming imports with "as"
 *   4.  Importing everything with "* as"
 *   5.  Default imports
 *   6.  Importing types with "import type"
 *   7.  Importing from a barrel file
 *   8.  What isn't exported can't be imported
 *   9.  Import paths and file extensions
 *   10. tsconfig.json in action
 */

// Imports go at the TOP of the file. Each one is explained in the sections below.
import { add, multiply, PI, subtract } from "./math.ts";
import { circleArea as areaOfCircle } from "./math.ts";
import * as math from "./math.ts";
import Logger from "./Logger.ts";
import { createStudent } from "./models.ts";
import type { Student, Grade } from "./models.ts";
import { capitalize, shout, formatMoney, isEven, formatDate } from "./utils/index.ts";
import Timer from "./Timer.ts";

// ============================================================
// 1. SCRIPTS VS MODULES
// ============================================================
/**
 * A file with NO import or export is a "script". All scripts share one
 * global scope, so two scripts can't both have a top-level variable called "name".
 * (That is why types.ts had to rename "origin": it clashed with the browser's global.)
 *
 * A file with at least one import or export is a "module". Each module has its
 * OWN scope: nothing leaks out unless you export it, and nothing comes in unless
 * you import it.
 *
 * Modules let you split a program into small files, each with one job.
 */

const logger = new Logger("main");
logger.log("1. This file is a module because it uses import.");

// ============================================================
// 2. NAMED IMPORTS
// ============================================================
/**
 * Named exports are imported with curly braces { }.
 * The names must match what the other file exported.
 *
 *   math.ts:   export function add(...)
 *   main.ts:   import { add } from "./math.ts";
 */

console.log("2. Named imports:", add(2, 3), multiply(4, 5), PI);
console.log("2. Subtract:", subtract(5, 2));

// ============================================================
// 3. RENAMING IMPORTS WITH "as"
// ============================================================
/**
 * Use "as" to give an import a different name in this file.
 * Useful when two modules export the same name, or the name is unclear here.
 *
 *   import { circleArea as areaOfCircle } from "./math.ts";
 */

console.log("3. Renamed import:", areaOfCircle(2));

// ============================================================
// 4. IMPORTING EVERYTHING WITH "* as"
// ============================================================
/**
 * "import * as math" puts every export of math.ts into one object called math.
 * Handy when you use many things from one file.
 */

console.log("4. Namespace import:", math.add(1, 1), math.PI, math.circleArea(1));

// ============================================================
// 5. DEFAULT IMPORTS
// ============================================================
/**
 * A default export is imported WITHOUT curly braces, and you choose the name:
 *
 *   Logger.ts:  export default class Logger { ... }
 *   main.ts:    import Logger from "./Logger.ts";
 *
 * Named vs default:
 *   - named:   many per file, the name is fixed (rename with "as")
 *   - default: one per file, the importer picks the name
 * Many teams prefer named exports because the name is the same everywhere.
 */

const appLogger = new Logger("app");
appLogger.log("5. Hello from a default import");

// ============================================================
// 6. IMPORTING TYPES WITH "import type"
// ============================================================
/**
 * Types and interfaces only exist in TypeScript. They are deleted when compiling.
 * "import type" says "this import is only types", so it can be deleted too.
 *
 * tsconfig.json has "verbatimModuleSyntax": true, which REQUIRES "import type"
 * for type-only imports.
 */

const students: Student[] = [createStudent("Fredrick", 82), createStudent("Daisy", 67), createStudent("Tito", 45)];

function countGrade(list: Student[], grade: Grade): number {
  return list.filter((student) => student.grade === grade).length;
}

for (const student of students) {
  console.log(`6. ${student.name}: ${student.score} (${student.grade})`);
}
console.log("6. Students with an A:", countGrade(students, "A"));

// ERROR: import { Student as StudentType } from "./models.ts"; countGrade([] as StudentType[], "A"); // Error: 'Student' is a type and must be imported using a type-only import

// ============================================================
// 7. IMPORTING FROM A BARREL FILE
// ============================================================
/**
 * utils/index.ts re-exports everything from utils/strings.ts and utils/numbers.ts,
 * so one import brings in functions from both files:
 *
 *   import { capitalize, shout, formatMoney, isEven } from "./utils/index.ts";
 */

console.log("7. Barrel imports:", capitalize("typescript"), shout("hello"), formatMoney(1500), isEven(4));
console.log("7. Formatted date:", formatDate(new Date()));

// ============================================================
// 8. WHAT ISN'T EXPORTED CAN'T BE IMPORTED
// ============================================================
/**
 * math.ts has a helper function "round" with no "export". It is private to math.ts.
 * This lets a file hide its internal details and only share what others need.
 */

// ERROR: import { round } from "./math.ts"; round(1.234); // Error: Module declares 'round' locally, but it is not exported

console.log("8. round is private, but circleArea uses it inside math.ts:", math.circleArea(3));

// ============================================================
// 9. IMPORT PATHS AND FILE EXTENSIONS
// ============================================================
/**
 * - "./" means "the same folder as this file", "../" means "the folder above".
 *   Without ./ or ../, the name is a package from node_modules.
 * - With "module": "nodenext" (tsconfig.json), relative imports need the file extension.
 * - You can't import a folder. Import its index.ts file by name.
 * - We write ".ts" because Node.js runs these files directly.
 *   When compiling, "rewriteRelativeImportExtensions" changes it to ".js" in dist/.
 *   Open dist/main.js after building to see this.
 */

// ERROR: import { add as add2 } from "./math"; add2(1, 2); // Error: Relative import paths need explicit file extensions
// ERROR: import { shout as shout2 } from "./utils"; shout2("hi"); // Error: a folder can't be imported, use "./utils/index.ts"

console.log("9. Paths: see the comments in this section");

// ============================================================
// 10. TSCONFIG.JSON IN ACTION
// ============================================================
/**
 * Each ERROR line below is caused by one setting in tsconfig.json.
 * Uncomment a line, see the error, then turn the setting off in tsconfig.json
 * and see the error disappear. Turn the setting back on afterwards!
 */

// "strict": true -> parameters must have a type (no hidden "any")
// ERROR: function double(x) { return x * 2; } double(2); // Error: Parameter 'x' implicitly has an 'any' type

// "strict": true -> null can't go into a string
// ERROR: const missing: string = null; console.log(missing); // Error: Type 'null' is not assignable to type 'string'

// "noUncheckedIndexedAccess": true -> an array item might not exist
const scores = [90, 85, 77];
const firstScore = scores[0]; // number | undefined
// ERROR: console.log(firstScore.toFixed(1)); // Error: 'firstScore' is possibly 'undefined'
console.log("10. First score:", firstScore?.toFixed(1));

// "noUnusedLocals": true -> unused variables are reported
// ERROR: const neverUsed = 42; // Error: 'neverUsed' is declared but its value is never read

// "lib": ["es2022"] with no "dom" -> browser globals don't exist here
// ERROR: document.title = "Hello"; // Error: Cannot find name 'document'

// "target": "es2022" -> ?. and ?? are copied to dist/main.js as they are.
// Try "es2017" and build: those versions of JavaScript don't have ?. or ??,
// so TypeScript rewrites them using older code.
const nickname: string | undefined = undefined;
console.log("10. Hello,", nickname ?? "friend", "| name length:", students[0]?.name.length);

//Timer execise3
const timer = new Timer();

timer.start();

for (let i = 0; i < 1000000; i++) {
  // Do some work
}

console.log("3. Timer:", timer.stop(), "ms");

// ============================================================
// EXERCISES
// ============================================================
/**
 * IMPORT / EXPORT
 * 1. Add a  subtract  function to math.ts, export it, and use it here.
 *
 * 2. Create a file  utils/dates.ts  that exports  formatDate(date: Date): string.
 *    Re-export it from utils/index.ts and import it here from the barrel.
 *
 * 3. Create  Timer.ts  with a default export class  Timer  that has  start()  and  stop()
 *    methods. stop() returns the milliseconds since start(). Import and use it here.
 *
 * 4. In models.ts, add an exported interface  Course  with  title: string  and
 *    students: Student[].  Import it with "import type" and create one course here.
 *
 * 5. Try importing Course WITHOUT "type". What error do you get, and which tsconfig
 *    setting causes it?
 *
 * TSCONFIG
 * 6. Build with  npm run build:modules  and open  modules/dist/.  Find:
 *      - the .js file for utils/strings.ts
 *      - the .d.ts file for math.ts. What's in it, and what's missing?
 *      - where "./math.ts" became "./math.js"
 *
 * 7. Change "target" to "es2017" and build again. Find the end of section 10 in
 *    dist/main.js. What happened to ?? and ?. ? Change it back afterwards.
 *
 * 8. Change "outDir" to "./build". Build, find your files, then change it back
 *    (and delete the build folder).
 *
 * 9. Run  npx tsc -p modules --showConfig.  Which settings appear that aren't in tsconfig.json?
 */
