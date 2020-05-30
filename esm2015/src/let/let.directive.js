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
    { type: Directive, args: [{ selector: '[ngrxLet]' },] },
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
//# sourceMappingURL=let.directive.js.map