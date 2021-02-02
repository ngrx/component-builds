/**
 * @fileoverview added by tsickle
 * Generated from: src/push/push.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, NgZone, Pipe, } from '@angular/core';
import { createCdAware } from '../core/cd-aware/cd-aware_creator';
import { createRender } from '../core/cd-aware/creator_render';
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
export class PushPipe {
    /**
     * @param {?} cdRef
     * @param {?} ngZone
     */
    constructor(cdRef, ngZone) {
        this.resetContextObserver = {
            next: (/**
             * @return {?}
             */
            () => (this.renderedValue = undefined)),
        };
        this.updateViewContextObserver = {
            next: (/**
             * @param {?} value
             * @return {?}
             */
            (value) => (this.renderedValue = value)),
        };
        this.cdAware = createCdAware({
            render: createRender({ cdRef, ngZone }),
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
    transform(potentialObservable) {
        this.cdAware.nextPotentialObservable(potentialObservable);
        return (/** @type {?} */ (this.renderedValue));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
PushPipe.decorators = [
    { type: Pipe, args: [{ name: 'ngrxPush', pure: false },] }
];
/** @nocollapse */
PushPipe.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgZone }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5waXBlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50LyIsInNvdXJjZXMiOlsic3JjL3B1c2gvcHVzaC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixNQUFNLEVBRU4sSUFBSSxHQUVMLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBVyxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThDL0QsTUFBTSxPQUFPLFFBQVE7Ozs7O0lBY25CLFlBQVksS0FBd0IsRUFBRSxNQUFjO1FBVG5DLHlCQUFvQixHQUF1QjtZQUMxRCxJQUFJOzs7WUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLENBQUE7U0FDN0MsQ0FBQztRQUNlLDhCQUF5QixHQUV0QztZQUNGLElBQUk7Ozs7WUFBRSxDQUFDLEtBQTJCLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsQ0FBQTtTQUNwRSxDQUFDO1FBR0EsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUk7WUFDOUIsTUFBTSxFQUFFLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztZQUN2Qyx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCO1lBQ3pELG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0I7U0FDaEQsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQy9DLENBQUM7Ozs7OztJQUtELFNBQVMsQ0FDUCxtQkFBMEQ7UUFFMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzFELE9BQU8sbUJBQUEsSUFBSSxDQUFDLGFBQWEsRUFBTyxDQUFDO0lBQ25DLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7WUFwQ0YsSUFBSSxTQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFOzs7O1lBdERyQyxpQkFBaUI7WUFDakIsTUFBTTs7Ozs7OztJQXVETixpQ0FBNEM7Ozs7O0lBRTVDLGdDQUE4Qzs7Ozs7SUFDOUMsMkJBQXdEOzs7OztJQUN4RCx3Q0FFRTs7Ozs7SUFDRiw2Q0FJRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgUGlwZSxcbiAgUGlwZVRyYW5zZm9ybSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZXh0T2JzZXJ2ZXIsIE9ic2VydmFibGVJbnB1dCwgVW5zdWJzY3JpYmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2RBd2FyZSwgY3JlYXRlQ2RBd2FyZSB9IGZyb20gJy4uL2NvcmUvY2QtYXdhcmUvY2QtYXdhcmVfY3JlYXRvcic7XG5pbXBvcnQgeyBjcmVhdGVSZW5kZXIgfSBmcm9tICcuLi9jb3JlL2NkLWF3YXJlL2NyZWF0b3JfcmVuZGVyJztcblxuLyoqXG4gKiBAUGlwZSBQdXNoUGlwZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRoZSBgbmdyeFB1c2hgIHBpcGUgc2VydmVzIGFzIGEgZHJvcC1pbiByZXBsYWNlbWVudCBmb3IgdGhlIGBhc3luY2AgcGlwZS5cbiAqIEl0IGNvbnRhaW5zIGludGVsbGlnZW50IGhhbmRsaW5nIG9mIGNoYW5nZSBkZXRlY3Rpb24gdG8gZW5hYmxlIHVzXG4gKiBydW5uaW5nIGluIHpvbmUtZnVsbCBhcyB3ZWxsIGFzIHpvbmUtbGVzcyBtb2RlIHdpdGhvdXQgYW55IGNoYW5nZXMgdG8gdGhlIGNvZGUuXG4gKlxuICogVGhlIGN1cnJlbnQgd2F5IG9mIGJpbmRpbmcgYW4gb2JzZXJ2YWJsZSB0byB0aGUgdmlldyBsb29rcyBsaWtlIHRoYXQ6XG4gKiAgYGBgaHRtbFxuICogIHt7b2JzZXJ2YWJsZSQgfCBhc3luY319XG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwib2JzZXJ2YWJsZSQgfCBhc3luYyBhcyBvXCI+e3tvfX08L25nLWNvbnRhaW5lcj5cbiAqIDxjb21wb25lbnQgW3ZhbHVlXT1cIm9ic2VydmFibGUkIHwgYXN5bmNcIj48L2NvbXBvbmVudD5cbiAqIGBgYFxuICpcbiAqIFRoZSBwcm9ibGVtIGlzIGBhc3luY2AgcGlwZSBqdXN0IG1hcmtzIHRoZSBjb21wb25lbnQgYW5kIGFsbCBpdHMgYW5jZXN0b3JzIGFzIGRpcnR5LlxuICogSXQgbmVlZHMgem9uZS5qcyBtaWNyb3Rhc2sgcXVldWUgdG8gZXhoYXVzdCB1bnRpbCBgQXBwbGljYXRpb25SZWYudGlja2AgaXMgY2FsbGVkIHRvIHJlbmRlcl9jcmVhdG9yIGFsbCBkaXJ0eSBtYXJrZWRcbiAqICAgICBjb21wb25lbnRzLlxuICpcbiAqIEhlYXZ5IGR5bmFtaWMgYW5kIGludGVyYWN0aXZlIFVJcyBzdWZmZXIgZnJvbSB6b25lcyBjaGFuZ2UgZGV0ZWN0aW9uIGEgbG90IGFuZCBjYW5cbiAqIGxlYW4gdG8gYmFkIHBlcmZvcm1hbmNlIG9yIGV2ZW4gdW51c2FibGUgYXBwbGljYXRpb25zLCBidXQgdGhlIGBhc3luY2AgcGlwZSBkb2VzIG5vdCB3b3JrIGluIHpvbmUtbGVzcyBtb2RlLlxuICpcbiAqIGBuZ3J4UHVzaGAgcGlwZSBzb2x2ZXMgdGhhdCBwcm9ibGVtLlxuICpcbiAqIEluY2x1ZGVkIEZlYXR1cmVzOlxuICogIC0gVGFrZSBvYnNlcnZhYmxlcyBvciBwcm9taXNlcywgcmV0cmlldmUgdGhlaXIgdmFsdWVzIGFuZCByZW5kZXJfY3JlYXRvciB0aGUgdmFsdWUgdG8gdGhlIHRlbXBsYXRlXG4gKiAgLSBIYW5kbGluZyBudWxsIGFuZCB1bmRlZmluZWQgdmFsdWVzIGluIGEgY2xlYW4gdW5pZmllZC9zdHJ1Y3R1cmVkIHdheVxuICogIC0gVHJpZ2dlcnMgY2hhbmdlLWRldGVjdGlvbiBkaWZmZXJlbnRseSBpZiBgem9uZS5qc2AgaXMgcHJlc2VudCBvciBub3QgKGBkZXRlY3RDaGFuZ2VzYCBvciBgbWFya0ZvckNoZWNrYClcbiAqICAtIERpc3RpbmN0IHNhbWUgdmFsdWVzIGluIGEgcm93IHRvIGluY3JlYXNlIHBlcmZvcm1hbmNlXG4gKiAgLSBDb2FsZXNjaW5nIG9mIGNoYW5nZSBkZXRlY3Rpb24gY2FsbHMgdG8gYm9vc3QgcGVyZm9ybWFuY2VcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIGBuZ3J4UHVzaGAgcGlwZSBzb2x2ZXMgdGhhdCBwcm9ibGVtLiBJdCBjYW4gYmUgdXNlZCBsaWtlIHNob3duIGhlcmU6XG4gKiBgYGBodG1sXG4gKiB7e29ic2VydmFibGUkIHwgbmdyeFB1c2h9fVxuICogPG5nLWNvbnRhaW5lciAqbmdJZj1cIm9ic2VydmFibGUkIHwgbmdyeFB1c2ggYXMgb1wiPnt7b319PC9uZy1jb250YWluZXI+XG4gKiA8Y29tcG9uZW50IFt2YWx1ZV09XCJvYnNlcnZhYmxlJCB8IG5ncnhQdXNoXCI+PC9jb21wb25lbnQ+XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBQaXBlKHsgbmFtZTogJ25ncnhQdXNoJywgcHVyZTogZmFsc2UgfSlcbmV4cG9ydCBjbGFzcyBQdXNoUGlwZTxTPiBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0sIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVuZGVyZWRWYWx1ZTogUyB8IG51bGwgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBzdWJzY3JpcHRpb246IFVuc3Vic2NyaWJhYmxlO1xuICBwcml2YXRlIHJlYWRvbmx5IGNkQXdhcmU6IENkQXdhcmU8UyB8IG51bGwgfCB1bmRlZmluZWQ+O1xuICBwcml2YXRlIHJlYWRvbmx5IHJlc2V0Q29udGV4dE9ic2VydmVyOiBOZXh0T2JzZXJ2ZXI8dm9pZD4gPSB7XG4gICAgbmV4dDogKCkgPT4gKHRoaXMucmVuZGVyZWRWYWx1ZSA9IHVuZGVmaW5lZCksXG4gIH07XG4gIHByaXZhdGUgcmVhZG9ubHkgdXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcjogTmV4dE9ic2VydmVyPFxuICAgIFMgfCBudWxsIHwgdW5kZWZpbmVkXG4gID4gPSB7XG4gICAgbmV4dDogKHZhbHVlOiBTIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4gKHRoaXMucmVuZGVyZWRWYWx1ZSA9IHZhbHVlKSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIG5nWm9uZTogTmdab25lKSB7XG4gICAgdGhpcy5jZEF3YXJlID0gY3JlYXRlQ2RBd2FyZTxTPih7XG4gICAgICByZW5kZXI6IGNyZWF0ZVJlbmRlcih7IGNkUmVmLCBuZ1pvbmUgfSksXG4gICAgICB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiB0aGlzLnVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXIsXG4gICAgICByZXNldENvbnRleHRPYnNlcnZlcjogdGhpcy5yZXNldENvbnRleHRPYnNlcnZlcixcbiAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuY2RBd2FyZS5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHRyYW5zZm9ybTxUPihwb3RlbnRpYWxPYnNlcnZhYmxlOiBudWxsKTogbnVsbDtcbiAgdHJhbnNmb3JtPFQ+KHBvdGVudGlhbE9ic2VydmFibGU6IHVuZGVmaW5lZCk6IHVuZGVmaW5lZDtcbiAgdHJhbnNmb3JtPFQ+KHBvdGVudGlhbE9ic2VydmFibGU6IE9ic2VydmFibGVJbnB1dDxUPik6IFQgfCB1bmRlZmluZWQ7XG4gIHRyYW5zZm9ybTxUPihcbiAgICBwb3RlbnRpYWxPYnNlcnZhYmxlOiBPYnNlcnZhYmxlSW5wdXQ8VD4gfCBudWxsIHwgdW5kZWZpbmVkXG4gICk6IFQgfCBudWxsIHwgdW5kZWZpbmVkIHtcbiAgICB0aGlzLmNkQXdhcmUubmV4dFBvdGVudGlhbE9ic2VydmFibGUocG90ZW50aWFsT2JzZXJ2YWJsZSk7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyZWRWYWx1ZSBhcyBhbnk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=