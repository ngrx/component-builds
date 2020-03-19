/**
 * @fileoverview added by tsickle
 * Generated from: modules/component/src/let/let.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Directive, Input, NgZone, TemplateRef, ViewContainerRef, } from '@angular/core';
import { EMPTY, ReplaySubject, } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, startWith, withLatestFrom, } from 'rxjs/operators';
import { createCdAware, setUpWork, } from '../core';
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
 * ### Examples
 *
 * The `*ngrxLet` directive take over several things and makes it more convenient and save to work with streams in the template
 * `<ng-container *let="observableNumber$ as c"></ng-container>`
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
        this.configSubject = new ReplaySubject();
        this.config$ = this.configSubject.pipe(filter((/**
         * @param {?} v
         * @return {?}
         */
        v => v !== undefined && v !== null)), distinctUntilChanged(), startWith({ optimized: true }));
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
        this.configurableBehaviour = (/**
         * @template T
         * @param {?} o$
         * @return {?}
         */
        (o$) => o$.pipe(withLatestFrom(this.config$), 
        // @NOTICE: unused config => As discussed with Brandon we keep it here because in the beta release we implement configuration behavior here
        map((/**
         * @param {?} __0
         * @return {?}
         */
        ([value$, config]) => {
            return value$.pipe(catchError((/**
             * @param {?} e
             * @return {?}
             */
            e => EMPTY)));
        }))));
        this.cdAware = createCdAware({
            work: setUpWork({
                cdRef,
                ngZone,
                context: ((/** @type {?} */ (cdRef))).context,
            }),
            resetContextObserver: this.resetContextObserver,
            updateViewContextObserver: this.updateViewContextObserver,
            configurableBehaviour: this.configurableBehaviour,
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
        this.cdAware.next(potentialObservable);
    }
    /**
     * @param {?} config
     * @return {?}
     */
    set ngrxLetConfig(config) {
        this.configSubject.next(config || { optimized: true });
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
    ngrxLet: [{ type: Input }],
    ngrxLetConfig: [{ type: Input }]
};
if (false) {
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
     * @private
     */
    LetDirective.prototype.configSubject;
    /**
     * @type {?}
     * @private
     */
    LetDirective.prototype.config$;
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
    LetDirective.prototype.configurableBehaviour;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9sZXQvbGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUVULEtBQUssRUFDTCxNQUFNLEVBRU4sV0FBVyxFQUVYLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0wsS0FBSyxFQUlMLGFBQWEsR0FFZCxNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixHQUFHLEVBQ0gsU0FBUyxFQUNULGNBQWMsR0FDZixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFHTCxhQUFhLEVBQ2IsU0FBUyxHQUNWLE1BQU0sU0FBUyxDQUFDOzs7OztBQUVqQixvQ0FTQzs7O0lBUEMsbUNBQWM7O0lBRWQsaUNBQVk7O0lBRVosZ0NBQWlCOztJQUVqQixtQ0FBb0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0V0QixNQUFNLE9BQU8sWUFBWTs7Ozs7OztJQXNGdkIsWUFDRSxLQUF3QixFQUN4QixNQUFjLEVBQ0csV0FBMkMsRUFDM0MsZ0JBQWtDO1FBRGxDLGdCQUFXLEdBQVgsV0FBVyxDQUFnQztRQUMzQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBeEZwQyxnQkFBVyxHQUF5QztZQUNuRSxTQUFTLEVBQUUsU0FBUztZQUNwQixPQUFPLEVBQUUsU0FBUztZQUNsQixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUM7UUFFZSxrQkFBYSxHQUFHLElBQUksYUFBYSxFQUFpQixDQUFDO1FBQ25ELFlBQU8sR0FBRyxJ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O1FBRVosT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7OztJQWFELElBQ0ksT0FBTyxDQUNULG1CQUFrRTtRQUVsRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7O0lBRUQsSUFDSSxhQUFhLENBQUMsTUFBcUI7UUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQzs7OztJQXFCRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQzFELElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxXQUFXLENBQ2pCLENBQUM7SUFDSixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hDLENBQUM7OztZQXBIRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFOzs7O1lBakhsQyxpQkFBaUI7WUFJakIsTUFBTTtZQUVOLFdBQVc7WUFFWCxnQkFBZ0I7OztzQkFvTGYsS0FBSzs0QkFPTCxLQUFLOzs7Ozs7O0lBaEZOLG9DQUEwQjs7Ozs7SUFDMUIsbUNBS0U7Ozs7O0lBRUYscUNBQW9FOzs7OztJQUNwRSwrQkFJRTs7Ozs7SUFFRixvQ0FBZ0Q7Ozs7O0lBQ2hELCtCQUF3RDs7Ozs7SUFDeEQsNENBVUU7Ozs7O0lBQ0YsaURBeUJFOzs7OztJQVNGLDZDQVNJOzs7OztJQWlCRixtQ0FBNEQ7Ozs7O0lBQzVELHdDQUFtRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIEVNUFRZLFxuICBOZXh0T2JzZXJ2ZXIsXG4gIE9ic2VydmFibGUsXG4gIFBhcnRpYWxPYnNlcnZlcixcbiAgUmVwbGF5U3ViamVjdCxcbiAgVW5zdWJzY3JpYmFibGUsXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgY2F0Y2hFcnJvcixcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBzdGFydFdpdGgsXG4gIHdpdGhMYXRlc3RGcm9tLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBDZEF3YXJlLFxuICBDb2FsZXNjaW5nQ29uZmlnIGFzIE5nUnhMZXRDb25maWcsXG4gIGNyZWF0ZUNkQXdhcmUsXG4gIHNldFVwV29yayxcbn0gZnJvbSAnLi4vY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGV0Vmlld0NvbnRleHQ8VD4ge1xuICAvLyB0byBlbmFibGUgYGxldGAgc3ludGF4IHdlIGhhdmUgdG8gdXNlICRpbXBsaWNpdCAodmFyOyBsZXQgdiA9IHZhcilcbiAgJGltcGxpY2l0PzogVDtcbiAgLy8gdG8gZW5hYmxlIGBhc2Agc3ludGF4IHdlIGhhdmUgdG8gYXNzaWduIHRoZSBkaXJlY3RpdmVzIHNlbGVjdG9yICh2YXIgYXMgdilcbiAgbmdyeExldD86IFQ7XG4gIC8vIHNldCBjb250ZXh0IHZhciBjb21wbGV0ZSB0byB0cnVlICh2YXIkOyBsZXQgdiA9ICRlcnJvcilcbiAgJGVycm9yPzogYm9vbGVhbjtcbiAgLy8gc2V0IGNvbnRleHQgdmFyIGNvbXBsZXRlIHRvIHRydWUgKHZhciQ7IGxldCB2ID0gJGNvbXBsZXRlKVxuICAkY29tcGxldGU/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEBEaXJlY3RpdmUgTGV0RGlyZWN0aXZlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVGhlIGAqbmdyeExldGAgZGlyZWN0aXZlIHNlcnZlcyBhIGNvbnZlbmllbnQgd2F5IG9mIGJpbmRpbmcgb2JzZXJ2YWJsZXMgdG8gYSB2aWV3IGNvbnRleHQgKGEgZG9tIGVsZW1lbnQgc2NvcGUpLlxuICogSXQgYWxzbyBoZWxwcyB3aXRoIHNldmVyYWwgaW50ZXJuYWwgcHJvY2Vzc2luZyB1bmRlciB0aGUgaG9vZC5cbiAqXG4gKiBUaGUgY3VycmVudCB3YXkgb2YgYmluZGluZyBhbiBvYnNlcnZhYmxlIHRvIHRoZSB2aWV3IGxvb2tzIGxpa2UgdGhhdDpcbiAqIGBgYGh0bWxcbiAqIDxuZy1jb250YWluZXIgKm5nSWY9XCJvYnNlcnZhYmxlTnVtYmVyJCBhcyBuXCI+XG4gKiA8YXBwLW51bWJlciBbbnVtYmVyXT1cIm5cIj5cbiAqIDwvYXBwLW51bWJlcj5cbiAqIDxhcHAtbnVtYmVyLXNwZWNpYWwgW251bWJlcl09XCJuXCI+XG4gKiA8L2FwcC1udW1iZXItc3BlY2lhbD5cbiAqIDwvbmctY29udGFpbmVyPlxuICogIGBgYFxuICpcbiAqICBUaGUgcHJvYmxlbSBpcyBgKm5nSWZgIGlzIGFsc28gaW50ZXJmZXJpbmcgd2l0aCByZW5kZXJpbmcgYW5kIGluIGNhc2Ugb2YgYSBgMGAgdGhlIGNvbXBvbmVudCB3b3VsZCBiZSBoaWRkZW5cbiAqXG4gKiBJbmNsdWRlZCBGZWF0dXJlczpcbiAqIC0gYmluZGluZyBpcyBhbHdheXMgcHJlc2VudC4gKGAqbmdJZj1cInRydXRoeSRcImApXG4gKiAtIGl0IHRha2VzIGF3YXkgdGhlIG11bHRpcGxlIHVzYWdlcyBvZiB0aGUgYGFzeW5jYCBvciBgbmdyeFB1c2hgIHBpcGVcbiAqIC0gYSB1bmlmaWVkL3N0cnVjdHVyZWQgd2F5IG9mIGhhbmRsaW5nIG51bGwgYW5kIHVuZGVmaW5lZFxuICogLSB0cmlnZ2VycyBjaGFuZ2UtZGV0ZWN0aW9uIGRpZmZlcmVudGx5IGlmIGB6b25lLmpzYCBpcyBwcmVzZW50IG9yIG5vdCAoYENoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXNgIG9yIGBDaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2tgKVxuICogLSB0cmlnZ2VycyBjaGFuZ2UtZGV0ZWN0aW9uIGRpZmZlcmVudGx5IGlmIFZpZXdFbmdpbmUgb3IgSXZ5IGlzIHByZXNlbnQgKGBDaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzYCBvciBgybVkZXRlY3RDaGFuZ2VzYClcbiAqIC0gZGlzdGluY3Qgc2FtZSB2YWx1ZXMgaW4gYSByb3cgKGRpc3RpbmN0VW50aWxDaGFuZ2VkIG9wZXJhdG9yKSxcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqICMjIyBFeGFtcGxlc1xuICpcbiAqIFRoZSBgKm5ncnhMZXRgIGRpcmVjdGl2ZSB0YWtlIG92ZXIgc2V2ZXJhbCB0aGluZ3MgYW5kIG1ha2VzIGl0IG1vcmUgY29udmVuaWVudCBhbmQgc2F2ZSB0byB3b3JrIHdpdGggc3RyZWFtcyBpbiB0aGUgdGVtcGxhdGVcbiAqIGA8bmctY29udGFpbmVyICpsZXQ9XCJvYnNlcnZhYmxlTnVtYmVyJCBhcyBjXCI+PC9uZy1jb250YWluZXI+YFxuICpcbiAqIGBgYGh0bWxcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJvYnNlcnZhYmxlTnVtYmVyJCBhcyBuXCI+XG4gKiA8YXBwLW51bWJlciBbbnVtYmVyXT1cIm5cIj5cbiAqIDwvYXBwLW51bWJlcj5cbiAqIDwvbmctY29udGFpbmVyPlxuICpcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJvYnNlcnZhYmxlTnVtYmVyJDsgbGV0IG5cIj5cbiAqIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiPlxuICogPC9hcHAtbnVtYmVyPlxuICogPC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiBJbiBhZGRpdGlvbiB0byB0aGF0IGl0IHByb3ZpZGVzIHVzIGluZm9ybWF0aW9uIGZyb20gdGhlIHdob2xlIG9ic2VydmFibGUgY29udGV4dC5cbiAqIFdlIGNhbiB0cmFjayB0aGUgb2JzZXJ2YWJsZXM6XG4gKiAtIG5leHQgdmFsdWVcbiAqIC0gZXJyb3IgdmFsdWVcbiAqIC0gY29tcGxldGUgc3RhdGVcbiAqXG4gKiBgYGBodG1sXG4gKiA8bmctY29udGFpbmVyICpuZ3J4TGV0PVwib2JzZXJ2YWJsZU51bWJlciQ7IGxldCBuOyBsZXQgZSA9ICRlcnJvciwgbGV0IGMgPSAkY29tcGxldGVcIj5cbiAqIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiICAqbmdJZj1cIiFlICYmICFjXCI+XG4gKiA8L2FwcC1udW1iZXI+XG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwiZVwiPlxuICogVGhlcmUgaXMgYW4gZXJyb3I6IHt7ZX19XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIDxuZy1jb250YWluZXIgKm5nSWY9XCJjXCI+XG4gKiBPYnNlcnZhYmxlIGNvbXBsZXRlZDoge3tjfX1cbiAqIDwvbmctY29udGFpbmVyPlxuICogPC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ3J4TGV0XScgfSlcbmV4cG9ydCBjbGFzcyBMZXREaXJlY3RpdmU8VT4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGVtYmVkZGVkVmlldzogYW55O1xuICBwcml2YXRlIHJlYWRvbmx5IFZpZXdDb250ZXh0OiBMZXRWaWV3Q29udGV4dDxVIHwgdW5kZWZpbmVkIHwgbnVsbD4gPSB7XG4gICAgJGltcGxpY2l0OiB1bmRlZmluZWQsXG4gICAgbmdyeExldDogdW5kZWZpbmVkLFxuICAgICRlcnJvcjogZmFsc2UsXG4gICAgJGNvbXBsZXRlOiBmYWxzZSxcbiAgfTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZ1N1YmplY3QgPSBuZXcgUmVwbGF5U3ViamVjdDxOZ1J4TGV0Q29uZmlnPigpO1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZyQgPSB0aGlzLmNvbmZpZ1N1YmplY3QucGlwZShcbiAgICBmaWx0ZXIodiA9PiB2ICE9PSB1bmRlZmluZWQgJiYgdiAhPT0gbnVsbCksXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICBzdGFydFdpdGgoeyBvcHRpbWl6ZWQ6IHRydWUgfSlcbiAgKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc3Vic2NyaXB0aW9uOiBVbnN1YnNjcmliYWJsZTtcbiAgcHJpdmF0ZSByZWFkb25seSBjZEF3YXJlOiBDZEF3YXJlPFUgfCBudWxsIHwgdW5kZWZpbmVkPjtcbiAgcHJpdmF0ZSByZWFkb25seSByZXNldENvbnRleHRPYnNlcnZlcjogTmV4dE9ic2VydmVyPHVua25vd24+ID0ge1xuICAgIG5leHQ6ICgpID0+IHtcbiAgICAgIC8vIGlmIG5vdCBpbml0aWFsaXplZCBubyBuZWVkIHRvIHNldCB1bmRlZmluZWRcbiAgICAgIGlmICh0aGlzLmVtYmVkZGVkVmlldykge1xuICAgICAgICB0aGlzLlZpZXdDb250ZXh0LiRpbXBsaWNpdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5WaWV3Q29udGV4dC5uZ3J4TGV0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLlZpZXdDb250ZXh0LiRlcnJvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLlZpZXdDb250ZXh0LiRjb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG4gIHByaXZhdGUgcmVhZG9ubHkgdXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcjogUGFydGlhbE9ic2VydmVyPFxuICAgIFUgfCBudWxsIHwgdW5kZWZpbmVkXG4gID4gPSB7XG4gICAgbmV4dDogKHZhbHVlOiBVIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4ge1xuICAgICAgLy8gdG8gaGF2ZSBpbml0IGxhenlcbiAgICAgIGlmICghdGhpcy5lbWJlZGRlZFZpZXcpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVFbWJlZGRlZFZpZXcoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuVmlld0NvbnRleHQuJGltcGxpY2l0ID0gdmFsdWU7XG4gICAgICB0aGlzLlZpZXdDb250ZXh0Lm5ncnhMZXQgPSB2YWx1ZTtcbiAgICB9LFxuICAgIGVycm9yOiAoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAvLyB0byBoYXZlIGluaXQgbGF6eVxuICAgICAgaWYgKCF0aGlzLmVtYmVkZGVkVmlldykge1xuICAgICAgICB0aGlzLmNyZWF0ZUVtYmVkZGVkVmlldygpO1xuICAgICAgfVxuICAgICAgdGhpcy5WaWV3Q29udGV4dC4kZXJyb3IgPSB0cnVlO1xuICAgIH0sXG4gICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgIC8vIHRvIGhhdmUgaW5pdCBsYXp5XG4gICAgICBpZiAoIXRoaXMuZW1iZWRkZWRWaWV3KSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRW1iZWRkZWRWaWV3KCk7XG4gICAgICB9XG4gICAgICB0aGlzLlZpZXdDb250ZXh0LiRjb21wbGV0ZSA9IHRydWU7XG4gICAgfSxcbiAgfTtcblxuICBzdGF0aWMgbmdUZW1wbGF0ZUNvbnRleHRHdWFyZDxVPihcbiAgICBkaXI6IExldERpcmVjdGl2ZTxVPixcbiAgICBjdHg6IHVua25vd25cbiAgKTogY3R4IGlzIExldFZpZXdDb250ZXh0PFU+IHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZmlndXJhYmxlQmVoYXZpb3VyID0gPFQ+KFxuICAgIG8kOiBPYnNlcnZhYmxlPE9ic2VydmFibGU8VD4+XG4gICk6IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxUPj4gPT5cbiAgICBvJC5waXBlKFxuICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5jb25maWckKSxcbiAgICAgIC8vIEBOT1RJQ0U6IHVudXNlZCBjb25maWcgPT4gQXMgZGlzY3Vzc2VkIHdpdGggQnJhbmRvbiB3ZSBrZWVwIGl0IGhlcmUgYmVjYXVzZSBpbiB0aGUgYmV0YSByZWxlYXNlIHdlIGltcGxlbWVudCBjb25maWd1cmF0aW9uIGJlaGF2aW9yIGhlcmVcbiAgICAgIG1hcCgoW3ZhbHVlJCwgY29uZmlnXSkgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWUkLnBpcGUoY2F0Y2hFcnJvcihlID0+IEVNUFRZKSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgQElucHV0KClcbiAgc2V0IG5ncnhMZXQoXG4gICAgcG90ZW50aWFsT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxVPiB8IFByb21pc2U8VT4gfCBudWxsIHwgdW5kZWZpbmVkXG4gICkge1xuICAgIHRoaXMuY2RBd2FyZS5uZXh0KHBvdGVudGlhbE9ic2VydmFibGUpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG5ncnhMZXRDb25maWcoY29uZmlnOiBOZ1J4TGV0Q29uZmlnKSB7XG4gICAgdGhpcy5jb25maWdTdWJqZWN0Lm5leHQoY29uZmlnIHx8IHsgb3B0aW1pemVkOiB0cnVlIH0pO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPExldFZpZXdDb250ZXh0PFU+PixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7XG4gICAgdGhpcy5jZEF3YXJlID0gY3JlYXRlQ2RBd2FyZTxVPih7XG4gICAgICB3b3JrOiBzZXRVcFdvcmsoe1xuICAgICAgICBjZFJlZixcbiAgICAgICAgbmdab25lLFxuICAgICAgICBjb250ZXh0OiAoY2RSZWYgYXMgRW1iZWRkZWRWaWV3UmVmPFR5cGU8YW55Pj4pLmNvbnRleHQsXG4gICAgICB9KSxcbiAgICAgIHJlc2V0Q29udGV4dE9ic2VydmVyOiB0aGlzLnJlc2V0Q29udGV4dE9ic2VydmVyLFxuICAgICAgdXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcjogdGhpcy51cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyLFxuICAgICAgY29uZmlndXJhYmxlQmVoYXZpb3VyOiB0aGlzLmNvbmZpZ3VyYWJsZUJlaGF2aW91cixcbiAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuY2RBd2FyZS5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIGNyZWF0ZUVtYmVkZGVkVmlldygpIHtcbiAgICB0aGlzLmVtYmVkZGVkVmlldyA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcoXG4gICAgICB0aGlzLnRlbXBsYXRlUmVmLFxuICAgICAgdGhpcy5WaWV3Q29udGV4dFxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICB9XG59XG4iXX0=