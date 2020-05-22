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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2QtYXdhcmVfY3JlYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9jb3JlL2NkLWF3YXJlL2NkLWF3YXJlX2NyZWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBSUwsT0FBTyxHQUdSLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7QUFFNUUsc0NBRUM7OztJQURDLHFDQUFtQjs7Ozs7O0FBR3JCLDZCQUVDOzs7SUFEQyx1QkFBcUU7Ozs7O0FBR3ZFLGdDQUlDOzs7SUFIQyw2QkFBYTs7SUFDYiw0QkFBZTs7SUFDZiwyQkFBeUI7Ozs7OztBQUczQixNQUFNLFVBQVUsU0FBUyxDQUFDLEdBQWU7O1VBQ2pDLE1BQU0sR0FBOEIseUJBQXlCLENBQ2pFLEdBQUcsQ0FBQyxNQUFNLEVBQ1YsR0FBRyxDQUFDLEtBQUssQ0FDVjtJQUNEOzs7SUFBTyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFDO0FBQ25DLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFXRCxNQUFNLFVBQVUsYUFBYSxDQUFJLEdBT2hDOztVQUNPLGtCQUFrQixHQUFHLElBQUksT0FBTyxFQUVuQzs7VUFDRyxZQUFZLEdBRWQsa0JBQWtCLENBQUMsSUFBSSxDQUN6QixvQkFBb0IsRUFBRTtJQUN0QixxREFBcUQ7SUFDckQsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEVBQ3RCLEdBQUc7Ozs7SUFBQyxDQUFDLENBQU0sRUFBRSxFQUFFO1FBQ2IsR0FBRyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDLEVBQUMsRUFDRixHQUFHOzs7O0lBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDWCxNQUFNLENBQUMsSUFBSSxDQUNULG9CQUFvQixFQUFFLEVBQ3RCLEdBQUcsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FDbkMsRUFDRixFQUNELEdBQUcsQ0FBQyxxQkFBcUIsRUFDekIsU0FBUyxFQUFFLEVBQ1gsR0FBRzs7O0lBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFDLENBQ3RCO0lBRUQsT0FBTyxtQkFBQTs7Ozs7UUFDTCxJQUFJLENBQUMsS0FBVTtZQUNiLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxDQUFDOzs7O1FBQ0QsU0FBUztZQUNQLE9BQU8sWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xDLENBQUM7S0FDRixFQUFpQyxDQUFDO0FBQ3JDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBOZXh0T2JzZXJ2ZXIsXG4gIE9ic2VydmFibGUsXG4gIFBhcnRpYWxPYnNlcnZlcixcbiAgU3ViamVjdCxcbiAgU3Vic2NyaWJhYmxlLFxuICBTdWJzY3JpcHRpb24sXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgc3dpdGNoQWxsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyB0b09ic2VydmFibGVWYWx1ZSB9IGZyb20gJy4uL3Byb2plY3Rpb25zJztcbmltcG9ydCB7IGdldENoYW5nZURldGVjdGlvbkhhbmRsZXIgfSBmcm9tICcuL2dldC1jaGFuZ2UtZGV0ZWN0aW9uLWhhbmRsaW5nJztcblxuZXhwb3J0IGludGVyZmFjZSBDb2FsZXNjaW5nQ29uZmlnIHtcbiAgb3B0aW1pemVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENkQXdhcmU8VT4gZXh0ZW5kcyBTdWJzY3JpYmFibGU8VT4ge1xuICBuZXh0OiAodmFsdWU6IE9ic2VydmFibGU8VT4gfCBQcm9taXNlPFU+IHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXb3JrQ29uZmlnIHtcbiAgY29udGV4dDogYW55O1xuICBuZ1pvbmU6IE5nWm9uZTtcbiAgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VXBXb3JrKGNmZzogV29ya0NvbmZpZyk6ICgpID0+IHZvaWQge1xuICBjb25zdCByZW5kZXI6IChjb21wb25lbnQ/OiBhbnkpID0+IHZvaWQgPSBnZXRDaGFuZ2VEZXRlY3Rpb25IYW5kbGVyKFxuICAgIGNmZy5uZ1pvbmUsXG4gICAgY2ZnLmNkUmVmXG4gICk7XG4gIHJldHVybiAoKSA9PiByZW5kZXIoY2ZnLmNvbnRleHQpO1xufVxuXG4vKipcbiAqIGNsYXNzIENkQXdhcmVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgYWJzdHJhY3QgY2xhc3MgaG9sZHMgYWxsIHRoZSBzaGFyZWQgbG9naWMgZm9yIHRoZSBwdXNoIHBpcGUgYW5kIHRoZSBsZXQgZGlyZWN0aXZlXG4gKiByZXNwb25zaWJsZSBmb3IgY2hhbmdlIGRldGVjdGlvblxuICogSWYgeW91IGV4dGVuZCB0aGlzIGNsYXNzIHlvdSBuZWVkIHRvIGltcGxlbWVudCBob3cgdGhlIHVwZGF0ZSBvZiB0aGUgcmVuZGVyZWQgdmFsdWUgaGFwcGVucy5cbiAqIEFsc28gY3VzdG9tIGJlaGF2aW91ciBpcyBzb21ldGhpbmcgeW91IG5lZWQgdG8gaW1wbGVtZW50IGluIHRoZSBleHRlbmRpbmcgY2xhc3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNkQXdhcmU8VT4oY2ZnOiB7XG4gIHdvcms6ICgpID0+IHZvaWQ7XG4gIHJlc2V0Q29udGV4dE9ic2VydmVyOiBOZXh0T2JzZXJ2ZXI8dW5rbm93bj47XG4gIGNvbmZpZ3VyYWJsZUJlaGF2aW91cjogKFxuICAgIG86IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxVIHwgbnVsbCB8IHVuZGVmaW5lZD4+XG4gICkgPT4gT2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFUgfCBudWxsIHwgdW5kZWZpbmVkPj47XG4gIHVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXI6IFBhcnRpYWxPYnNlcnZlcjxVIHwgbnVsbCB8IHVuZGVmaW5lZD47XG59KTogQ2RBd2FyZTxVIHwgdW5kZWZpbmVkIHwgbnVsbD4ge1xuICBjb25zdCBvYnNlcnZhYmxlc1N1YmplY3QgPSBuZXcgU3ViamVjdDxcbiAgICBPYnNlcnZhYmxlPFU+IHwgUHJvbWlzZTxVPiB8IG51bGwgfCB1bmRlZmluZWRcbiAgPigpO1xuICBjb25zdCBvYnNlcnZhYmxlcyQ6IE9ic2VydmFibGU8XG4gICAgVSB8IHVuZGVmaW5lZCB8IG51bGxcbiAgPiA9IG9ic2VydmFibGVzU3ViamVjdC5waXBlKFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgLy8gVHJ5IHRvIGNvbnZlcnQgaXQgdG8gdmFsdWVzLCB0aHJvdyBpZiBub3QgcG9zc2libGVcbiAgICBtYXAodG9PYnNlcnZhYmxlVmFsdWUpLFxuICAgIHRhcCgodjogYW55KSA9PiB7XG4gICAgICBjZmcucmVzZXRDb250ZXh0T2JzZXJ2ZXIubmV4dCh2KTtcbiAgICAgIGNmZy53b3JrKCk7XG4gICAgfSksXG4gICAgbWFwKHZhbHVlJCA9PlxuICAgICAgdmFsdWUkLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIHRhcChjZmcudXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcilcbiAgICAgIClcbiAgICApLFxuICAgIGNmZy5jb25maWd1cmFibGVCZWhhdmlvdXIsXG4gICAgc3dpdGNoQWxsKCksXG4gICAgdGFwKCgpID0+IGNmZy53b3JrKCkpXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBuZXh0KHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgIG9ic2VydmFibGVzU3ViamVjdC5uZXh0KHZhbHVlKTtcbiAgICB9LFxuICAgIHN1YnNjcmliZSgpOiBTdWJzY3JpcHRpb24ge1xuICAgICAgcmV0dXJuIG9ic2VydmFibGVzJC5zdWJzY3JpYmUoKTtcbiAgICB9LFxuICB9IGFzIENkQXdhcmU8VSB8IHVuZGVmaW5lZCB8IG51bGw+O1xufVxuIl19