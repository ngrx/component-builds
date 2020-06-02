/**
 * @fileoverview added by tsickle
 * Generated from: src/let/let.directive.ts
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
                if (!this.embeddedView) {
                    this.createEmbeddedView();
                }
                this.ViewContext.$error = true;
            }),
            complete: (/**
             * @return {?}
             */
            () => {
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
        (o$) => o$.pipe(withLatestFrom(this.config$), map((/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3J4L2NvbXBvbmVudC8iLCJzb3VyY2VzIjpbInNyYy9sZXQvbGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUVULEtBQUssRUFDTCxNQUFNLEVBRU4sV0FBVyxFQUVYLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0wsS0FBSyxFQUlMLGFBQWEsR0FFZCxNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixHQUFHLEVBQ0gsU0FBUyxFQUNULGNBQWMsR0FDZixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFHTCxhQUFhLEVBQ2IsU0FBUyxHQUNWLE1BQU0sU0FBUyxDQUFDOzs7OztBQUVqQixvQ0FTQzs7O0lBUEMsbUNBQWM7O0lBRWQsaUNBQVk7O0lBRVosZ0NBQWlCOztJQUVqQixtQ0FBb0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNFdEIsTUFBTSxPQUFPLFlBQVk7Ozs7Ozs7SUFpRnZCLFlBQ0UsS0FBd0IsRUFDeEIsTUFBYyxFQUNHLFdBQTJDLEVBQzNDLGdCQUFrQztRQURsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0M7UUFDM0MscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQW5GcEMsZ0JBQVcsR0FBeUM7WUFDbkUsU0FBUyxFQUFFLFNBQVM7WUFDcEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDO1FBRWUsa0JBQWEsR0FBRyxJQUFJLGFBQWEsRUFBaUIsQ0FBQztRQUNuRCxZQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJ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QUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7OztJQUVELElBQ0ksYUFBYSxDQUFDLE1BQXFCO1FBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7SUFxQkQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUMxRCxJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsV0FBVyxDQUNqQixDQUFDO0lBQ0osQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7WUEvR0YsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRTs7OztZQS9HbEMsaUJBQWlCO1lBSWpCLE1BQU07WUFFTixXQUFXO1lBRVgsZ0JBQWdCOzs7c0JBNktmLEtBQUs7NEJBT0wsS0FBSzs7Ozs7OztJQTNFTixvQ0FBMEI7Ozs7O0lBQzFCLG1DQUtFOzs7OztJQUVGLHFDQUFvRTs7Ozs7SUFDcEUsK0JBSUU7Ozs7O0lBRUYsb0NBQWdEOzs7OztJQUNoRCwrQkFBd0Q7Ozs7O0lBQ3hELDRDQVNFOzs7OztJQUNGLGlEQXNCRTs7Ozs7SUFTRiw2Q0FRSTs7Ozs7SUFpQkYsbUNBQTREOzs7OztJQUM1RCx3Q0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgVGVtcGxhdGVSZWYsXG4gIFR5cGUsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBFTVBUWSxcbiAgTmV4dE9ic2VydmVyLFxuICBPYnNlcnZhYmxlLFxuICBQYXJ0aWFsT2JzZXJ2ZXIsXG4gIFJlcGxheVN1YmplY3QsXG4gIFVuc3Vic2NyaWJhYmxlLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGNhdGNoRXJyb3IsXG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgc3RhcnRXaXRoLFxuICB3aXRoTGF0ZXN0RnJvbSxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQ2RBd2FyZSxcbiAgQ29hbGVzY2luZ0NvbmZpZyBhcyBOZ1J4TGV0Q29uZmlnLFxuICBjcmVhdGVDZEF3YXJlLFxuICBzZXRVcFdvcmssXG59IGZyb20gJy4uL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExldFZpZXdDb250ZXh0PFQ+IHtcbiAgLy8gdG8gZW5hYmxlIGBsZXRgIHN5bnRheCB3ZSBoYXZlIHRvIHVzZSAkaW1wbGljaXQgKHZhcjsgbGV0IHYgPSB2YXIpXG4gICRpbXBsaWNpdD86IFQ7XG4gIC8vIHRvIGVuYWJsZSBgYXNgIHN5bnRheCB3ZSBoYXZlIHRvIGFzc2lnbiB0aGUgZGlyZWN0aXZlcyBzZWxlY3RvciAodmFyIGFzIHYpXG4gIG5ncnhMZXQ/OiBUO1xuICAvLyBzZXQgY29udGV4dCB2YXIgY29tcGxldGUgdG8gdHJ1ZSAodmFyJDsgbGV0IGUgPSAkZXJyb3IpXG4gICRlcnJvcj86IGJvb2xlYW47XG4gIC8vIHNldCBjb250ZXh0IHZhciBjb21wbGV0ZSB0byB0cnVlICh2YXIkOyBsZXQgYyA9ICRjb21wbGV0ZSlcbiAgJGNvbXBsZXRlPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBARGlyZWN0aXZlIExldERpcmVjdGl2ZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRoZSBgKm5ncnhMZXRgIGRpcmVjdGl2ZSBzZXJ2ZXMgYSBjb252ZW5pZW50IHdheSBvZiBiaW5kaW5nIG9ic2VydmFibGVzIHRvIGEgdmlldyBjb250ZXh0IChhIGRvbSBlbGVtZW50IHNjb3BlKS5cbiAqIEl0IGFsc28gaGVscHMgd2l0aCBzZXZlcmFsIGludGVybmFsIHByb2Nlc3NpbmcgdW5kZXIgdGhlIGhvb2QuXG4gKlxuICogVGhlIGN1cnJlbnQgd2F5IG9mIGJpbmRpbmcgYW4gb2JzZXJ2YWJsZSB0byB0aGUgdmlldyBsb29rcyBsaWtlIHRoYXQ6XG4gKiBgYGBodG1sXG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwib2JzZXJ2YWJsZU51bWJlciQgYXMgblwiPlxuICogPGFwcC1udW1iZXIgW251bWJlcl09XCJuXCI+XG4gKiA8L2FwcC1udW1iZXI+XG4gKiA8YXBwLW51bWJlci1zcGVjaWFsIFtudW1iZXJdPVwiblwiPlxuICogPC9hcHAtbnVtYmVyLXNwZWNpYWw+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqICBgYGBcbiAqXG4gKiAgVGhlIHByb2JsZW0gaXMgYCpuZ0lmYCBpcyBhbHNvIGludGVyZmVyaW5nIHdpdGggcmVuZGVyaW5nIGFuZCBpbiBjYXNlIG9mIGEgYDBgIHRoZSBjb21wb25lbnQgd291bGQgYmUgaGlkZGVuXG4gKlxuICogSW5jbHVkZWQgRmVhdHVyZXM6XG4gKiAtIGJpbmRpbmcgaXMgYWx3YXlzIHByZXNlbnQuIChgKm5nSWY9XCJ0cnV0aHkkXCJgKVxuICogLSBpdCB0YWtlcyBhd2F5IHRoZSBtdWx0aXBsZSB1c2FnZXMgb2YgdGhlIGBhc3luY2Agb3IgYG5ncnhQdXNoYCBwaXBlXG4gKiAtIGEgdW5pZmllZC9zdHJ1Y3R1cmVkIHdheSBvZiBoYW5kbGluZyBudWxsIGFuZCB1bmRlZmluZWRcbiAqIC0gdHJpZ2dlcnMgY2hhbmdlLWRldGVjdGlvbiBkaWZmZXJlbnRseSBpZiBgem9uZS5qc2AgaXMgcHJlc2VudCBvciBub3QgKGBDaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzYCBvciBgQ2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrYClcbiAqIC0gdHJpZ2dlcnMgY2hhbmdlLWRldGVjdGlvbiBkaWZmZXJlbnRseSBpZiBWaWV3RW5naW5lIG9yIEl2eSBpcyBwcmVzZW50IChgQ2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlc2Agb3IgYMm1ZGV0ZWN0Q2hhbmdlc2ApXG4gKiAtIGRpc3RpbmN0IHNhbWUgdmFsdWVzIGluIGEgcm93IChkaXN0aW5jdFVudGlsQ2hhbmdlZCBvcGVyYXRvciksXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBUaGUgYCpuZ3J4TGV0YCBkaXJlY3RpdmUgdGFrZSBvdmVyIHNldmVyYWwgdGhpbmdzIGFuZCBtYWtlcyBpdCBtb3JlIGNvbnZlbmllbnQgYW5kIHNhdmUgdG8gd29yayB3aXRoIHN0cmVhbXMgaW4gdGhlIHRlbXBsYXRlXG4gKiBgPG5nLWNvbnRhaW5lciAqbmdyeExldD1cIm9ic2VydmFibGVOdW1iZXIkIGFzIGNcIj48L25nLWNvbnRhaW5lcj5gXG4gKlxuICogYGBgaHRtbFxuICogPG5nLWNvbnRhaW5lciAqbmdyeExldD1cIm9ic2VydmFibGVOdW1iZXIkIGFzIG5cIj5cbiAqIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiPlxuICogPC9hcHAtbnVtYmVyPlxuICogPC9uZy1jb250YWluZXI+XG4gKlxuICogPG5nLWNvbnRhaW5lciAqbmdyeExldD1cIm9ic2VydmFibGVOdW1iZXIkOyBsZXQgblwiPlxuICogPGFwcC1udW1iZXIgW251bWJlcl09XCJuXCI+XG4gKiA8L2FwcC1udW1iZXI+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIGBgYFxuICpcbiAqIEluIGFkZGl0aW9uIHRvIHRoYXQgaXQgcHJvdmlkZXMgdXMgaW5mb3JtYXRpb24gZnJvbSB0aGUgd2hvbGUgb2JzZXJ2YWJsZSBjb250ZXh0LlxuICogV2UgY2FuIHRyYWNrIHRoZSBvYnNlcnZhYmxlczpcbiAqIC0gbmV4dCB2YWx1ZVxuICogLSBlcnJvciB2YWx1ZVxuICogLSBjb21wbGV0ZSBzdGF0ZVxuICpcbiAqIGBgYGh0bWxcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJvYnNlcnZhYmxlTnVtYmVyJDsgbGV0IG47IGxldCBlID0gJGVycm9yLCBsZXQgYyA9ICRjb21wbGV0ZVwiPlxuICogPGFwcC1udW1iZXIgW251bWJlcl09XCJuXCIgICpuZ0lmPVwiIWUgJiYgIWNcIj5cbiAqIDwvYXBwLW51bWJlcj5cbiAqIDxuZy1jb250YWluZXIgKm5nSWY9XCJlXCI+XG4gKiBUaGVyZSBpcyBhbiBlcnJvcjoge3tlfX1cbiAqIDwvbmctY29udGFpbmVyPlxuICogPG5nLWNvbnRhaW5lciAqbmdJZj1cImNcIj5cbiAqIE9ic2VydmFibGUgY29tcGxldGVkOiB7e2N9fVxuICogPC9uZy1jb250YWluZXI+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25ncnhMZXRdJyB9KVxuZXhwb3J0IGNsYXNzIExldERpcmVjdGl2ZTxVPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgZW1iZWRkZWRWaWV3OiBhbnk7XG4gIHByaXZhdGUgcmVhZG9ubHkgVmlld0NvbnRleHQ6IExldFZpZXdDb250ZXh0PFUgfCB1bmRlZmluZWQgfCBudWxsPiA9IHtcbiAgICAkaW1wbGljaXQ6IHVuZGVmaW5lZCxcbiAgICBuZ3J4TGV0OiB1bmRlZmluZWQsXG4gICAgJGVycm9yOiBmYWxzZSxcbiAgICAkY29tcGxldGU6IGZhbHNlLFxuICB9O1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnU3ViamVjdCA9IG5ldyBSZXBsYXlTdWJqZWN0PE5nUnhMZXRDb25maWc+KCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnJCA9IHRoaXMuY29uZmlnU3ViamVjdC5waXBlKFxuICAgIGZpbHRlcih2ID0+IHYgIT09IHVuZGVmaW5lZCAmJiB2ICE9PSBudWxsKSxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgIHN0YXJ0V2l0aCh7IG9wdGltaXplZDogdHJ1ZSB9KVxuICApO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBzdWJzY3JpcHRpb246IFVuc3Vic2NyaWJhYmxlO1xuICBwcml2YXRlIHJlYWRvbmx5IGNkQXdhcmU6IENkQXdhcmU8VSB8IG51bGwgfCB1bmRlZmluZWQ+O1xuICBwcml2YXRlIHJlYWRvbmx5IHJlc2V0Q29udGV4dE9ic2VydmVyOiBOZXh0T2JzZXJ2ZXI8dW5rbm93bj4gPSB7XG4gICAgbmV4dDogKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZW1iZWRkZWRWaWV3KSB7XG4gICAgICAgIHRoaXMuVmlld0NvbnRleHQuJGltcGxpY2l0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLlZpZXdDb250ZXh0Lm5ncnhMZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuVmlld0NvbnRleHQuJGVycm9yID0gZmFsc2U7XG4gICAgICAgIHRoaXMuVmlld0NvbnRleHQuJGNvbXBsZXRlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbiAgcHJpdmF0ZSByZWFkb25seSB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiBQYXJ0aWFsT2JzZXJ2ZXI8XG4gICAgVSB8IG51bGwgfCB1bmRlZmluZWRcbiAgPiA9IHtcbiAgICBuZXh0OiAodmFsdWU6IFUgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuZW1iZWRkZWRWaWV3KSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRW1iZWRkZWRWaWV3KCk7XG4gICAgICB9XG4gICAgICB0aGlzLlZpZXdDb250ZXh0LiRpbXBsaWNpdCA9IHZhbHVlO1xuICAgICAgdGhpcy5WaWV3Q29udGV4dC5uZ3J4TGV0ID0gdmFsdWU7XG4gICAgfSxcbiAgICBlcnJvcjogKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgaWYgKCF0aGlzLmVtYmVkZGVkVmlldykge1xuICAgICAgICB0aGlzLmNyZWF0ZUVtYmVkZGVkVmlldygpO1xuICAgICAgfVxuICAgICAgdGhpcy5WaWV3Q29udGV4dC4kZXJyb3IgPSB0cnVlO1xuICAgIH0sXG4gICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5lbWJlZGRlZFZpZXcpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVFbWJlZGRlZFZpZXcoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuVmlld0NvbnRleHQuJGNvbXBsZXRlID0gdHJ1ZTtcbiAgICB9LFxuICB9O1xuXG4gIHN0YXRpYyBuZ1RlbXBsYXRlQ29udGV4dEd1YXJkPFU+KFxuICAgIGRpcjogTGV0RGlyZWN0aXZlPFU+LFxuICAgIGN0eDogdW5rbm93blxuICApOiBjdHggaXMgTGV0Vmlld0NvbnRleHQ8VT4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWd1cmFibGVCZWhhdmlvdXIgPSA8VD4oXG4gICAgbyQ6IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxUPj5cbiAgKTogT2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFQ+PiA9PlxuICAgIG8kLnBpcGUoXG4gICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLmNvbmZpZyQpLFxuICAgICAgbWFwKChbdmFsdWUkLCBjb25maWddKSA9PiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSQucGlwZShjYXRjaEVycm9yKGUgPT4gRU1QVFkpKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICBASW5wdXQoKVxuICBzZXQgbmdyeExldChcbiAgICBwb3RlbnRpYWxPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPFU+IHwgUHJvbWlzZTxVPiB8IG51bGwgfCB1bmRlZmluZWRcbiAgKSB7XG4gICAgdGhpcy5jZEF3YXJlLm5leHQocG90ZW50aWFsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbmdyeExldENvbmZpZyhjb25maWc6IE5nUnhMZXRDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZ1N1YmplY3QubmV4dChjb25maWcgfHwgeyBvcHRpbWl6ZWQ6IHRydWUgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSByZWFkb25seSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TGV0Vmlld0NvbnRleHQ8VT4+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZlxuICApIHtcbiAgICB0aGlzLmNkQXdhcmUgPSBjcmVhdGVDZEF3YXJlPFU+KHtcbiAgICAgIHdvcms6IHNldFVwV29yayh7XG4gICAgICAgIGNkUmVmLFxuICAgICAgICBuZ1pvbmUsXG4gICAgICAgIGNvbnRleHQ6IChjZFJlZiBhcyBFbWJlZGRlZFZpZXdSZWY8VHlwZTxhbnk+PikuY29udGV4dCxcbiAgICAgIH0pLFxuICAgICAgcmVzZXRDb250ZXh0T2JzZXJ2ZXI6IHRoaXMucmVzZXRDb250ZXh0T2JzZXJ2ZXIsXG4gICAgICB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiB0aGlzLnVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXIsXG4gICAgICBjb25maWd1cmFibGVCZWhhdmlvdXI6IHRoaXMuY29uZmlndXJhYmxlQmVoYXZpb3VyLFxuICAgIH0pO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5jZEF3YXJlLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgY3JlYXRlRW1iZWRkZWRWaWV3KCkge1xuICAgIHRoaXMuZW1iZWRkZWRWaWV3ID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyhcbiAgICAgIHRoaXMudGVtcGxhdGVSZWYsXG4gICAgICB0aGlzLlZpZXdDb250ZXh0XG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gIH1cbn1cbiJdfQ==