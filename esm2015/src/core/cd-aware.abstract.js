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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2QtYXdhcmUuYWJzdHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC9zcmMvY29yZS9jZC1hd2FyZS5hYnN0cmFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNwRCxPQUFPLEVBSUwsT0FBTyxHQUdSLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRWxELHNDQUVDOzs7SUFEQyxxQ0FBbUI7Ozs7OztBQUdyQiw2QkFFQzs7O0lBREMsdUJBQXFFOzs7OztBQUd2RSxnQ0FJQzs7O0lBSEMsNkJBQWE7O0lBQ2IsNEJBQWU7O0lBQ2YsMkJBQXlCOzs7Ozs7QUFHM0IsTUFBTSxVQUFVLFNBQVMsQ0FBQyxHQUFlOztVQUNqQyxNQUFNLEdBQThCLHlCQUF5QixDQUNqRSxHQUFHLENBQUMsTUFBTSxFQUNWLEdBQUcsQ0FBQyxLQUFLLENBQ1Y7SUFDRDs7O0lBQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBQztBQUNuQyxDQUFDOzs7Ozs7Ozs7Ozs7O0FBV0QsTUFBTSxVQUFVLGFBQWEsQ0FBSSxHQU9oQzs7VUFDTyxrQkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFFbkM7Ozs7VUFHRyxZQUFZLEdBRWQsa0JBQWtCLENBQUMsSUFBSTtJQUN6QixxREFBcUQ7SUFDckQsb0JBQW9CLEVBQUU7SUFDdEIscURBQXFEO0lBQ3JELEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUN0QixHQUFHOzs7O0lBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtRQUNiLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2IsQ0FBQyxFQUFDLEVBQ0YsR0FBRzs7OztJQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQyxFQUN4RTtJQUNELGtCQUFrQjtJQUNsQixHQUFHLENBQUMscUJBQXFCO0lBQ3pCLHdDQUF3QztJQUN4QywrREFBK0Q7SUFDL0QsK0VBQStFO0lBQy9FLFNBQVMsRUFBRSxFQUNYLEdBQUc7OztJQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBQyxDQUN0QjtJQUVELE9BQU8sbUJBQUE7Ozs7O1FBQ0wsSUFBSSxDQUFDLEtBQVU7WUFDYixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsQ0FBQzs7OztRQUNELFNBQVM7WUFDUCxPQUFPLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsQyxDQUFDO0tBQ0YsRUFBaUMsQ0FBQztBQUNyQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZ2V0Q2hhbmdlRGV0ZWN0aW9uSGFuZGxlciB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHtcbiAgTmV4dE9ic2VydmVyLFxuICBPYnNlcnZhYmxlLFxuICBQYXJ0aWFsT2JzZXJ2ZXIsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmliYWJsZSxcbiAgU3Vic2NyaXB0aW9uLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHN3aXRjaEFsbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgdG9PYnNlcnZhYmxlVmFsdWUgfSBmcm9tICcuL3Byb2plY3Rpb25zJztcblxuZXhwb3J0IGludGVyZmFjZSBDb2FsZXNjaW5nQ29uZmlnIHtcbiAgb3B0aW1pemVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENkQXdhcmU8VT4gZXh0ZW5kcyBTdWJzY3JpYmFibGU8VT4ge1xuICBuZXh0OiAodmFsdWU6IE9ic2VydmFibGU8VT4gfCBQcm9taXNlPFU+IHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXb3JrQ29uZmlnIHtcbiAgY29udGV4dDogYW55O1xuICBuZ1pvbmU6IE5nWm9uZTtcbiAgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VXBXb3JrKGNmZzogV29ya0NvbmZpZyk6ICgpID0+IHZvaWQge1xuICBjb25zdCByZW5kZXI6IChjb21wb25lbnQ/OiBhbnkpID0+IHZvaWQgPSBnZXRDaGFuZ2VEZXRlY3Rpb25IYW5kbGVyKFxuICAgIGNmZy5uZ1pvbmUsXG4gICAgY2ZnLmNkUmVmXG4gICk7XG4gIHJldHVybiAoKSA9PiByZW5kZXIoY2ZnLmNvbnRleHQpO1xufVxuXG4vKipcbiAqIGNsYXNzIENkQXdhcmVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgYWJzdHJhY3QgY2xhc3MgaG9sZHMgYWxsIHRoZSBzaGFyZWQgbG9naWMgZm9yIHRoZSBwdXNoIHBpcGUgYW5kIHRoZSBsZXQgZGlyZWN0aXZlXG4gKiByZXNwb25zaWJsZSBmb3IgY2hhbmdlIGRldGVjdGlvblxuICogSWYgeW91IGV4dGVuZCB0aGlzIGNsYXNzIHlvdSBuZWVkIHRvIGltcGxlbWVudCBob3cgdGhlIHVwZGF0ZSBvZiB0aGUgcmVuZGVyZWQgdmFsdWUgaGFwcGVucy5cbiAqIEFsc28gY3VzdG9tIGJlaGF2aW91ciBpcyBzb21ldGhpbmcgeW91IG5lZWQgdG8gaW1wbGVtZW50IGluIHRoZSBleHRlbmRpbmcgY2xhc3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNkQXdhcmU8VT4oY2ZnOiB7XG4gIHdvcms6ICgpID0+IHZvaWQ7XG4gIHJlc2V0Q29udGV4dE9ic2VydmVyOiBOZXh0T2JzZXJ2ZXI8dW5rbm93bj47XG4gIGNvbmZpZ3VyYWJsZUJlaGF2aW91cjogKFxuICAgIG86IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxVIHwgbnVsbCB8IHVuZGVmaW5lZD4+XG4gICkgPT4gT2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFUgfCBudWxsIHwgdW5kZWZpbmVkPj47XG4gIHVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXI6IFBhcnRpYWxPYnNlcnZlcjxVIHwgbnVsbCB8IHVuZGVmaW5lZD47XG59KTogQ2RBd2FyZTxVIHwgdW5kZWZpbmVkIHwgbnVsbD4ge1xuICBjb25zdCBvYnNlcnZhYmxlc1N1YmplY3QgPSBuZXcgU3ViamVjdDxcbiAgICBPYnNlcnZhYmxlPFU+IHwgUHJvbWlzZTxVPiB8IG51bGwgfCB1bmRlZmluZWRcbiAgPigpO1xuICAvLyBXZSBoYXZlIHRvIGRlZmVyIHRoZSBzZXR1cCBvZiBvYnNlcnZhYmxlcyQgdW50aWwgc3Vic2NyaXB0aW9uIGFzIGdldENvbmZpZ3VyYWJsZUJlaGF2aW91ciBpcyBkZWZpbmVkIGluIHRoZVxuICAvLyBleHRlbmRpbmcgY2xhc3MuIFNvIGdldENvbmZpZ3VyYWJsZUJlaGF2aW91ciBpcyBub3QgYXZhaWxhYmxlIGluIHRoZSBhYnN0cmFjdCBsYXllclxuICBjb25zdCBvYnNlcnZhYmxlcyQ6IE9ic2VydmFibGU8XG4gICAgVSB8IHVuZGVmaW5lZCB8IG51bGxcbiAgPiA9IG9ic2VydmFibGVzU3ViamVjdC5waXBlKFxuICAgIC8vIElnbm9yZSBwb3RlbnRpYWwgb2JzZXJ2YWJsZXMgb2YgdGhlIHNhbWUgaW5zdGFuY2VzXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAvLyBUcnkgdG8gY29udmVydCBpdCB0byB2YWx1ZXMsIHRocm93IGlmIG5vdCBwb3NzaWJsZVxuICAgIG1hcCh0b09ic2VydmFibGVWYWx1ZSksXG4gICAgdGFwKCh2OiBhbnkpID0+IHtcbiAgICAgIGNmZy5yZXNldENvbnRleHRPYnNlcnZlci5uZXh0KHYpO1xuICAgICAgY2ZnLndvcmsoKTtcbiAgICB9KSxcbiAgICBtYXAodmFsdWUkID0+XG4gICAgICB2YWx1ZSQucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCB0YXAoY2ZnLnVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXIpKVxuICAgICksXG4gICAgLy8gZS5nLiBjb2FsZXNjaW5nXG4gICAgY2ZnLmNvbmZpZ3VyYWJsZUJlaGF2aW91cixcbiAgICAvLyBVbnN1YnNjcmliZSBmcm9tIHByZXZpb3VzIG9ic2VydmFibGVzXG4gICAgLy8gVGhlbiBmbGF0dGVuIHRoZSBsYXRlc3QgaW50ZXJuYWwgb2JzZXJ2YWJsZXMgaW50byB0aGUgb3V0cHV0XG4gICAgLy8gQE5PVElDRSBhcHBsaWVkIGJlaGF2aW91ciAob24gdGhlIHZhbHVlcywgbm90IHRoZSBvYnNlcnZhYmxlKSB3aWxsIGZpcmUgaGVyZVxuICAgIHN3aXRjaEFsbCgpLFxuICAgIHRhcCgoKSA9PiBjZmcud29yaygpKVxuICApO1xuXG4gIHJldHVybiB7XG4gICAgbmV4dCh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICBvYnNlcnZhYmxlc1N1YmplY3QubmV4dCh2YWx1ZSk7XG4gICAgfSxcbiAgICBzdWJzY3JpYmUoKTogU3Vic2NyaXB0aW9uIHtcbiAgICAgIHJldHVybiBvYnNlcnZhYmxlcyQuc3Vic2NyaWJlKCk7XG4gICAgfSxcbiAgfSBhcyBDZEF3YXJlPFUgfCB1bmRlZmluZWQgfCBudWxsPjtcbn1cbiJdfQ==