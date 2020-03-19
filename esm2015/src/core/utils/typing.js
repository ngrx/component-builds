/**
 * @fileoverview added by tsickle
 * Generated from: modules/component/src/core/utils/typing.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isObservable } from 'rxjs';
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
export function isPromiseGuard(value) {
    return (!!value &&
        typeof ((/** @type {?} */ (value))).subscribe !== 'function' &&
        typeof ((/** @type {?} */ (value))).then === 'function');
}
/**
 * @template T
 * @param {?} potentialObservable
 * @return {?}
 */
export function isObservableGuard(potentialObservable) {
    return isObservable(potentialObservable);
}
/**
 * @template T
 * @param {?} op
 * @return {?}
 */
export function isOperateFnArrayGuard(op) {
    return op.every((/**
     * @param {?} i
     * @return {?}
     */
    (i) => typeof i !== 'string'));
}
/**
 * @param {?} op
 * @return {?}
 */
export function isStringArrayGuard(op) {
    return op.every((/**
     * @param {?} i
     * @return {?}
     */
    (i) => typeof i !== 'string'));
}
/**
 * @template T
 * @param {?} opr
 * @return {?}
 */
export function isDefinedGuard(opr) {
    return !!opr;
}
/**
 * @template T
 * @param {?} obj
 * @return {?}
 */
export function isIterableGuard(obj) {
    if (obj === undefined) {
        return false;
    }
    return typeof ((/** @type {?} */ (obj)))[Symbol.iterator] === 'function';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQvc3JjL2NvcmUvdXRpbHMvdHlwaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBZ0MsTUFBTSxNQUFNLENBQUM7Ozs7OztBQVdsRSxNQUFNLFVBQVUsY0FBYyxDQUFJLEtBQVU7SUFDMUMsT0FBTyxDQUNMLENBQUMsQ0FBQyxLQUFLO1FBQ1AsT0FBTyxDQUFDLG1CQUFBLEtBQUssRUFBTyxDQUFDLENBQUMsU0FBUyxLQUFLLFVBQVU7UUFDOUMsT0FBTyxDQUFDLG1CQUFBLEtBQUssRUFBTyxDQUFDLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FDMUMsQ0FBQztBQUNKLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FDL0IsbUJBQXdCO0lBRXhCLE9BQU8sWUFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDM0MsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLHFCQUFxQixDQUNuQyxFQUFTO0lBRVQsT0FBTyxFQUFFLENBQUMsS0FBSzs7OztJQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUMsQ0FBQztBQUNyRCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxFQUFTO0lBQzFDLE9BQU8sRUFBRSxDQUFDLEtBQUs7Ozs7SUFBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFDLENBQUM7QUFDckQsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGNBQWMsQ0FBSSxHQUFRO0lBQ3hDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNmLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUksR0FBUTtJQUN6QyxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7UUFDckIsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUNELE9BQU8sT0FBTyxDQUFDLG1CQUFBLEdBQUcsRUFBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFVBQVUsQ0FBQztBQUM3RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNPYnNlcnZhYmxlLCBPYnNlcnZhYmxlLCBPcGVyYXRvckZ1bmN0aW9uIH0gZnJvbSAncnhqcyc7XG5leHBvcnQgdHlwZSBQb3RlbnRpYWxPYnNlcnZhYmxlVmFsdWU8VD4gPVxuICB8IE9ic2VydmFibGU8VD5cbiAgfCBQcm9taXNlPFQ+XG4gIHwgdW5kZWZpbmVkXG4gIHwgbnVsbDtcbmV4cG9ydCB0eXBlIE91dHB1dDxUPiA9XG4gIHwgT2JzZXJ2YWJsZTxUPlxuICB8IE9ic2VydmFibGU8dW5kZWZpbmVkPlxuICB8IE9ic2VydmFibGU8bnVsbD47XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb21pc2VHdWFyZDxUPih2YWx1ZTogYW55KTogdmFsdWUgaXMgUHJvbWlzZTxUPiB7XG4gIHJldHVybiAoXG4gICAgISF2YWx1ZSAmJlxuICAgIHR5cGVvZiAodmFsdWUgYXMgYW55KS5zdWJzY3JpYmUgIT09ICdmdW5jdGlvbicgJiZcbiAgICB0eXBlb2YgKHZhbHVlIGFzIGFueSkudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYnNlcnZhYmxlR3VhcmQ8VD4oXG4gIHBvdGVudGlhbE9ic2VydmFibGU6IGFueVxuKTogcG90ZW50aWFsT2JzZXJ2YWJsZSBpcyBPYnNlcnZhYmxlPFQ+IHtcbiAgcmV0dXJuIGlzT2JzZXJ2YWJsZShwb3RlbnRpYWxPYnNlcnZhYmxlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT3BlcmF0ZUZuQXJyYXlHdWFyZDxUPihcbiAgb3A6IGFueVtdXG4pOiBvcCBpcyBPcGVyYXRvckZ1bmN0aW9uPFQsIGFueT5bXSB7XG4gIHJldHVybiBvcC5ldmVyeSgoaTogYW55KSA9PiB0eXBlb2YgaSAhPT0gJ3N0cmluZycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdBcnJheUd1YXJkKG9wOiBhbnlbXSk6IG9wIGlzIHN0cmluZ1tdIHtcbiAgcmV0dXJuIG9wLmV2ZXJ5KChpOiBhbnkpID0+IHR5cGVvZiBpICE9PSAnc3RyaW5nJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RlZmluZWRHdWFyZDxUPihvcHI6IGFueSk6IG9wciBpcyBUIHtcbiAgcmV0dXJuICEhb3ByO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJdGVyYWJsZUd1YXJkPFQ+KG9iajogYW55KTogb2JqIGlzIEFycmF5PFQ+IHtcbiAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0eXBlb2YgKG9iaiBhcyBhbnkpW1N5bWJvbC5pdGVyYXRvcl0gPT09ICdmdW5jdGlvbic7XG59XG4iXX0=