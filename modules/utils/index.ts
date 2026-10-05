/**
 * utils/index.ts: RE-EXPORTS (a "barrel" file)
 *
 * This file has no code of its own. It collects exports from the other
 * utils files so other files can import everything from one place:
 *
 *   import { capitalize, formatMoney } from "./utils/index.ts";
 *
 * instead of one import per file.
 */

export { capitalize, shout } from "./strings.ts";
export { formatMoney, isEven } from "./numbers.ts";
export { formatDate } from "./dates.ts";
