import { Pipe } from '@angular/core';
import { createRenderScheduler } from '../core/render-scheduler';
import { createRenderEventManager } from '../core/render-event/manager';
import * as i0 from "@angular/core";
/**
 * @description
 *
 * The `ngrxPush` pipe serves as a drop-in replacement for the `async` pipe.
 * It contains intelligent handling of change detection to enable us
 * running in zone-full as well as zone-less mode without any changes to the code.
 *
 * @usageNotes
 *
 * ### Displaying Observable Values
 *
 * ```html
 * <p>{{ number$ | ngrxPush }}</p>
 *
 * <ng-container *ngIf="number$ | ngrxPush as n">{{ n }}</ng-container>
 *
 * <app-number [number]="number$ | ngrxPush"></app-number>
 * ```
 *
 * ### Combining Multiple Observables
 *
 * ```html
 * <code>
 *   {{ { users: users$, query: query$ } | ngrxPush | json }}
 * </code>
 * ```
 *
 * @publicApi
 */
export class PushPipe {
    constructor(errorHandler) {
        this.errorHandler = errorHandler;
        this.renderScheduler = createRenderScheduler();
        this.renderEventManager = createRenderEventManager({
            suspense: (event) => this.setRenderedValue(undefined, event.synchronous),
            next: (event) => this.setRenderedValue(event.value, event.synchronous),
            error: (event) => {
                if (event.reset) {
                    this.setRenderedValue(undefined, event.synchronous);
                }
                this.errorHandler.handleError(event.error);
            },
            complete: (event) => {
                if (event.reset) {
                    this.setRenderedValue(undefined, event.synchronous);
                }
            },
        });
        this.subscription = this.renderEventManager
            .handlePotentialObservableChanges()
            .subscribe();
    }
    transform(potentialObservable) {
        this.renderEventManager.nextPotentialObservable(potentialObservable);
        return this.renderedValue;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    setRenderedValue(value, isSyncEvent) {
        if (value !== this.renderedValue) {
            this.renderedValue = value;
            if (!isSyncEvent) {
                this.renderScheduler.schedule();
            }
        }
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: PushPipe, deps: [{ token: i0.ErrorHandler }], target: i0.ɵɵFactoryTarget.Pipe }); }
    /** @nocollapse */ static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "17.0.0", ngImport: i0, type: PushPipe, isStandalone: true, name: "ngrxPush", pure: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: PushPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'ngrxPush',
                    pure: false,
                }]
        }], ctorParameters: () => [{ type: i0.ErrorHandler }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQvc3JjL3B1c2gvcHVzaC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBMkIsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUc3RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJeEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFNSCxNQUFNLE9BQU8sUUFBUTtJQW9CbkIsWUFBNkIsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFsQnRDLG9CQUFlLEdBQUcscUJBQXFCLEVBQUUsQ0FBQztRQUMxQyx1QkFBa0IsR0FBRyx3QkFBd0IsQ0FBQztZQUM3RCxRQUFRLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUN4RSxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDdEUsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2YsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO29CQUNmLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNyRDtnQkFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUNELFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNsQixJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3JEO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQztRQUlELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQjthQUN4QyxnQ0FBZ0MsRUFBRTthQUNsQyxTQUFTLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsU0FBUyxDQUFLLG1CQUF1QjtRQUNuQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsdUJBQXVCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNyRSxPQUFPLElBQUksQ0FBQyxhQUFtQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsS0FBYyxFQUFFLFdBQW9CO1FBQzNELElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFFM0IsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNqQztTQUNGO0lBQ0gsQ0FBQztpSUEzQ1UsUUFBUTsrSEFBUixRQUFROzsyRkFBUixRQUFRO2tCQUxwQixJQUFJO21CQUFDO29CQUNKLFVBQVUsRUFBRSxJQUFJO29CQUNoQixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLEtBQUs7aUJBQ1oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIE9uRGVzdHJveSwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVW5zdWJzY3JpYmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBvdGVudGlhbE9ic2VydmFibGVSZXN1bHQgfSBmcm9tICcuLi9jb3JlL3BvdGVudGlhbC1vYnNlcnZhYmxlJztcbmltcG9ydCB7IGNyZWF0ZVJlbmRlclNjaGVkdWxlciB9IGZyb20gJy4uL2NvcmUvcmVuZGVyLXNjaGVkdWxlcic7XG5pbXBvcnQgeyBjcmVhdGVSZW5kZXJFdmVudE1hbmFnZXIgfSBmcm9tICcuLi9jb3JlL3JlbmRlci1ldmVudC9tYW5hZ2VyJztcblxudHlwZSBQdXNoUGlwZVJlc3VsdDxQTz4gPSBQb3RlbnRpYWxPYnNlcnZhYmxlUmVzdWx0PFBPLCB1bmRlZmluZWQ+O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRoZSBgbmdyeFB1c2hgIHBpcGUgc2VydmVzIGFzIGEgZHJvcC1pbiByZXBsYWNlbWVudCBmb3IgdGhlIGBhc3luY2AgcGlwZS5cbiAqIEl0IGNvbnRhaW5zIGludGVsbGlnZW50IGhhbmRsaW5nIG9mIGNoYW5nZSBkZXRlY3Rpb24gdG8gZW5hYmxlIHVzXG4gKiBydW5uaW5nIGluIHpvbmUtZnVsbCBhcyB3ZWxsIGFzIHpvbmUtbGVzcyBtb2RlIHdpdGhvdXQgYW55IGNoYW5nZXMgdG8gdGhlIGNvZGUuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiAjIyMgRGlzcGxheWluZyBPYnNlcnZhYmxlIFZhbHVlc1xuICpcbiAqIGBgYGh0bWxcbiAqIDxwPnt7IG51bWJlciQgfCBuZ3J4UHVzaCB9fTwvcD5cbiAqXG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwibnVtYmVyJCB8IG5ncnhQdXNoIGFzIG5cIj57eyBuIH19PC9uZy1jb250YWluZXI+XG4gKlxuICogPGFwcC1udW1iZXIgW251bWJlcl09XCJudW1iZXIkIHwgbmdyeFB1c2hcIj48L2FwcC1udW1iZXI+XG4gKiBgYGBcbiAqXG4gKiAjIyMgQ29tYmluaW5nIE11bHRpcGxlIE9ic2VydmFibGVzXG4gKlxuICogYGBgaHRtbFxuICogPGNvZGU+XG4gKiAgIHt7IHsgdXNlcnM6IHVzZXJzJCwgcXVlcnk6IHF1ZXJ5JCB9IHwgbmdyeFB1c2ggfCBqc29uIH19XG4gKiA8L2NvZGU+XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBQaXBlKHtcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgbmFtZTogJ25ncnhQdXNoJyxcbiAgcHVyZTogZmFsc2UsXG59KVxuZXhwb3J0IGNsYXNzIFB1c2hQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSByZW5kZXJlZFZhbHVlOiB1bmtub3duO1xuICBwcml2YXRlIHJlYWRvbmx5IHJlbmRlclNjaGVkdWxlciA9IGNyZWF0ZVJlbmRlclNjaGVkdWxlcigpO1xuICBwcml2YXRlIHJlYWRvbmx5IHJlbmRlckV2ZW50TWFuYWdlciA9IGNyZWF0ZVJlbmRlckV2ZW50TWFuYWdlcih7XG4gICAgc3VzcGVuc2U6IChldmVudCkgPT4gdGhpcy5zZXRSZW5kZXJlZFZhbHVlKHVuZGVmaW5lZCwgZXZlbnQuc3luY2hyb25vdXMpLFxuICAgIG5leHQ6IChldmVudCkgPT4gdGhpcy5zZXRSZW5kZXJlZFZhbHVlKGV2ZW50LnZhbHVlLCBldmVudC5zeW5jaHJvbm91cyksXG4gICAgZXJyb3I6IChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LnJlc2V0KSB7XG4gICAgICAgIHRoaXMuc2V0UmVuZGVyZWRWYWx1ZSh1bmRlZmluZWQsIGV2ZW50LnN5bmNocm9ub3VzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZXJyb3JIYW5kbGVyLmhhbmRsZUVycm9yKGV2ZW50LmVycm9yKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5yZXNldCkge1xuICAgICAgICB0aGlzLnNldFJlbmRlcmVkVmFsdWUodW5kZWZpbmVkLCBldmVudC5zeW5jaHJvbm91cyk7XG4gICAgICB9XG4gICAgfSxcbiAgfSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3Vic2NyaXB0aW9uOiBVbnN1YnNjcmliYWJsZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLnJlbmRlckV2ZW50TWFuYWdlclxuICAgICAgLmhhbmRsZVBvdGVudGlhbE9ic2VydmFibGVDaGFuZ2VzKClcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHRyYW5zZm9ybTxQTz4ocG90ZW50aWFsT2JzZXJ2YWJsZTogUE8pOiBQdXNoUGlwZVJlc3VsdDxQTz4ge1xuICAgIHRoaXMucmVuZGVyRXZlbnRNYW5hZ2VyLm5leHRQb3RlbnRpYWxPYnNlcnZhYmxlKHBvdGVudGlhbE9ic2VydmFibGUpO1xuICAgIHJldHVybiB0aGlzLnJlbmRlcmVkVmFsdWUgYXMgUHVzaFBpcGVSZXN1bHQ8UE8+O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0UmVuZGVyZWRWYWx1ZSh2YWx1ZTogdW5rbm93biwgaXNTeW5jRXZlbnQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMucmVuZGVyZWRWYWx1ZSkge1xuICAgICAgdGhpcy5yZW5kZXJlZFZhbHVlID0gdmFsdWU7XG5cbiAgICAgIGlmICghaXNTeW5jRXZlbnQpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJTY2hlZHVsZXIuc2NoZWR1bGUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==