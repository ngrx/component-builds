/**
 * @description
 *
 * This function returns a reference to globalThis in the following environments:
 * - Browser
 * - SSR (Server Side Rendering)
 * - Tests
 *
 * @returns {any} - the reference to globalThis in the current environment.
 *
 * @usageNotes
 *
 * The function can be just imported and used everywhere.
 *
 * ```ts
 * import { getGlobalThis } from `utils/get-global-this`;
 *
 * console.log(getGlobalThis());
 * ```
 */
export declare function getGlobalThis(): any;
