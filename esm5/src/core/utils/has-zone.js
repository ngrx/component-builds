/**
 * @fileoverview added by tsickle
 * Generated from: src/core/utils/has-zone.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@description
 *
 * Determines if the application uses `NgZone` or `NgNoopZone` as ngZone service instance.
 *
 * The function can be just imported and used everywhere.
 *
 * ```ts
 * import { hasZone } from `utils/has-zone`;
 *
 * console.log(hasZone());
 * ```
 * @param {?} z
 * @return {?}
 */
export function hasZone(z) {
    return z.constructor.name !== 'NoopNgZone';
}
//# sourceMappingURL=has-zone.js.map