var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
/**
 * @fileoverview added by tsickle
 * Generated from: src/push/push.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, NgZone, Pipe, } from '@angular/core';
import { Subject, } from 'rxjs';
import { distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';
import { createCdAware, setUpWork, } from '../core';
/**
 * \@Pipe PushPipe
 *
 * \@description
 *
 * The `ngrxPush` pipe serves as a drop-in replacement for the `async` pipe.
 * It contains intelligent handling of change detection to enable us
 * running in zone-full as well as zone-less mode without any changes to the code.
 *
 * The current way of binding an observable to the view looks like that:
 *  ```html
 *  {{observable$ | async}}
 * <ng-container *ngIf="observable$ | async as o">{{o}}</ng-container>
 * <component [value]="observable$ | async"></component>
 * ```
 *
 * The problem is `async` pipe just marks the component and all its ancestors as dirty.
 * It needs zone.js microtask queue to exhaust until `ApplicationRef.tick` is called to render all dirty marked components.
 *
 * Heavy dynamic and interactive UIs suffer from zones change detection a lot and can
 * lean to bad performance or even unusable applications, but the `async` pipe does not work in zone-less mode.
 *
 * `ngrxPush` pipe solves that problem.
 *
 * Included Features:
 *  - Take observables or promises, retrieve their values and render the value to the template
 *  - Handling null and undefined values in a clean unified/structured way
 *  - Triggers change-detection differently if `zone.js` is present or not (`detectChanges` or `markForCheck`)
 *  - Distinct same values in a row to increase performance
 *  - Coalescing of change detection calls to boost performance
 *
 * \@usageNotes
 *
 * `ngrxPush` pipe solves that problem. It can be used like shown here:
 * ```html
 * {{observable$ | ngrxPush}}
 * <ng-container *ngIf="observable$ | ngrxPush as o">{{o}}</ng-container>
 * <component [value]="observable$ | ngrxPush"></component>
 * ```
 *
 * \@publicApi
 * @template S
 */
var PushPipe = /** @class */ (function () {
    function PushPipe(cdRef, ngZone) {
        var _this = this;
        this.configSubject = new Subject();
        this.config$ = this.configSubject
            .asObservable()
            .pipe(distinctUntilChanged());
        this.updateViewContextObserver = {
            next: (/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return (_this.renderedValue = value); }),
        };
        this.resetContextObserver = {
            next: (/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return (_this.renderedValue = undefined); }),
        };
        this.configurableBehaviour = (/**
         * @template T
         * @param {?} o$
         * @return {?}
         */
        function (o$) {
            return o$.pipe(withLatestFrom(_this.config$), map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), value$ = _b[0], config = _b[1];
                return value$.pipe();
            })));
        });
        this.cdAware = createCdAware({
            work: setUpWork({
                ngZone: ngZone,
                cdRef: cdRef,
                context: ((/** @type {?} */ (cdRef))).context,
            }),
            updateViewContextObserver: this.updateViewContextObserver,
            resetContextObserver: this.resetContextObserver,
            configurableBehaviour: this.configurableBehaviour,
        });
        this.subscription = this.cdAware.subscribe();
    }
    /**
     * @param {?} potentialObservable
     * @param {?=} config
     * @return {?}
     */
    PushPipe.prototype.transform = /**
     * @param {?} potentialObservable
     * @param {?=} config
     * @return {?}
     */
    function (potentialObservable, config) {
        if (config === void 0) { config = { optimized: true }; }
        this.configSubject.next(config);
        this.cdAware.next(potentialObservable);
        return this.renderedValue;
    };
    /**
     * @return {?}
     */
    PushPipe.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
    PushPipe.decorators = [
        { type: Pipe, args: [{ name: 'ngrxPush', pure: false },] }
    ];
    /** @nocollapse */
    PushPipe.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    return PushPipe;
}());
export { PushPipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.renderedValue;
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.configSubject;
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.config$;
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.cdAware;
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.updateViewContextObserver;
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.resetContextObserver;
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.configurableBehaviour;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ncngvY29tcG9uZW50LyIsInNvdXJjZXMiOlsic3JjL3B1c2gvcHVzaC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFFakIsTUFBTSxFQUVOLElBQUksR0FHTCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBSUwsT0FBTyxHQUVSLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUFFLG9CQUFvQixFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzRSxPQUFPLEVBR0wsYUFBYSxFQUNiLFNBQVMsR0FDVixNQUFNLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0Q2pCO0lBNkJFLGtCQUFZLEtBQXdCLEVBQUUsTUFBYztRQUFwRCxpQkFZQztRQXJDZ0Isa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBa0IsQ0FBQztRQUM5QyxZQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWE7YUFDMUMsWUFBWSxFQUFFO2FBQ2QsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUlmLDhCQUF5QixHQUV0QztZQUNGLElBQUk7Ozs7WUFBRSxVQUFDLEtBQTJCLElBQUssT0FBQSxDQUFDLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLEVBQTVCLENBQTRCLENBQUE7U0FDcEUsQ0FBQztRQUNlLHlCQUFvQixHQUEwQjtZQUM3RCxJQUFJOzs7O1lBQUUsVUFBQyxLQUFjLElBQUssT0FBQSxDQUFDLEtBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQWhDLENBQWdDLENBQUE7U0FDM0QsQ0FBQztRQUNlLDBCQUFxQjs7Ozs7UUFBRyxVQUN2QyxFQUE2QjtZQUU3QixPQUFBLEVBQUUsQ0FBQyxJQUFJLENBQ0wsY0FBYyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsRUFDNUIsR0FBRzs7OztZQUFDLFVBQUMsRUFBZ0I7b0JBQWhCLGtCQUFnQixFQUFmLGNBQU0sRUFBRSxjQUFNO2dCQUNsQixPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QixDQUFDLEVBQUMsQ0FDSDtRQUxELENBS0MsRUFBQztRQUdGLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFJO1lBQzlCLElBQUksRUFBRSxTQUFTLENBQUM7Z0JBQ2QsTUFBTSxRQUFBO2dCQUNOLEtBQUssT0FBQTtnQkFDTCxPQUFPLEVBQUUsQ0FBQyxtQkFBQSxLQUFLLEVBQThCLENBQUMsQ0FBQyxPQUFPO2FBQ3ZELENBQUM7WUFDRix5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCO1lBQ3pELG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0I7WUFDL0MscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQjtTQUNsRCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDL0MsQ0FBQzs7Ozs7O0lBUUQsNEJBQVM7Ozs7O0lBQVQsVUFDRSxtQkFBa0UsRUFDbEUsTUFBNEM7UUFBNUMsdUJBQUEsRUFBQSxXQUEyQixTQUFTLEVBQUUsSUFBSSxFQUFFO1FBRTVDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDdkMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCw4QkFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7O2dCQTVERixJQUFJLFNBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7Ozs7Z0JBakVyQyxpQkFBaUI7Z0JBRWpCLE1BQU07O0lBNEhSLGVBQUM7Q0FBQSxBQTdERCxJQTZEQztTQTVEWSxRQUFROzs7Ozs7SUFDbkIsaUNBQTRDOzs7OztJQUU1QyxpQ0FBK0Q7Ozs7O0lBQy9ELDJCQUVnQzs7Ozs7SUFFaEMsZ0NBQThDOzs7OztJQUM5QywyQkFBd0Q7Ozs7O0lBQ3hELDZDQUlFOzs7OztJQUNGLHdDQUVFOzs7OztJQUNGLHlDQVFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIFBpcGUsXG4gIFBpcGVUcmFuc2Zvcm0sXG4gIFR5cGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTmV4dE9ic2VydmVyLFxuICBPYnNlcnZhYmxlLFxuICBQYXJ0aWFsT2JzZXJ2ZXIsXG4gIFN1YmplY3QsXG4gIFVuc3Vic2NyaWJhYmxlLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHdpdGhMYXRlc3RGcm9tIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQ2RBd2FyZSxcbiAgQ29hbGVzY2luZ0NvbmZpZyBhcyBQdXNoUGlwZUNvbmZpZyxcbiAgY3JlYXRlQ2RBd2FyZSxcbiAgc2V0VXBXb3JrLFxufSBmcm9tICcuLi9jb3JlJztcblxuLyoqXG4gKiBAUGlwZSBQdXNoUGlwZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRoZSBgbmdyeFB1c2hgIHBpcGUgc2VydmVzIGFzIGEgZHJvcC1pbiByZXBsYWNlbWVudCBmb3IgdGhlIGBhc3luY2AgcGlwZS5cbiAqIEl0IGNvbnRhaW5zIGludGVsbGlnZW50IGhhbmRsaW5nIG9mIGNoYW5nZSBkZXRlY3Rpb24gdG8gZW5hYmxlIHVzXG4gKiBydW5uaW5nIGluIHpvbmUtZnVsbCBhcyB3ZWxsIGFzIHpvbmUtbGVzcyBtb2RlIHdpdGhvdXQgYW55IGNoYW5nZXMgdG8gdGhlIGNvZGUuXG4gKlxuICogVGhlIGN1cnJlbnQgd2F5IG9mIGJpbmRpbmcgYW4gb2JzZXJ2YWJsZSB0byB0aGUgdmlldyBsb29rcyBsaWtlIHRoYXQ6XG4gKiAgYGBgaHRtbFxuICogIHt7b2JzZXJ2YWJsZSQgfCBhc3luY319XG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwib2JzZXJ2YWJsZSQgfCBhc3luYyBhcyBvXCI+e3tvfX08L25nLWNvbnRhaW5lcj5cbiAqIDxjb21wb25lbnQgW3ZhbHVlXT1cIm9ic2VydmFibGUkIHwgYXN5bmNcIj48L2NvbXBvbmVudD5cbiAqIGBgYFxuICpcbiAqIFRoZSBwcm9ibGVtIGlzIGBhc3luY2AgcGlwZSBqdXN0IG1hcmtzIHRoZSBjb21wb25lbnQgYW5kIGFsbCBpdHMgYW5jZXN0b3JzIGFzIGRpcnR5LlxuICogSXQgbmVlZHMgem9uZS5qcyBtaWNyb3Rhc2sgcXVldWUgdG8gZXhoYXVzdCB1bnRpbCBgQXBwbGljYXRpb25SZWYudGlja2AgaXMgY2FsbGVkIHRvIHJlbmRlciBhbGwgZGlydHkgbWFya2VkIGNvbXBvbmVudHMuXG4gKlxuICogSGVhdnkgZHluYW1pYyBhbmQgaW50ZXJhY3RpdmUgVUlzIHN1ZmZlciBmcm9tIHpvbmVzIGNoYW5nZSBkZXRlY3Rpb24gYSBsb3QgYW5kIGNhblxuICogbGVhbiB0byBiYWQgcGVyZm9ybWFuY2Ugb3IgZXZlbiB1bnVzYWJsZSBhcHBsaWNhdGlvbnMsIGJ1dCB0aGUgYGFzeW5jYCBwaXBlIGRvZXMgbm90IHdvcmsgaW4gem9uZS1sZXNzIG1vZGUuXG4gKlxuICogYG5ncnhQdXNoYCBwaXBlIHNvbHZlcyB0aGF0IHByb2JsZW0uXG4gKlxuICogSW5jbHVkZWQgRmVhdHVyZXM6XG4gKiAgLSBUYWtlIG9ic2VydmFibGVzIG9yIHByb21pc2VzLCByZXRyaWV2ZSB0aGVpciB2YWx1ZXMgYW5kIHJlbmRlciB0aGUgdmFsdWUgdG8gdGhlIHRlbXBsYXRlXG4gKiAgLSBIYW5kbGluZyBudWxsIGFuZCB1bmRlZmluZWQgdmFsdWVzIGluIGEgY2xlYW4gdW5pZmllZC9zdHJ1Y3R1cmVkIHdheVxuICogIC0gVHJpZ2dlcnMgY2hhbmdlLWRldGVjdGlvbiBkaWZmZXJlbnRseSBpZiBgem9uZS5qc2AgaXMgcHJlc2VudCBvciBub3QgKGBkZXRlY3RDaGFuZ2VzYCBvciBgbWFya0ZvckNoZWNrYClcbiAqICAtIERpc3RpbmN0IHNhbWUgdmFsdWVzIGluIGEgcm93IHRvIGluY3JlYXNlIHBlcmZvcm1hbmNlXG4gKiAgLSBDb2FsZXNjaW5nIG9mIGNoYW5nZSBkZXRlY3Rpb24gY2FsbHMgdG8gYm9vc3QgcGVyZm9ybWFuY2VcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIGBuZ3J4UHVzaGAgcGlwZSBzb2x2ZXMgdGhhdCBwcm9ibGVtLiBJdCBjYW4gYmUgdXNlZCBsaWtlIHNob3duIGhlcmU6XG4gKiBgYGBodG1sXG4gKiB7e29ic2VydmFibGUkIHwgbmdyeFB1c2h9fVxuICogPG5nLWNvbnRhaW5lciAqbmdJZj1cIm9ic2VydmFibGUkIHwgbmdyeFB1c2ggYXMgb1wiPnt7b319PC9uZy1jb250YWluZXI+XG4gKiA8Y29tcG9uZW50IFt2YWx1ZV09XCJvYnNlcnZhYmxlJCB8IG5ncnhQdXNoXCI+PC9jb21wb25lbnQ+XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBQaXBlKHsgbmFtZTogJ25ncnhQdXNoJywgcHVyZTogZmFsc2UgfSlcbmV4cG9ydCBjbGFzcyBQdXNoUGlwZTxTPiBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0sIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVuZGVyZWRWYWx1ZTogUyB8IG51bGwgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWdTdWJqZWN0ID0gbmV3IFN1YmplY3Q8UHVzaFBpcGVDb25maWc+KCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnJCA9IHRoaXMuY29uZmlnU3ViamVjdFxuICAgIC5hc09ic2VydmFibGUoKVxuICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgc3Vic2NyaXB0aW9uOiBVbnN1YnNjcmliYWJsZTtcbiAgcHJpdmF0ZSByZWFkb25seSBjZEF3YXJlOiBDZEF3YXJlPFMgfCBudWxsIHwgdW5kZWZpbmVkPjtcbiAgcHJpdmF0ZSByZWFkb25seSB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiBQYXJ0aWFsT2JzZXJ2ZXI8XG4gICAgUyB8IG51bGwgfCB1bmRlZmluZWRcbiAgPiA9IHtcbiAgICBuZXh0OiAodmFsdWU6IFMgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiAodGhpcy5yZW5kZXJlZFZhbHVlID0gdmFsdWUpLFxuICB9O1xuICBwcml2YXRlIHJlYWRvbmx5IHJlc2V0Q29udGV4dE9ic2VydmVyOiBOZXh0T2JzZXJ2ZXI8dW5rbm93bj4gPSB7XG4gICAgbmV4dDogKHZhbHVlOiB1bmtub3duKSA9PiAodGhpcy5yZW5kZXJlZFZhbHVlID0gdW5kZWZpbmVkKSxcbiAgfTtcbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWd1cmFibGVCZWhhdmlvdXIgPSA8VD4oXG4gICAgbyQ6IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxUPj5cbiAgKTogT2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFQ+PiA9PlxuICAgIG8kLnBpcGUoXG4gICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLmNvbmZpZyQpLFxuICAgICAgbWFwKChbdmFsdWUkLCBjb25maWddKSA9PiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSQucGlwZSgpO1xuICAgICAgfSlcbiAgICApO1xuXG4gIGNvbnN0cnVjdG9yKGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgbmdab25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLmNkQXdhcmUgPSBjcmVhdGVDZEF3YXJlPFM+KHtcbiAgICAgIHdvcms6IHNldFVwV29yayh7XG4gICAgICAgIG5nWm9uZSxcbiAgICAgICAgY2RSZWYsXG4gICAgICAgIGNvbnRleHQ6IChjZFJlZiBhcyBFbWJlZGRlZFZpZXdSZWY8VHlwZTxhbnk+PikuY29udGV4dCxcbiAgICAgIH0pLFxuICAgICAgdXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcjogdGhpcy51cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyLFxuICAgICAgcmVzZXRDb250ZXh0T2JzZXJ2ZXI6IHRoaXMucmVzZXRDb250ZXh0T2JzZXJ2ZXIsXG4gICAgICBjb25maWd1cmFibGVCZWhhdmlvdXI6IHRoaXMuY29uZmlndXJhYmxlQmVoYXZpb3VyLFxuICAgIH0pO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5jZEF3YXJlLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgdHJhbnNmb3JtKHBvdGVudGlhbE9ic2VydmFibGU6IG51bGwsIGNvbmZpZz86IFB1c2hQaXBlQ29uZmlnKTogbnVsbDtcbiAgdHJhbnNmb3JtKHBvdGVudGlhbE9ic2VydmFibGU6IHVuZGVmaW5lZCwgY29uZmlnPzogUHVzaFBpcGVDb25maWcpOiB1bmRlZmluZWQ7XG4gIHRyYW5zZm9ybShcbiAgICBwb3RlbnRpYWxPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPFM+IHwgUHJvbWlzZTxTPixcbiAgICBjb25maWc/OiBQdXNoUGlwZUNvbmZpZ1xuICApOiBTO1xuICB0cmFuc2Zvcm0oXG4gICAgcG90ZW50aWFsT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxTPiB8IFByb21pc2U8Uz4gfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgIGNvbmZpZzogUHVzaFBpcGVDb25maWcgPSB7IG9wdGltaXplZDogdHJ1ZSB9XG4gICk6IFMgfCBudWxsIHwgdW5kZWZpbmVkIHtcbiAgICB0aGlzLmNvbmZpZ1N1YmplY3QubmV4dChjb25maWcpO1xuICAgIHRoaXMuY2RBd2FyZS5uZXh0KHBvdGVudGlhbE9ic2VydmFibGUpO1xuICAgIHJldHVybiB0aGlzLnJlbmRlcmVkVmFsdWU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=