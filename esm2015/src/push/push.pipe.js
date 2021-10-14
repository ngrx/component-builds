import { ChangeDetectorRef, ErrorHandler, NgZone, Pipe, } from '@angular/core';
import { createCdAware } from '../core/cd-aware/cd-aware_creator';
import { createRender } from '../core/cd-aware/creator_render';
/**
 * @Pipe PushPipe
 *
 * @description
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
 * @usageNotes
 *
 * `ngrxPush` pipe solves that problem. It can be used like shown here:
 * ```html
 * {{observable$ | ngrxPush}}
 * <ng-container *ngIf="observable$ | ngrxPush as o">{{o}}</ng-container>
 * <component [value]="observable$ | ngrxPush"></component>
 * ```
 *
 * @publicApi
 */
export class PushPipe {
    constructor(cdRef, ngZone, errorHandler) {
        this.resetContextObserver = {
            next: () => (this.renderedValue = undefined),
        };
        this.updateViewContextObserver = {
            next: (value) => (this.renderedValue = value),
        };
        this.cdAware = createCdAware({
            render: createRender({ cdRef, ngZone }),
            updateViewContextObserver: this.updateViewContextObserver,
            resetContextObserver: this.resetContextObserver,
            errorHandler,
        });
        this.subscription = this.cdAware.subscribe({});
    }
    transform(potentialObservable) {
        this.cdAware.nextPotentialObservable(potentialObservable);
        return this.renderedValue;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
/** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
PushPipe.decorators = [
    { type: Pipe, args: [{ name: 'ngrxPush', pure: false },] }
];
/**
 * @type {function(): !Array<(null|{
 *   type: ?,
 *   decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>),
 * })>}
 * @nocollapse
 */
PushPipe.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: ErrorHandler }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQvc3JjL3B1c2gvcHVzaC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsWUFBWSxFQUNaLE1BQU0sRUFFTixJQUFJLEdBRUwsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFXLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUUvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMENHO0FBRUgsTUFBTSxPQUFPLFFBQVE7SUFjbkIsWUFDRSxLQUF3QixFQUN4QixNQUFjLEVBQ2QsWUFBMEI7UUFaWCx5QkFBb0IsR0FBdUI7WUFDMUQsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7U0FDN0MsQ0FBQztRQUNlLDhCQUF5QixHQUV0QztZQUNGLElBQUksRUFBRSxDQUFDLEtBQTJCLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDcEUsQ0FBQztRQU9BLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFJO1lBQzlCLE1BQU0sRUFBRSxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDdkMseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QjtZQUN6RCxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CO1lBQy9DLFlBQVk7U0FDYixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFLRCxTQUFTLENBQ1AsbUJBQTBEO1FBRTFELElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMxRCxPQUFPLElBQUksQ0FBQyxhQUFvQixDQUFDO0lBQ25DLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7O1lBekNGLElBQUksU0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTs7Ozs7Ozs7OztZQXREckMsaUJBQWlCO1lBRWpCLE1BQU07WUFETixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEVycm9ySGFuZGxlcixcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIFBpcGUsXG4gIFBpcGVUcmFuc2Zvcm0sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmV4dE9ic2VydmVyLCBPYnNlcnZhYmxlSW5wdXQsIFVuc3Vic2NyaWJhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDZEF3YXJlLCBjcmVhdGVDZEF3YXJlIH0gZnJvbSAnLi4vY29yZS9jZC1hd2FyZS9jZC1hd2FyZV9jcmVhdG9yJztcbmltcG9ydCB7IGNyZWF0ZVJlbmRlciB9IGZyb20gJy4uL2NvcmUvY2QtYXdhcmUvY3JlYXRvcl9yZW5kZXInO1xuXG4vKipcbiAqIEBQaXBlIFB1c2hQaXBlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVGhlIGBuZ3J4UHVzaGAgcGlwZSBzZXJ2ZXMgYXMgYSBkcm9wLWluIHJlcGxhY2VtZW50IGZvciB0aGUgYGFzeW5jYCBwaXBlLlxuICogSXQgY29udGFpbnMgaW50ZWxsaWdlbnQgaGFuZGxpbmcgb2YgY2hhbmdlIGRldGVjdGlvbiB0byBlbmFibGUgdXNcbiAqIHJ1bm5pbmcgaW4gem9uZS1mdWxsIGFzIHdlbGwgYXMgem9uZS1sZXNzIG1vZGUgd2l0aG91dCBhbnkgY2hhbmdlcyB0byB0aGUgY29kZS5cbiAqXG4gKiBUaGUgY3VycmVudCB3YXkgb2YgYmluZGluZyBhbiBvYnNlcnZhYmxlIHRvIHRoZSB2aWV3IGxvb2tzIGxpa2UgdGhhdDpcbiAqICBgYGBodG1sXG4gKiAge3tvYnNlcnZhYmxlJCB8IGFzeW5jfX1cbiAqIDxuZy1jb250YWluZXIgKm5nSWY9XCJvYnNlcnZhYmxlJCB8IGFzeW5jIGFzIG9cIj57e299fTwvbmctY29udGFpbmVyPlxuICogPGNvbXBvbmVudCBbdmFsdWVdPVwib2JzZXJ2YWJsZSQgfCBhc3luY1wiPjwvY29tcG9uZW50PlxuICogYGBgXG4gKlxuICogVGhlIHByb2JsZW0gaXMgYGFzeW5jYCBwaXBlIGp1c3QgbWFya3MgdGhlIGNvbXBvbmVudCBhbmQgYWxsIGl0cyBhbmNlc3RvcnMgYXMgZGlydHkuXG4gKiBJdCBuZWVkcyB6b25lLmpzIG1pY3JvdGFzayBxdWV1ZSB0byBleGhhdXN0IHVudGlsIGBBcHBsaWNhdGlvblJlZi50aWNrYCBpcyBjYWxsZWQgdG8gcmVuZGVyX2NyZWF0b3IgYWxsIGRpcnR5IG1hcmtlZFxuICogICAgIGNvbXBvbmVudHMuXG4gKlxuICogSGVhdnkgZHluYW1pYyBhbmQgaW50ZXJhY3RpdmUgVUlzIHN1ZmZlciBmcm9tIHpvbmVzIGNoYW5nZSBkZXRlY3Rpb24gYSBsb3QgYW5kIGNhblxuICogbGVhbiB0byBiYWQgcGVyZm9ybWFuY2Ugb3IgZXZlbiB1bnVzYWJsZSBhcHBsaWNhdGlvbnMsIGJ1dCB0aGUgYGFzeW5jYCBwaXBlIGRvZXMgbm90IHdvcmsgaW4gem9uZS1sZXNzIG1vZGUuXG4gKlxuICogYG5ncnhQdXNoYCBwaXBlIHNvbHZlcyB0aGF0IHByb2JsZW0uXG4gKlxuICogSW5jbHVkZWQgRmVhdHVyZXM6XG4gKiAgLSBUYWtlIG9ic2VydmFibGVzIG9yIHByb21pc2VzLCByZXRyaWV2ZSB0aGVpciB2YWx1ZXMgYW5kIHJlbmRlcl9jcmVhdG9yIHRoZSB2YWx1ZSB0byB0aGUgdGVtcGxhdGVcbiAqICAtIEhhbmRsaW5nIG51bGwgYW5kIHVuZGVmaW5lZCB2YWx1ZXMgaW4gYSBjbGVhbiB1bmlmaWVkL3N0cnVjdHVyZWQgd2F5XG4gKiAgLSBUcmlnZ2VycyBjaGFuZ2UtZGV0ZWN0aW9uIGRpZmZlcmVudGx5IGlmIGB6b25lLmpzYCBpcyBwcmVzZW50IG9yIG5vdCAoYGRldGVjdENoYW5nZXNgIG9yIGBtYXJrRm9yQ2hlY2tgKVxuICogIC0gRGlzdGluY3Qgc2FtZSB2YWx1ZXMgaW4gYSByb3cgdG8gaW5jcmVhc2UgcGVyZm9ybWFuY2VcbiAqICAtIENvYWxlc2Npbmcgb2YgY2hhbmdlIGRldGVjdGlvbiBjYWxscyB0byBib29zdCBwZXJmb3JtYW5jZVxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogYG5ncnhQdXNoYCBwaXBlIHNvbHZlcyB0aGF0IHByb2JsZW0uIEl0IGNhbiBiZSB1c2VkIGxpa2Ugc2hvd24gaGVyZTpcbiAqIGBgYGh0bWxcbiAqIHt7b2JzZXJ2YWJsZSQgfCBuZ3J4UHVzaH19XG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwib2JzZXJ2YWJsZSQgfCBuZ3J4UHVzaCBhcyBvXCI+e3tvfX08L25nLWNvbnRhaW5lcj5cbiAqIDxjb21wb25lbnQgW3ZhbHVlXT1cIm9ic2VydmFibGUkIHwgbmdyeFB1c2hcIj48L2NvbXBvbmVudD5cbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQFBpcGUoeyBuYW1lOiAnbmdyeFB1c2gnLCBwdXJlOiBmYWxzZSB9KVxuZXhwb3J0IGNsYXNzIFB1c2hQaXBlPFM+IGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZW5kZXJlZFZhbHVlOiBTIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIHJlYWRvbmx5IHN1YnNjcmlwdGlvbjogVW5zdWJzY3JpYmFibGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgY2RBd2FyZTogQ2RBd2FyZTxTIHwgbnVsbCB8IHVuZGVmaW5lZD47XG4gIHByaXZhdGUgcmVhZG9ubHkgcmVzZXRDb250ZXh0T2JzZXJ2ZXI6IE5leHRPYnNlcnZlcjx2b2lkPiA9IHtcbiAgICBuZXh0OiAoKSA9PiAodGhpcy5yZW5kZXJlZFZhbHVlID0gdW5kZWZpbmVkKSxcbiAgfTtcbiAgcHJpdmF0ZSByZWFkb25seSB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiBOZXh0T2JzZXJ2ZXI8XG4gICAgUyB8IG51bGwgfCB1bmRlZmluZWRcbiAgPiA9IHtcbiAgICBuZXh0OiAodmFsdWU6IFMgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiAodGhpcy5yZW5kZXJlZFZhbHVlID0gdmFsdWUpLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlclxuICApIHtcbiAgICB0aGlzLmNkQXdhcmUgPSBjcmVhdGVDZEF3YXJlPFM+KHtcbiAgICAgIHJlbmRlcjogY3JlYXRlUmVuZGVyKHsgY2RSZWYsIG5nWm9uZSB9KSxcbiAgICAgIHVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXI6IHRoaXMudXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcixcbiAgICAgIHJlc2V0Q29udGV4dE9ic2VydmVyOiB0aGlzLnJlc2V0Q29udGV4dE9ic2VydmVyLFxuICAgICAgZXJyb3JIYW5kbGVyLFxuICAgIH0pO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5jZEF3YXJlLnN1YnNjcmliZSh7fSk7XG4gIH1cblxuICB0cmFuc2Zvcm08VD4ocG90ZW50aWFsT2JzZXJ2YWJsZTogbnVsbCk6IG51bGw7XG4gIHRyYW5zZm9ybTxUPihwb3RlbnRpYWxPYnNlcnZhYmxlOiB1bmRlZmluZWQpOiB1bmRlZmluZWQ7XG4gIHRyYW5zZm9ybTxUPihwb3RlbnRpYWxPYnNlcnZhYmxlOiBPYnNlcnZhYmxlSW5wdXQ8VD4pOiBUIHwgdW5kZWZpbmVkO1xuICB0cmFuc2Zvcm08VD4oXG4gICAgcG90ZW50aWFsT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZUlucHV0PFQ+IHwgbnVsbCB8IHVuZGVmaW5lZFxuICApOiBUIHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gICAgdGhpcy5jZEF3YXJlLm5leHRQb3RlbnRpYWxPYnNlcnZhYmxlKHBvdGVudGlhbE9ic2VydmFibGUpO1xuICAgIHJldHVybiB0aGlzLnJlbmRlcmVkVmFsdWUgYXMgYW55O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19