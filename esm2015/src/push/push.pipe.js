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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQvc3JjL3B1c2gvcHVzaC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUVqQixNQUFNLEVBRU4sSUFBSSxHQUdMLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFJTCxPQUFPLEdBRVIsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNFLE9BQU8sRUFHTCxhQUFhLEVBQ2IsU0FBUyxHQUNWLE1BQU0sU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZDakIsTUFBTSxPQUFPLFFBQVE7Ozs7O0lBNEJuQixZQUFZLEtBQXdCLEVBQUUsTUFBYztRQXpCbkMsa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBa0IsQ0FBQztRQUM5QyxZQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWE7YUFDMUMsWUFBWSxFQUFFO2FBQ2QsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUlmLDhCQUF5QixHQUV0QztZQUNGLElBQUk7Ozs7WUFBRSxDQUFDLEtBQTJCLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsQ0FBQTtTQUNwRSxDQUFDO1FBQ2UseUJBQW9CLEdBQTBCO1lBQzdELElBQUk7Ozs7WUFBRSxDQUFDLEtBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxDQUFBO1NBQzNELENBQUM7UUFDZSwwQkFBcUI7Ozs7O1FBQUcsQ0FDdkMsRUFBNkIsRUFDRixFQUFFLENBQzdCLEVBQUUsQ0FBQyxJQUFJLENBQ0wsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFDNUIsR0FBRzs7OztRQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUN2QixPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixDQUFDLEVBQUMsQ0FDSCxFQUFDO1FBR0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUk7WUFDOUIsSUFBSSxFQUFFLFNBQVMsQ0FBQztnQkFDZCxNQUFNO2dCQUNOLEtBQUs7Z0JBQ0wsT0FBTyxFQUFFLENBQUMsbUJBQUEsS0FBSyxFQUE4QixDQUFDLENBQUMsT0FBTzthQUN2RCxDQUFDO1lBQ0YseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QjtZQUN6RCxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CO1lBQy9DLHFCQUFxQixFQUFFLElBQUksQ0FBQyxxQkFBcUI7U0FDbEQsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQy9DLENBQUM7Ozs7OztJQVFELFNBQVMsQ0FDUCxtQkFBa0UsRUFDbEUsU0FBeUIsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFO1FBRTVDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDdkMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7WUE1REYsSUFBSSxTQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFOzs7O1lBakVyQyxpQkFBaUI7WUFFakIsTUFBTTs7Ozs7OztJQWlFTixpQ0FBNEM7Ozs7O0lBRTVDLGlDQUErRDs7Ozs7SUFDL0QsMkJBRWdDOzs7OztJQUVoQyxnQ0FBOEM7Ozs7O0lBQzlDLDJCQUF3RDs7Ozs7SUFDeEQsNkNBSUU7Ozs7O0lBQ0Ysd0NBRUU7Ozs7O0lBQ0YseUNBUUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgUGlwZSxcbiAgUGlwZVRyYW5zZm9ybSxcbiAgVHlwZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBOZXh0T2JzZXJ2ZXIsXG4gIE9ic2VydmFibGUsXG4gIFBhcnRpYWxPYnNlcnZlcixcbiAgU3ViamVjdCxcbiAgVW5zdWJzY3JpYmFibGUsXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIG1hcCwgd2l0aExhdGVzdEZyb20gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBDZEF3YXJlLFxuICBDb2FsZXNjaW5nQ29uZmlnIGFzIFB1c2hQaXBlQ29uZmlnLFxuICBjcmVhdGVDZEF3YXJlLFxuICBzZXRVcFdvcmssXG59IGZyb20gJy4uL2NvcmUnO1xuXG4vKipcbiAqIEBQaXBlIFB1c2hQaXBlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVGhlIGBuZ3J4UHVzaGAgcGlwZSBzZXJ2ZXMgYXMgYSBkcm9wLWluIHJlcGxhY2VtZW50IGZvciB0aGUgYGFzeW5jYCBwaXBlLlxuICogSXQgY29udGFpbnMgaW50ZWxsaWdlbnQgaGFuZGxpbmcgb2YgY2hhbmdlIGRldGVjdGlvbiB0byBlbmFibGUgdXNcbiAqIHJ1bm5pbmcgaW4gem9uZS1mdWxsIGFzIHdlbGwgYXMgem9uZS1sZXNzIG1vZGUgd2l0aG91dCBhbnkgY2hhbmdlcyB0byB0aGUgY29kZS5cbiAqXG4gKiBUaGUgY3VycmVudCB3YXkgb2YgYmluZGluZyBhbiBvYnNlcnZhYmxlIHRvIHRoZSB2aWV3IGxvb2tzIGxpa2UgdGhhdDpcbiAqICBgYGBodG1sXG4gKiAge3tvYnNlcnZhYmxlJCB8IGFzeW5jfX1cbiAqIDxuZy1jb250YWluZXIgKm5nSWY9XCJvYnNlcnZhYmxlJCB8IGFzeW5jIGFzIG9cIj57e299fTwvbmctY29udGFpbmVyPlxuICogPGNvbXBvbmVudCBbdmFsdWVdPVwib2JzZXJ2YWJsZSQgfCBhc3luY1wiPjwvY29tcG9uZW50PlxuICogYGBgXG4gKlxuICogVGhlIHByb2JsZW0gaXMgYGFzeW5jYCBwaXBlIGp1c3QgbWFya3MgdGhlIGNvbXBvbmVudCBhbmQgYWxsIGl0cyBhbmNlc3RvcnMgYXMgZGlydHkuXG4gKiBJdCBuZWVkcyB6b25lLmpzIG1pY3JvdGFzayBxdWV1ZSB0byBleGhhdXN0IHVudGlsIGBBcHBsaWNhdGlvblJlZi50aWNrYCBpcyBjYWxsZWQgdG8gcmVuZGVyIGFsbCBkaXJ0eSBtYXJrZWQgY29tcG9uZW50cy5cbiAqXG4gKiBIZWF2eSBkeW5hbWljIGFuZCBpbnRlcmFjdGl2ZSBVSXMgc3VmZmVyIGZyb20gem9uZXMgY2hhbmdlIGRldGVjdGlvbiBhIGxvdCBhbmQgY2FuXG4gKiBsZWFuIHRvIGJhZCBwZXJmb3JtYW5jZSBvciBldmVuIHVudXNhYmxlIGFwcGxpY2F0aW9ucywgYnV0IHRoZSBgYXN5bmNgIHBpcGUgZG9lcyBub3Qgd29yayBpbiB6b25lLWxlc3MgbW9kZS5cbiAqXG4gKiBgbmdyeFB1c2hgIHBpcGUgc29sdmVzIHRoYXQgcHJvYmxlbS5cbiAqXG4gKiBJbmNsdWRlZCBGZWF0dXJlczpcbiAqICAtIFRha2Ugb2JzZXJ2YWJsZXMgb3IgcHJvbWlzZXMsIHJldHJpZXZlIHRoZWlyIHZhbHVlcyBhbmQgcmVuZGVyIHRoZSB2YWx1ZSB0byB0aGUgdGVtcGxhdGVcbiAqICAtIEhhbmRsaW5nIG51bGwgYW5kIHVuZGVmaW5lZCB2YWx1ZXMgaW4gYSBjbGVhbiB1bmlmaWVkL3N0cnVjdHVyZWQgd2F5XG4gKiAgLSBUcmlnZ2VycyBjaGFuZ2UtZGV0ZWN0aW9uIGRpZmZlcmVudGx5IGlmIGB6b25lLmpzYCBpcyBwcmVzZW50IG9yIG5vdCAoYGRldGVjdENoYW5nZXNgIG9yIGBtYXJrRm9yQ2hlY2tgKVxuICogIC0gRGlzdGluY3Qgc2FtZSB2YWx1ZXMgaW4gYSByb3cgdG8gaW5jcmVhc2UgcGVyZm9ybWFuY2VcbiAqICAtIENvYWxlc2Npbmcgb2YgY2hhbmdlIGRldGVjdGlvbiBjYWxscyB0byBib29zdCBwZXJmb3JtYW5jZVxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogYG5ncnhQdXNoYCBwaXBlIHNvbHZlcyB0aGF0IHByb2JsZW0uIEl0IGNhbiBiZSB1c2VkIGxpa2Ugc2hvd24gaGVyZTpcbiAqIGBgYGh0bWxcbiAqIHt7b2JzZXJ2YWJsZSQgfCBuZ3J4UHVzaH19XG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwib2JzZXJ2YWJsZSQgfCBuZ3J4UHVzaCBhcyBvXCI+e3tvfX08L25nLWNvbnRhaW5lcj5cbiAqIDxjb21wb25lbnQgW3ZhbHVlXT1cIm9ic2VydmFibGUkIHwgbmdyeFB1c2hcIj48L2NvbXBvbmVudD5cbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQFBpcGUoeyBuYW1lOiAnbmdyeFB1c2gnLCBwdXJlOiBmYWxzZSB9KVxuZXhwb3J0IGNsYXNzIFB1c2hQaXBlPFM+IGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZW5kZXJlZFZhbHVlOiBTIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZ1N1YmplY3QgPSBuZXcgU3ViamVjdDxQdXNoUGlwZUNvbmZpZz4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWckID0gdGhpcy5jb25maWdTdWJqZWN0XG4gICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBzdWJzY3JpcHRpb246IFVuc3Vic2NyaWJhYmxlO1xuICBwcml2YXRlIHJlYWRvbmx5IGNkQXdhcmU6IENkQXdhcmU8UyB8IG51bGwgfCB1bmRlZmluZWQ+O1xuICBwcml2YXRlIHJlYWRvbmx5IHVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXI6IFBhcnRpYWxPYnNlcnZlcjxcbiAgICBTIHwgbnVsbCB8IHVuZGVmaW5lZFxuICA+ID0ge1xuICAgIG5leHQ6ICh2YWx1ZTogUyB8IG51bGwgfCB1bmRlZmluZWQpID0+ICh0aGlzLnJlbmRlcmVkVmFsdWUgPSB2YWx1ZSksXG4gIH07XG4gIHByaXZhdGUgcmVhZG9ubHkgcmVzZXRDb250ZXh0T2JzZXJ2ZXI6IE5leHRPYnNlcnZlcjx1bmtub3duPiA9IHtcbiAgICBuZXh0OiAodmFsdWU6IHVua25vd24pID0+ICh0aGlzLnJlbmRlcmVkVmFsdWUgPSB1bmRlZmluZWQpLFxuICB9O1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZ3VyYWJsZUJlaGF2aW91ciA9IDxUPihcbiAgICBvJDogT2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFQ+PlxuICApOiBPYnNlcnZhYmxlPE9ic2VydmFibGU8VD4+ID0+XG4gICAgbyQucGlwZShcbiAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuY29uZmlnJCksXG4gICAgICBtYXAoKFt2YWx1ZSQsIGNvbmZpZ10pID0+IHtcbiAgICAgICAgcmV0dXJuIHZhbHVlJC5waXBlKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgY29uc3RydWN0b3IoY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLCBuZ1pvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMuY2RBd2FyZSA9IGNyZWF0ZUNkQXdhcmU8Uz4oe1xuICAgICAgd29yazogc2V0VXBXb3JrKHtcbiAgICAgICAgbmdab25lLFxuICAgICAgICBjZFJlZixcbiAgICAgICAgY29udGV4dDogKGNkUmVmIGFzIEVtYmVkZGVkVmlld1JlZjxUeXBlPGFueT4+KS5jb250ZXh0LFxuICAgICAgfSksXG4gICAgICB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiB0aGlzLnVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXIsXG4gICAgICByZXNldENvbnRleHRPYnNlcnZlcjogdGhpcy5yZXNldENvbnRleHRPYnNlcnZlcixcbiAgICAgIGNvbmZpZ3VyYWJsZUJlaGF2aW91cjogdGhpcy5jb25maWd1cmFibGVCZWhhdmlvdXIsXG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmNkQXdhcmUuc3Vic2NyaWJlKCk7XG4gIH1cblxuICB0cmFuc2Zvcm0ocG90ZW50aWFsT2JzZXJ2YWJsZTogbnVsbCwgY29uZmlnPzogUHVzaFBpcGVDb25maWcpOiBudWxsO1xuICB0cmFuc2Zvcm0ocG90ZW50aWFsT2JzZXJ2YWJsZTogdW5kZWZpbmVkLCBjb25maWc/OiBQdXNoUGlwZUNvbmZpZyk6IHVuZGVmaW5lZDtcbiAgdHJhbnNmb3JtKFxuICAgIHBvdGVudGlhbE9ic2VydmFibGU6IE9ic2VydmFibGU8Uz4gfCBQcm9taXNlPFM+LFxuICAgIGNvbmZpZz86IFB1c2hQaXBlQ29uZmlnXG4gICk6IFM7XG4gIHRyYW5zZm9ybShcbiAgICBwb3RlbnRpYWxPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPFM+IHwgUHJvbWlzZTxTPiB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgY29uZmlnOiBQdXNoUGlwZUNvbmZpZyA9IHsgb3B0aW1pemVkOiB0cnVlIH1cbiAgKTogUyB8IG51bGwgfCB1bmRlZmluZWQge1xuICAgIHRoaXMuY29uZmlnU3ViamVjdC5uZXh0KGNvbmZpZyk7XG4gICAgdGhpcy5jZEF3YXJlLm5leHQocG90ZW50aWFsT2JzZXJ2YWJsZSk7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyZWRWYWx1ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==