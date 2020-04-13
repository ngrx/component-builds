/**
 * @fileoverview added by tsickle
 * Generated from: modules/component/src/core/cd-aware/cd-aware_creator.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject, } from 'rxjs';
import { distinctUntilChanged, map, switchAll, tap } from 'rxjs/operators';
import { toObservableValue } from '../projections';
import { getChangeDetectionHandler } from './get-change-detection-handling';
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
    /** @type {?} */
    const observables$ = observablesSubject.pipe(distinctUntilChanged(), 
    // Try to convert it to values, throw if not possible
    map(toObservableValue), tap((/**
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
    value$ => value$.pipe(distinctUntilChanged(), tap(cfg.updateViewContextObserver)))), cfg.configurableBehaviour, switchAll(), tap((/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2QtYXdhcmVfY3JlYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9jb3JlL2NkLWF3YXJlL2NkLWF3YXJlX2NyZWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBSUwsT0FBTyxHQUdSLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7QUFFNUUsc0NBRUM7OztJQURDLHFDQUFtQjs7Ozs7O0FBR3JCLDZCQUVDOzs7SUFEQyx1QkFBcUU7Ozs7O0FBR3ZFLGdDQUlDOzs7SUFIQyw2QkFBYTs7SUFDYiw0QkFBZTs7SUFDZiwyQkFBeUI7Ozs7OztBQUczQixNQUFNLFVBQVUsU0FBUyxDQUFDLEdBQWU7O1VBQ2pDLE1BQU0sR0FBOEIseUJBQXlCLENBQ2pFLEdBQUcsQ0FBQyxNQUFNLEVBQ1YsR0FBRyxDQUFDLEtBQUssQ0FDVjtJQUNEOzs7SUFBTyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFDO0FBQ25DLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFXRCxNQUFNLFVBQVUsYUFBYSxDQUFJLEdBT2hDOztVQUNPLGtCQUFrQixHQUFHLElBQUksT0FBTyxFQUVuQzs7VUFDRyxZQUFZLEdBRWQsa0JBQWtCLENBQUMsSUFBSSxDQUN6QixvQkFBb0IsRUFBRTtJQUN0QixxREFBcUQ7SUFDckQsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEVBQ3RCLEdBQUc7Ozs7SUFBQyxDQUFDLENBQU0sRUFBRSxFQUFFO1FBQ2IsR0FBRyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDLEVBQUMsRUFDRixHQUFHOzs7O0lBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDWCxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQ3hFLEVBQ0QsR0FBRyxDQUFDLHFCQUFxQixFQUN6QixTQUFTLEVBQUUsRUFDWCxHQUFHOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUMsQ0FDdEI7SUFFRCxPQUFPLG1CQUFBOzs7OztRQUNMLElBQUksQ0FBQyxLQUFVO1lBQ2Isa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUM7Ozs7UUFDRCxTQUFTO1lBQ1AsT0FBTyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbEMsQ0FBQztLQUNGLEVBQWlDLENBQUM7QUFDckMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE5leHRPYnNlcnZlcixcbiAgT2JzZXJ2YWJsZSxcbiAgUGFydGlhbE9ic2VydmVyLFxuICBTdWJqZWN0LFxuICBTdWJzY3JpYmFibGUsXG4gIFN1YnNjcmlwdGlvbixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgbWFwLCBzd2l0Y2hBbGwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IHRvT2JzZXJ2YWJsZVZhbHVlIH0gZnJvbSAnLi4vcHJvamVjdGlvbnMnO1xuaW1wb3J0IHsgZ2V0Q2hhbmdlRGV0ZWN0aW9uSGFuZGxlciB9IGZyb20gJy4vZ2V0LWNoYW5nZS1kZXRlY3Rpb24taGFuZGxpbmcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvYWxlc2NpbmdDb25maWcge1xuICBvcHRpbWl6ZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2RBd2FyZTxVPiBleHRlbmRzIFN1YnNjcmliYWJsZTxVPiB7XG4gIG5leHQ6ICh2YWx1ZTogT2JzZXJ2YWJsZTxVPiB8IFByb21pc2U8VT4gfCBudWxsIHwgdW5kZWZpbmVkKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFdvcmtDb25maWcge1xuICBjb250ZXh0OiBhbnk7XG4gIG5nWm9uZTogTmdab25lO1xuICBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRVcFdvcmsoY2ZnOiBXb3JrQ29uZmlnKTogKCkgPT4gdm9pZCB7XG4gIGNvbnN0IHJlbmRlcjogKGNvbXBvbmVudD86IGFueSkgPT4gdm9pZCA9IGdldENoYW5nZURldGVjdGlvbkhhbmRsZXIoXG4gICAgY2ZnLm5nWm9uZSxcbiAgICBjZmcuY2RSZWZcbiAgKTtcbiAgcmV0dXJuICgpID0+IHJlbmRlcihjZmcuY29udGV4dCk7XG59XG5cbi8qKlxuICogY2xhc3MgQ2RBd2FyZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBhYnN0cmFjdCBjbGFzcyBob2xkcyBhbGwgdGhlIHNoYXJlZCBsb2dpYyBmb3IgdGhlIHB1c2ggcGlwZSBhbmQgdGhlIGxldCBkaXJlY3RpdmVcbiAqIHJlc3BvbnNpYmxlIGZvciBjaGFuZ2UgZGV0ZWN0aW9uXG4gKiBJZiB5b3UgZXh0ZW5kIHRoaXMgY2xhc3MgeW91IG5lZWQgdG8gaW1wbGVtZW50IGhvdyB0aGUgdXBkYXRlIG9mIHRoZSByZW5kZXJlZCB2YWx1ZSBoYXBwZW5zLlxuICogQWxzbyBjdXN0b20gYmVoYXZpb3VyIGlzIHNvbWV0aGluZyB5b3UgbmVlZCB0byBpbXBsZW1lbnQgaW4gdGhlIGV4dGVuZGluZyBjbGFzc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2RBd2FyZTxVPihjZmc6IHtcbiAgd29yazogKCkgPT4gdm9pZDtcbiAgcmVzZXRDb250ZXh0T2JzZXJ2ZXI6IE5leHRPYnNlcnZlcjx1bmtub3duPjtcbiAgY29uZmlndXJhYmxlQmVoYXZpb3VyOiAoXG4gICAgbzogT2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFUgfCBudWxsIHwgdW5kZWZpbmVkPj5cbiAgKSA9PiBPYnNlcnZhYmxlPE9ic2VydmFibGU8VSB8IG51bGwgfCB1bmRlZmluZWQ+PjtcbiAgdXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcjogUGFydGlhbE9ic2VydmVyPFUgfCBudWxsIHwgdW5kZWZpbmVkPjtcbn0pOiBDZEF3YXJlPFUgfCB1bmRlZmluZWQgfCBudWxsPiB7XG4gIGNvbnN0IG9ic2VydmFibGVzU3ViamVjdCA9IG5ldyBTdWJqZWN0PFxuICAgIE9ic2VydmFibGU8VT4gfCBQcm9taXNlPFU+IHwgbnVsbCB8IHVuZGVmaW5lZFxuICA+KCk7XG4gIGNvbnN0IG9ic2VydmFibGVzJDogT2JzZXJ2YWJsZTxcbiAgICBVIHwgdW5kZWZpbmVkIHwgbnVsbFxuICA+ID0gb2JzZXJ2YWJsZXNTdWJqZWN0LnBpcGUoXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAvLyBUcnkgdG8gY29udmVydCBpdCB0byB2YWx1ZXMsIHRocm93IGlmIG5vdCBwb3NzaWJsZVxuICAgIG1hcCh0b09ic2VydmFibGVWYWx1ZSksXG4gICAgdGFwKCh2OiBhbnkpID0+IHtcbiAgICAgIGNmZy5yZXNldENvbnRleHRPYnNlcnZlci5uZXh0KHYpO1xuICAgICAgY2ZnLndvcmsoKTtcbiAgICB9KSxcbiAgICBtYXAodmFsdWUkID0+XG4gICAgICB2YWx1ZSQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCB0YXAoY2ZnLnVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXIpKVxuICAgICksXG4gICAgY2ZnLmNvbmZpZ3VyYWJsZUJlaGF2aW91cixcbiAgICBzd2l0Y2hBbGwoKSxcbiAgICB0YXAoKCkgPT4gY2ZnLndvcmsoKSlcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIG5leHQodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgb2JzZXJ2YWJsZXNTdWJqZWN0Lm5leHQodmFsdWUpO1xuICAgIH0sXG4gICAgc3Vic2NyaWJlKCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICByZXR1cm4gb2JzZXJ2YWJsZXMkLnN1YnNjcmliZSgpO1xuICAgIH0sXG4gIH0gYXMgQ2RBd2FyZTxVIHwgdW5kZWZpbmVkIHwgbnVsbD47XG59XG4iXX0=