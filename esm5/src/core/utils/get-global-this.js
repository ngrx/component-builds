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
export function getGlobalThis() {
    return (globalThis || self || window);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWdsb2JhbC10aGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQvc3JjL2NvcmUvdXRpbHMvZ2V0LWdsb2JhbC10aGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxVQUFVLGFBQWE7SUFDM0IsT0FBTyxDQUFFLFVBQWtCLElBQUssSUFBWSxJQUFLLE1BQWMsQ0FBUSxDQUFDO0FBQzFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIHJlZmVyZW5jZSB0byBnbG9iYWxUaGlzIGluIHRoZSBmb2xsb3dpbmcgZW52aXJvbm1lbnRzOlxuICogLSBCcm93c2VyXG4gKiAtIFNTUiAoU2VydmVyIFNpZGUgUmVuZGVyaW5nKVxuICogLSBUZXN0c1xuICpcbiAqIEByZXR1cm5zIHthbnl9IC0gdGhlIHJlZmVyZW5jZSB0byBnbG9iYWxUaGlzIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50LlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogVGhlIGZ1bmN0aW9uIGNhbiBiZSBqdXN0IGltcG9ydGVkIGFuZCB1c2VkIGV2ZXJ5d2hlcmUuXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IGdldEdsb2JhbFRoaXMgfSBmcm9tIGB1dGlscy9nZXQtZ2xvYmFsLXRoaXNgO1xuICpcbiAqIGNvbnNvbGUubG9nKGdldEdsb2JhbFRoaXMoKSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEdsb2JhbFRoaXMoKTogYW55IHtcbiAgcmV0dXJuICgoZ2xvYmFsVGhpcyBhcyBhbnkpIHx8IChzZWxmIGFzIGFueSkgfHwgKHdpbmRvdyBhcyBhbnkpKSBhcyBhbnk7XG59XG4iXX0=