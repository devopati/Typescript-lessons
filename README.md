# Typescript-lessons

Lesson notes and examples for learning TypeScript. There are three lessons, and each ends with exercises:

1. **TypeScript types**: [`types.ts`](types.ts) covers 18 topics, from basic types to generics and utility types. It runs in the terminal.
2. **TypeScript with HTML**: [`src/`](src) is a web page controlled by TypeScript, with a counter, a form and a to-do list. It runs in the browser.
3. **tsconfig.json and import/export**: [`modules/`](modules) is a small program split across several files. Its `tsconfig.json` explains every setting.

## Requirements

- **Node.js 22.18 or newer.** Check your version with:
  ```bash
  node -v
  ```
  If it's older, or Node isn't installed, download the LTS version from [nodejs.org](https://nodejs.org).
- **npm**, which comes with Node.js.
- **A code editor.** [VS Code](https://code.visualstudio.com) is recommended because it shows TypeScript errors and types as you write.
- **A web browser** such as Chrome, Firefox or Edge, for lesson 2.
- **Git**, to clone the repository. You can also use **Code → Download ZIP** on GitHub instead.

## Setup

```bash
git clone https://github.com/devopati/Typescript-lessons.git
cd Typescript-lessons
npm install
```

`npm install` installs TypeScript and the Node.js type definitions (`@types/node`) into the project, so you don't need to install anything globally.

## Lesson 1: TypeScript types

### Run the file

```bash
npm start
```

This is the same as `node types.ts`. Each section prints its results, numbered to match the section.

Node runs TypeScript by removing the types. **It does not check them**, so code with type errors can still run.

### Check the types

```bash
npm run check
```

This checks all three lessons for type errors without running the code or creating any files. If it finishes with no error messages, there are no errors.

### Try the errors

Lines marked `ERROR:` are commented out because they don't compile. Uncomment one at a time, then:

- look for the red underline in VS Code and hover over it to read the message, or
- run `npm run check` to see the error in the terminal.

Comment the line out again before moving on.

Tip: in VS Code, hover over any variable to see the type TypeScript gave it.

### Exercises

The exercises are at the bottom of `types.ts`. Write your answers in a new file, for example `exercises.ts`, and run it the same way:

```bash
node exercises.ts
npm run check
```

## Lesson 2: TypeScript with HTML

Everything for this lesson is in `src/`:

| File | What it is |
| --- | --- |
| `src/index.html` | The web page |
| `src/main.ts` | The TypeScript that controls the page. This is where you read and write code. |
| `src/tsconfig.json` | Settings for this lesson. They add the browser types, like `document` and `HTMLInputElement`. |
| `src/dist/main.js` | The compiled JavaScript that the page loads. It's created by the build step, so don't edit it. |

Browsers can only run JavaScript, so TypeScript has to be **compiled** before the page can use it.

### Build and open the page

```bash
npm run build
```

This compiles `src/main.ts` into `src/dist/main.js`. Then open `src/index.html` in your browser by double-clicking it, or by dragging it into a browser window.

### Make changes

Keep the compiler running while you work:

```bash
npm run watch
```

Every time you save `main.ts`, it recompiles. Refresh the browser to see the change. Press **Ctrl+C** in the terminal to stop it.

If the page doesn't do anything, open the browser's developer console (**F12**, or **Cmd+Option+J** on a Mac) to see any errors.

### Try the errors

`main.ts` has `ERROR:` lines just like `types.ts`. Uncomment one and `npm run watch` will print the error in the terminal.

## Lesson 3: tsconfig.json and import/export

Everything for this lesson is in `modules/`. Start by reading `modules/tsconfig.json`, then `modules/main.ts`.

| File | What it shows |
| --- | --- |
| `tsconfig.json` | Every compiler setting, with a comment explaining it |
| `package.json` | `"type": "module"`, which tells Node.js these files use `import`/`export` |
| `math.ts` | Named exports, and a private function that isn't exported |
| `models.ts` | Exporting types and interfaces |
| `Logger.ts` | A default export |
| `utils/strings.ts`, `utils/numbers.ts` | Exporting a list at the end of a file |
| `utils/index.ts` | Re-exporting from one place (a "barrel" file) |
| `main.ts` | Imports and uses all of the above |

### Run it

```bash
npm run modules
```

This is the same as `node modules/main.ts`. Node.js follows the imports and runs every file.

### Compile it

```bash
npm run build:modules
node modules/dist/main.js
```

This compiles every file into `modules/dist/`. Look inside to compare your `.ts` files with the `.js` output, and the `.d.ts` files that hold only the types.

### Try the errors and settings

`main.ts` section 10 has `ERROR:` lines that each come from one tsconfig setting. Uncomment one, run `npm run check` to see the error, then turn the setting off in `modules/tsconfig.json` and watch the error disappear. Turn the setting back on afterwards.

## Compiling to JavaScript (optional)

To see the JavaScript that TypeScript produces:

```bash
npx tsc types.ts --ignoreConfig
node types.js
```

This creates `types.js` next to `types.ts`. The `--ignoreConfig` flag is needed because you named a file directly and the project has a `tsconfig.json`.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `Unknown file extension ".ts"` or a syntax error on the first type | Your Node.js is too old. Install 22.18 or newer. |
| `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX` | Node can't run some TypeScript features, such as `enum`, `namespace` and constructor parameter properties. Run the file with `npx tsx yourfile.ts` instead. |
| `tsc: command not found` | Run `npm install` first, and use `npx tsc` rather than `tsc`. |
| Page loads but the buttons do nothing | Run `npm run build`, then refresh. Check that `src/dist/main.js` exists, and look for errors in the browser console (F12). |
| Changes to `main.ts` don't show in the browser | Save the file, make sure `npm run watch` is running, then refresh the page. |
| `Relative import paths need explicit file extensions` | Add the extension to the import: `"./math.ts"`, not `"./math"`. For a folder, import its `index.ts`. |
| `is a type and must be imported using a type-only import` | Use `import type { ... }` for interfaces and types. |
| `Cannot find name 'console'` | Run `npm install` to get `@types/node`, and check that `"types": ["node"]` is in `tsconfig.json`. |
| `Cannot redeclare block-scoped variable` | Two files, or a file and the browser, use the same top-level name. Rename your variable. |
