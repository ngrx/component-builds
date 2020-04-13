/**
 * @fileoverview added by tsickle
 * Generated from: modules/component/src/core/projections/toObservableValue.ts
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
 *
 * \@usageNotes
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
    return p == null ? of(p) : from(p);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9PYnNlcnZhYmxlVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC9zcmMvY29yZS9wcm9qZWN0aW9ucy90b09ic2VydmFibGVWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUErQixNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCN0QsTUFBTSxVQUFVLGlCQUFpQixDQUMvQixDQUF3QztJQUV4QyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tLCBvZiwgT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZUlucHV0IH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVGhpcyBvcGVyYXRvciBlbnN1cmVzIHRoZSBwYXNzZWQgdmFsdWUgaXMgb2YgdGhlIHJpZ2h0IHR5cGUgZm9yIGBDZEF3YXJlYC5cbiAqIEl0IHRha2VzIGBudWxsYCwgYHVuZGVmaW5lZGAgb3IgYE9ic2VydmFibGU8VD5gIGFuZCByZXR1cm5zIGBPYnNlcnZhYmxlPG51bGwsIHVuZGVmaW5lZCwgVD5gLlxuICogRXZlcnkgb3RoZXIgdmFsdWUgdGhyb3dzIGFuIGVycm9yLlxuICpcbiAqIEBwYXJhbSB7T2JzZXJ2YWJsZTxUPiB8IFByb21pc2U8VD4gfCB1bmRlZmluZWQgfCBudWxsfSBwIC1cbiAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPFR8IHVuZGVmaW5lZCB8IG51bGw+fSAtIHByb3BlciBvYnNlcnZhYmxlIHZhbHVlc1xuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IHRvT2JzZXJ2YWJsZVZhbHVlIH0gZnJvbSBgcHJvamVjdGlvbnMvdG9PYnNlcnZhYmxlVmFsdWVgO1xuICpcbiAqIGNvbnN0IHRvT2JzZXJ2YWJsZVZhbHVlKClcbiAqICAucGlwZShzd2l0Y2hBbGwoKSlcbiAqICAuc3Vic2NyaWJlKChuKSA9PiBjb25zb2xlLmxvZyhuKTspO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b09ic2VydmFibGVWYWx1ZTxUPihcbiAgcDogT2JzZXJ2YWJsZUlucHV0PFQ+IHwgdW5kZWZpbmVkIHwgbnVsbFxuKTogT2JzZXJ2YWJsZTxUIHwgdW5kZWZpbmVkIHwgbnVsbD4ge1xuICByZXR1cm4gcCA9PSBudWxsID8gb2YocCkgOiBmcm9tKHApO1xufVxuIl19