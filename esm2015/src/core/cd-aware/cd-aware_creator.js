/**
 * @fileoverview added by tsickle
 * Generated from: src/core/cd-aware/cd-aware_creator.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EMPTY, Subject, } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap, } from 'rxjs/operators';
/**
 * @record
 * @template U
 */
export function CdAware() { }
if (false) {
    /** @type {?} */
    CdAware.prototype.nextPotentialObservable;
}
/**
 * class CdAware
 *
 * \@description
 * This abstract class holds all the shared logic for the push pipe and the let directive
 * responsible for change detection
 * If you extend this class you need to implement how the update of the rendered value happens.
 * Also custom behaviour is something you need to implement in the extending class
 * @template U
 * @param {?} cfg
 * @return {?}
 */
export function createCdAware(cfg) {
    /** @type {?} */
    const potentialObservablesSubject = new Subject();
    /** @type {?} */
    const observablesFromTemplate$ = potentialObservablesSubject.pipe(distinctUntilChanged());
    /** @type {?} */
    const rendering$ = observablesFromTemplate$.pipe(
    // Compose the observables from the template and the strategy
    switchMap((/**
     * @param {?} observable$
     * @return {?}
     */
    (observable$) => {
        // If the passed observable is:
        // - undefined - No value set
        // - null - null passed directly or no value set over `async` pipe
        if (observable$ == null) {
            // Update the value to render_creator with null/undefined
            cfg.updateViewContextObserver.next((/** @type {?} */ (observable$)));
            // Render the view
            cfg.render();
            // Stop further processing
            return EMPTY;
        }
        // If a new Observable arrives, reset the value to render_creator
        // We do this because we don't know when the next value arrives and want to get rid of the old value
        cfg.resetContextObserver.next();
        cfg.render();
        return observable$.pipe(distinctUntilChanged(), tap(cfg.updateViewContextObserver), tap((/**
         * @return {?}
         */
        () => cfg.render())), catchError((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            console.error(e);
            return EMPTY;
        })));
    })));
    return (/** @type {?} */ ({
        /**
         * @param {?} value
         * @return {?}
         */
        nextPotentialObservable(value) {
            potentialObservablesSubject.next(value);
        },
        /**
         * @return {?}
         */
        subscribe() {
            return rendering$.subscribe();
        },
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2QtYXdhcmVfY3JlYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9jb3JlL2NkLWF3YXJlL2NkLWF3YXJlX2NyZWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUdMLE9BQU8sR0FHUixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxVQUFVLEVBQ1Ysb0JBQW9CLEVBRXBCLFNBQVMsRUFDVCxHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFFeEIsNkJBRUM7OztJQURDLDBDQUE4Qzs7Ozs7Ozs7Ozs7Ozs7QUFZaEQsTUFBTSxVQUFVLGFBQWEsQ0FBSSxHQUloQzs7VUFDTywyQkFBMkIsR0FBRyxJQUFJLE9BQU8sRUFFNUM7O1VBQ0csd0JBQXdCLEdBQUcsMkJBQTJCLENBQUMsSUFBSSxDQUMvRCxvQkFBb0IsRUFBRSxDQUN2Qjs7VUFFSyxVQUFVLEdBQUcsd0JBQXdCLENBQUMsSUFBSTtJQUM5Qyw2REFBNkQ7SUFDN0QsU0FBUzs7OztJQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDeEIsK0JBQStCO1FBQy9CLDZCQUE2QjtRQUM3QixrRUFBa0U7UUFDbEUsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO1lBQ3ZCLHlEQUF5RDtZQUN6RCxHQUFHLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLG1CQUFBLFdBQVcsRUFBTyxDQUFDLENBQUM7WUFDdkQsa0JBQWtCO1lBQ2xCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNiLDBCQUEwQjtZQUMxQixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsaUVBQWlFO1FBQ2pFLG9HQUFvRztRQUNwRyxHQUFHLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWIsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUNyQixvQkFBb0IsRUFBRSxFQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLEVBQ2xDLEdBQUc7OztRQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBQyxFQUN2QixVQUFVOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQyxFQUFDLENBQ0g7SUFFRCxPQUFPLG1CQUFBOzs7OztRQUNMLHVCQUF1QixDQUFDLEtBQXVDO1lBQzdELDJCQUEyQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDOzs7O1FBQ0QsU0FBUztZQUNQLE9BQU8sVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hDLENBQUM7S0FDRixFQUFpQyxDQUFDO0FBQ3JDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFTVBUWSxcbiAgTmV4dE9ic2VydmVyLFxuICBPYnNlcnZhYmxlLFxuICBTdWJqZWN0LFxuICBTdWJzY3JpYmFibGUsXG4gIFN1YnNjcmlwdGlvbixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBjYXRjaEVycm9yLFxuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBzd2l0Y2hNYXAsXG4gIHRhcCxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENkQXdhcmU8VT4gZXh0ZW5kcyBTdWJzY3JpYmFibGU8VT4ge1xuICBuZXh0UG90ZW50aWFsT2JzZXJ2YWJsZTogKHZhbHVlOiBhbnkpID0+IHZvaWQ7XG59XG5cbi8qKlxuICogY2xhc3MgQ2RBd2FyZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBhYnN0cmFjdCBjbGFzcyBob2xkcyBhbGwgdGhlIHNoYXJlZCBsb2dpYyBmb3IgdGhlIHB1c2ggcGlwZSBhbmQgdGhlIGxldCBkaXJlY3RpdmVcbiAqIHJlc3BvbnNpYmxlIGZvciBjaGFuZ2UgZGV0ZWN0aW9uXG4gKiBJZiB5b3UgZXh0ZW5kIHRoaXMgY2xhc3MgeW91IG5lZWQgdG8gaW1wbGVtZW50IGhvdyB0aGUgdXBkYXRlIG9mIHRoZSByZW5kZXJlZCB2YWx1ZSBoYXBwZW5zLlxuICogQWxzbyBjdXN0b20gYmVoYXZpb3VyIGlzIHNvbWV0aGluZyB5b3UgbmVlZCB0byBpbXBsZW1lbnQgaW4gdGhlIGV4dGVuZGluZyBjbGFzc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2RBd2FyZTxVPihjZmc6IHtcbiAgcmVuZGVyOiAoKSA9PiB2b2lkO1xuICByZXNldENvbnRleHRPYnNlcnZlcjogTmV4dE9ic2VydmVyPHZvaWQ+O1xuICB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiBOZXh0T2JzZXJ2ZXI8VSB8IHVuZGVmaW5lZCB8IG51bGw+O1xufSk6IENkQXdhcmU8VSB8IHVuZGVmaW5lZCB8IG51bGw+IHtcbiAgY29uc3QgcG90ZW50aWFsT2JzZXJ2YWJsZXNTdWJqZWN0ID0gbmV3IFN1YmplY3Q8XG4gICAgT2JzZXJ2YWJsZTxVPiB8IHVuZGVmaW5lZCB8IG51bGxcbiAgPigpO1xuICBjb25zdCBvYnNlcnZhYmxlc0Zyb21UZW1wbGF0ZSQgPSBwb3RlbnRpYWxPYnNlcnZhYmxlc1N1YmplY3QucGlwZShcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICk7XG5cbiAgY29uc3QgcmVuZGVyaW5nJCA9IG9ic2VydmFibGVzRnJvbVRlbXBsYXRlJC5waXBlKFxuICAgIC8vIENvbXBvc2UgdGhlIG9ic2VydmFibGVzIGZyb20gdGhlIHRlbXBsYXRlIGFuZCB0aGUgc3RyYXRlZ3lcbiAgICBzd2l0Y2hNYXAoKG9ic2VydmFibGUkKSA9PiB7XG4gICAgICAvLyBJZiB0aGUgcGFzc2VkIG9ic2VydmFibGUgaXM6XG4gICAgICAvLyAtIHVuZGVmaW5lZCAtIE5vIHZhbHVlIHNldFxuICAgICAgLy8gLSBudWxsIC0gbnVsbCBwYXNzZWQgZGlyZWN0bHkgb3Igbm8gdmFsdWUgc2V0IG92ZXIgYGFzeW5jYCBwaXBlXG4gICAgICBpZiAob2JzZXJ2YWJsZSQgPT0gbnVsbCkge1xuICAgICAgICAvLyBVcGRhdGUgdGhlIHZhbHVlIHRvIHJlbmRlcl9jcmVhdG9yIHdpdGggbnVsbC91bmRlZmluZWRcbiAgICAgICAgY2ZnLnVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXIubmV4dChvYnNlcnZhYmxlJCBhcyBhbnkpO1xuICAgICAgICAvLyBSZW5kZXIgdGhlIHZpZXdcbiAgICAgICAgY2ZnLnJlbmRlcigpO1xuICAgICAgICAvLyBTdG9wIGZ1cnRoZXIgcHJvY2Vzc2luZ1xuICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGEgbmV3IE9ic2VydmFibGUgYXJyaXZlcywgcmVzZXQgdGhlIHZhbHVlIHRvIHJlbmRlcl9jcmVhdG9yXG4gICAgICAvLyBXZSBkbyB0aGlzIGJlY2F1c2Ugd2UgZG9uJ3Qga25vdyB3aGVuIHRoZSBuZXh0IHZhbHVlIGFycml2ZXMgYW5kIHdhbnQgdG8gZ2V0IHJpZCBvZiB0aGUgb2xkIHZhbHVlXG4gICAgICBjZmcucmVzZXRDb250ZXh0T2JzZXJ2ZXIubmV4dCgpO1xuICAgICAgY2ZnLnJlbmRlcigpO1xuXG4gICAgICByZXR1cm4gb2JzZXJ2YWJsZSQucGlwZShcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgdGFwKGNmZy51cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyKSxcbiAgICAgICAgdGFwKCgpID0+IGNmZy5yZW5kZXIoKSksXG4gICAgICAgIGNhdGNoRXJyb3IoKGUpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSlcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIG5leHRQb3RlbnRpYWxPYnNlcnZhYmxlKHZhbHVlOiBPYnNlcnZhYmxlPFU+IHwgdW5kZWZpbmVkIHwgbnVsbCk6IHZvaWQge1xuICAgICAgcG90ZW50aWFsT2JzZXJ2YWJsZXNTdWJqZWN0Lm5leHQodmFsdWUpO1xuICAgIH0sXG4gICAgc3Vic2NyaWJlKCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICByZXR1cm4gcmVuZGVyaW5nJC5zdWJzY3JpYmUoKTtcbiAgICB9LFxuICB9IGFzIENkQXdhcmU8VSB8IHVuZGVmaW5lZCB8IG51bGw+O1xufVxuIl19