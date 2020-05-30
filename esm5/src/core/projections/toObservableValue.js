/**
 * @fileoverview added by tsickle
 * Generated from: src/core/projections/toObservableValue.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { from, of } from 'rxjs';
/**
 * \@description
 *
 * This operator ensures the passed value is of the right type for `CdAware`.
 * It takes `null`, `undefined` or `Observable<T>` and returns `Observable<null, undefined, T>`.
 * Every other value throws an error.
 *
 * ```ts
 * import { toObservableValue } from `projections/toObservableValue`;
 *
 * const toObservableValue()
 *  .pipe(switchAll())
 *  .subscribe((n) => console.log(n););
 * ```
 * @template T
 * @param {?} p
 * @return {?}
 */
export function toObservableValue(p) {
    return p ? from(p) : of(p);
}
//# sourceMappingURL=toObservableValue.js.map