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
//# sourceMappingURL=get-global-this.js.map