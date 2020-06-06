/**
 * @fileoverview added by tsickle
 * Generated from: src/push/push.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, NgZone, Pipe, } from '@angular/core';
import { createCdAware, createRender } from '../core';
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
 * It needs zone.js microtask queue to exhaust until `ApplicationRef.tick` is called to render_creator all dirty marked
 *     components.
 *
 * Heavy dynamic and interactive UIs suffer from zones change detection a lot and can
 * lean to bad performance or even unusable applications, but the `async` pipe does not work in zone-less mode.
 *
 * `ngrxPush` pipe solves that problem.
 *
 * Included Features:
 *  - Take observables or promises, retrieve their values and render_creator the value to the template
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
        this.resetContextObserver = {
            next: (/**
             * @return {?}
             */
            function () { return (_this.renderedValue = undefined); }),
        };
        this.updateViewContextObserver = {
            next: (/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return (_this.renderedValue = value); }),
        };
        this.cdAware = createCdAware({
            render: createRender({ cdRef: cdRef, ngZone: ngZone }),
            updateViewContextObserver: this.updateViewContextObserver,
            resetContextObserver: this.resetContextObserver,
        });
        this.subscription = this.cdAware.subscribe();
    }
    /**
     * @template T
     * @param {?} potentialObservable
     * @return {?}
     */
    PushPipe.prototype.transform = /**
     * @template T
     * @param {?} potentialObservable
     * @return {?}
     */
    function (potentialObservable) {
        this.cdAware.nextPotentialObservable(potentialObservable);
        return (/** @type {?} */ (this.renderedValue));
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
    PushPipe.prototype.resetContextObserver;
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.updateViewContextObserver;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ncngvY29tcG9uZW50LyIsInNvdXJjZXMiOlsic3JjL3B1c2gvcHVzaC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixNQUFNLEVBRU4sSUFBSSxHQUVMLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBVyxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2Qy9EO0lBZUUsa0JBQVksS0FBd0IsRUFBRSxNQUFjO1FBQXBELGlCQU9DO1FBaEJnQix5QkFBb0IsR0FBdUI7WUFDMUQsSUFBSTs7O1lBQUUsY0FBTSxPQUFBLENBQUMsS0FBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQTtTQUM3QyxDQUFDO1FBQ2UsOEJBQXlCLEdBRXRDO1lBQ0YsSUFBSTs7OztZQUFFLFVBQUMsS0FBMkIsSUFBSyxPQUFBLENBQUMsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsRUFBNUIsQ0FBNEIsQ0FBQTtTQUNwRSxDQUFDO1FBR0EsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUk7WUFDOUIsTUFBTSxFQUFFLFlBQVksQ0FBQyxFQUFFLEtBQUssT0FBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUM7WUFDdkMseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QjtZQUN6RCxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CO1NBQ2hELENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMvQyxDQUFDOzs7Ozs7SUFLRCw0QkFBUzs7Ozs7SUFBVCxVQUNFLG1CQUEwRDtRQUUxRCxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDMUQsT0FBTyxtQkFBQSxJQUFJLENBQUMsYUFBYSxFQUFPLENBQUM7SUFDbkMsQ0FBQzs7OztJQUVELDhCQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7Z0JBcENGLElBQUksU0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTs7OztnQkFwRHJDLGlCQUFpQjtnQkFDakIsTUFBTTs7SUF3RlIsZUFBQztDQUFBLEFBckNELElBcUNDO1NBcENZLFFBQVE7Ozs7OztJQUNuQixpQ0FBNEM7Ozs7O0lBRTVDLGdDQUE4Qzs7Ozs7SUFDOUMsMkJBQXdEOzs7OztJQUN4RCx3Q0FFRTs7Ozs7SUFDRiw2Q0FJRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgUGlwZSxcbiAgUGlwZVRyYW5zZm9ybSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZXh0T2JzZXJ2ZXIsIE9ic2VydmFibGVJbnB1dCwgVW5zdWJzY3JpYmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENkQXdhcmUsIGNyZWF0ZUNkQXdhcmUsIGNyZWF0ZVJlbmRlciB9IGZyb20gJy4uL2NvcmUnO1xuXG4vKipcbiAqIEBQaXBlIFB1c2hQaXBlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVGhlIGBuZ3J4UHVzaGAgcGlwZSBzZXJ2ZXMgYXMgYSBkcm9wLWluIHJlcGxhY2VtZW50IGZvciB0aGUgYGFzeW5jYCBwaXBlLlxuICogSXQgY29udGFpbnMgaW50ZWxsaWdlbnQgaGFuZGxpbmcgb2YgY2hhbmdlIGRldGVjdGlvbiB0byBlbmFibGUgdXNcbiAqIHJ1bm5pbmcgaW4gem9uZS1mdWxsIGFzIHdlbGwgYXMgem9uZS1sZXNzIG1vZGUgd2l0aG91dCBhbnkgY2hhbmdlcyB0byB0aGUgY29kZS5cbiAqXG4gKiBUaGUgY3VycmVudCB3YXkgb2YgYmluZGluZyBhbiBvYnNlcnZhYmxlIHRvIHRoZSB2aWV3IGxvb2tzIGxpa2UgdGhhdDpcbiAqICBgYGBodG1sXG4gKiAge3tvYnNlcnZhYmxlJCB8IGFzeW5jfX1cbiAqIDxuZy1jb250YWluZXIgKm5nSWY9XCJvYnNlcnZhYmxlJCB8IGFzeW5jIGFzIG9cIj57e299fTwvbmctY29udGFpbmVyPlxuICogPGNvbXBvbmVudCBbdmFsdWVdPVwib2JzZXJ2YWJsZSQgfCBhc3luY1wiPjwvY29tcG9uZW50PlxuICogYGBgXG4gKlxuICogVGhlIHByb2JsZW0gaXMgYGFzeW5jYCBwaXBlIGp1c3QgbWFya3MgdGhlIGNvbXBvbmVudCBhbmQgYWxsIGl0cyBhbmNlc3RvcnMgYXMgZGlydHkuXG4gKiBJdCBuZWVkcyB6b25lLmpzIG1pY3JvdGFzayBxdWV1ZSB0byBleGhhdXN0IHVudGlsIGBBcHBsaWNhdGlvblJlZi50aWNrYCBpcyBjYWxsZWQgdG8gcmVuZGVyX2NyZWF0b3IgYWxsIGRpcnR5IG1hcmtlZFxuICogICAgIGNvbXBvbmVudHMuXG4gKlxuICogSGVhdnkgZHluYW1pYyBhbmQgaW50ZXJhY3RpdmUgVUlzIHN1ZmZlciBmcm9tIHpvbmVzIGNoYW5nZSBkZXRlY3Rpb24gYSBsb3QgYW5kIGNhblxuICogbGVhbiB0byBiYWQgcGVyZm9ybWFuY2Ugb3IgZXZlbiB1bnVzYWJsZSBhcHBsaWNhdGlvbnMsIGJ1dCB0aGUgYGFzeW5jYCBwaXBlIGRvZXMgbm90IHdvcmsgaW4gem9uZS1sZXNzIG1vZGUuXG4gKlxuICogYG5ncnhQdXNoYCBwaXBlIHNvbHZlcyB0aGF0IHByb2JsZW0uXG4gKlxuICogSW5jbHVkZWQgRmVhdHVyZXM6XG4gKiAgLSBUYWtlIG9ic2VydmFibGVzIG9yIHByb21pc2VzLCByZXRyaWV2ZSB0aGVpciB2YWx1ZXMgYW5kIHJlbmRlcl9jcmVhdG9yIHRoZSB2YWx1ZSB0byB0aGUgdGVtcGxhdGVcbiAqICAtIEhhbmRsaW5nIG51bGwgYW5kIHVuZGVmaW5lZCB2YWx1ZXMgaW4gYSBjbGVhbiB1bmlmaWVkL3N0cnVjdHVyZWQgd2F5XG4gKiAgLSBUcmlnZ2VycyBjaGFuZ2UtZGV0ZWN0aW9uIGRpZmZlcmVudGx5IGlmIGB6b25lLmpzYCBpcyBwcmVzZW50IG9yIG5vdCAoYGRldGVjdENoYW5nZXNgIG9yIGBtYXJrRm9yQ2hlY2tgKVxuICogIC0gRGlzdGluY3Qgc2FtZSB2YWx1ZXMgaW4gYSByb3cgdG8gaW5jcmVhc2UgcGVyZm9ybWFuY2VcbiAqICAtIENvYWxlc2Npbmcgb2YgY2hhbmdlIGRldGVjdGlvbiBjYWxscyB0byBib29zdCBwZXJmb3JtYW5jZVxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogYG5ncnhQdXNoYCBwaXBlIHNvbHZlcyB0aGF0IHByb2JsZW0uIEl0IGNhbiBiZSB1c2VkIGxpa2Ugc2hvd24gaGVyZTpcbiAqIGBgYGh0bWxcbiAqIHt7b2JzZXJ2YWJsZSQgfCBuZ3J4UHVzaH19XG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwib2JzZXJ2YWJsZSQgfCBuZ3J4UHVzaCBhcyBvXCI+e3tvfX08L25nLWNvbnRhaW5lcj5cbiAqIDxjb21wb25lbnQgW3ZhbHVlXT1cIm9ic2VydmFibGUkIHwgbmdyeFB1c2hcIj48L2NvbXBvbmVudD5cbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQFBpcGUoeyBuYW1lOiAnbmdyeFB1c2gnLCBwdXJlOiBmYWxzZSB9KVxuZXhwb3J0IGNsYXNzIFB1c2hQaXBlPFM+IGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZW5kZXJlZFZhbHVlOiBTIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIHJlYWRvbmx5IHN1YnNjcmlwdGlvbjogVW5zdWJzY3JpYmFibGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgY2RBd2FyZTogQ2RBd2FyZTxTIHwgbnVsbCB8IHVuZGVmaW5lZD47XG4gIHByaXZhdGUgcmVhZG9ubHkgcmVzZXRDb250ZXh0T2JzZXJ2ZXI6IE5leHRPYnNlcnZlcjx2b2lkPiA9IHtcbiAgICBuZXh0OiAoKSA9PiAodGhpcy5yZW5kZXJlZFZhbHVlID0gdW5kZWZpbmVkKSxcbiAgfTtcbiAgcHJpdmF0ZSByZWFkb25seSB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiBOZXh0T2JzZXJ2ZXI8XG4gICAgUyB8IG51bGwgfCB1bmRlZmluZWRcbiAgPiA9IHtcbiAgICBuZXh0OiAodmFsdWU6IFMgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiAodGhpcy5yZW5kZXJlZFZhbHVlID0gdmFsdWUpLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgbmdab25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLmNkQXdhcmUgPSBjcmVhdGVDZEF3YXJlPFM+KHtcbiAgICAgIHJlbmRlcjogY3JlYXRlUmVuZGVyKHsgY2RSZWYsIG5nWm9uZSB9KSxcbiAgICAgIHVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXI6IHRoaXMudXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcixcbiAgICAgIHJlc2V0Q29udGV4dE9ic2VydmVyOiB0aGlzLnJlc2V0Q29udGV4dE9ic2VydmVyLFxuICAgIH0pO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5jZEF3YXJlLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgdHJhbnNmb3JtPFQ+KHBvdGVudGlhbE9ic2VydmFibGU6IG51bGwpOiBudWxsO1xuICB0cmFuc2Zvcm08VD4ocG90ZW50aWFsT2JzZXJ2YWJsZTogdW5kZWZpbmVkKTogdW5kZWZpbmVkO1xuICB0cmFuc2Zvcm08VD4ocG90ZW50aWFsT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZUlucHV0PFQ+KTogVDtcbiAgdHJhbnNmb3JtPFQ+KFxuICAgIHBvdGVudGlhbE9ic2VydmFibGU6IE9ic2VydmFibGVJbnB1dDxUPiB8IG51bGwgfCB1bmRlZmluZWRcbiAgKTogVCB8IG51bGwgfCB1bmRlZmluZWQge1xuICAgIHRoaXMuY2RBd2FyZS5uZXh0UG90ZW50aWFsT2JzZXJ2YWJsZShwb3RlbnRpYWxPYnNlcnZhYmxlKTtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJlZFZhbHVlIGFzIGFueTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==