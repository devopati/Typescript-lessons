/**
 * Logger.ts: DEFAULT EXPORT
 *
 * "export default" marks the ONE main thing this file provides.
 * A file can have only one default export (and any number of named exports).
 * The importing file chooses the name:  import Logger from "./Logger.ts"
 */

export default class Logger {
  private prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  public log(message: string): void {
    console.log(`[${this.prefix}] ${message}`);
  }
}

/**
 * Why not the shorter  constructor(private prefix: string) {} ?
 * That "parameter property" is TypeScript-only syntax that Node.js can't run,
 * and "erasableSyntaxOnly" in tsconfig.json blocks it:
 */
// ERROR: class ShortLogger { constructor(private prefix: string) {} log() { console.log(this.prefix); } } new ShortLogger("x"); // Error: This syntax is not allowed when 'erasableSyntaxOnly' is enabled
