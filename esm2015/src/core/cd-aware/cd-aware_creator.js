/**
 * @fileoverview added by tsickle
 * Generated from: src/core/cd-aware/cd-aware_creator.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EMPTY, from, isObservable, Subject, } from 'rxjs';
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
        /** @type {?} */
        const ob$ = isObservable(observable$)
            ? ((/** @type {?} */ (observable$)))
            : from(observable$);
        // If a new Observable arrives, reset the value to render_creator
        // We do this because we don't know when the next value arrives and want to get rid of the old value
        cfg.resetContextObserver.next();
        cfg.render();
        return ((/** @type {?} */ (ob$))).pipe(distinctUntilChanged(), tap(cfg.updateViewContextObserver), tap((/**
         * @return {?}
         */
        () => cfg.render())), catchError((/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2QtYXdhcmVfY3JlYXRvci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC8iLCJzb3VyY2VzIjpbInNyYy9jb3JlL2NkLWF3YXJlL2NkLWF3YXJlX2NyZWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUNMLElBQUksRUFDSixZQUFZLEVBSVosT0FBTyxHQUdSLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsU0FBUyxFQUNULEdBQUcsR0FDSixNQUFNLGdCQUFnQixDQUFDOzs7OztBQUV4Qiw2QkFJQzs7O0lBSEMsMENBRVU7Ozs7Ozs7Ozs7Ozs7O0FBWVosTUFBTSxVQUFVLGFBQWEsQ0FBSSxHQUloQzs7VUFDTywyQkFBMkIsR0FFN0IsSUFBSSxPQUFPLEVBQUU7O1VBQ1gsd0JBQXdCLEdBRTFCLDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDOztVQUV0RCxVQUFVLEdBQUcsd0JBQXdCLENBQUMsSUFBSTtJQUM5Qyw2REFBNkQ7SUFDN0QsU0FBUzs7OztJQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDeEIsK0JBQStCO1FBQy9CLDZCQUE2QjtRQUM3QixrRUFBa0U7UUFDbEUsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO1lBQ3ZCLHlEQUF5RDtZQUN6RCxHQUFHLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLG1CQUFBLFdBQVcsRUFBTyxDQUFDLENBQUM7WUFDdkQsa0JBQWtCO1lBQ2xCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNiLDBCQUEwQjtZQUMxQixPQUFPLEtBQUssQ0FBQztTQUNkOztjQUVLLEdBQUcsR0FBa0IsWUFBWSxDQUFDLFdBQVcsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQyxtQkFBQSxXQUFXLEVBQWlCLENBQUM7WUFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFFckIsaUVBQWlFO1FBQ2pFLG9HQUFvRztRQUNwRyxHQUFHLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWIsT0FBTyxDQUFDLG1CQUFBLEdBQUcsRUFBaUIsQ0FBQyxDQUFDLElBQUksQ0FDaEMsb0JBQW9CLEVBQUUsRUFDdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxFQUNsQyxHQUFHOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEVBQUMsRUFDdkIsVUFBVTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDZixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDLEVBQUMsQ0FDSDtJQUVELE9BQU8sbUJBQUE7Ozs7O1FBQ0wsdUJBQXVCLENBQ3JCLEtBQTRDO1lBRTVDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDOzs7O1FBQ0QsU0FBUztZQUNQLE9BQU8sVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hDLENBQUM7S0FDRixFQUFpQyxDQUFDO0FBQ3JDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFTVBUWSxcbiAgZnJvbSxcbiAgaXNPYnNlcnZhYmxlLFxuICBOZXh0T2JzZXJ2ZXIsXG4gIE9ic2VydmFibGUsXG4gIE9ic2VydmFibGVJbnB1dCxcbiAgU3ViamVjdCxcbiAgU3Vic2NyaWJhYmxlLFxuICBTdWJzY3JpcHRpb24sXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgY2F0Y2hFcnJvcixcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIHN3aXRjaE1hcCxcbiAgdGFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2RBd2FyZTxVPiBleHRlbmRzIFN1YnNjcmliYWJsZTxVPiB7XG4gIG5leHRQb3RlbnRpYWxPYnNlcnZhYmxlOiAoXG4gICAgdmFsdWU6IE9ic2VydmFibGVJbnB1dDxhbnk+IHwgbnVsbCB8IHVuZGVmaW5lZFxuICApID0+IHZvaWQ7XG59XG5cbi8qKlxuICogY2xhc3MgQ2RBd2FyZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBhYnN0cmFjdCBjbGFzcyBob2xkcyBhbGwgdGhlIHNoYXJlZCBsb2dpYyBmb3IgdGhlIHB1c2ggcGlwZSBhbmQgdGhlIGxldCBkaXJlY3RpdmVcbiAqIHJlc3BvbnNpYmxlIGZvciBjaGFuZ2UgZGV0ZWN0aW9uXG4gKiBJZiB5b3UgZXh0ZW5kIHRoaXMgY2xhc3MgeW91IG5lZWQgdG8gaW1wbGVtZW50IGhvdyB0aGUgdXBkYXRlIG9mIHRoZSByZW5kZXJlZCB2YWx1ZSBoYXBwZW5zLlxuICogQWxzbyBjdXN0b20gYmVoYXZpb3VyIGlzIHNvbWV0aGluZyB5b3UgbmVlZCB0byBpbXBsZW1lbnQgaW4gdGhlIGV4dGVuZGluZyBjbGFzc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2RBd2FyZTxVPihjZmc6IHtcbiAgcmVuZGVyOiAoKSA9PiB2b2lkO1xuICByZXNldENvbnRleHRPYnNlcnZlcjogTmV4dE9ic2VydmVyPHZvaWQ+O1xuICB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiBOZXh0T2JzZXJ2ZXI8VSB8IHVuZGVmaW5lZCB8IG51bGw+O1xufSk6IENkQXdhcmU8VSB8IHVuZGVmaW5lZCB8IG51bGw+IHtcbiAgY29uc3QgcG90ZW50aWFsT2JzZXJ2YWJsZXNTdWJqZWN0OiBTdWJqZWN0PFxuICAgIE9ic2VydmFibGVJbnB1dDxVPiB8IHVuZGVmaW5lZCB8IG51bGxcbiAgPiA9IG5ldyBTdWJqZWN0KCk7XG4gIGNvbnN0IG9ic2VydmFibGVzRnJvbVRlbXBsYXRlJDogT2JzZXJ2YWJsZTxcbiAgICBPYnNlcnZhYmxlSW5wdXQ8VT4gfCB1bmRlZmluZWQgfCBudWxsXG4gID4gPSBwb3RlbnRpYWxPYnNlcnZhYmxlc1N1YmplY3QucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKTtcblxuICBjb25zdCByZW5kZXJpbmckID0gb2JzZXJ2YWJsZXNGcm9tVGVtcGxhdGUkLnBpcGUoXG4gICAgLy8gQ29tcG9zZSB0aGUgb2JzZXJ2YWJsZXMgZnJvbSB0aGUgdGVtcGxhdGUgYW5kIHRoZSBzdHJhdGVneVxuICAgIHN3aXRjaE1hcCgob2JzZXJ2YWJsZSQpID0+IHtcbiAgICAgIC8vIElmIHRoZSBwYXNzZWQgb2JzZXJ2YWJsZSBpczpcbiAgICAgIC8vIC0gdW5kZWZpbmVkIC0gTm8gdmFsdWUgc2V0XG4gICAgICAvLyAtIG51bGwgLSBudWxsIHBhc3NlZCBkaXJlY3RseSBvciBubyB2YWx1ZSBzZXQgb3ZlciBgYXN5bmNgIHBpcGVcbiAgICAgIGlmIChvYnNlcnZhYmxlJCA9PSBudWxsKSB7XG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgdmFsdWUgdG8gcmVuZGVyX2NyZWF0b3Igd2l0aCBudWxsL3VuZGVmaW5lZFxuICAgICAgICBjZmcudXBkYXRlVmlld0NvbnRleHRPYnNlcnZlci5uZXh0KG9ic2VydmFibGUkIGFzIGFueSk7XG4gICAgICAgIC8vIFJlbmRlciB0aGUgdmlld1xuICAgICAgICBjZmcucmVuZGVyKCk7XG4gICAgICAgIC8vIFN0b3AgZnVydGhlciBwcm9jZXNzaW5nXG4gICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb2IkOiBPYnNlcnZhYmxlPFU+ID0gaXNPYnNlcnZhYmxlKG9ic2VydmFibGUkKVxuICAgICAgICA/IChvYnNlcnZhYmxlJCBhcyBPYnNlcnZhYmxlPFU+KVxuICAgICAgICA6IGZyb20ob2JzZXJ2YWJsZSQpO1xuXG4gICAgICAvLyBJZiBhIG5ldyBPYnNlcnZhYmxlIGFycml2ZXMsIHJlc2V0IHRoZSB2YWx1ZSB0byByZW5kZXJfY3JlYXRvclxuICAgICAgLy8gV2UgZG8gdGhpcyBiZWNhdXNlIHdlIGRvbid0IGtub3cgd2hlbiB0aGUgbmV4dCB2YWx1ZSBhcnJpdmVzIGFuZCB3YW50IHRvIGdldCByaWQgb2YgdGhlIG9sZCB2YWx1ZVxuICAgICAgY2ZnLnJlc2V0Q29udGV4dE9ic2VydmVyLm5leHQoKTtcbiAgICAgIGNmZy5yZW5kZXIoKTtcblxuICAgICAgcmV0dXJuIChvYiQgYXMgT2JzZXJ2YWJsZTxVPikucGlwZShcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgdGFwKGNmZy51cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyKSxcbiAgICAgICAgdGFwKCgpID0+IGNmZy5yZW5kZXIoKSksXG4gICAgICAgIGNhdGNoRXJyb3IoKGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBuZXh0UG90ZW50aWFsT2JzZXJ2YWJsZShcbiAgICAgIHZhbHVlOiBPYnNlcnZhYmxlSW5wdXQ8VT4gfCB1bmRlZmluZWQgfCBudWxsXG4gICAgKTogdm9pZCB7XG4gICAgICBwb3RlbnRpYWxPYnNlcnZhYmxlc1N1YmplY3QubmV4dCh2YWx1ZSk7XG4gICAgfSxcbiAgICBzdWJzY3JpYmUoKTogU3Vic2NyaXB0aW9uIHtcbiAgICAgIHJldHVybiByZW5kZXJpbmckLnN1YnNjcmliZSgpO1xuICAgIH0sXG4gIH0gYXMgQ2RBd2FyZTxVIHwgdW5kZWZpbmVkIHwgbnVsbD47XG59XG4iXX0=