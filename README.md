# Typescript-lessons

Lesson notes and examples for learning TypeScript types. Everything is in [`types.ts`](types.ts), which covers 18 topics, from basic types to generics and utility types, and ends with exercises.

## Requirements

- **Node.js 22.18 or newer.** Check your version with:
  ```bash
  node -v
  ```
  If it's older, or Node isn't installed, download the LTS version from [nodejs.org](https://nodejs.org).
- **npm**, which comes with Node.js.
- **A code editor.** [VS Code](https://code.visualstudio.com) is recommended because it shows TypeScript errors and types as you write.
- **Git**, to clone the repository. You can also use **Code → Download ZIP** on GitHub instead.

## Setup

```bash
git clone https://github.com/devopati/Typescript-lessons.git
cd Typescript-lessons
npm install
```

`npm install` installs TypeScript into the project, so you don't need to install it globally.

## How to use the lesson

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

This is the same as `npx tsc --noEmit`. It reports every type error without running the code or creating any files. If there's no output, there are no errors.

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
| `Cannot redeclare block-scoped variable` | Two files, or a file and the browser, use the same top-level name. Rename your variable. |
