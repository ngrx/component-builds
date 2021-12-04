import { Pipe, } from '@angular/core';
import { createCdAware } from '../core/cd-aware/cd-aware_creator';
import { createRender } from '../core/cd-aware/creator_render';
import * as i0 from "@angular/core";
/**
 * @ngModule ReactiveComponentModule
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
/** @nocollapse */ /** @nocollapse */ PushPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: PushPipe, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i0.ErrorHandler }], target: i0.ɵɵFactoryTarget.Pipe });
/** @nocollapse */ /** @nocollapse */ PushPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: PushPipe, name: "ngrxPush", pure: false });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: PushPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ngrxPush', pure: false }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i0.ErrorHandler }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQvc3JjL3B1c2gvcHVzaC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFLTCxJQUFJLEdBRUwsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFXLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFFL0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBDRztBQUVILE1BQU0sT0FBTyxRQUFRO0lBWW5CLFlBQ0UsS0FBd0IsRUFDeEIsTUFBYyxFQUNkLFlBQTBCO1FBVlgseUJBQW9CLEdBQXVCO1lBQzFELElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1NBQzdDLENBQUM7UUFDZSw4QkFBeUIsR0FBMEI7WUFDbEUsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1NBQzlDLENBQUM7UUFPQSxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztZQUMzQixNQUFNLEVBQUUsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1lBQ3ZDLHlCQUF5QixFQUFFLElBQUksQ0FBQyx5QkFBeUI7WUFDekQsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQjtZQUMvQyxZQUFZO1NBQ2IsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBS0QsU0FBUyxDQUNQLG1CQUEwRDtRQUUxRCxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDMUQsT0FBTyxJQUFJLENBQUMsYUFBcUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7MklBdENVLFFBQVE7eUlBQVIsUUFBUTsyRkFBUixRQUFRO2tCQURwQixJQUFJO21CQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEVycm9ySGFuZGxlcixcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIFBpcGUsXG4gIFBpcGVUcmFuc2Zvcm0sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmV4dE9ic2VydmVyLCBPYnNlcnZhYmxlSW5wdXQsIFVuc3Vic2NyaWJhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDZEF3YXJlLCBjcmVhdGVDZEF3YXJlIH0gZnJvbSAnLi4vY29yZS9jZC1hd2FyZS9jZC1hd2FyZV9jcmVhdG9yJztcbmltcG9ydCB7IGNyZWF0ZVJlbmRlciB9IGZyb20gJy4uL2NvcmUvY2QtYXdhcmUvY3JlYXRvcl9yZW5kZXInO1xuXG4vKipcbiAqIEBuZ01vZHVsZSBSZWFjdGl2ZUNvbXBvbmVudE1vZHVsZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRoZSBgbmdyeFB1c2hgIHBpcGUgc2VydmVzIGFzIGEgZHJvcC1pbiByZXBsYWNlbWVudCBmb3IgdGhlIGBhc3luY2AgcGlwZS5cbiAqIEl0IGNvbnRhaW5zIGludGVsbGlnZW50IGhhbmRsaW5nIG9mIGNoYW5nZSBkZXRlY3Rpb24gdG8gZW5hYmxlIHVzXG4gKiBydW5uaW5nIGluIHpvbmUtZnVsbCBhcyB3ZWxsIGFzIHpvbmUtbGVzcyBtb2RlIHdpdGhvdXQgYW55IGNoYW5nZXMgdG8gdGhlIGNvZGUuXG4gKlxuICogVGhlIGN1cnJlbnQgd2F5IG9mIGJpbmRpbmcgYW4gb2JzZXJ2YWJsZSB0byB0aGUgdmlldyBsb29rcyBsaWtlIHRoYXQ6XG4gKiAgYGBgaHRtbFxuICogIHt7b2JzZXJ2YWJsZSQgfCBhc3luY319XG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwib2JzZXJ2YWJsZSQgfCBhc3luYyBhcyBvXCI+e3tvfX08L25nLWNvbnRhaW5lcj5cbiAqIDxjb21wb25lbnQgW3ZhbHVlXT1cIm9ic2VydmFibGUkIHwgYXN5bmNcIj48L2NvbXBvbmVudD5cbiAqIGBgYFxuICpcbiAqIFRoZSBwcm9ibGVtIGlzIGBhc3luY2AgcGlwZSBqdXN0IG1hcmtzIHRoZSBjb21wb25lbnQgYW5kIGFsbCBpdHMgYW5jZXN0b3JzIGFzIGRpcnR5LlxuICogSXQgbmVlZHMgem9uZS5qcyBtaWNyb3Rhc2sgcXVldWUgdG8gZXhoYXVzdCB1bnRpbCBgQXBwbGljYXRpb25SZWYudGlja2AgaXMgY2FsbGVkIHRvIHJlbmRlcl9jcmVhdG9yIGFsbCBkaXJ0eSBtYXJrZWRcbiAqICAgICBjb21wb25lbnRzLlxuICpcbiAqIEhlYXZ5IGR5bmFtaWMgYW5kIGludGVyYWN0aXZlIFVJcyBzdWZmZXIgZnJvbSB6b25lcyBjaGFuZ2UgZGV0ZWN0aW9uIGEgbG90IGFuZCBjYW5cbiAqIGxlYW4gdG8gYmFkIHBlcmZvcm1hbmNlIG9yIGV2ZW4gdW51c2FibGUgYXBwbGljYXRpb25zLCBidXQgdGhlIGBhc3luY2AgcGlwZSBkb2VzIG5vdCB3b3JrIGluIHpvbmUtbGVzcyBtb2RlLlxuICpcbiAqIGBuZ3J4UHVzaGAgcGlwZSBzb2x2ZXMgdGhhdCBwcm9ibGVtLlxuICpcbiAqIEluY2x1ZGVkIEZlYXR1cmVzOlxuICogIC0gVGFrZSBvYnNlcnZhYmxlcyBvciBwcm9taXNlcywgcmV0cmlldmUgdGhlaXIgdmFsdWVzIGFuZCByZW5kZXJfY3JlYXRvciB0aGUgdmFsdWUgdG8gdGhlIHRlbXBsYXRlXG4gKiAgLSBIYW5kbGluZyBudWxsIGFuZCB1bmRlZmluZWQgdmFsdWVzIGluIGEgY2xlYW4gdW5pZmllZC9zdHJ1Y3R1cmVkIHdheVxuICogIC0gVHJpZ2dlcnMgY2hhbmdlLWRldGVjdGlvbiBkaWZmZXJlbnRseSBpZiBgem9uZS5qc2AgaXMgcHJlc2VudCBvciBub3QgKGBkZXRlY3RDaGFuZ2VzYCBvciBgbWFya0ZvckNoZWNrYClcbiAqICAtIERpc3RpbmN0IHNhbWUgdmFsdWVzIGluIGEgcm93IHRvIGluY3JlYXNlIHBlcmZvcm1hbmNlXG4gKiAgLSBDb2FsZXNjaW5nIG9mIGNoYW5nZSBkZXRlY3Rpb24gY2FsbHMgdG8gYm9vc3QgcGVyZm9ybWFuY2VcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIGBuZ3J4UHVzaGAgcGlwZSBzb2x2ZXMgdGhhdCBwcm9ibGVtLiBJdCBjYW4gYmUgdXNlZCBsaWtlIHNob3duIGhlcmU6XG4gKiBgYGBodG1sXG4gKiB7e29ic2VydmFibGUkIHwgbmdyeFB1c2h9fVxuICogPG5nLWNvbnRhaW5lciAqbmdJZj1cIm9ic2VydmFibGUkIHwgbmdyeFB1c2ggYXMgb1wiPnt7b319PC9uZy1jb250YWluZXI+XG4gKiA8Y29tcG9uZW50IFt2YWx1ZV09XCJvYnNlcnZhYmxlJCB8IG5ncnhQdXNoXCI+PC9jb21wb25lbnQ+XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBQaXBlKHsgbmFtZTogJ25ncnhQdXNoJywgcHVyZTogZmFsc2UgfSlcbmV4cG9ydCBjbGFzcyBQdXNoUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0sIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVuZGVyZWRWYWx1ZTogdW5rbm93bjtcblxuICBwcml2YXRlIHJlYWRvbmx5IHN1YnNjcmlwdGlvbjogVW5zdWJzY3JpYmFibGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgY2RBd2FyZTogQ2RBd2FyZTx1bmtub3duPjtcbiAgcHJpdmF0ZSByZWFkb25seSByZXNldENvbnRleHRPYnNlcnZlcjogTmV4dE9ic2VydmVyPHZvaWQ+ID0ge1xuICAgIG5leHQ6ICgpID0+ICh0aGlzLnJlbmRlcmVkVmFsdWUgPSB1bmRlZmluZWQpLFxuICB9O1xuICBwcml2YXRlIHJlYWRvbmx5IHVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXI6IE5leHRPYnNlcnZlcjx1bmtub3duPiA9IHtcbiAgICBuZXh0OiAodmFsdWUpID0+ICh0aGlzLnJlbmRlcmVkVmFsdWUgPSB2YWx1ZSksXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIG5nWm9uZTogTmdab25lLFxuICAgIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHRoaXMuY2RBd2FyZSA9IGNyZWF0ZUNkQXdhcmUoe1xuICAgICAgcmVuZGVyOiBjcmVhdGVSZW5kZXIoeyBjZFJlZiwgbmdab25lIH0pLFxuICAgICAgdXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcjogdGhpcy51cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyLFxuICAgICAgcmVzZXRDb250ZXh0T2JzZXJ2ZXI6IHRoaXMucmVzZXRDb250ZXh0T2JzZXJ2ZXIsXG4gICAgICBlcnJvckhhbmRsZXIsXG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmNkQXdhcmUuc3Vic2NyaWJlKHt9KTtcbiAgfVxuXG4gIHRyYW5zZm9ybTxUPihwb3RlbnRpYWxPYnNlcnZhYmxlOiBudWxsKTogbnVsbDtcbiAgdHJhbnNmb3JtPFQ+KHBvdGVudGlhbE9ic2VydmFibGU6IHVuZGVmaW5lZCk6IHVuZGVmaW5lZDtcbiAgdHJhbnNmb3JtPFQ+KHBvdGVudGlhbE9ic2VydmFibGU6IE9ic2VydmFibGVJbnB1dDxUPik6IFQgfCB1bmRlZmluZWQ7XG4gIHRyYW5zZm9ybTxUPihcbiAgICBwb3RlbnRpYWxPYnNlcnZhYmxlOiBPYnNlcnZhYmxlSW5wdXQ8VD4gfCBudWxsIHwgdW5kZWZpbmVkXG4gICk6IFQgfCBudWxsIHwgdW5kZWZpbmVkIHtcbiAgICB0aGlzLmNkQXdhcmUubmV4dFBvdGVudGlhbE9ic2VydmFibGUocG90ZW50aWFsT2JzZXJ2YWJsZSk7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyZWRWYWx1ZSBhcyBUIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==