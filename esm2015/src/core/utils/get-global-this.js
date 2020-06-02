/**
 * @fileoverview added by tsickle
 * Generated from: src/core/utils/get-global-this.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWdsb2JhbC10aGlzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ncngvY29tcG9uZW50LyIsInNvdXJjZXMiOlsic3JjL2NvcmUvdXRpbHMvZ2V0LWdsb2JhbC10aGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsTUFBTSxVQUFVLGFBQWE7SUFDM0IsT0FBTyxtQkFBQSxDQUFDLENBQUMsbUJBQUEsVUFBVSxFQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLElBQUksQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLEVBQU8sQ0FBQztBQUMxRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSByZWZlcmVuY2UgdG8gZ2xvYmFsVGhpcyBpbiB0aGUgZm9sbG93aW5nIGVudmlyb25tZW50czpcbiAqIC0gQnJvd3NlclxuICogLSBTU1IgKFNlcnZlciBTaWRlIFJlbmRlcmluZylcbiAqIC0gVGVzdHNcbiAqXG4gKiBUaGUgZnVuY3Rpb24gY2FuIGJlIGp1c3QgaW1wb3J0ZWQgYW5kIHVzZWQgZXZlcnl3aGVyZS5cbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgZ2V0R2xvYmFsVGhpcyB9IGZyb20gYHV0aWxzL2dldC1nbG9iYWwtdGhpc2A7XG4gKlxuICogY29uc29sZS5sb2coZ2V0R2xvYmFsVGhpcygpKTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2xvYmFsVGhpcygpOiBhbnkge1xuICByZXR1cm4gKChnbG9iYWxUaGlzIGFzIGFueSkgfHwgKHNlbGYgYXMgYW55KSB8fCAod2luZG93IGFzIGFueSkpIGFzIGFueTtcbn1cbiJdfQ==