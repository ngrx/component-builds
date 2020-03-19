/**
 * @fileoverview added by tsickle
 * Generated from: modules/component/src/push/push.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, NgZone, Pipe, } from '@angular/core';
import { Subject, } from 'rxjs';
import { distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';
import { createCdAware, setUpWork, } from '../core';
/**
 * \@Pipe PushPipe
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
 * ### Examples
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
        this.configSubject = new Subject();
        this.config$ = this.configSubject
            .asObservable()
            .pipe(distinctUntilChanged());
        this.updateViewContextObserver = {
            // assign value that will get returned from the transform function on the next change detection
            next: (/**
             * @param {?} value
             * @return {?}
             */
            (value) => (this.renderedValue = value)),
        };
        this.resetContextObserver = {
            next: (/**
             * @param {?} value
             * @return {?}
             */
            (value) => (this.renderedValue = undefined)),
        };
        this.configurableBehaviour = (/**
         * @template T
         * @param {?} o$
         * @return {?}
         */
        (o$) => o$.pipe(withLatestFrom(this.config$), map((/**
         * @param {?} __0
         * @return {?}
         */
        ([value$, config]) => {
            // As discussed with Brandon we keep it here
            // because in the beta we implement configuration behavior here
            return value$.pipe();
        }))));
        this.cdAware = createCdAware({
            work: setUpWork({
                ngZone,
                cdRef,
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
    transform(potentialObservable, config = { optimized: true }) {
        this.configSubject.next(config);
        this.cdAware.next(potentialObservable);
        return this.renderedValue;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQvc3JjL3B1c2gvcHVzaC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUVqQixNQUFNLEVBRU4sSUFBSSxHQUdMLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFJTCxPQUFPLEdBRVIsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNFLE9BQU8sRUFHTCxhQUFhLEVBQ2IsU0FBUyxHQUNWLE1BQU0sU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4Q2pCLE1BQU0sT0FBTyxRQUFROzs7OztJQStCbkIsWUFBWSxLQUF3QixFQUFFLE1BQWM7UUE1Qm5DLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQWtCLENBQUM7UUFDOUMsWUFBTyxHQUFHLElBQUksQ0FBQyxhQUFhO2FBQzFDLFlBQVksRUFBRTthQUNkLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFJZiw4QkFBeUIsR0FFdEM7O1lBRUYsSUFBSTs7OztZQUFFLENBQUMsS0FBMkIsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxDQUFBO1NBQ3BFLENBQUM7UUFDZSx5QkFBb0IsR0FBMEI7WUFDN0QsSUFBSTs7OztZQUFFLENBQUMsS0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLENBQUE7U0FDM0QsQ0FBQztRQUNlLDBCQUFxQjs7Ozs7UUFBRyxDQUN2QyxFQUE2QixFQUNGLEVBQUUsQ0FDN0IsRUFBRSxDQUFDLElBQUksQ0FDTCxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUM1QixHQUFHOzs7O1FBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFO1lBQ3ZCLDRDQUE0QztZQUM1QywrREFBK0Q7WUFDL0QsT0FBTyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxFQUFDLENBQ0gsRUFBQztRQUdGLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFJO1lBQzlCLElBQUksRUFBRSxTQUFTLENBQUM7Z0JBQ2QsTUFBTTtnQkFDTixLQUFLO2dCQUNMLE9BQU8sRUFBRSxDQUFDLG1CQUFBLEtBQUssRUFBOEIsQ0FBQyxDQUFDLE9BQU87YUFDdkQsQ0FBQztZQUNGLHlCQUF5QixFQUFFLElBQUksQ0FBQyx5QkFBeUI7WUFDekQsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQjtZQUMvQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCO1NBQ2xELENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMvQyxDQUFDOzs7Ozs7SUFRRCxTQUFTLENBQ1AsbUJBQWtFLEVBQ2xFLFNBQXlCLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRTtRQUU1QyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7O1lBL0RGLElBQUksU0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTs7OztZQWxFckMsaUJBQWlCO1lBRWpCLE1BQU07Ozs7Ozs7SUFrRU4saUNBQTRDOzs7OztJQUU1QyxpQ0FBK0Q7Ozs7O0lBQy9ELDJCQUVnQzs7Ozs7SUFFaEMsZ0NBQThDOzs7OztJQUM5QywyQkFBd0Q7Ozs7O0lBQ3hELDZDQUtFOzs7OztJQUNGLHdDQUVFOzs7OztJQUNGLHlDQVVJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIFBpcGUsXG4gIFBpcGVUcmFuc2Zvcm0sXG4gIFR5cGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTmV4dE9ic2VydmVyLFxuICBPYnNlcnZhYmxlLFxuICBQYXJ0aWFsT2JzZXJ2ZXIsXG4gIFN1YmplY3QsXG4gIFVuc3Vic2NyaWJhYmxlLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHdpdGhMYXRlc3RGcm9tIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQ2RBd2FyZSxcbiAgQ29hbGVzY2luZ0NvbmZpZyBhcyBQdXNoUGlwZUNvbmZpZyxcbiAgY3JlYXRlQ2RBd2FyZSxcbiAgc2V0VXBXb3JrLFxufSBmcm9tICcuLi9jb3JlJztcblxuLyoqXG4gKiBAUGlwZSBQdXNoUGlwZVxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVGhlIGBuZ3J4UHVzaGAgcGlwZSBzZXJ2ZXMgYXMgYSBkcm9wLWluIHJlcGxhY2VtZW50IGZvciB0aGUgYGFzeW5jYCBwaXBlLlxuICogSXQgY29udGFpbnMgaW50ZWxsaWdlbnQgaGFuZGxpbmcgb2YgY2hhbmdlIGRldGVjdGlvbiB0byBlbmFibGUgdXNcbiAqIHJ1bm5pbmcgaW4gem9uZS1mdWxsIGFzIHdlbGwgYXMgem9uZS1sZXNzIG1vZGUgd2l0aG91dCBhbnkgY2hhbmdlcyB0byB0aGUgY29kZS5cbiAqXG4gKiBUaGUgY3VycmVudCB3YXkgb2YgYmluZGluZyBhbiBvYnNlcnZhYmxlIHRvIHRoZSB2aWV3IGxvb2tzIGxpa2UgdGhhdDpcbiAqICBgYGBodG1sXG4gKiAge3tvYnNlcnZhYmxlJCB8IGFzeW5jfX1cbiAqIDxuZy1jb250YWluZXIgKm5nSWY9XCJvYnNlcnZhYmxlJCB8IGFzeW5jIGFzIG9cIj57e299fTwvbmctY29udGFpbmVyPlxuICogPGNvbXBvbmVudCBbdmFsdWVdPVwib2JzZXJ2YWJsZSQgfCBhc3luY1wiPjwvY29tcG9uZW50PlxuICogYGBgXG4gKlxuICogVGhlIHByb2JsZW0gaXMgYGFzeW5jYCBwaXBlIGp1c3QgbWFya3MgdGhlIGNvbXBvbmVudCBhbmQgYWxsIGl0cyBhbmNlc3RvcnMgYXMgZGlydHkuXG4gKiBJdCBuZWVkcyB6b25lLmpzIG1pY3JvdGFzayBxdWV1ZSB0byBleGhhdXN0IHVudGlsIGBBcHBsaWNhdGlvblJlZi50aWNrYCBpcyBjYWxsZWQgdG8gcmVuZGVyIGFsbCBkaXJ0eSBtYXJrZWQgY29tcG9uZW50cy5cbiAqXG4gKiBIZWF2eSBkeW5hbWljIGFuZCBpbnRlcmFjdGl2ZSBVSXMgc3VmZmVyIGZyb20gem9uZXMgY2hhbmdlIGRldGVjdGlvbiBhIGxvdCBhbmQgY2FuXG4gKiBsZWFuIHRvIGJhZCBwZXJmb3JtYW5jZSBvciBldmVuIHVudXNhYmxlIGFwcGxpY2F0aW9ucywgYnV0IHRoZSBgYXN5bmNgIHBpcGUgZG9lcyBub3Qgd29yayBpbiB6b25lLWxlc3MgbW9kZS5cbiAqXG4gKiBgbmdyeFB1c2hgIHBpcGUgc29sdmVzIHRoYXQgcHJvYmxlbS5cbiAqXG4gKiBJbmNsdWRlZCBGZWF0dXJlczpcbiAqICAtIFRha2Ugb2JzZXJ2YWJsZXMgb3IgcHJvbWlzZXMsIHJldHJpZXZlIHRoZWlyIHZhbHVlcyBhbmQgcmVuZGVyIHRoZSB2YWx1ZSB0byB0aGUgdGVtcGxhdGVcbiAqICAtIEhhbmRsaW5nIG51bGwgYW5kIHVuZGVmaW5lZCB2YWx1ZXMgaW4gYSBjbGVhbiB1bmlmaWVkL3N0cnVjdHVyZWQgd2F5XG4gKiAgLSBUcmlnZ2VycyBjaGFuZ2UtZGV0ZWN0aW9uIGRpZmZlcmVudGx5IGlmIGB6b25lLmpzYCBpcyBwcmVzZW50IG9yIG5vdCAoYGRldGVjdENoYW5nZXNgIG9yIGBtYXJrRm9yQ2hlY2tgKVxuICogIC0gRGlzdGluY3Qgc2FtZSB2YWx1ZXMgaW4gYSByb3cgdG8gaW5jcmVhc2UgcGVyZm9ybWFuY2VcbiAqICAtIENvYWxlc2Npbmcgb2YgY2hhbmdlIGRldGVjdGlvbiBjYWxscyB0byBib29zdCBwZXJmb3JtYW5jZVxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogIyMjIEV4YW1wbGVzXG4gKlxuICogYG5ncnhQdXNoYCBwaXBlIHNvbHZlcyB0aGF0IHByb2JsZW0uIEl0IGNhbiBiZSB1c2VkIGxpa2Ugc2hvd24gaGVyZTpcbiAqIGBgYGh0bWxcbiAqIHt7b2JzZXJ2YWJsZSQgfCBuZ3J4UHVzaH19XG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwib2JzZXJ2YWJsZSQgfCBuZ3J4UHVzaCBhcyBvXCI+e3tvfX08L25nLWNvbnRhaW5lcj5cbiAqIDxjb21wb25lbnQgW3ZhbHVlXT1cIm9ic2VydmFibGUkIHwgbmdyeFB1c2hcIj48L2NvbXBvbmVudD5cbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQFBpcGUoeyBuYW1lOiAnbmdyeFB1c2gnLCBwdXJlOiBmYWxzZSB9KVxuZXhwb3J0IGNsYXNzIFB1c2hQaXBlPFM+IGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZW5kZXJlZFZhbHVlOiBTIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZ1N1YmplY3QgPSBuZXcgU3ViamVjdDxQdXNoUGlwZUNvbmZpZz4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWckID0gdGhpcy5jb25maWdTdWJqZWN0XG4gICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBzdWJzY3JpcHRpb246IFVuc3Vic2NyaWJhYmxlO1xuICBwcml2YXRlIHJlYWRvbmx5IGNkQXdhcmU6IENkQXdhcmU8UyB8IG51bGwgfCB1bmRlZmluZWQ+O1xuICBwcml2YXRlIHJlYWRvbmx5IHVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXI6IFBhcnRpYWxPYnNlcnZlcjxcbiAgICBTIHwgbnVsbCB8IHVuZGVmaW5lZFxuICA+ID0ge1xuICAgIC8vIGFzc2lnbiB2YWx1ZSB0aGF0IHdpbGwgZ2V0IHJldHVybmVkIGZyb20gdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiBvbiB0aGUgbmV4dCBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAgbmV4dDogKHZhbHVlOiBTIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4gKHRoaXMucmVuZGVyZWRWYWx1ZSA9IHZhbHVlKSxcbiAgfTtcbiAgcHJpdmF0ZSByZWFkb25seSByZXNldENvbnRleHRPYnNlcnZlcjogTmV4dE9ic2VydmVyPHVua25vd24+ID0ge1xuICAgIG5leHQ6ICh2YWx1ZTogdW5rbm93bikgPT4gKHRoaXMucmVuZGVyZWRWYWx1ZSA9IHVuZGVmaW5lZCksXG4gIH07XG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZmlndXJhYmxlQmVoYXZpb3VyID0gPFQ+KFxuICAgIG8kOiBPYnNlcnZhYmxlPE9ic2VydmFibGU8VD4+XG4gICk6IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxUPj4gPT5cbiAgICBvJC5waXBlKFxuICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5jb25maWckKSxcbiAgICAgIG1hcCgoW3ZhbHVlJCwgY29uZmlnXSkgPT4ge1xuICAgICAgICAvLyBBcyBkaXNjdXNzZWQgd2l0aCBCcmFuZG9uIHdlIGtlZXAgaXQgaGVyZVxuICAgICAgICAvLyBiZWNhdXNlIGluIHRoZSBiZXRhIHdlIGltcGxlbWVudCBjb25maWd1cmF0aW9uIGJlaGF2aW9yIGhlcmVcbiAgICAgICAgcmV0dXJuIHZhbHVlJC5waXBlKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgY29uc3RydWN0b3IoY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLCBuZ1pvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMuY2RBd2FyZSA9IGNyZWF0ZUNkQXdhcmU8Uz4oe1xuICAgICAgd29yazogc2V0VXBXb3JrKHtcbiAgICAgICAgbmdab25lLFxuICAgICAgICBjZFJlZixcbiAgICAgICAgY29udGV4dDogKGNkUmVmIGFzIEVtYmVkZGVkVmlld1JlZjxUeXBlPGFueT4+KS5jb250ZXh0LFxuICAgICAgfSksXG4gICAgICB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiB0aGlzLnVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXIsXG4gICAgICByZXNldENvbnRleHRPYnNlcnZlcjogdGhpcy5yZXNldENvbnRleHRPYnNlcnZlcixcbiAgICAgIGNvbmZpZ3VyYWJsZUJlaGF2aW91cjogdGhpcy5jb25maWd1cmFibGVCZWhhdmlvdXIsXG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmNkQXdhcmUuc3Vic2NyaWJlKCk7XG4gIH1cblxuICB0cmFuc2Zvcm0ocG90ZW50aWFsT2JzZXJ2YWJsZTogbnVsbCwgY29uZmlnPzogUHVzaFBpcGVDb25maWcpOiBudWxsO1xuICB0cmFuc2Zvcm0ocG90ZW50aWFsT2JzZXJ2YWJsZTogdW5kZWZpbmVkLCBjb25maWc/OiBQdXNoUGlwZUNvbmZpZyk6IHVuZGVmaW5lZDtcbiAgdHJhbnNmb3JtKFxuICAgIHBvdGVudGlhbE9ic2VydmFibGU6IE9ic2VydmFibGU8Uz4gfCBQcm9taXNlPFM+LFxuICAgIGNvbmZpZz86IFB1c2hQaXBlQ29uZmlnXG4gICk6IFM7XG4gIHRyYW5zZm9ybShcbiAgICBwb3RlbnRpYWxPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPFM+IHwgUHJvbWlzZTxTPiB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgY29uZmlnOiBQdXNoUGlwZUNvbmZpZyA9IHsgb3B0aW1pemVkOiB0cnVlIH1cbiAgKTogUyB8IG51bGwgfCB1bmRlZmluZWQge1xuICAgIHRoaXMuY29uZmlnU3ViamVjdC5uZXh0KGNvbmZpZyk7XG4gICAgdGhpcy5jZEF3YXJlLm5leHQocG90ZW50aWFsT2JzZXJ2YWJsZSk7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyZWRWYWx1ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==