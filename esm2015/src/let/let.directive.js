/**
 * @fileoverview added by tsickle
 * Generated from: src/let/let.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Directive, Input, NgZone, TemplateRef, ViewContainerRef, } from '@angular/core';
import { createCdAware } from '../core/cd-aware/cd-aware_creator';
import { createRender } from '../core/cd-aware/creator_render';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC8iLCJzb3VyY2VzIjpbInNyYy9sZXQvbGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBRU4sV0FBVyxFQUNYLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQVcsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7OztBQUUvRCxvQ0FTQzs7O0lBUEMsbUNBQWM7O0lBRWQsaUNBQVk7O0lBRVosZ0NBQWlCOztJQUVqQixtQ0FBb0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNFdEIsTUFBTSxPQUFPLFlBQVk7Ozs7Ozs7SUE2RHZCLFlBQ0UsS0FBd0IsRUFDeEIsTUFBYyxFQUNHLFdBQTJDLEVBQzNDLGdCQUFrQztRQURsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0M7UUFDM0MscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQS9EcEMsZ0JBQVcsR0FBeUM7WUFDbkUsU0FBUyxFQUFFLFNBQVM7WUFDcEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDO1FBSWUseUJBQW9CLEdBQXVCO1lBQzFELElBQUk7OztZQUFFLEdBQUcsRUFBRTtnQkFDVCw4Q0FBOEM7Z0JBQzlDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO29CQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2lCQUNwQztZQUNILENBQUMsQ0FBQTtTQUNGLENBQUM7UUFDZSw4QkFBeUIsR0FBbUM7WUFDM0UsSUFBSTs7OztZQUFFLENBQUMsS0FBMkIsRUFBRSxFQUFFO2dCQUNwQyxvQkFBb0I7Z0JBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUN0QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztpQkFDM0I7Z0JBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDbkMsQ0FBQyxDQUFBO1lBQ0QsS0FBSzs7OztZQUFFLENBQUMsS0FBWSxFQUFFLEVBQUU7Z0JBQ3RCLG9CQUFvQjtnQkFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2lCQUMzQjtnQkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDakMsQ0FBQyxDQUFBO1lBQ0QsUUFBUTs7O1lBQUUsR0FBRyxFQUFFO2dCQUNiLG9CQUFvQjtnQkFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2lCQUMzQjtnQkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDcEMsQ0FBQyxDQUFBO1NBQ0YsQ0FBQztRQXNCQSxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBSTtZQUM5QixNQUFNLEVBQUUsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1lBQ3ZDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0I7WUFDL0MseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QjtTQUMxRCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDL0MsQ0FBQzs7Ozs7OztJQTFCRCxNQUFNLENBQUMsc0JBQXNCLENBQzNCLEdBQW9CLEVBQ3BCLEdBQStCO1FBRS9CLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFJRCxJQUNJLE9BQU8sQ0FBQyxtQkFBMEQ7UUFDcEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzVELENBQUM7Ozs7SUFnQkQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUMxRCxJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsV0FBVyxDQUNqQixDQUFDO0lBQ0osQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7WUF0RkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRTs7OztZQTNGbEMsaUJBQWlCO1lBR2pCLE1BQU07WUFFTixXQUFXO1lBQ1gsZ0JBQWdCOzs7c0JBOElmLEtBQUs7Ozs7SUFGTixxQ0FBMEM7Ozs7O0lBckQxQyxvQ0FBMEI7Ozs7O0lBQzFCLG1DQUtFOzs7OztJQUVGLG9DQUFnRDs7Ozs7SUFDaEQsK0JBQXdEOzs7OztJQUN4RCw0Q0FVRTs7Ozs7SUFDRixpREF1QkU7Ozs7O0lBbUJBLG1DQUE0RDs7Ozs7SUFDNUQsd0NBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE5leHRPYnNlcnZlciwgT2JzZXJ2YWJsZUlucHV0LCBPYnNlcnZlciwgVW5zdWJzY3JpYmFibGUgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQ2RBd2FyZSwgY3JlYXRlQ2RBd2FyZSB9IGZyb20gJy4uL2NvcmUvY2QtYXdhcmUvY2QtYXdhcmVfY3JlYXRvcic7XG5pbXBvcnQgeyBjcmVhdGVSZW5kZXIgfSBmcm9tICcuLi9jb3JlL2NkLWF3YXJlL2NyZWF0b3JfcmVuZGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBMZXRWaWV3Q29udGV4dDxUPiB7XG4gIC8vIHRvIGVuYWJsZSBgbGV0YCBzeW50YXggd2UgaGF2ZSB0byB1c2UgJGltcGxpY2l0ICh2YXI7IGxldCB2ID0gdmFyKVxuICAkaW1wbGljaXQ/OiBUO1xuICAvLyB0byBlbmFibGUgYGFzYCBzeW50YXggd2UgaGF2ZSB0byBhc3NpZ24gdGhlIGRpcmVjdGl2ZXMgc2VsZWN0b3IgKHZhciBhcyB2KVxuICBuZ3J4TGV0PzogVDtcbiAgLy8gc2V0IGNvbnRleHQgdmFyIGNvbXBsZXRlIHRvIHRydWUgKHZhciQ7IGxldCBlID0gJGVycm9yKVxuICAkZXJyb3I/OiBib29sZWFuO1xuICAvLyBzZXQgY29udGV4dCB2YXIgY29tcGxldGUgdG8gdHJ1ZSAodmFyJDsgbGV0IGMgPSAkY29tcGxldGUpXG4gICRjb21wbGV0ZT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQERpcmVjdGl2ZSBMZXREaXJlY3RpdmVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBUaGUgYCpuZ3J4TGV0YCBkaXJlY3RpdmUgc2VydmVzIGEgY29udmVuaWVudCB3YXkgb2YgYmluZGluZyBvYnNlcnZhYmxlcyB0byBhIHZpZXcgY29udGV4dCAoYSBkb20gZWxlbWVudCBzY29wZSkuXG4gKiBJdCBhbHNvIGhlbHBzIHdpdGggc2V2ZXJhbCBpbnRlcm5hbCBwcm9jZXNzaW5nIHVuZGVyIHRoZSBob29kLlxuICpcbiAqIFRoZSBjdXJyZW50IHdheSBvZiBiaW5kaW5nIGFuIG9ic2VydmFibGUgdG8gdGhlIHZpZXcgbG9va3MgbGlrZSB0aGF0OlxuICogYGBgaHRtbFxuICogPG5nLWNvbnRhaW5lciAqbmdJZj1cIm9ic2VydmFibGVOdW1iZXIkIGFzIG5cIj5cbiAqIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiPlxuICogPC9hcHAtbnVtYmVyPlxuICogPGFwcC1udW1iZXItc3BlY2lhbCBbbnVtYmVyXT1cIm5cIj5cbiAqIDwvYXBwLW51bWJlci1zcGVjaWFsPlxuICogPC9uZy1jb250YWluZXI+XG4gKiAgYGBgXG4gKlxuICogIFRoZSBwcm9ibGVtIGlzIGAqbmdJZmAgaXMgYWxzbyBpbnRlcmZlcmluZyB3aXRoIHJlbmRlcmluZyBhbmQgaW4gY2FzZSBvZiBhIGAwYCB0aGUgY29tcG9uZW50IHdvdWxkIGJlIGhpZGRlblxuICpcbiAqIEluY2x1ZGVkIEZlYXR1cmVzOlxuICogLSBiaW5kaW5nIGlzIGFsd2F5cyBwcmVzZW50LiAoYCpuZ0lmPVwidHJ1dGh5JFwiYClcbiAqIC0gaXQgdGFrZXMgYXdheSB0aGUgbXVsdGlwbGUgdXNhZ2VzIG9mIHRoZSBgYXN5bmNgIG9yIGBuZ3J4UHVzaGAgcGlwZVxuICogLSBhIHVuaWZpZWQvc3RydWN0dXJlZCB3YXkgb2YgaGFuZGxpbmcgbnVsbCBhbmQgdW5kZWZpbmVkXG4gKiAtIHRyaWdnZXJzIGNoYW5nZS1kZXRlY3Rpb24gZGlmZmVyZW50bHkgaWYgYHpvbmUuanNgIGlzIHByZXNlbnQgb3Igbm90IChgQ2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlc2Agb3IgYENoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVja2ApXG4gKiAtIHRyaWdnZXJzIGNoYW5nZS1kZXRlY3Rpb24gZGlmZmVyZW50bHkgaWYgVmlld0VuZ2luZSBvciBJdnkgaXMgcHJlc2VudCAoYENoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXNgIG9yIGDJtWRldGVjdENoYW5nZXNgKVxuICogLSBkaXN0aW5jdCBzYW1lIHZhbHVlcyBpbiBhIHJvdyAoZGlzdGluY3RVbnRpbENoYW5nZWQgb3BlcmF0b3IpLFxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogVGhlIGAqbmdyeExldGAgZGlyZWN0aXZlIHRha2Ugb3ZlciBzZXZlcmFsIHRoaW5ncyBhbmQgbWFrZXMgaXQgbW9yZSBjb252ZW5pZW50IGFuZCBzYXZlIHRvIHdvcmsgd2l0aCBzdHJlYW1zIGluIHRoZSB0ZW1wbGF0ZVxuICogYDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJvYnNlcnZhYmxlTnVtYmVyJCBhcyBjXCI+PC9uZy1jb250YWluZXI+YFxuICpcbiAqIGBgYGh0bWxcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJvYnNlcnZhYmxlTnVtYmVyJCBhcyBuXCI+XG4gKiA8YXBwLW51bWJlciBbbnVtYmVyXT1cIm5cIj5cbiAqIDwvYXBwLW51bWJlcj5cbiAqIDwvbmctY29udGFpbmVyPlxuICpcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJvYnNlcnZhYmxlTnVtYmVyJDsgbGV0IG5cIj5cbiAqIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiPlxuICogPC9hcHAtbnVtYmVyPlxuICogPC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiBJbiBhZGRpdGlvbiB0byB0aGF0IGl0IHByb3ZpZGVzIHVzIGluZm9ybWF0aW9uIGZyb20gdGhlIHdob2xlIG9ic2VydmFibGUgY29udGV4dC5cbiAqIFdlIGNhbiB0cmFjayB0aGUgb2JzZXJ2YWJsZXM6XG4gKiAtIG5leHQgdmFsdWVcbiAqIC0gZXJyb3IgdmFsdWVcbiAqIC0gY29tcGxldGUgc3RhdGVcbiAqXG4gKiBgYGBodG1sXG4gKiA8bmctY29udGFpbmVyICpuZ3J4TGV0PVwib2JzZXJ2YWJsZU51bWJlciQ7IGxldCBuOyBsZXQgZSA9ICRlcnJvciwgbGV0IGMgPSAkY29tcGxldGVcIj5cbiAqIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiICAqbmdJZj1cIiFlICYmICFjXCI+XG4gKiA8L2FwcC1udW1iZXI+XG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwiZVwiPlxuICogVGhlcmUgaXMgYW4gZXJyb3I6IHt7ZX19XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIDxuZy1jb250YWluZXIgKm5nSWY9XCJjXCI+XG4gKiBPYnNlcnZhYmxlIGNvbXBsZXRlZDoge3tjfX1cbiAqIDwvbmctY29udGFpbmVyPlxuICogPC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ3J4TGV0XScgfSlcbmV4cG9ydCBjbGFzcyBMZXREaXJlY3RpdmU8VT4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGVtYmVkZGVkVmlldzogYW55O1xuICBwcml2YXRlIHJlYWRvbmx5IFZpZXdDb250ZXh0OiBMZXRWaWV3Q29udGV4dDxVIHwgdW5kZWZpbmVkIHwgbnVsbD4gPSB7XG4gICAgJGltcGxpY2l0OiB1bmRlZmluZWQsXG4gICAgbmdyeExldDogdW5kZWZpbmVkLFxuICAgICRlcnJvcjogZmFsc2UsXG4gICAgJGNvbXBsZXRlOiBmYWxzZSxcbiAgfTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc3Vic2NyaXB0aW9uOiBVbnN1YnNjcmliYWJsZTtcbiAgcHJpdmF0ZSByZWFkb25seSBjZEF3YXJlOiBDZEF3YXJlPFUgfCBudWxsIHwgdW5kZWZpbmVkPjtcbiAgcHJpdmF0ZSByZWFkb25seSByZXNldENvbnRleHRPYnNlcnZlcjogTmV4dE9ic2VydmVyPHZvaWQ+ID0ge1xuICAgIG5leHQ6ICgpID0+IHtcbiAgICAgIC8vIGlmIG5vdCBpbml0aWFsaXplZCBubyBuZWVkIHRvIHNldCB1bmRlZmluZWRcbiAgICAgIGlmICh0aGlzLmVtYmVkZGVkVmlldykge1xuICAgICAgICB0aGlzLlZpZXdDb250ZXh0LiRpbXBsaWNpdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5WaWV3Q29udGV4dC5uZ3J4TGV0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLlZpZXdDb250ZXh0LiRlcnJvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLlZpZXdDb250ZXh0LiRjb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG4gIHByaXZhdGUgcmVhZG9ubHkgdXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcjogT2JzZXJ2ZXI8VSB8IG51bGwgfCB1bmRlZmluZWQ+ID0ge1xuICAgIG5leHQ6ICh2YWx1ZTogVSB8IG51bGwgfCB1bmRlZmluZWQpID0+IHtcbiAgICAgIC8vIHRvIGhhdmUgaW5pdCBsYXp5XG4gICAgICBpZiAoIXRoaXMuZW1iZWRkZWRWaWV3KSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRW1iZWRkZWRWaWV3KCk7XG4gICAgICB9XG4gICAgICB0aGlzLlZpZXdDb250ZXh0LiRpbXBsaWNpdCA9IHZhbHVlO1xuICAgICAgdGhpcy5WaWV3Q29udGV4dC5uZ3J4TGV0ID0gdmFsdWU7XG4gICAgfSxcbiAgICBlcnJvcjogKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgLy8gdG8gaGF2ZSBpbml0IGxhenlcbiAgICAgIGlmICghdGhpcy5lbWJlZGRlZFZpZXcpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVFbWJlZGRlZFZpZXcoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuVmlld0NvbnRleHQuJGVycm9yID0gdHJ1ZTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAvLyB0byBoYXZlIGluaXQgbGF6eVxuICAgICAgaWYgKCF0aGlzLmVtYmVkZGVkVmlldykge1xuICAgICAgICB0aGlzLmNyZWF0ZUVtYmVkZGVkVmlldygpO1xuICAgICAgfVxuICAgICAgdGhpcy5WaWV3Q29udGV4dC4kY29tcGxldGUgPSB0cnVlO1xuICAgIH0sXG4gIH07XG5cbiAgc3RhdGljIG5nVGVtcGxhdGVDb250ZXh0R3VhcmQ8VT4oXG4gICAgZGlyOiBMZXREaXJlY3RpdmU8VT4sXG4gICAgY3R4OiB1bmtub3duIHwgbnVsbCB8IHVuZGVmaW5lZFxuICApOiBjdHggaXMgTGV0Vmlld0NvbnRleHQ8VT4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhdGljIG5nVGVtcGxhdGVHdWFyZF9uZ3J4TGV0OiAnYmluZGluZyc7XG5cbiAgQElucHV0KClcbiAgc2V0IG5ncnhMZXQocG90ZW50aWFsT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZUlucHV0PFU+IHwgbnVsbCB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuY2RBd2FyZS5uZXh0UG90ZW50aWFsT2JzZXJ2YWJsZShwb3RlbnRpYWxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxMZXRWaWV3Q29udGV4dDxVPj4sXG4gICAgcHJpdmF0ZSByZWFkb25seSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmXG4gICkge1xuICAgIHRoaXMuY2RBd2FyZSA9IGNyZWF0ZUNkQXdhcmU8VT4oe1xuICAgICAgcmVuZGVyOiBjcmVhdGVSZW5kZXIoeyBjZFJlZiwgbmdab25lIH0pLFxuICAgICAgcmVzZXRDb250ZXh0T2JzZXJ2ZXI6IHRoaXMucmVzZXRDb250ZXh0T2JzZXJ2ZXIsXG4gICAgICB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiB0aGlzLnVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXIsXG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmNkQXdhcmUuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBjcmVhdGVFbWJlZGRlZFZpZXcoKSB7XG4gICAgdGhpcy5lbWJlZGRlZFZpZXcgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KFxuICAgICAgdGhpcy50ZW1wbGF0ZVJlZixcbiAgICAgIHRoaXMuVmlld0NvbnRleHRcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgfVxufVxuIl19