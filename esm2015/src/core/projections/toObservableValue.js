/**
 * @fileoverview added by tsickle
 * Generated from: modules/component/src/core/projections/toObservableValue.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { from, of } from 'rxjs';
import { isObservableGuard, isPromiseGuard, } from '../utils';
/**
 * @template T
 * @param {?} p
 * @return {?}
 */
export function toObservableValue(p) {
    // Comparing to the literal null value with the == operator covers both null and undefined values.
    if (p === null) {
        return of(p);
    }
    if (p === undefined) {
        return of(p);
    }
    if (isObservableGuard(p)) {
        return p;
    }
    if (isPromiseGuard(p)) {
        return from(p);
    }
    throw new Error('Argument not observable. Only null/undefined or Promise/Observable-like values are allowed.');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9PYnNlcnZhYmxlVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC9zcmMvY29yZS9wcm9qZWN0aW9ucy90b09ic2VydmFibGVWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hDLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsY0FBYyxHQUdmLE1BQU0sVUFBVSxDQUFDOzs7Ozs7QUFFbEIsTUFBTSxVQUFVLGlCQUFpQixDQUMvQixDQUE4QjtJQUU5QixrR0FBa0c7SUFDbEcsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ2QsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDZDtJQUVELElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUNuQixPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNkO0lBRUQsSUFBSSxpQkFBaUIsQ0FBSSxDQUFDLENBQUMsRUFBRTtRQUMzQixPQUFPLENBQUMsQ0FBQztLQUNWO0lBRUQsSUFBSSxjQUFjLENBQUksQ0FBQyxDQUFDLEVBQUU7UUFDeEIsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDaEI7SUFFRCxNQUFNLElBQUksS0FBSyxDQUNiLDZGQUE2RixDQUM5RixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb20sIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBpc09ic2VydmFibGVHdWFyZCxcbiAgaXNQcm9taXNlR3VhcmQsXG4gIFBvdGVudGlhbE9ic2VydmFibGVWYWx1ZSxcbiAgT3V0cHV0LFxufSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b09ic2VydmFibGVWYWx1ZTxUPihcbiAgcDogUG90ZW50aWFsT2JzZXJ2YWJsZVZhbHVlPFQ+XG4pOiBPdXRwdXQ8VD4ge1xuICAvLyBDb21wYXJpbmcgdG8gdGhlIGxpdGVyYWwgbnVsbCB2YWx1ZSB3aXRoIHRoZSA9PSBvcGVyYXRvciBjb3ZlcnMgYm90aCBudWxsIGFuZCB1bmRlZmluZWQgdmFsdWVzLlxuICBpZiAocCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBvZihwKTtcbiAgfVxuXG4gIGlmIChwID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gb2YocCk7XG4gIH1cblxuICBpZiAoaXNPYnNlcnZhYmxlR3VhcmQ8VD4ocCkpIHtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGlmIChpc1Byb21pc2VHdWFyZDxUPihwKSkge1xuICAgIHJldHVybiBmcm9tKHApO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICdBcmd1bWVudCBub3Qgb2JzZXJ2YWJsZS4gT25seSBudWxsL3VuZGVmaW5lZCBvciBQcm9taXNlL09ic2VydmFibGUtbGlrZSB2YWx1ZXMgYXJlIGFsbG93ZWQuJ1xuICApO1xufVxuIl19