/**
 * @fileoverview added by tsickle
 * Generated from: modules/component/src/core/utils/get-global-this.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@description
 *
 * This function returns a reference to globalThis in the following environments:
 * - Browser
 * - SSR (Server Side Rendering)
 * - Tests
 *
 *
 * \@usageNotes
 *
 * The function can be just imported and used everywhere.
 *
 * ```ts
 * import { getGlobalThis } from `utils/get-global-this`;
 *
 * console.log(getGlobalThis());
 * ```
 * @return {?}
 */
export function getGlobalThis() {
    return (/** @type {?} */ ((((/** @type {?} */ (globalThis))) || ((/** @type {?} */ (self))) || ((/** @type {?} */ (window))))));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWdsb2JhbC10aGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQvc3JjL2NvcmUvdXRpbHMvZ2V0LWdsb2JhbC10aGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsTUFBTSxVQUFVLGFBQWE7SUFDM0IsT0FBTyxtQkFBQSxDQUFDLENBQUMsbUJBQUEsVUFBVSxFQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLElBQUksQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLEVBQU8sQ0FBQztBQUMxRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSByZWZlcmVuY2UgdG8gZ2xvYmFsVGhpcyBpbiB0aGUgZm9sbG93aW5nIGVudmlyb25tZW50czpcbiAqIC0gQnJvd3NlclxuICogLSBTU1IgKFNlcnZlciBTaWRlIFJlbmRlcmluZylcbiAqIC0gVGVzdHNcbiAqXG4gKiBAcmV0dXJucyB7YW55fSAtIHRoZSByZWZlcmVuY2UgdG8gZ2xvYmFsVGhpcyBpbiB0aGUgY3VycmVudCBlbnZpcm9ubWVudC5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIFRoZSBmdW5jdGlvbiBjYW4gYmUganVzdCBpbXBvcnRlZCBhbmQgdXNlZCBldmVyeXdoZXJlLlxuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBnZXRHbG9iYWxUaGlzIH0gZnJvbSBgdXRpbHMvZ2V0LWdsb2JhbC10aGlzYDtcbiAqXG4gKiBjb25zb2xlLmxvZyhnZXRHbG9iYWxUaGlzKCkpO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRHbG9iYWxUaGlzKCk6IGFueSB7XG4gIHJldHVybiAoKGdsb2JhbFRoaXMgYXMgYW55KSB8fCAoc2VsZiBhcyBhbnkpIHx8ICh3aW5kb3cgYXMgYW55KSkgYXMgYW55O1xufVxuIl19