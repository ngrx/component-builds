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
        this.subscription = this.cdAware.subscribe();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQvc3JjL3B1c2gvcHVzaC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsWUFBWSxFQUNaLE1BQU0sRUFFTixJQUFJLEdBRUwsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFXLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUUvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMENHO0FBRUgsTUFBTSxPQUFPLFFBQVE7SUFjbkIsWUFDRSxLQUF3QixFQUN4QixNQUFjLEVBQ2QsWUFBMEI7UUFaWCx5QkFBb0IsR0FBdUI7WUFDMUQsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7U0FDN0MsQ0FBQztRQUNlLDhCQUF5QixHQUV0QztZQUNGLElBQUksRUFBRSxDQUFDLEtBQTJCLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDcEUsQ0FBQztRQU9BLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFJO1lBQzlCLE1BQU0sRUFBRSxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDdkMseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QjtZQUN6RCxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CO1lBQy9DLFlBQVk7U0FDYixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUtELFNBQVMsQ0FDUCxtQkFBMEQ7UUFFMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzFELE9BQU8sSUFBSSxDQUFDLGFBQW9CLENBQUM7SUFDbkMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7Ozs7WUF6Q0YsSUFBSSxTQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFOzs7Ozs7Ozs7O1lBdERyQyxpQkFBaUI7WUFFakIsTUFBTTtZQUROLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRXJyb3JIYW5kbGVyLFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgUGlwZSxcbiAgUGlwZVRyYW5zZm9ybSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZXh0T2JzZXJ2ZXIsIE9ic2VydmFibGVJbnB1dCwgVW5zdWJzY3JpYmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENkQXdhcmUsIGNyZWF0ZUNkQXdhcmUgfSBmcm9tICcuLi9jb3JlL2NkLWF3YXJlL2NkLWF3YXJlX2NyZWF0b3InO1xuaW1wb3J0IHsgY3JlYXRlUmVuZGVyIH0gZnJvbSAnLi4vY29yZS9jZC1hd2FyZS9jcmVhdG9yX3JlbmRlcic7XG5cbi8qKlxuICogQFBpcGUgUHVzaFBpcGVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBUaGUgYG5ncnhQdXNoYCBwaXBlIHNlcnZlcyBhcyBhIGRyb3AtaW4gcmVwbGFjZW1lbnQgZm9yIHRoZSBgYXN5bmNgIHBpcGUuXG4gKiBJdCBjb250YWlucyBpbnRlbGxpZ2VudCBoYW5kbGluZyBvZiBjaGFuZ2UgZGV0ZWN0aW9uIHRvIGVuYWJsZSB1c1xuICogcnVubmluZyBpbiB6b25lLWZ1bGwgYXMgd2VsbCBhcyB6b25lLWxlc3MgbW9kZSB3aXRob3V0IGFueSBjaGFuZ2VzIHRvIHRoZSBjb2RlLlxuICpcbiAqIFRoZSBjdXJyZW50IHdheSBvZiBiaW5kaW5nIGFuIG9ic2VydmFibGUgdG8gdGhlIHZpZXcgbG9va3MgbGlrZSB0aGF0OlxuICogIGBgYGh0bWxcbiAqICB7e29ic2VydmFibGUkIHwgYXN5bmN9fVxuICogPG5nLWNvbnRhaW5lciAqbmdJZj1cIm9ic2VydmFibGUkIHwgYXN5bmMgYXMgb1wiPnt7b319PC9uZy1jb250YWluZXI+XG4gKiA8Y29tcG9uZW50IFt2YWx1ZV09XCJvYnNlcnZhYmxlJCB8IGFzeW5jXCI+PC9jb21wb25lbnQ+XG4gKiBgYGBcbiAqXG4gKiBUaGUgcHJvYmxlbSBpcyBgYXN5bmNgIHBpcGUganVzdCBtYXJrcyB0aGUgY29tcG9uZW50IGFuZCBhbGwgaXRzIGFuY2VzdG9ycyBhcyBkaXJ0eS5cbiAqIEl0IG5lZWRzIHpvbmUuanMgbWljcm90YXNrIHF1ZXVlIHRvIGV4aGF1c3QgdW50aWwgYEFwcGxpY2F0aW9uUmVmLnRpY2tgIGlzIGNhbGxlZCB0byByZW5kZXJfY3JlYXRvciBhbGwgZGlydHkgbWFya2VkXG4gKiAgICAgY29tcG9uZW50cy5cbiAqXG4gKiBIZWF2eSBkeW5hbWljIGFuZCBpbnRlcmFjdGl2ZSBVSXMgc3VmZmVyIGZyb20gem9uZXMgY2hhbmdlIGRldGVjdGlvbiBhIGxvdCBhbmQgY2FuXG4gKiBsZWFuIHRvIGJhZCBwZXJmb3JtYW5jZSBvciBldmVuIHVudXNhYmxlIGFwcGxpY2F0aW9ucywgYnV0IHRoZSBgYXN5bmNgIHBpcGUgZG9lcyBub3Qgd29yayBpbiB6b25lLWxlc3MgbW9kZS5cbiAqXG4gKiBgbmdyeFB1c2hgIHBpcGUgc29sdmVzIHRoYXQgcHJvYmxlbS5cbiAqXG4gKiBJbmNsdWRlZCBGZWF0dXJlczpcbiAqICAtIFRha2Ugb2JzZXJ2YWJsZXMgb3IgcHJvbWlzZXMsIHJldHJpZXZlIHRoZWlyIHZhbHVlcyBhbmQgcmVuZGVyX2NyZWF0b3IgdGhlIHZhbHVlIHRvIHRoZSB0ZW1wbGF0ZVxuICogIC0gSGFuZGxpbmcgbnVsbCBhbmQgdW5kZWZpbmVkIHZhbHVlcyBpbiBhIGNsZWFuIHVuaWZpZWQvc3RydWN0dXJlZCB3YXlcbiAqICAtIFRyaWdnZXJzIGNoYW5nZS1kZXRlY3Rpb24gZGlmZmVyZW50bHkgaWYgYHpvbmUuanNgIGlzIHByZXNlbnQgb3Igbm90IChgZGV0ZWN0Q2hhbmdlc2Agb3IgYG1hcmtGb3JDaGVja2ApXG4gKiAgLSBEaXN0aW5jdCBzYW1lIHZhbHVlcyBpbiBhIHJvdyB0byBpbmNyZWFzZSBwZXJmb3JtYW5jZVxuICogIC0gQ29hbGVzY2luZyBvZiBjaGFuZ2UgZGV0ZWN0aW9uIGNhbGxzIHRvIGJvb3N0IHBlcmZvcm1hbmNlXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBgbmdyeFB1c2hgIHBpcGUgc29sdmVzIHRoYXQgcHJvYmxlbS4gSXQgY2FuIGJlIHVzZWQgbGlrZSBzaG93biBoZXJlOlxuICogYGBgaHRtbFxuICoge3tvYnNlcnZhYmxlJCB8IG5ncnhQdXNofX1cbiAqIDxuZy1jb250YWluZXIgKm5nSWY9XCJvYnNlcnZhYmxlJCB8IG5ncnhQdXNoIGFzIG9cIj57e299fTwvbmctY29udGFpbmVyPlxuICogPGNvbXBvbmVudCBbdmFsdWVdPVwib2JzZXJ2YWJsZSQgfCBuZ3J4UHVzaFwiPjwvY29tcG9uZW50PlxuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5AUGlwZSh7IG5hbWU6ICduZ3J4UHVzaCcsIHB1cmU6IGZhbHNlIH0pXG5leHBvcnQgY2xhc3MgUHVzaFBpcGU8Uz4gaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtLCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlbmRlcmVkVmFsdWU6IFMgfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgc3Vic2NyaXB0aW9uOiBVbnN1YnNjcmliYWJsZTtcbiAgcHJpdmF0ZSByZWFkb25seSBjZEF3YXJlOiBDZEF3YXJlPFMgfCBudWxsIHwgdW5kZWZpbmVkPjtcbiAgcHJpdmF0ZSByZWFkb25seSByZXNldENvbnRleHRPYnNlcnZlcjogTmV4dE9ic2VydmVyPHZvaWQ+ID0ge1xuICAgIG5leHQ6ICgpID0+ICh0aGlzLnJlbmRlcmVkVmFsdWUgPSB1bmRlZmluZWQpLFxuICB9O1xuICBwcml2YXRlIHJlYWRvbmx5IHVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXI6IE5leHRPYnNlcnZlcjxcbiAgICBTIHwgbnVsbCB8IHVuZGVmaW5lZFxuICA+ID0ge1xuICAgIG5leHQ6ICh2YWx1ZTogUyB8IG51bGwgfCB1bmRlZmluZWQpID0+ICh0aGlzLnJlbmRlcmVkVmFsdWUgPSB2YWx1ZSksXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIG5nWm9uZTogTmdab25lLFxuICAgIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHRoaXMuY2RBd2FyZSA9IGNyZWF0ZUNkQXdhcmU8Uz4oe1xuICAgICAgcmVuZGVyOiBjcmVhdGVSZW5kZXIoeyBjZFJlZiwgbmdab25lIH0pLFxuICAgICAgdXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcjogdGhpcy51cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyLFxuICAgICAgcmVzZXRDb250ZXh0T2JzZXJ2ZXI6IHRoaXMucmVzZXRDb250ZXh0T2JzZXJ2ZXIsXG4gICAgICBlcnJvckhhbmRsZXIsXG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmNkQXdhcmUuc3Vic2NyaWJlKCk7XG4gIH1cblxuICB0cmFuc2Zvcm08VD4ocG90ZW50aWFsT2JzZXJ2YWJsZTogbnVsbCk6IG51bGw7XG4gIHRyYW5zZm9ybTxUPihwb3RlbnRpYWxPYnNlcnZhYmxlOiB1bmRlZmluZWQpOiB1bmRlZmluZWQ7XG4gIHRyYW5zZm9ybTxUPihwb3RlbnRpYWxPYnNlcnZhYmxlOiBPYnNlcnZhYmxlSW5wdXQ8VD4pOiBUIHwgdW5kZWZpbmVkO1xuICB0cmFuc2Zvcm08VD4oXG4gICAgcG90ZW50aWFsT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZUlucHV0PFQ+IHwgbnVsbCB8IHVuZGVmaW5lZFxuICApOiBUIHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gICAgdGhpcy5jZEF3YXJlLm5leHRQb3RlbnRpYWxPYnNlcnZhYmxlKHBvdGVudGlhbE9ic2VydmFibGUpO1xuICAgIHJldHVybiB0aGlzLnJlbmRlcmVkVmFsdWUgYXMgYW55O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19