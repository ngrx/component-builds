var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
/**
 * @fileoverview added by tsickle
 * Generated from: src/push/push.pipe.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, NgZone, Pipe, } from '@angular/core';
import { Subject, } from 'rxjs';
import { distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';
import { createCdAware, setUpWork, } from '../core';
/**
 * \@Pipe PushPipe
 *
 * \@description
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
 * \@usageNotes
 *
 * `ngrxPush` pipe solves that problem. It can be used like shown here:
 * ```html
 * {{observable$ | ngrxPush}}
 * <ng-container *ngIf="observable$ | ngrxPush as o">{{o}}</ng-container>
 * <component [value]="observable$ | ngrxPush"></component>
 * ```
 *
 * \@publicApi
 * @template S
 */
var PushPipe = /** @class */ (function () {
    function PushPipe(cdRef, ngZone) {
        var _this = this;
        this.configSubject = new Subject();
        this.config$ = this.configSubject
            .asObservable()
            .pipe(distinctUntilChanged());
        this.updateViewContextObserver = {
            next: (/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return (_this.renderedValue = value); }),
        };
        this.resetContextObserver = {
            next: (/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return (_this.renderedValue = undefined); }),
        };
        this.configurableBehaviour = (/**
         * @template T
         * @param {?} o$
         * @return {?}
         */
        function (o$) {
            return o$.pipe(withLatestFrom(_this.config$), map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 2), value$ = _b[0], config = _b[1];
                return value$.pipe();
            })));
        });
        this.cdAware = createCdAware({
            work: setUpWork({
                ngZone: ngZone,
                cdRef: cdRef,
                context: ((/** @type {?} */ (cdRef))).context,
            }),
            updateViewContextObserver: this.updateViewContextObserver,
            resetContextObserver: this.resetContextObserver,
            configurableBehaviour: this.configurableBehaviour,
        });
        this.subscription = this.cdAware.subscribe();
    }
    /**
     * @param {?} potentialObservable
     * @param {?=} config
     * @return {?}
     */
    PushPipe.prototype.transform = /**
     * @param {?} potentialObservable
     * @param {?=} config
     * @return {?}
     */
    function (potentialObservable, config) {
        if (config === void 0) { config = { optimized: true }; }
        this.configSubject.next(config);
        this.cdAware.next(potentialObservable);
        return this.renderedValue;
    };
    /**
     * @return {?}
     */
    PushPipe.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
    PushPipe.decorators = [
        { type: Pipe, args: [{ name: 'ngrxPush', pure: false },] },
    ];
    /** @nocollapse */
    PushPipe.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    return PushPipe;
}());
export { PushPipe };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.renderedValue;
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.configSubject;
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.config$;
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.cdAware;
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.updateViewContextObserver;
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.resetContextObserver;
    /**
     * @type {?}
     * @private
     */
    PushPipe.prototype.configurableBehaviour;
}
//# sourceMappingURL=push.pipe.js.map