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
    var potentialObservablesSubject = new Subject();
    /** @type {?} */
    var observablesFromTemplate$ = potentialObservablesSubject.pipe(distinctUntilChanged());
    /** @type {?} */
    var rendering$ = observablesFromTemplate$.pipe(
    // Compose the observables from the template and the strategy
    switchMap((/**
     * @param {?} observable$
     * @return {?}
     */
    function (observable$) {
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
        function () { return cfg.render(); })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            console.error(e);
            return EMPTY;
        })));
    })));
    return (/** @type {?} */ ({
        nextPotentialObservable: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            potentialObservablesSubject.next(value);
        },
        subscribe: /**
         * @return {?}
         */
        function () {
            return rendering$.subscribe();
        },
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2QtYXdhcmVfY3JlYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3J4L2NvbXBvbmVudC8iLCJzb3VyY2VzIjpbInNyYy9jb3JlL2NkLWF3YXJlL2NkLWF3YXJlX2NyZWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUdMLE9BQU8sR0FHUixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxVQUFVLEVBQ1Ysb0JBQW9CLEVBRXBCLFNBQVMsRUFDVCxHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFFeEIsNkJBRUM7OztJQURDLDBDQUE4Qzs7Ozs7Ozs7Ozs7Ozs7QUFZaEQsTUFBTSxVQUFVLGFBQWEsQ0FBSSxHQUloQzs7UUFDTywyQkFBMkIsR0FBRyxJQUFJLE9BQU8sRUFFNUM7O1FBQ0csd0JBQXdCLEdBQUcsMkJBQTJCLENBQUMsSUFBSSxDQUMvRCxvQkFBb0IsRUFBRSxDQUN2Qjs7UUFFSyxVQUFVLEdBQUcsd0JBQXdCLENBQUMsSUFBSTtJQUM5Qyw2REFBNkQ7SUFDN0QsU0FBUzs7OztJQUFDLFVBQUMsV0FBVztRQUNwQiwrQkFBK0I7UUFDL0IsNkJBQTZCO1FBQzdCLGtFQUFrRTtRQUNsRSxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7WUFDdkIseURBQXlEO1lBQ3pELEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsbUJBQUEsV0FBVyxFQUFPLENBQUMsQ0FBQztZQUN2RCxrQkFBa0I7WUFDbEIsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2IsMEJBQTBCO1lBQzFCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxpRUFBaUU7UUFDakUsb0dBQW9HO1FBQ3BHLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFYixPQUFPLFdBQVcsQ0FBQyxJQUFJLENBQ3JCLG9CQUFvQixFQUFFLEVBQ3RCLEdBQUcsQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsRUFDbEMsR0FBRzs7O1FBQUMsY0FBTSxPQUFBLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBWixDQUFZLEVBQUMsRUFDdkIsVUFBVTs7OztRQUFDLFVBQUMsQ0FBQztZQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQyxFQUFDLENBQ0g7SUFFRCxPQUFPLG1CQUFBO1FBQ0wsdUJBQXVCOzs7O1FBQXZCLFVBQXdCLEtBQXVDO1lBQzdELDJCQUEyQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQ0QsU0FBUzs7O1FBQVQ7WUFDRSxPQUFPLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQyxDQUFDO0tBQ0YsRUFBaUMsQ0FBQztBQUNyQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRU1QVFksXG4gIE5leHRPYnNlcnZlcixcbiAgT2JzZXJ2YWJsZSxcbiAgU3ViamVjdCxcbiAgU3Vic2NyaWJhYmxlLFxuICBTdWJzY3JpcHRpb24sXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgY2F0Y2hFcnJvcixcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIGZpbHRlcixcbiAgc3dpdGNoTWFwLFxuICB0YXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBDZEF3YXJlPFU+IGV4dGVuZHMgU3Vic2NyaWJhYmxlPFU+IHtcbiAgbmV4dFBvdGVudGlhbE9ic2VydmFibGU6ICh2YWx1ZTogYW55KSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIGNsYXNzIENkQXdhcmVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgYWJzdHJhY3QgY2xhc3MgaG9sZHMgYWxsIHRoZSBzaGFyZWQgbG9naWMgZm9yIHRoZSBwdXNoIHBpcGUgYW5kIHRoZSBsZXQgZGlyZWN0aXZlXG4gKiByZXNwb25zaWJsZSBmb3IgY2hhbmdlIGRldGVjdGlvblxuICogSWYgeW91IGV4dGVuZCB0aGlzIGNsYXNzIHlvdSBuZWVkIHRvIGltcGxlbWVudCBob3cgdGhlIHVwZGF0ZSBvZiB0aGUgcmVuZGVyZWQgdmFsdWUgaGFwcGVucy5cbiAqIEFsc28gY3VzdG9tIGJlaGF2aW91ciBpcyBzb21ldGhpbmcgeW91IG5lZWQgdG8gaW1wbGVtZW50IGluIHRoZSBleHRlbmRpbmcgY2xhc3NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNkQXdhcmU8VT4oY2ZnOiB7XG4gIHJlbmRlcjogKCkgPT4gdm9pZDtcbiAgcmVzZXRDb250ZXh0T2JzZXJ2ZXI6IE5leHRPYnNlcnZlcjx2b2lkPjtcbiAgdXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcjogTmV4dE9ic2VydmVyPFUgfCB1bmRlZmluZWQgfCBudWxsPjtcbn0pOiBDZEF3YXJlPFUgfCB1bmRlZmluZWQgfCBudWxsPiB7XG4gIGNvbnN0IHBvdGVudGlhbE9ic2VydmFibGVzU3ViamVjdCA9IG5ldyBTdWJqZWN0PFxuICAgIE9ic2VydmFibGU8VT4gfCB1bmRlZmluZWQgfCBudWxsXG4gID4oKTtcbiAgY29uc3Qgb2JzZXJ2YWJsZXNGcm9tVGVtcGxhdGUkID0gcG90ZW50aWFsT2JzZXJ2YWJsZXNTdWJqZWN0LnBpcGUoXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICApO1xuXG4gIGNvbnN0IHJlbmRlcmluZyQgPSBvYnNlcnZhYmxlc0Zyb21UZW1wbGF0ZSQucGlwZShcbiAgICAvLyBDb21wb3NlIHRoZSBvYnNlcnZhYmxlcyBmcm9tIHRoZSB0ZW1wbGF0ZSBhbmQgdGhlIHN0cmF0ZWd5XG4gICAgc3dpdGNoTWFwKChvYnNlcnZhYmxlJCkgPT4ge1xuICAgICAgLy8gSWYgdGhlIHBhc3NlZCBvYnNlcnZhYmxlIGlzOlxuICAgICAgLy8gLSB1bmRlZmluZWQgLSBObyB2YWx1ZSBzZXRcbiAgICAgIC8vIC0gbnVsbCAtIG51bGwgcGFzc2VkIGRpcmVjdGx5IG9yIG5vIHZhbHVlIHNldCBvdmVyIGBhc3luY2AgcGlwZVxuICAgICAgaWYgKG9ic2VydmFibGUkID09IG51bGwpIHtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSB2YWx1ZSB0byByZW5kZXJfY3JlYXRvciB3aXRoIG51bGwvdW5kZWZpbmVkXG4gICAgICAgIGNmZy51cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyLm5leHQob2JzZXJ2YWJsZSQgYXMgYW55KTtcbiAgICAgICAgLy8gUmVuZGVyIHRoZSB2aWV3XG4gICAgICAgIGNmZy5yZW5kZXIoKTtcbiAgICAgICAgLy8gU3RvcCBmdXJ0aGVyIHByb2Nlc3NpbmdcbiAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBhIG5ldyBPYnNlcnZhYmxlIGFycml2ZXMsIHJlc2V0IHRoZSB2YWx1ZSB0byByZW5kZXJfY3JlYXRvclxuICAgICAgLy8gV2UgZG8gdGhpcyBiZWNhdXNlIHdlIGRvbid0IGtub3cgd2hlbiB0aGUgbmV4dCB2YWx1ZSBhcnJpdmVzIGFuZCB3YW50IHRvIGdldCByaWQgb2YgdGhlIG9sZCB2YWx1ZVxuICAgICAgY2ZnLnJlc2V0Q29udGV4dE9ic2VydmVyLm5leHQoKTtcbiAgICAgIGNmZy5yZW5kZXIoKTtcblxuICAgICAgcmV0dXJuIG9ic2VydmFibGUkLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIHRhcChjZmcudXBkYXRlVmlld0NvbnRleHRPYnNlcnZlciksXG4gICAgICAgIHRhcCgoKSA9PiBjZmcucmVuZGVyKCkpLFxuICAgICAgICBjYXRjaEVycm9yKChlKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICByZXR1cm4gRU1QVFk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBuZXh0UG90ZW50aWFsT2JzZXJ2YWJsZSh2YWx1ZTogT2JzZXJ2YWJsZTxVPiB8IHVuZGVmaW5lZCB8IG51bGwpOiB2b2lkIHtcbiAgICAgIHBvdGVudGlhbE9ic2VydmFibGVzU3ViamVjdC5uZXh0KHZhbHVlKTtcbiAgICB9LFxuICAgIHN1YnNjcmliZSgpOiBTdWJzY3JpcHRpb24ge1xuICAgICAgcmV0dXJuIHJlbmRlcmluZyQuc3Vic2NyaWJlKCk7XG4gICAgfSxcbiAgfSBhcyBDZEF3YXJlPFUgfCB1bmRlZmluZWQgfCBudWxsPjtcbn1cbiJdfQ==