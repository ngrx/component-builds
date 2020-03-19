import { __decorate, __metadata, __read } from "tslib";
import { ChangeDetectorRef, NgZone, Pipe, } from '@angular/core';
import { Subject, } from 'rxjs';
import { distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';
import { createCdAware, setUpWork, } from '../core';
/**
 * @Pipe PushPipe
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
 * @usageNotes
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
 * @publicApi
 */
var PushPipe = /** @class */ (function () {
    function PushPipe(cdRef, ngZone) {
        var _this = this;
        this.configSubject = new Subject();
        this.config$ = this.configSubject
            .asObservable()
            .pipe(distinctUntilChanged());
        this.updateViewContextObserver = {
            // assign value that will get returned from the transform function on the next change detection
            next: function (value) { return (_this.renderedValue = value); },
        };
        this.resetContextObserver = {
            next: function (value) { return (_this.renderedValue = undefined); },
        };
        this.configurableBehaviour = function (o$) {
            return o$.pipe(withLatestFrom(_this.config$), map(function (_a) {
                var _b = __read(_a, 2), value$ = _b[0], config = _b[1];
                // As discussed with Brandon we keep it here
                // because in the beta we implement configuration behavior here
                return value$.pipe();
            }));
        };
        this.cdAware = createCdAware({
            work: setUpWork({
                ngZone: ngZone,
                cdRef: cdRef,
                context: cdRef.context,
            }),
            updateViewContextObserver: this.updateViewContextObserver,
            resetContextObserver: this.resetContextObserver,
            configurableBehaviour: this.configurableBehaviour,
        });
        this.subscription = this.cdAware.subscribe();
    }
    PushPipe.prototype.transform = function (potentialObservable, config) {
        if (config === void 0) { config = { optimized: true }; }
        this.configSubject.next(config);
        this.cdAware.next(potentialObservable);
        return this.renderedValue;
    };
    PushPipe.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    PushPipe = __decorate([
        Pipe({ name: 'ngrxPush', pure: false }),
        __metadata("design:paramtypes", [ChangeDetectorRef, NgZone])
    ], PushPipe);
    return PushPipe;
}());
export { PushPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQvc3JjL3B1c2gvcHVzaC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBRWpCLE1BQU0sRUFFTixJQUFJLEdBR0wsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUlMLE9BQU8sR0FFUixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0UsT0FBTyxFQUdMLGFBQWEsRUFDYixTQUFTLEdBQ1YsTUFBTSxTQUFTLENBQUM7QUFFakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBDRztBQUVIO0lBK0JFLGtCQUFZLEtBQXdCLEVBQUUsTUFBYztRQUFwRCxpQkFZQztRQXhDZ0Isa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBa0IsQ0FBQztRQUM5QyxZQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWE7YUFDMUMsWUFBWSxFQUFFO2FBQ2QsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUlmLDhCQUF5QixHQUV0QztZQUNGLCtGQUErRjtZQUMvRixJQUFJLEVBQUUsVUFBQyxLQUEyQixJQUFLLE9BQUEsQ0FBQyxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxFQUE1QixDQUE0QjtTQUNwRSxDQUFDO1FBQ2UseUJBQW9CLEdBQTBCO1lBQzdELElBQUksRUFBRSxVQUFDLEtBQWMsSUFBSyxPQUFBLENBQUMsS0FBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBaEMsQ0FBZ0M7U0FDM0QsQ0FBQztRQUNlLDBCQUFxQixHQUFHLFVBQ3ZDLEVBQTZCO1lBRTdCLE9BQUEsRUFBRSxDQUFDLElBQUksQ0FDTCxjQUFjLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxFQUM1QixHQUFHLENBQUMsVUFBQyxFQUFnQjtvQkFBaEIsa0JBQWdCLEVBQWYsY0FBTSxFQUFFLGNBQU07Z0JBQ2xCLDRDQUE0QztnQkFDNUMsK0RBQStEO2dCQUMvRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FDSDtRQVBELENBT0MsQ0FBQztRQUdGLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFJO1lBQzlCLElBQUksRUFBRSxTQUFTLENBQUM7Z0JBQ2QsTUFBTSxRQUFBO2dCQUNOLEtBQUssT0FBQTtnQkFDTCxPQUFPLEVBQUcsS0FBb0MsQ0FBQyxPQUFPO2FBQ3ZELENBQUM7WUFDRix5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCO1lBQ3pELG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0I7WUFDL0MscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQjtTQUNsRCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQVFELDRCQUFTLEdBQVQsVUFDRSxtQkFBa0UsRUFDbEUsTUFBNEM7UUFBNUMsdUJBQUEsRUFBQSxXQUEyQixTQUFTLEVBQUUsSUFBSSxFQUFFO1FBRTVDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDdkMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRCw4QkFBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBOURVLFFBQVE7UUFEcEIsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7eUNBZ0NuQixpQkFBaUIsRUFBVSxNQUFNO09BL0J6QyxRQUFRLENBK0RwQjtJQUFELGVBQUM7Q0FBQSxBQS9ERCxJQStEQztTQS9EWSxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIFBpcGUsXG4gIFBpcGVUcmFuc2Zvcm0sXG4gIFR5cGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTmV4dE9ic2VydmVyLFxuICBPYnNlcnZhYmxlLFxuICBQYXJ0aWFsT2JzZXJ2ZXIsXG4gIFN1YmplY3QsXG4gIFVuc3Vic2NyaWJhYmxlLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXAsIHdpdGhMYXRlc3RGcm9tIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQ2RBd2FyZSxcbiAgQ29hbGVzY2luZ0NvbmZpZyBhcyBQdXNoUGlwZUNvbmZpZyxcbiAgY3JlYXRlQ2RBd2FyZSxcbiAgc2V0VXBXb3JrLFxufSBmcm9tICcuLi9jb3JlJztcblxuLyoqXG4gKiBAUGlwZSBQdXNoUGlwZVxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVGhlIGBuZ3J4UHVzaGAgcGlwZSBzZXJ2ZXMgYXMgYSBkcm9wLWluIHJlcGxhY2VtZW50IGZvciB0aGUgYGFzeW5jYCBwaXBlLlxuICogSXQgY29udGFpbnMgaW50ZWxsaWdlbnQgaGFuZGxpbmcgb2YgY2hhbmdlIGRldGVjdGlvbiB0byBlbmFibGUgdXNcbiAqIHJ1bm5pbmcgaW4gem9uZS1mdWxsIGFzIHdlbGwgYXMgem9uZS1sZXNzIG1vZGUgd2l0aG91dCBhbnkgY2hhbmdlcyB0byB0aGUgY29kZS5cbiAqXG4gKiBUaGUgY3VycmVudCB3YXkgb2YgYmluZGluZyBhbiBvYnNlcnZhYmxlIHRvIHRoZSB2aWV3IGxvb2tzIGxpa2UgdGhhdDpcbiAqICBgYGBodG1sXG4gKiAge3tvYnNlcnZhYmxlJCB8IGFzeW5jfX1cbiAqIDxuZy1jb250YWluZXIgKm5nSWY9XCJvYnNlcnZhYmxlJCB8IGFzeW5jIGFzIG9cIj57e299fTwvbmctY29udGFpbmVyPlxuICogPGNvbXBvbmVudCBbdmFsdWVdPVwib2JzZXJ2YWJsZSQgfCBhc3luY1wiPjwvY29tcG9uZW50PlxuICogYGBgXG4gKlxuICogVGhlIHByb2JsZW0gaXMgYGFzeW5jYCBwaXBlIGp1c3QgbWFya3MgdGhlIGNvbXBvbmVudCBhbmQgYWxsIGl0cyBhbmNlc3RvcnMgYXMgZGlydHkuXG4gKiBJdCBuZWVkcyB6b25lLmpzIG1pY3JvdGFzayBxdWV1ZSB0byBleGhhdXN0IHVudGlsIGBBcHBsaWNhdGlvblJlZi50aWNrYCBpcyBjYWxsZWQgdG8gcmVuZGVyIGFsbCBkaXJ0eSBtYXJrZWQgY29tcG9uZW50cy5cbiAqXG4gKiBIZWF2eSBkeW5hbWljIGFuZCBpbnRlcmFjdGl2ZSBVSXMgc3VmZmVyIGZyb20gem9uZXMgY2hhbmdlIGRldGVjdGlvbiBhIGxvdCBhbmQgY2FuXG4gKiBsZWFuIHRvIGJhZCBwZXJmb3JtYW5jZSBvciBldmVuIHVudXNhYmxlIGFwcGxpY2F0aW9ucywgYnV0IHRoZSBgYXN5bmNgIHBpcGUgZG9lcyBub3Qgd29yayBpbiB6b25lLWxlc3MgbW9kZS5cbiAqXG4gKiBgbmdyeFB1c2hgIHBpcGUgc29sdmVzIHRoYXQgcHJvYmxlbS5cbiAqXG4gKiBJbmNsdWRlZCBGZWF0dXJlczpcbiAqICAtIFRha2Ugb2JzZXJ2YWJsZXMgb3IgcHJvbWlzZXMsIHJldHJpZXZlIHRoZWlyIHZhbHVlcyBhbmQgcmVuZGVyIHRoZSB2YWx1ZSB0byB0aGUgdGVtcGxhdGVcbiAqICAtIEhhbmRsaW5nIG51bGwgYW5kIHVuZGVmaW5lZCB2YWx1ZXMgaW4gYSBjbGVhbiB1bmlmaWVkL3N0cnVjdHVyZWQgd2F5XG4gKiAgLSBUcmlnZ2VycyBjaGFuZ2UtZGV0ZWN0aW9uIGRpZmZlcmVudGx5IGlmIGB6b25lLmpzYCBpcyBwcmVzZW50IG9yIG5vdCAoYGRldGVjdENoYW5nZXNgIG9yIGBtYXJrRm9yQ2hlY2tgKVxuICogIC0gRGlzdGluY3Qgc2FtZSB2YWx1ZXMgaW4gYSByb3cgdG8gaW5jcmVhc2UgcGVyZm9ybWFuY2VcbiAqICAtIENvYWxlc2Npbmcgb2YgY2hhbmdlIGRldGVjdGlvbiBjYWxscyB0byBib29zdCBwZXJmb3JtYW5jZVxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogIyMjIEV4YW1wbGVzXG4gKlxuICogYG5ncnhQdXNoYCBwaXBlIHNvbHZlcyB0aGF0IHByb2JsZW0uIEl0IGNhbiBiZSB1c2VkIGxpa2Ugc2hvd24gaGVyZTpcbiAqIGBgYGh0bWxcbiAqIHt7b2JzZXJ2YWJsZSQgfCBuZ3J4UHVzaH19XG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwib2JzZXJ2YWJsZSQgfCBuZ3J4UHVzaCBhcyBvXCI+e3tvfX08L25nLWNvbnRhaW5lcj5cbiAqIDxjb21wb25lbnQgW3ZhbHVlXT1cIm9ic2VydmFibGUkIHwgbmdyeFB1c2hcIj48L2NvbXBvbmVudD5cbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQFBpcGUoeyBuYW1lOiAnbmdyeFB1c2gnLCBwdXJlOiBmYWxzZSB9KVxuZXhwb3J0IGNsYXNzIFB1c2hQaXBlPFM+IGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZW5kZXJlZFZhbHVlOiBTIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZ1N1YmplY3QgPSBuZXcgU3ViamVjdDxQdXNoUGlwZUNvbmZpZz4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWckID0gdGhpcy5jb25maWdTdWJqZWN0XG4gICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBzdWJzY3JpcHRpb246IFVuc3Vic2NyaWJhYmxlO1xuICBwcml2YXRlIHJlYWRvbmx5IGNkQXdhcmU6IENkQXdhcmU8UyB8IG51bGwgfCB1bmRlZmluZWQ+O1xuICBwcml2YXRlIHJlYWRvbmx5IHVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXI6IFBhcnRpYWxPYnNlcnZlcjxcbiAgICBTIHwgbnVsbCB8IHVuZGVmaW5lZFxuICA+ID0ge1xuICAgIC8vIGFzc2lnbiB2YWx1ZSB0aGF0IHdpbGwgZ2V0IHJldHVybmVkIGZyb20gdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiBvbiB0aGUgbmV4dCBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAgbmV4dDogKHZhbHVlOiBTIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4gKHRoaXMucmVuZGVyZWRWYWx1ZSA9IHZhbHVlKSxcbiAgfTtcbiAgcHJpdmF0ZSByZWFkb25seSByZXNldENvbnRleHRPYnNlcnZlcjogTmV4dE9ic2VydmVyPHVua25vd24+ID0ge1xuICAgIG5leHQ6ICh2YWx1ZTogdW5rbm93bikgPT4gKHRoaXMucmVuZGVyZWRWYWx1ZSA9IHVuZGVmaW5lZCksXG4gIH07XG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZmlndXJhYmxlQmVoYXZpb3VyID0gPFQ+KFxuICAgIG8kOiBPYnNlcnZhYmxlPE9ic2VydmFibGU8VD4+XG4gICk6IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxUPj4gPT5cbiAgICBvJC5waXBlKFxuICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5jb25maWckKSxcbiAgICAgIG1hcCgoW3ZhbHVlJCwgY29uZmlnXSkgPT4ge1xuICAgICAgICAvLyBBcyBkaXNjdXNzZWQgd2l0aCBCcmFuZG9uIHdlIGtlZXAgaXQgaGVyZVxuICAgICAgICAvLyBiZWNhdXNlIGluIHRoZSBiZXRhIHdlIGltcGxlbWVudCBjb25maWd1cmF0aW9uIGJlaGF2aW9yIGhlcmVcbiAgICAgICAgcmV0dXJuIHZhbHVlJC5waXBlKCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgY29uc3RydWN0b3IoY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLCBuZ1pvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMuY2RBd2FyZSA9IGNyZWF0ZUNkQXdhcmU8Uz4oe1xuICAgICAgd29yazogc2V0VXBXb3JrKHtcbiAgICAgICAgbmdab25lLFxuICAgICAgICBjZFJlZixcbiAgICAgICAgY29udGV4dDogKGNkUmVmIGFzIEVtYmVkZGVkVmlld1JlZjxUeXBlPGFueT4+KS5jb250ZXh0LFxuICAgICAgfSksXG4gICAgICB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiB0aGlzLnVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXIsXG4gICAgICByZXNldENvbnRleHRPYnNlcnZlcjogdGhpcy5yZXNldENvbnRleHRPYnNlcnZlcixcbiAgICAgIGNvbmZpZ3VyYWJsZUJlaGF2aW91cjogdGhpcy5jb25maWd1cmFibGVCZWhhdmlvdXIsXG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmNkQXdhcmUuc3Vic2NyaWJlKCk7XG4gIH1cblxuICB0cmFuc2Zvcm0ocG90ZW50aWFsT2JzZXJ2YWJsZTogbnVsbCwgY29uZmlnPzogUHVzaFBpcGVDb25maWcpOiBudWxsO1xuICB0cmFuc2Zvcm0ocG90ZW50aWFsT2JzZXJ2YWJsZTogdW5kZWZpbmVkLCBjb25maWc/OiBQdXNoUGlwZUNvbmZpZyk6IHVuZGVmaW5lZDtcbiAgdHJhbnNmb3JtKFxuICAgIHBvdGVudGlhbE9ic2VydmFibGU6IE9ic2VydmFibGU8Uz4gfCBQcm9taXNlPFM+LFxuICAgIGNvbmZpZz86IFB1c2hQaXBlQ29uZmlnXG4gICk6IFM7XG4gIHRyYW5zZm9ybShcbiAgICBwb3RlbnRpYWxPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPFM+IHwgUHJvbWlzZTxTPiB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgY29uZmlnOiBQdXNoUGlwZUNvbmZpZyA9IHsgb3B0aW1pemVkOiB0cnVlIH1cbiAgKTogUyB8IG51bGwgfCB1bmRlZmluZWQge1xuICAgIHRoaXMuY29uZmlnU3ViamVjdC5uZXh0KGNvbmZpZyk7XG4gICAgdGhpcy5jZEF3YXJlLm5leHQocG90ZW50aWFsT2JzZXJ2YWJsZSk7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyZWRWYWx1ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==