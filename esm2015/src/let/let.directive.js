/**
 * @fileoverview added by tsickle
 * Generated from: src/let/let.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Directive, Input, NgZone, TemplateRef, ViewContainerRef, } from '@angular/core';
import { createCdAware, createRender } from '../core';
/**
 * @record
 * @template T
 */
export function LetViewContext() { }
if (false) {
    /** @type {?|undefined} */
    LetViewContext.prototype.$implicit;
    /** @type {?|undefined} */
    LetViewContext.prototype.ngrxLet;
    /** @type {?|undefined} */
    LetViewContext.prototype.$error;
    /** @type {?|undefined} */
    LetViewContext.prototype.$complete;
}
/**
 * \@Directive LetDirective
 *
 * \@description
 *
 * The `*ngrxLet` directive serves a convenient way of binding observables to a view context (a dom element scope).
 * It also helps with several internal processing under the hood.
 *
 * The current way of binding an observable to the view looks like that:
 * ```html
 * <ng-container *ngIf="observableNumber$ as n">
 * <app-number [number]="n">
 * </app-number>
 * <app-number-special [number]="n">
 * </app-number-special>
 * </ng-container>
 *  ```
 *
 *  The problem is `*ngIf` is also interfering with rendering and in case of a `0` the component would be hidden
 *
 * Included Features:
 * - binding is always present. (`*ngIf="truthy$"`)
 * - it takes away the multiple usages of the `async` or `ngrxPush` pipe
 * - a unified/structured way of handling null and undefined
 * - triggers change-detection differently if `zone.js` is present or not (`ChangeDetectorRef.detectChanges` or `ChangeDetectorRef.markForCheck`)
 * - triggers change-detection differently if ViewEngine or Ivy is present (`ChangeDetectorRef.detectChanges` or `ɵdetectChanges`)
 * - distinct same values in a row (distinctUntilChanged operator),
 *
 * \@usageNotes
 *
 * The `*ngrxLet` directive take over several things and makes it more convenient and save to work with streams in the template
 * `<ng-container *ngrxLet="observableNumber$ as c"></ng-container>`
 *
 * ```html
 * <ng-container *ngrxLet="observableNumber$ as n">
 * <app-number [number]="n">
 * </app-number>
 * </ng-container>
 *
 * <ng-container *ngrxLet="observableNumber$; let n">
 * <app-number [number]="n">
 * </app-number>
 * </ng-container>
 * ```
 *
 * In addition to that it provides us information from the whole observable context.
 * We can track the observables:
 * - next value
 * - error value
 * - complete state
 *
 * ```html
 * <ng-container *ngrxLet="observableNumber$; let n; let e = $error, let c = $complete">
 * <app-number [number]="n"  *ngIf="!e && !c">
 * </app-number>
 * <ng-container *ngIf="e">
 * There is an error: {{e}}
 * </ng-container>
 * <ng-container *ngIf="c">
 * Observable completed: {{c}}
 * </ng-container>
 * </ng-container>
 * ```
 *
 * \@publicApi
 * @template U
 */
export class LetDirective {
    /**
     * @param {?} cdRef
     * @param {?} ngZone
     * @param {?} templateRef
     * @param {?} viewContainerRef
     */
    constructor(cdRef, ngZone, templateRef, viewContainerRef) {
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.ViewContext = {
            $implicit: undefined,
            ngrxLet: undefined,
            $error: false,
            $complete: false,
        };
        this.resetContextObserver = {
            next: (/**
             * @return {?}
             */
            () => {
                // if not initialized no need to set undefined
                if (this.embeddedView) {
                    this.ViewContext.$implicit = undefined;
                    this.ViewContext.ngrxLet = undefined;
                    this.ViewContext.$error = false;
                    this.ViewContext.$complete = false;
                }
            }),
        };
        this.updateViewContextObserver = {
            next: (/**
             * @param {?} value
             * @return {?}
             */
            (value) => {
                // to have init lazy
                if (!this.embeddedView) {
                    this.createEmbeddedView();
                }
                this.ViewContext.$implicit = value;
                this.ViewContext.ngrxLet = value;
            }),
            error: (/**
             * @param {?} error
             * @return {?}
             */
            (error) => {
                // to have init lazy
                if (!this.embeddedView) {
                    this.createEmbeddedView();
                }
                this.ViewContext.$error = true;
            }),
            complete: (/**
             * @return {?}
             */
            () => {
                // to have init lazy
                if (!this.embeddedView) {
                    this.createEmbeddedView();
                }
                this.ViewContext.$complete = true;
            }),
        };
        this.cdAware = createCdAware({
            render: createRender({ cdRef, ngZone }),
            resetContextObserver: this.resetContextObserver,
            updateViewContextObserver: this.updateViewContextObserver,
        });
        this.subscription = this.cdAware.subscribe();
    }
    /**
     * @template U
     * @param {?} dir
     * @param {?} ctx
     * @return {?}
     */
    static ngTemplateContextGuard(dir, ctx) {
        return true;
    }
    /**
     * @param {?} potentialObservable
     * @return {?}
     */
    set ngrxLet(potentialObservable) {
        this.cdAware.nextPotentialObservable(potentialObservable);
    }
    /**
     * @return {?}
     */
    createEmbeddedView() {
        this.embeddedView = this.viewContainerRef.createEmbeddedView(this.templateRef, this.ViewContext);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.viewContainerRef.clear();
    }
}
LetDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngrxLet]' },] }
];
/** @nocollapse */
LetDirective.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: TemplateRef },
    { type: ViewContainerRef }
];
LetDirective.propDecorators = {
    ngrxLet: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    LetDirective.ngTemplateGuard_ngrxLet;
    /**
     * @type {?}
     * @private
     */
    LetDirective.prototype.embeddedView;
    /**
     * @type {?}
     * @private
     */
    LetDirective.prototype.ViewContext;
    /**
     * @type {?}
     * @protected
     */
    LetDirective.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    LetDirective.prototype.cdAware;
    /**
     * @type {?}
     * @private
     */
    LetDirective.prototype.resetContextObserver;
    /**
     * @type {?}
     * @private
     */
    LetDirective.prototype.updateViewContextObserver;
    /**
     * @type {?}
     * @private
     */
    LetDirective.prototype.templateRef;
    /**
     * @type {?}
     * @private
     */
    LetDirective.prototype.viewContainerRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9sZXQvbGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBRU4sV0FBVyxFQUNYLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQVcsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7QUFFL0Qsb0NBU0M7OztJQVBDLG1DQUFjOztJQUVkLGlDQUFZOztJQUVaLGdDQUFpQjs7SUFFakIsbUNBQW9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzRXRCLE1BQU0sT0FBTyxZQUFZOzs7Ozs7O0lBNkR2QixZQUNFLEtBQXdCLEVBQ3hCLE1BQWMsRUFDRyxXQUEyQyxFQUMzQyxnQkFBa0M7UUFEbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWdDO1FBQzNDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUEvRHBDLGdCQUFXLEdBQXlDO1lBQ25FLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FBQztRQUllLHlCQUFvQixHQUF1QjtZQUMxRCxJQUFJOzs7WUFBRSxHQUFHLEVBQUU7Z0JBQ1QsOENBQThDO2dCQUM5QyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztvQkFDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO29CQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztpQkFDcEM7WUFDSCxDQUFDLENBQUE7U0FDRixDQUFDO1FBQ2UsOEJBQXlCLEdBQW1DO1lBQzNFLElBQUk7Ozs7WUFBRSxDQUFDLEtBQTJCLEVBQUUsRUFBRTtnQkFDcEMsb0JBQW9CO2dCQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDdEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7aUJBQzNCO2dCQUNELElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ25DLENBQUMsQ0FBQTtZQUNELEtBQUs7Ozs7WUFBRSxDQUFDLEtBQVksRUFBRSxFQUFFO2dCQUN0QixvQkFBb0I7Z0JBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUN0QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztpQkFDM0I7Z0JBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLENBQUMsQ0FBQTtZQUNELFFBQVE7OztZQUFFLEdBQUcsRUFBRTtnQkFDYixvQkFBb0I7Z0JBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUN0QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztpQkFDM0I7Z0JBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLENBQUMsQ0FBQTtTQUNGLENBQUM7UUFzQkEsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUk7WUFDOUIsTUFBTSxFQUFFLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztZQUN2QyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CO1lBQy9DLHlCQUF5QixFQUFFLElBQUksQ0FBQyx5QkFBeUI7U0FDMUQsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQy9DLENBQUM7Ozs7Ozs7SUExQkQsTUFBTSxDQUFDLHNCQUFzQixDQUMzQixHQUFvQixFQUNwQixHQUErQjtRQUUvQixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBSUQsSUFDSSxPQUFPLENBQUMsbUJBQTBEO1FBQ3BFLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUM1RCxDQUFDOzs7O0lBZ0JELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FDMUQsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FDakIsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7O1lBdEZGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUU7Ozs7WUF6RmxDLGlCQUFpQjtZQUdqQixNQUFNO1lBRU4sV0FBVztZQUNYLGdCQUFnQjs7O3NCQTRJZixLQUFLOzs7O0lBRk4scUNBQTBDOzs7OztJQXJEMUMsb0NBQTBCOzs7OztJQUMxQixtQ0FLRTs7Ozs7SUFFRixvQ0FBZ0Q7Ozs7O0lBQ2hELCtCQUF3RDs7Ozs7SUFDeEQsNENBVUU7Ozs7O0lBQ0YsaURBdUJFOzs7OztJQW1CQSxtQ0FBNEQ7Ozs7O0lBQzVELHdDQUFtRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOZXh0T2JzZXJ2ZXIsIE9ic2VydmFibGVJbnB1dCwgT2JzZXJ2ZXIsIFVuc3Vic2NyaWJhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDZEF3YXJlLCBjcmVhdGVDZEF3YXJlLCBjcmVhdGVSZW5kZXIgfSBmcm9tICcuLi9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBMZXRWaWV3Q29udGV4dDxUPiB7XG4gIC8vIHRvIGVuYWJsZSBgbGV0YCBzeW50YXggd2UgaGF2ZSB0byB1c2UgJGltcGxpY2l0ICh2YXI7IGxldCB2ID0gdmFyKVxuICAkaW1wbGljaXQ/OiBUO1xuICAvLyB0byBlbmFibGUgYGFzYCBzeW50YXggd2UgaGF2ZSB0byBhc3NpZ24gdGhlIGRpcmVjdGl2ZXMgc2VsZWN0b3IgKHZhciBhcyB2KVxuICBuZ3J4TGV0PzogVDtcbiAgLy8gc2V0IGNvbnRleHQgdmFyIGNvbXBsZXRlIHRvIHRydWUgKHZhciQ7IGxldCBlID0gJGVycm9yKVxuICAkZXJyb3I/OiBib29sZWFuO1xuICAvLyBzZXQgY29udGV4dCB2YXIgY29tcGxldGUgdG8gdHJ1ZSAodmFyJDsgbGV0IGMgPSAkY29tcGxldGUpXG4gICRjb21wbGV0ZT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQERpcmVjdGl2ZSBMZXREaXJlY3RpdmVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBUaGUgYCpuZ3J4TGV0YCBkaXJlY3RpdmUgc2VydmVzIGEgY29udmVuaWVudCB3YXkgb2YgYmluZGluZyBvYnNlcnZhYmxlcyB0byBhIHZpZXcgY29udGV4dCAoYSBkb20gZWxlbWVudCBzY29wZSkuXG4gKiBJdCBhbHNvIGhlbHBzIHdpdGggc2V2ZXJhbCBpbnRlcm5hbCBwcm9jZXNzaW5nIHVuZGVyIHRoZSBob29kLlxuICpcbiAqIFRoZSBjdXJyZW50IHdheSBvZiBiaW5kaW5nIGFuIG9ic2VydmFibGUgdG8gdGhlIHZpZXcgbG9va3MgbGlrZSB0aGF0OlxuICogYGBgaHRtbFxuICogPG5nLWNvbnRhaW5lciAqbmdJZj1cIm9ic2VydmFibGVOdW1iZXIkIGFzIG5cIj5cbiAqIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiPlxuICogPC9hcHAtbnVtYmVyPlxuICogPGFwcC1udW1iZXItc3BlY2lhbCBbbnVtYmVyXT1cIm5cIj5cbiAqIDwvYXBwLW51bWJlci1zcGVjaWFsPlxuICogPC9uZy1jb250YWluZXI+XG4gKiAgYGBgXG4gKlxuICogIFRoZSBwcm9ibGVtIGlzIGAqbmdJZmAgaXMgYWxzbyBpbnRlcmZlcmluZyB3aXRoIHJlbmRlcmluZyBhbmQgaW4gY2FzZSBvZiBhIGAwYCB0aGUgY29tcG9uZW50IHdvdWxkIGJlIGhpZGRlblxuICpcbiAqIEluY2x1ZGVkIEZlYXR1cmVzOlxuICogLSBiaW5kaW5nIGlzIGFsd2F5cyBwcmVzZW50LiAoYCpuZ0lmPVwidHJ1dGh5JFwiYClcbiAqIC0gaXQgdGFrZXMgYXdheSB0aGUgbXVsdGlwbGUgdXNhZ2VzIG9mIHRoZSBgYXN5bmNgIG9yIGBuZ3J4UHVzaGAgcGlwZVxuICogLSBhIHVuaWZpZWQvc3RydWN0dXJlZCB3YXkgb2YgaGFuZGxpbmcgbnVsbCBhbmQgdW5kZWZpbmVkXG4gKiAtIHRyaWdnZXJzIGNoYW5nZS1kZXRlY3Rpb24gZGlmZmVyZW50bHkgaWYgYHpvbmUuanNgIGlzIHByZXNlbnQgb3Igbm90IChgQ2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlc2Agb3IgYENoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVja2ApXG4gKiAtIHRyaWdnZXJzIGNoYW5nZS1kZXRlY3Rpb24gZGlmZmVyZW50bHkgaWYgVmlld0VuZ2luZSBvciBJdnkgaXMgcHJlc2VudCAoYENoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXNgIG9yIGDJtWRldGVjdENoYW5nZXNgKVxuICogLSBkaXN0aW5jdCBzYW1lIHZhbHVlcyBpbiBhIHJvdyAoZGlzdGluY3RVbnRpbENoYW5nZWQgb3BlcmF0b3IpLFxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogVGhlIGAqbmdyeExldGAgZGlyZWN0aXZlIHRha2Ugb3ZlciBzZXZlcmFsIHRoaW5ncyBhbmQgbWFrZXMgaXQgbW9yZSBjb252ZW5pZW50IGFuZCBzYXZlIHRvIHdvcmsgd2l0aCBzdHJlYW1zIGluIHRoZSB0ZW1wbGF0ZVxuICogYDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJvYnNlcnZhYmxlTnVtYmVyJCBhcyBjXCI+PC9uZy1jb250YWluZXI+YFxuICpcbiAqIGBgYGh0bWxcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJvYnNlcnZhYmxlTnVtYmVyJCBhcyBuXCI+XG4gKiA8YXBwLW51bWJlciBbbnVtYmVyXT1cIm5cIj5cbiAqIDwvYXBwLW51bWJlcj5cbiAqIDwvbmctY29udGFpbmVyPlxuICpcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJvYnNlcnZhYmxlTnVtYmVyJDsgbGV0IG5cIj5cbiAqIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiPlxuICogPC9hcHAtbnVtYmVyPlxuICogPC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiBJbiBhZGRpdGlvbiB0byB0aGF0IGl0IHByb3ZpZGVzIHVzIGluZm9ybWF0aW9uIGZyb20gdGhlIHdob2xlIG9ic2VydmFibGUgY29udGV4dC5cbiAqIFdlIGNhbiB0cmFjayB0aGUgb2JzZXJ2YWJsZXM6XG4gKiAtIG5leHQgdmFsdWVcbiAqIC0gZXJyb3IgdmFsdWVcbiAqIC0gY29tcGxldGUgc3RhdGVcbiAqXG4gKiBgYGBodG1sXG4gKiA8bmctY29udGFpbmVyICpuZ3J4TGV0PVwib2JzZXJ2YWJsZU51bWJlciQ7IGxldCBuOyBsZXQgZSA9ICRlcnJvciwgbGV0IGMgPSAkY29tcGxldGVcIj5cbiAqIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiICAqbmdJZj1cIiFlICYmICFjXCI+XG4gKiA8L2FwcC1udW1iZXI+XG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwiZVwiPlxuICogVGhlcmUgaXMgYW4gZXJyb3I6IHt7ZX19XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIDxuZy1jb250YWluZXIgKm5nSWY9XCJjXCI+XG4gKiBPYnNlcnZhYmxlIGNvbXBsZXRlZDoge3tjfX1cbiAqIDwvbmctY29udGFpbmVyPlxuICogPC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ3J4TGV0XScgfSlcbmV4cG9ydCBjbGFzcyBMZXREaXJlY3RpdmU8VT4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGVtYmVkZGVkVmlldzogYW55O1xuICBwcml2YXRlIHJlYWRvbmx5IFZpZXdDb250ZXh0OiBMZXRWaWV3Q29udGV4dDxVIHwgdW5kZWZpbmVkIHwgbnVsbD4gPSB7XG4gICAgJGltcGxpY2l0OiB1bmRlZmluZWQsXG4gICAgbmdyeExldDogdW5kZWZpbmVkLFxuICAgICRlcnJvcjogZmFsc2UsXG4gICAgJGNvbXBsZXRlOiBmYWxzZSxcbiAgfTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc3Vic2NyaXB0aW9uOiBVbnN1YnNjcmliYWJsZTtcbiAgcHJpdmF0ZSByZWFkb25seSBjZEF3YXJlOiBDZEF3YXJlPFUgfCBudWxsIHwgdW5kZWZpbmVkPjtcbiAgcHJpdmF0ZSByZWFkb25seSByZXNldENvbnRleHRPYnNlcnZlcjogTmV4dE9ic2VydmVyPHZvaWQ+ID0ge1xuICAgIG5leHQ6ICgpID0+IHtcbiAgICAgIC8vIGlmIG5vdCBpbml0aWFsaXplZCBubyBuZWVkIHRvIHNldCB1bmRlZmluZWRcbiAgICAgIGlmICh0aGlzLmVtYmVkZGVkVmlldykge1xuICAgICAgICB0aGlzLlZpZXdDb250ZXh0LiRpbXBsaWNpdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5WaWV3Q29udGV4dC5uZ3J4TGV0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLlZpZXdDb250ZXh0LiRlcnJvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLlZpZXdDb250ZXh0LiRjb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG4gIHByaXZhdGUgcmVhZG9ubHkgdXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcjogT2JzZXJ2ZXI8VSB8IG51bGwgfCB1bmRlZmluZWQ+ID0ge1xuICAgIG5leHQ6ICh2YWx1ZTogVSB8IG51bGwgfCB1bmRlZmluZWQpID0+IHtcbiAgICAgIC8vIHRvIGhhdmUgaW5pdCBsYXp5XG4gICAgICBpZiAoIXRoaXMuZW1iZWRkZWRWaWV3KSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRW1iZWRkZWRWaWV3KCk7XG4gICAgICB9XG4gICAgICB0aGlzLlZpZXdDb250ZXh0LiRpbXBsaWNpdCA9IHZhbHVlO1xuICAgICAgdGhpcy5WaWV3Q29udGV4dC5uZ3J4TGV0ID0gdmFsdWU7XG4gICAgfSxcbiAgICBlcnJvcjogKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgLy8gdG8gaGF2ZSBpbml0IGxhenlcbiAgICAgIGlmICghdGhpcy5lbWJlZGRlZFZpZXcpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVFbWJlZGRlZFZpZXcoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuVmlld0NvbnRleHQuJGVycm9yID0gdHJ1ZTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAvLyB0byBoYXZlIGluaXQgbGF6eVxuICAgICAgaWYgKCF0aGlzLmVtYmVkZGVkVmlldykge1xuICAgICAgICB0aGlzLmNyZWF0ZUVtYmVkZGVkVmlldygpO1xuICAgICAgfVxuICAgICAgdGhpcy5WaWV3Q29udGV4dC4kY29tcGxldGUgPSB0cnVlO1xuICAgIH0sXG4gIH07XG5cbiAgc3RhdGljIG5nVGVtcGxhdGVDb250ZXh0R3VhcmQ8VT4oXG4gICAgZGlyOiBMZXREaXJlY3RpdmU8VT4sXG4gICAgY3R4OiB1bmtub3duIHwgbnVsbCB8IHVuZGVmaW5lZFxuICApOiBjdHggaXMgTGV0Vmlld0NvbnRleHQ8VT4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhdGljIG5nVGVtcGxhdGVHdWFyZF9uZ3J4TGV0OiAnYmluZGluZyc7XG5cbiAgQElucHV0KClcbiAgc2V0IG5ncnhMZXQocG90ZW50aWFsT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZUlucHV0PFU+IHwgbnVsbCB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuY2RBd2FyZS5uZXh0UG90ZW50aWFsT2JzZXJ2YWJsZShwb3RlbnRpYWxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxMZXRWaWV3Q29udGV4dDxVPj4sXG4gICAgcHJpdmF0ZSByZWFkb25seSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmXG4gICkge1xuICAgIHRoaXMuY2RBd2FyZSA9IGNyZWF0ZUNkQXdhcmU8VT4oe1xuICAgICAgcmVuZGVyOiBjcmVhdGVSZW5kZXIoeyBjZFJlZiwgbmdab25lIH0pLFxuICAgICAgcmVzZXRDb250ZXh0T2JzZXJ2ZXI6IHRoaXMucmVzZXRDb250ZXh0T2JzZXJ2ZXIsXG4gICAgICB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiB0aGlzLnVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXIsXG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmNkQXdhcmUuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBjcmVhdGVFbWJlZGRlZFZpZXcoKSB7XG4gICAgdGhpcy5lbWJlZGRlZFZpZXcgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KFxuICAgICAgdGhpcy50ZW1wbGF0ZVJlZixcbiAgICAgIHRoaXMuVmlld0NvbnRleHRcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgfVxufVxuIl19