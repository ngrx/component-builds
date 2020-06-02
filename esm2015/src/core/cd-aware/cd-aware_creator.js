/**
 * @fileoverview added by tsickle
 * Generated from: src/core/cd-aware/cd-aware_creator.ts
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
    map((/**
     * @param {?} v
     * @return {?}
     */
    (v) => toObservableValue(v))), tap((/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2QtYXdhcmVfY3JlYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3J4L2NvbXBvbmVudC8iLCJzb3VyY2VzIjpbInNyYy9jb3JlL2NkLWF3YXJlL2NkLWF3YXJlX2NyZWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBSUwsT0FBTyxHQUdSLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7QUFFNUUsc0NBRUM7OztJQURDLHFDQUFtQjs7Ozs7O0FBR3JCLDZCQUVDOzs7SUFEQyx1QkFBcUU7Ozs7O0FBR3ZFLGdDQUlDOzs7SUFIQyw2QkFBYTs7SUFDYiw0QkFBZTs7SUFDZiwyQkFBeUI7Ozs7OztBQUczQixNQUFNLFVBQVUsU0FBUyxDQUFDLEdBQWU7O1VBQ2pDLE1BQU0sR0FBOEIseUJBQXlCLENBQ2pFLEdBQUcsQ0FBQyxNQUFNLEVBQ1YsR0FBRyxDQUFDLEtBQUssQ0FDVjtJQUNEOzs7SUFBTyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFDO0FBQ25DLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFXRCxNQUFNLFVBQVUsYUFBYSxDQUFJLEdBT2hDOztVQUNPLGtCQUFrQixHQUFHLElBQUksT0FBTyxFQUVuQzs7VUFDRyxZQUFZLEdBRWQsa0JBQWtCLENBQUMsSUFBSSxDQUN6QixvQkFBb0IsRUFBRTtJQUN0QixxREFBcUQ7SUFDckQsR0FBRzs7OztJQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUNoQyxHQUFHOzs7O0lBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtRQUNiLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2IsQ0FBQyxFQUFDLEVBQ0YsR0FBRzs7OztJQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ1gsTUFBTSxDQUFDLElBQUksQ0FDVCxvQkFBb0IsRUFBRSxFQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQ25DLEVBQ0YsRUFDRCxHQUFHLENBQUMscUJBQXFCLEVBQ3pCLFNBQVMsRUFBRSxFQUNYLEdBQUc7OztJQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBQyxDQUN0QjtJQUVELE9BQU8sbUJBQUE7Ozs7O1FBQ0wsSUFBSSxDQUFDLEtBQVU7WUFDYixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQzs7OztRQUNELFNBQVM7WUFDUCxPQUFPLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsQyxDQUFDO0tBQ0YsRUFBaUMsQ0FBQztBQUNyQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTmV4dE9ic2VydmVyLFxuICBPYnNlcnZhYmxlLFxuICBQYXJ0aWFsT2JzZXJ2ZXIsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmliYWJsZSxcbiAgU3Vic2NyaXB0aW9uLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHN3aXRjaEFsbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgdG9PYnNlcnZhYmxlVmFsdWUgfSBmcm9tICcuLi9wcm9qZWN0aW9ucyc7XG5pbXBvcnQgeyBnZXRDaGFuZ2VEZXRlY3Rpb25IYW5kbGVyIH0gZnJvbSAnLi9nZXQtY2hhbmdlLWRldGVjdGlvbi1oYW5kbGluZyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29hbGVzY2luZ0NvbmZpZyB7XG4gIG9wdGltaXplZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDZEF3YXJlPFU+IGV4dGVuZHMgU3Vic2NyaWJhYmxlPFU+IHtcbiAgbmV4dDogKHZhbHVlOiBPYnNlcnZhYmxlPFU+IHwgUHJvbWlzZTxVPiB8IG51bGwgfCB1bmRlZmluZWQpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV29ya0NvbmZpZyB7XG4gIGNvbnRleHQ6IGFueTtcbiAgbmdab25lOiBOZ1pvbmU7XG4gIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFVwV29yayhjZmc6IFdvcmtDb25maWcpOiAoKSA9PiB2b2lkIHtcbiAgY29uc3QgcmVuZGVyOiAoY29tcG9uZW50PzogYW55KSA9PiB2b2lkID0gZ2V0Q2hhbmdlRGV0ZWN0aW9uSGFuZGxlcihcbiAgICBjZmcubmdab25lLFxuICAgIGNmZy5jZFJlZlxuICApO1xuICByZXR1cm4gKCkgPT4gcmVuZGVyKGNmZy5jb250ZXh0KTtcbn1cblxuLyoqXG4gKiBjbGFzcyBDZEF3YXJlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGlzIGFic3RyYWN0IGNsYXNzIGhvbGRzIGFsbCB0aGUgc2hhcmVkIGxvZ2ljIGZvciB0aGUgcHVzaCBwaXBlIGFuZCB0aGUgbGV0IGRpcmVjdGl2ZVxuICogcmVzcG9uc2libGUgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAqIElmIHlvdSBleHRlbmQgdGhpcyBjbGFzcyB5b3UgbmVlZCB0byBpbXBsZW1lbnQgaG93IHRoZSB1cGRhdGUgb2YgdGhlIHJlbmRlcmVkIHZhbHVlIGhhcHBlbnMuXG4gKiBBbHNvIGN1c3RvbSBiZWhhdmlvdXIgaXMgc29tZXRoaW5nIHlvdSBuZWVkIHRvIGltcGxlbWVudCBpbiB0aGUgZXh0ZW5kaW5nIGNsYXNzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDZEF3YXJlPFU+KGNmZzoge1xuICB3b3JrOiAoKSA9PiB2b2lkO1xuICByZXNldENvbnRleHRPYnNlcnZlcjogTmV4dE9ic2VydmVyPHVua25vd24+O1xuICBjb25maWd1cmFibGVCZWhhdmlvdXI6IChcbiAgICBvOiBPYnNlcnZhYmxlPE9ic2VydmFibGU8VSB8IG51bGwgfCB1bmRlZmluZWQ+PlxuICApID0+IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxVIHwgbnVsbCB8IHVuZGVmaW5lZD4+O1xuICB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiBQYXJ0aWFsT2JzZXJ2ZXI8VSB8IG51bGwgfCB1bmRlZmluZWQ+O1xufSk6IENkQXdhcmU8VSB8IHVuZGVmaW5lZCB8IG51bGw+IHtcbiAgY29uc3Qgb2JzZXJ2YWJsZXNTdWJqZWN0ID0gbmV3IFN1YmplY3Q8XG4gICAgT2JzZXJ2YWJsZTxVPiB8IFByb21pc2U8VT4gfCBudWxsIHwgdW5kZWZpbmVkXG4gID4oKTtcbiAgY29uc3Qgb2JzZXJ2YWJsZXMkOiBPYnNlcnZhYmxlPFxuICAgIFUgfCB1bmRlZmluZWQgfCBudWxsXG4gID4gPSBvYnNlcnZhYmxlc1N1YmplY3QucGlwZShcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgIC8vIFRyeSB0byBjb252ZXJ0IGl0IHRvIHZhbHVlcywgdGhyb3cgaWYgbm90IHBvc3NpYmxlXG4gICAgbWFwKCh2KSA9PiB0b09ic2VydmFibGVWYWx1ZSh2KSksXG4gICAgdGFwKCh2OiBhbnkpID0+IHtcbiAgICAgIGNmZy5yZXNldENvbnRleHRPYnNlcnZlci5uZXh0KHYpO1xuICAgICAgY2ZnLndvcmsoKTtcbiAgICB9KSxcbiAgICBtYXAodmFsdWUkID0+XG4gICAgICB2YWx1ZSQucGlwZShcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgdGFwKGNmZy51cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyKVxuICAgICAgKVxuICAgICksXG4gICAgY2ZnLmNvbmZpZ3VyYWJsZUJlaGF2aW91cixcbiAgICBzd2l0Y2hBbGwoKSxcbiAgICB0YXAoKCkgPT4gY2ZnLndvcmsoKSlcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIG5leHQodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgb2JzZXJ2YWJsZXNTdWJqZWN0Lm5leHQodmFsdWUpO1xuICAgIH0sXG4gICAgc3Vic2NyaWJlKCk6IFN1YnNjcmlwdGlvbiB7XG4gICAgICByZXR1cm4gb2JzZXJ2YWJsZXMkLnN1YnNjcmliZSgpO1xuICAgIH0sXG4gIH0gYXMgQ2RBd2FyZTxVIHwgdW5kZWZpbmVkIHwgbnVsbD47XG59XG4iXX0=