import { Pipe } from '@angular/core';
import { createRenderScheduler } from '../core/render-scheduler';
import { createRenderEventManager } from '../core/render-event/manager';
import * as i0 from "@angular/core";
/**
 * @ngModule PushModule
 *
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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.6", ngImport: i0, type: PushPipe, deps: [{ token: i0.ErrorHandler }], target: i0.ɵɵFactoryTarget.Pipe }); }
    /** @nocollapse */ static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "16.1.6", ngImport: i0, type: PushPipe, isStandalone: true, name: "ngrxPush", pure: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.6", ngImport: i0, type: PushPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'ngrxPush',
                    pure: false,
                }]
        }], ctorParameters: function () { return [{ type: i0.ErrorHandler }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQvc3JjL3B1c2gvcHVzaC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBMkIsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUc3RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7QUFJeEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQU1ILE1BQU0sT0FBTyxRQUFRO0lBb0JuQixZQUE2QixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQWxCdEMsb0JBQWUsR0FBRyxxQkFBcUIsRUFBRSxDQUFDO1FBQzFDLHVCQUFrQixHQUFHLHdCQUF3QixDQUFDO1lBQzdELFFBQVEsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQ3hFLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUN0RSxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDZixJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3JEO2dCQUNELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QyxDQUFDO1lBQ0QsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2xCLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtvQkFDZixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDckQ7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFDO1FBSUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsa0JBQWtCO2FBQ3hDLGdDQUFnQyxFQUFFO2FBQ2xDLFNBQVMsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxTQUFTLENBQUssbUJBQXVCO1FBQ25DLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sSUFBSSxDQUFDLGFBQW1DLENBQUM7SUFDbEQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxLQUFjLEVBQUUsV0FBb0I7UUFDM0QsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUUzQixJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNoQixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2pDO1NBQ0Y7SUFDSCxDQUFDO2lJQTNDVSxRQUFROytIQUFSLFFBQVE7OzJGQUFSLFFBQVE7a0JBTHBCLElBQUk7bUJBQUM7b0JBQ0osVUFBVSxFQUFFLElBQUk7b0JBQ2hCLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsS0FBSztpQkFDWiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVycm9ySGFuZGxlciwgT25EZXN0cm95LCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnN1YnNjcmliYWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUG90ZW50aWFsT2JzZXJ2YWJsZVJlc3VsdCB9IGZyb20gJy4uL2NvcmUvcG90ZW50aWFsLW9ic2VydmFibGUnO1xuaW1wb3J0IHsgY3JlYXRlUmVuZGVyU2NoZWR1bGVyIH0gZnJvbSAnLi4vY29yZS9yZW5kZXItc2NoZWR1bGVyJztcbmltcG9ydCB7IGNyZWF0ZVJlbmRlckV2ZW50TWFuYWdlciB9IGZyb20gJy4uL2NvcmUvcmVuZGVyLWV2ZW50L21hbmFnZXInO1xuXG50eXBlIFB1c2hQaXBlUmVzdWx0PFBPPiA9IFBvdGVudGlhbE9ic2VydmFibGVSZXN1bHQ8UE8sIHVuZGVmaW5lZD47XG5cbi8qKlxuICogQG5nTW9kdWxlIFB1c2hNb2R1bGVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBUaGUgYG5ncnhQdXNoYCBwaXBlIHNlcnZlcyBhcyBhIGRyb3AtaW4gcmVwbGFjZW1lbnQgZm9yIHRoZSBgYXN5bmNgIHBpcGUuXG4gKiBJdCBjb250YWlucyBpbnRlbGxpZ2VudCBoYW5kbGluZyBvZiBjaGFuZ2UgZGV0ZWN0aW9uIHRvIGVuYWJsZSB1c1xuICogcnVubmluZyBpbiB6b25lLWZ1bGwgYXMgd2VsbCBhcyB6b25lLWxlc3MgbW9kZSB3aXRob3V0IGFueSBjaGFuZ2VzIHRvIHRoZSBjb2RlLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogIyMjIERpc3BsYXlpbmcgT2JzZXJ2YWJsZSBWYWx1ZXNcbiAqXG4gKiBgYGBodG1sXG4gKiA8cD57eyBudW1iZXIkIHwgbmdyeFB1c2ggfX08L3A+XG4gKlxuICogPG5nLWNvbnRhaW5lciAqbmdJZj1cIm51bWJlciQgfCBuZ3J4UHVzaCBhcyBuXCI+e3sgbiB9fTwvbmctY29udGFpbmVyPlxuICpcbiAqIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwibnVtYmVyJCB8IG5ncnhQdXNoXCI+PC9hcHAtbnVtYmVyPlxuICogYGBgXG4gKlxuICogIyMjIENvbWJpbmluZyBNdWx0aXBsZSBPYnNlcnZhYmxlc1xuICpcbiAqIGBgYGh0bWxcbiAqIDxjb2RlPlxuICogICB7eyB7IHVzZXJzOiB1c2VycyQsIHF1ZXJ5OiBxdWVyeSQgfSB8IG5ncnhQdXNoIHwganNvbiB9fVxuICogPC9jb2RlPlxuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5AUGlwZSh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIG5hbWU6ICduZ3J4UHVzaCcsXG4gIHB1cmU6IGZhbHNlLFxufSlcbmV4cG9ydCBjbGFzcyBQdXNoUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0sIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgcmVuZGVyZWRWYWx1ZTogdW5rbm93bjtcbiAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJTY2hlZHVsZXIgPSBjcmVhdGVSZW5kZXJTY2hlZHVsZXIoKTtcbiAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJFdmVudE1hbmFnZXIgPSBjcmVhdGVSZW5kZXJFdmVudE1hbmFnZXIoe1xuICAgIHN1c3BlbnNlOiAoZXZlbnQpID0+IHRoaXMuc2V0UmVuZGVyZWRWYWx1ZSh1bmRlZmluZWQsIGV2ZW50LnN5bmNocm9ub3VzKSxcbiAgICBuZXh0OiAoZXZlbnQpID0+IHRoaXMuc2V0UmVuZGVyZWRWYWx1ZShldmVudC52YWx1ZSwgZXZlbnQuc3luY2hyb25vdXMpLFxuICAgIGVycm9yOiAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5yZXNldCkge1xuICAgICAgICB0aGlzLnNldFJlbmRlcmVkVmFsdWUodW5kZWZpbmVkLCBldmVudC5zeW5jaHJvbm91cyk7XG4gICAgICB9XG4gICAgICB0aGlzLmVycm9ySGFuZGxlci5oYW5kbGVFcnJvcihldmVudC5lcnJvcik7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQucmVzZXQpIHtcbiAgICAgICAgdGhpcy5zZXRSZW5kZXJlZFZhbHVlKHVuZGVmaW5lZCwgZXZlbnQuc3luY2hyb25vdXMpO1xuICAgICAgfVxuICAgIH0sXG4gIH0pO1xuICBwcml2YXRlIHJlYWRvbmx5IHN1YnNjcmlwdGlvbjogVW5zdWJzY3JpYmFibGU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlcikge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5yZW5kZXJFdmVudE1hbmFnZXJcbiAgICAgIC5oYW5kbGVQb3RlbnRpYWxPYnNlcnZhYmxlQ2hhbmdlcygpXG4gICAgICAuc3Vic2NyaWJlKCk7XG4gIH1cblxuICB0cmFuc2Zvcm08UE8+KHBvdGVudGlhbE9ic2VydmFibGU6IFBPKTogUHVzaFBpcGVSZXN1bHQ8UE8+IHtcbiAgICB0aGlzLnJlbmRlckV2ZW50TWFuYWdlci5uZXh0UG90ZW50aWFsT2JzZXJ2YWJsZShwb3RlbnRpYWxPYnNlcnZhYmxlKTtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJlZFZhbHVlIGFzIFB1c2hQaXBlUmVzdWx0PFBPPjtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIHNldFJlbmRlcmVkVmFsdWUodmFsdWU6IHVua25vd24sIGlzU3luY0V2ZW50OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLnJlbmRlcmVkVmFsdWUpIHtcbiAgICAgIHRoaXMucmVuZGVyZWRWYWx1ZSA9IHZhbHVlO1xuXG4gICAgICBpZiAoIWlzU3luY0V2ZW50KSB7XG4gICAgICAgIHRoaXMucmVuZGVyU2NoZWR1bGVyLnNjaGVkdWxlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=