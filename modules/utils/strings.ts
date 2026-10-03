/**
 * utils/strings.ts
 *
 * Another way to export: declare things normally, then export them
 * together in one list at the bottom.
 */

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function shout(text: string): string {
  return text.toUpperCase() + "!";
}

export { capitalize, shout };
