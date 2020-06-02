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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9PYnNlcnZhYmxlVmFsdWUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdyeC9jb21wb25lbnQvIiwic291cmNlcyI6WyJzcmMvY29yZS9wcm9qZWN0aW9ucy90b09ic2VydmFibGVWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUErQixNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCN0QsTUFBTSxVQUFVLGlCQUFpQixDQUFJLENBQU07SUFDekMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tLCBvZiwgT2JzZXJ2YWJsZSwgT2JzZXJ2YWJsZUlucHV0IH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVGhpcyBvcGVyYXRvciBlbnN1cmVzIHRoZSBwYXNzZWQgdmFsdWUgaXMgb2YgdGhlIHJpZ2h0IHR5cGUgZm9yIGBDZEF3YXJlYC5cbiAqIEl0IHRha2VzIGBudWxsYCwgYHVuZGVmaW5lZGAgb3IgYE9ic2VydmFibGU8VD5gIGFuZCByZXR1cm5zIGBPYnNlcnZhYmxlPG51bGwsIHVuZGVmaW5lZCwgVD5gLlxuICogRXZlcnkgb3RoZXIgdmFsdWUgdGhyb3dzIGFuIGVycm9yLlxuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyB0b09ic2VydmFibGVWYWx1ZSB9IGZyb20gYHByb2plY3Rpb25zL3RvT2JzZXJ2YWJsZVZhbHVlYDtcbiAqXG4gKiBjb25zdCB0b09ic2VydmFibGVWYWx1ZSgpXG4gKiAgLnBpcGUoc3dpdGNoQWxsKCkpXG4gKiAgLnN1YnNjcmliZSgobikgPT4gY29uc29sZS5sb2cobik7KTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9PYnNlcnZhYmxlVmFsdWU8VD4ocDogYW55KTogT2JzZXJ2YWJsZTxUIHwgdW5kZWZpbmVkIHwgbnVsbD4ge1xuICByZXR1cm4gcCA/IGZyb20ocCkgOiBvZihwKTtcbn1cbiJdfQ==