/**
 * @fileoverview added by tsickle
 * Generated from: modules/component/src/core/cd-aware.abstract.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getChangeDetectionHandler } from './utils';
import { Subject, } from 'rxjs';
import { distinctUntilChanged, map, switchAll, tap } from 'rxjs/operators';
import { toObservableValue } from './projections';
/**
 * @record
 */
export function CoalescingConfig() { }
if (false) {
    /** @type {?} */
    CoalescingConfig.prototype.optimized;
}
/**
 * @record
 * @template U
 */
export function CdAware() { }
if (false) {
    /** @type {?} */
    CdAware.prototype.next;
}
/**
 * @record
 */
export function WorkConfig() { }
if (false) {
    /** @type {?} */
    WorkConfig.prototype.context;
    /** @type {?} */
    WorkConfig.prototype.ngZone;
    /** @type {?} */
    WorkConfig.prototype.cdRef;
}
/**
 * @param {?} cfg
 * @return {?}
 */
export function setUpWork(cfg) {
    /** @type {?} */
    const render = getChangeDetectionHandler(cfg.ngZone, cfg.cdRef);
    return (/**
     * @return {?}
     */
    () => render(cfg.context));
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
    const observablesSubject = new Subject();
    // We have to defer the setup of observables$ until subscription as getConfigurableBehaviour is defined in the
    // extending class. So getConfigurableBehaviour is not available in the abstract layer
    /** @type {?} */
    const observables$ = observablesSubject.pipe(
    // Ignore potential observables of the same instances
    distinctUntilChanged(), 
    // Try to convert it to values, throw if not possible
    map((/**
     * @param {?} v
     * @return {?}
     */
    v => toObservableValue(v))), tap((/**
     * @param {?} v
     * @return {?}
     */
    (v) => {
        cfg.resetContextObserver.next(v);
        cfg.work();
    })), map((/**
     * @param {?} value$
     * @return {?}
     */
    value$ => value$.pipe(distinctUntilChanged(), tap(cfg.updateViewContextObserver)))), 
    // e.g. coalescing
    cfg.configurableBehaviour, 
    // Unsubscribe from previous observables
    // Then flatten the latest internal observables into the output
    // @NOTICE applied behaviour (on the values, not the observable) will fire here
    switchAll(), tap((/**
     * @return {?}
     */
    () => cfg.work())));
    return (/** @type {?} */ ({
        /**
         * @param {?} value
         * @return {?}
         */
        next(value) {
            observablesSubject.next(value);
        },
        /**
         * @return {?}
         */
        subscribe() {
            return observables$.subscribe();
        },
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2QtYXdhcmUuYWJzdHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC9zcmMvY29yZS9jZC1hd2FyZS5hYnN0cmFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNwRCxPQUFPLEVBSUwsT0FBTyxHQUdSLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRWxELHNDQUVDOzs7SUFEQyxxQ0FBbUI7Ozs7OztBQUdyQiw2QkFFQzs7O0lBREMsdUJBQXFFOzs7OztBQUd2RSxnQ0FJQzs7O0lBSEMsNkJBQWE7O0lBQ2IsNEJBQWU7O0lBQ2YsMkJBQXlCOzs7Ozs7QUFHM0IsTUFBTSxVQUFVLFNBQVMsQ0FBQyxHQUFlOztVQUNqQyxNQUFNLEdBQThCLHlCQUF5QixDQUNqRSxHQUFHLENBQUMsTUFBTSxFQUNWLEdBQUcsQ0FBQyxLQUFLLENBQ1Y7SUFDRDs7O0lBQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBQztBQUNuQyxDQUFDOzs7Ozs7Ozs7Ozs7O0FBV0QsTUFBTSxVQUFVLGFBQWEsQ0FBSSxHQU9oQzs7VUFDTyxrQkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFFbkM7Ozs7VUFHRyxZQUFZLEdBRWQsa0JBQWtCLENBQUMsSUFBSTtJQUN6QixxREFBcUQ7SUFDckQsb0JBQW9CLEVBQUU7SUFDdEIscURBQXFEO0lBQ3JELEdBQUc7Ozs7SUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQzlCLEdBQUc7Ozs7SUFBQyxDQUFDLENBQU0sRUFBRSxFQUFFO1FBQ2IsR0FBRyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDLEVBQUMsRUFDRixHQUFHOzs7O0lBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDWCxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQ3hFO0lBQ0Qsa0JBQWtCO0lBQ2xCLEdBQUcsQ0FBQyxxQkFBcUI7SUFDekIsd0NBQXdDO0lBQ3hDLCtEQUErRDtJQUMvRCwrRUFBK0U7SUFDL0UsU0FBUyxFQUFFLEVBQ1gsR0FBRzs7O0lBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFDLENBQ3RCO0lBRUQsT0FBTyxtQkFBQTs7Ozs7UUFDTCxJQUFJLENBQUMsS0FBVTtZQUNiLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxDQUFDOzs7O1FBQ0QsU0FBUztZQUNQLE9BQU8sWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xDLENBQUM7S0FDRixFQUFpQyxDQUFDO0FBQ3JDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBnZXRDaGFuZ2VEZXRlY3Rpb25IYW5kbGVyIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge1xuICBOZXh0T2JzZXJ2ZXIsXG4gIE9ic2VydmFibGUsXG4gIFBhcnRpYWxPYnNlcnZlcixcbiAgU3ViamVjdCxcbiAgU3Vic2NyaWJhYmxlLFxuICBTdWJzY3JpcHRpb24sXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc3dpdGNoQWxsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyB0b09ic2VydmFibGVWYWx1ZSB9IGZyb20gJy4vcHJvamVjdGlvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvYWxlc2NpbmdDb25maWcge1xuICBvcHRpbWl6ZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2RBd2FyZTxVPiBleHRlbmRzIFN1YnNjcmliYWJsZTxVPiB7XG4gIG5leHQ6ICh2YWx1ZTogT2JzZXJ2YWJsZTxVPiB8IFByb21pc2U8VT4gfCBudWxsIHwgdW5kZWZpbmVkKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtDb25maWcge1xuICBjb250ZXh0OiBhbnk7XG4gIG5nWm9uZTogTmdab25lO1xuICBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRVcFdvcmsoY2ZnOiBXb3JrQ29uZmlnKTogKCkgPT4gdm9pZCB7XG4gIGNvbnN0IHJlbmRlcjogKGNvbXBvbmVudD86IGFueSkgPT4gdm9pZCA9IGdldENoYW5nZURldGVjdGlvbkhhbmRsZXIoXG4gICAgY2ZnLm5nWm9uZSxcbiAgICBjZmcuY2RSZWZcbiAgKTtcbiAgcmV0dXJuICgpID0+IHJlbmRlcihjZmcuY29udGV4dCk7XG59XG5cbi8qKlxuICogY2xhc3MgQ2RBd2FyZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBhYnN0cmFjdCBjbGFzcyBob2xkcyBhbGwgdGhlIHNoYXJlZCBsb2dpYyBmb3IgdGhlIHB1c2ggcGlwZSBhbmQgdGhlIGxldCBkaXJlY3RpdmVcbiAqIHJlc3BvbnNpYmxlIGZvciBjaGFuZ2UgZGV0ZWN0aW9uXG4gKiBJZiB5b3UgZXh0ZW5kIHRoaXMgY2xhc3MgeW91IG5lZWQgdG8gaW1wbGVtZW50IGhvdyB0aGUgdXBkYXRlIG9mIHRoZSByZW5kZXJlZCB2YWx1ZSBoYXBwZW5zLlxuICogQWxzbyBjdXN0b20gYmVoYXZpb3VyIGlzIHNvbWV0aGluZyB5b3UgbmVlZCB0byBpbXBsZW1lbnQgaW4gdGhlIGV4dGVuZGluZyBjbGFzc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2RBd2FyZTxVPihjZmc6IHtcbiAgd29yazogKCkgPT4gdm9pZDtcbiAgcmVzZXRDb250ZXh0T2JzZXJ2ZXI6IE5leHRPYnNlcnZlcjx1bmtub3duPjtcbiAgY29uZmlndXJhYmxlQmVoYXZpb3VyOiAoXG4gICAgbzogT2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFUgfCBudWxsIHwgdW5kZWZpbmVkPj5cbiAgKSA9PiBPYnNlcnZhYmxlPE9ic2VydmFibGU8VSB8IG51bGwgfCB1bmRlZmluZWQ+PjtcbiAgdXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcjogUGFydGlhbE9ic2VydmVyPFUgfCBudWxsIHwgdW5kZWZpbmVkPjtcbn0pOiBDZEF3YXJlPFUgfCB1bmRlZmluZWQgfCBudWxsPiB7XG4gIGNvbnN0IG9ic2VydmFibGVzU3ViamVjdCA9IG5ldyBTdWJqZWN0PFxuICAgIE9ic2VydmFibGU8VT4gfCBQcm9taXNlPFU+IHwgbnVsbCB8IHVuZGVmaW5lZFxuICA+KCk7XG4gIC8vIFdlIGhhdmUgdG8gZGVmZXIgdGhlIHNldHVwIG9mIG9ic2VydmFibGVzJCB1bnRpbCBzdWJzY3JpcHRpb24gYXMgZ2V0Q29uZmlndXJhYmxlQmVoYXZpb3VyIGlzIGRlZmluZWQgaW4gdGhlXG4gIC8vIGV4dGVuZGluZyBjbGFzcy4gU28gZ2V0Q29uZmlndXJhYmxlQmVoYXZpb3VyIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGFic3RyYWN0IGxheWVyXG4gIGNvbnN0IG9ic2VydmFibGVzJDogT2JzZXJ2YWJsZTxcbiAgICBVIHwgdW5kZWZpbmVkIHwgbnVsbFxuICA+ID0gb2JzZXJ2YWJsZXNTdWJqZWN0LnBpcGUoXG4gICAgLy8gSWdub3JlIHBvdGVudGlhbCBvYnNlcnZhYmxlcyBvZiB0aGUgc2FtZSBpbnN0YW5jZXNcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgIC8vIFRyeSB0byBjb252ZXJ0IGl0IHRvIHZhbHVlcywgdGhyb3cgaWYgbm90IHBvc3NpYmxlXG4gICAgbWFwKHYgPT4gdG9PYnNlcnZhYmxlVmFsdWUodikpLFxuICAgIHRhcCgodjogYW55KSA9PiB7XG4gICAgICBjZmcucmVzZXRDb250ZXh0T2JzZXJ2ZXIubmV4dCh2KTtcbiAgICAgIGNmZy53b3JrKCk7XG4gICAgfSksXG4gICAgbWFwKHZhbHVlJCA9PlxuICAgICAgdmFsdWUkLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgdGFwKGNmZy51cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyKSlcbiAgICApLFxuICAgIC8vIGUuZy4gY29hbGVzY2luZ1xuICAgIGNmZy5jb25maWd1cmFibGVCZWhhdmlvdXIsXG4gICAgLy8gVW5zdWJzY3JpYmUgZnJvbSBwcmV2aW91cyBvYnNlcnZhYmxlc1xuICAgIC8vIFRoZW4gZmxhdHRlbiB0aGUgbGF0ZXN0IGludGVybmFsIG9ic2VydmFibGVzIGludG8gdGhlIG91dHB1dFxuICAgIC8vIEBOT1RJQ0UgYXBwbGllZCBiZWhhdmlvdXIgKG9uIHRoZSB2YWx1ZXMsIG5vdCB0aGUgb2JzZXJ2YWJsZSkgd2lsbCBmaXJlIGhlcmVcbiAgICBzd2l0Y2hBbGwoKSxcbiAgICB0YXAoKCkgPT4gY2ZnLndvcmsoKSlcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIG5leHQodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgb2JzZXJ2YWJsZXNTdWJqZWN0Lm5leHQodmFsdWUpO1xuICAgIH0sXG4gICAgc3Vic2NyaWJlKCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICByZXR1cm4gb2JzZXJ2YWJsZXMkLnN1YnNjcmliZSgpO1xuICAgIH0sXG4gIH0gYXMgQ2RBd2FyZTxVIHwgdW5kZWZpbmVkIHwgbnVsbD47XG59XG4iXX0=