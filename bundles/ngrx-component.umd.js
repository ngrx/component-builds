(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ngrx/component', ['exports', '@angular/core', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.ngrx = global.ngrx || {}, global.ngrx.component = {}), global.ng.core, global.rxjs, global.rxjs.operators));
}(this, (function (exports, core, rxjs, operators) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: src/core/utils/get-global-this.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * \@description
     *
     * This function returns a reference to globalThis in the following environments:
     * - Browser
     * - SSR (Server Side Rendering)
     * - Tests
     *
     * The function can be just imported and used everywhere.
     *
     * ```ts
     * import { getGlobalThis } from `utils/get-global-this`;
     *
     * console.log(getGlobalThis());
     * ```
     * @return {?}
     */
    function getGlobalThis() {
        return (/** @type {?} */ ((((/** @type {?} */ (globalThis))) || ((/** @type {?} */ (self))) || ((/** @type {?} */ (window))))));
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/core/utils/is-ivy.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * \@description
     *
     * Determines if the application runs with ivy or not (ViewEngine)
     *
     * \@usageNotes
     *
     * The function can be just imported and used everywhere.
     *
     * ```ts
     * import { isIvy } from `utils/is-ivy`;
     *
     * console.log(isIvy());  // true or false
     * ```
     *
     * The determination if an application runs with Ivy or not is done by following table:
     *
     * **Table for ng global presence in ViewEngine and Ivy for prod/dev modes**
     *
     *  | render   | ViewEngine | ViewEngine | Ivy       | Ivy       |
     *  | -------- | ---------- | ---------- | --------- | --------  |
     *  | mode     | prod       | dev        | prod      | dev       |
     *  | ng       | present    | present    | undefined | present   |
     *  | ng.probe | present    | present    | undefined | undefined |
     *
     *  > So for Ivy we need to make sure that ng is undefined or,
     *  > in case of dev environment, ng.probe is undefined
     *
     * @return {?}
     */
    function isIvy() {
        /** @type {?} */
        var ng = getGlobalThis().ng;
        // Is the global ng object is unavailable?
        // ng === undefined in Ivy production mode
        // View Engine has the ng object both in development mode and production mode.
        return (ng === undefined ||
            // in case we are in dev mode in ivy
            // `probe` property is available on ng object we use View Engine.
            ng.probe === undefined);
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/core/utils/has-zone.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * \@description
     *
     * Determines if the application uses `NgZone` or `NgNoopZone` as ngZone service instance.
     *
     * The function can be just imported and used everywhere.
     *
     * ```ts
     * import { hasZone } from `utils/has-zone`;
     *
     * console.log(hasZone());
     * ```
     * @param {?} z
     * @return {?}
     */
    function hasZone(z) {
        return z.constructor.name !== 'NoopNgZone';
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/core/utils/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: src/core/projections/toObservableValue.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * \@description
     *
     * This operator ensures the passed value is of the right type for `CdAware`.
     * It takes `null`, `undefined` or `Observable<T>` and returns `Observable<null, undefined, T>`.
     * Every other value throws an error.
     *
     * ```ts
     * import { toObservableValue } from `projections/toObservableValue`;
     *
     * const toObservableValue()
     *  .pipe(switchAll())
     *  .subscribe((n) => console.log(n););
     * ```
     * @template T
     * @param {?} p
     * @return {?}
     */
    function toObservableValue(p) {
        return p ? rxjs.from(p) : rxjs.of(p);
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/core/projections/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: src/core/cd-aware/get-change-detection-handling.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} ngZone
     * @param {?} cdRef
     * @return {?}
     */
    function getChangeDetectionHandler(ngZone, cdRef) {
        if (isIvy()) {
            return hasZone(ngZone) ? core.ɵmarkDirty : core.ɵdetectChanges;
        }
        else {
            return hasZone(ngZone)
                ? cdRef.markForCheck.bind(cdRef)
                : cdRef.detectChanges.bind(cdRef);
        }
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/core/cd-aware/cd-aware_creator.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function CoalescingConfig() { }
    if (false) {
        /** @type {?} */
        CoalescingConfig.prototype.optimized;
    }
    /**
     * @record
     * @template U
     */
    function CdAware() { }
    if (false) {
        /** @type {?} */
        CdAware.prototype.next;
    }
    /**
     * @record
     */
    function WorkConfig() { }
    if (false) {
        /** @type {?} */
        WorkConfig.prototype.context;
        /** @type {?} */
        WorkConfig.prototype.ngZone;
        /** @type {?} */
        WorkConfig.prototype.cdRef;
    }
    /**
     * @param {?} cfg
     * @return {?}
     */
    function setUpWork(cfg) {
        /** @type {?} */
        var render = getChangeDetectionHandler(cfg.ngZone, cfg.cdRef);
        return (/**
         * @return {?}
         */
        function () { return render(cfg.context); });
    }
    /**
     * class CdAware
     *
     * \@description
     * This abstract class holds all the shared logic for the push pipe and the let directive
     * responsible for change detection
     * If you extend this class you need to implement how the update of the rendered value happens.
     * Also custom behaviour is something you need to implement in the extending class
     * @template U
     * @param {?} cfg
     * @return {?}
     */
    function createCdAware(cfg) {
        /** @type {?} */
        var observablesSubject = new rxjs.Subject();
        /** @type {?} */
        var observables$ = observablesSubject.pipe(operators.distinctUntilChanged(), 
        // Try to convert it to values, throw if not possible
        operators.map((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return toObservableValue(v); })), operators.tap((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            cfg.resetContextObserver.next(v);
            cfg.work();
        })), operators.map((/**
         * @param {?} value$
         * @return {?}
         */
        function (value$) {
            return value$.pipe(operators.distinctUntilChanged(), operators.tap(cfg.updateViewContextObserver));
        })), cfg.configurableBehaviour, operators.switchAll(), operators.tap((/**
         * @return {?}
         */
        function () { return cfg.work(); })));
        return (/** @type {?} */ ({
            next: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                observablesSubject.next(value);
            },
            subscribe: /**
             * @return {?}
             */
            function () {
                return observables$.subscribe();
            },
        }));
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/core/cd-aware/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: src/core/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

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
            this.configSubject = new rxjs.Subject();
            this.config$ = this.configSubject
                .asObservable()
                .pipe(operators.distinctUntilChanged());
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
                return o$.pipe(operators.withLatestFrom(_this.config$), operators.map((/**
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
            { type: core.Pipe, args: [{ name: 'ngrxPush', pure: false },] },
        ];
        /** @nocollapse */
        PushPipe.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.NgZone }
        ]; };
        return PushPipe;
    }());
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

    /**
     * @fileoverview added by tsickle
     * Generated from: src/push/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    var __read$1 = (this && this.__read) || function (o, n) {
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
     * @record
     * @template T
     */
    function LetViewContext() { }
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
    var LetDirective = /** @class */ (function () {
        function LetDirective(cdRef, ngZone, templateRef, viewContainerRef) {
            var _this = this;
            this.templateRef = templateRef;
            this.viewContainerRef = viewContainerRef;
            this.ViewContext = {
                $implicit: undefined,
                ngrxLet: undefined,
                $error: false,
                $complete: false,
            };
            this.configSubject = new rxjs.ReplaySubject();
            this.config$ = this.configSubject.pipe(operators.filter((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return v !== undefined && v !== null; })), operators.distinctUntilChanged(), operators.startWith({ optimized: true }));
            this.resetContextObserver = {
                next: (/**
                 * @return {?}
                 */
                function () {
                    if (_this.embeddedView) {
                        _this.ViewContext.$implicit = undefined;
                        _this.ViewContext.ngrxLet = undefined;
                        _this.ViewContext.$error = false;
                        _this.ViewContext.$complete = false;
                    }
                }),
            };
            this.updateViewContextObserver = {
                next: (/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) {
                    if (!_this.embeddedView) {
                        _this.createEmbeddedView();
                    }
                    _this.ViewContext.$implicit = value;
                    _this.ViewContext.ngrxLet = value;
                }),
                error: (/**
                 * @param {?} error
                 * @return {?}
                 */
                function (error) {
                    if (!_this.embeddedView) {
                        _this.createEmbeddedView();
                    }
                    _this.ViewContext.$error = true;
                }),
                complete: (/**
                 * @return {?}
                 */
                function () {
                    if (!_this.embeddedView) {
                        _this.createEmbeddedView();
                    }
                    _this.ViewContext.$complete = true;
                }),
            };
            this.configurableBehaviour = (/**
             * @template T
             * @param {?} o$
             * @return {?}
             */
            function (o$) {
                return o$.pipe(operators.withLatestFrom(_this.config$), operators.map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var _b = __read$1(_a, 2), value$ = _b[0], config = _b[1];
                    return value$.pipe(operators.catchError((/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { return rxjs.EMPTY; })));
                })));
            });
            this.cdAware = createCdAware({
                work: setUpWork({
                    cdRef: cdRef,
                    ngZone: ngZone,
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
        LetDirective.ngTemplateContextGuard = /**
         * @template U
         * @param {?} dir
         * @param {?} ctx
         * @return {?}
         */
        function (dir, ctx) {
            return true;
        };
        Object.defineProperty(LetDirective.prototype, "ngrxLet", {
            set: /**
             * @param {?} potentialObservable
             * @return {?}
             */
            function (potentialObservable) {
                this.cdAware.next(potentialObservable);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LetDirective.prototype, "ngrxLetConfig", {
            set: /**
             * @param {?} config
             * @return {?}
             */
            function (config) {
                this.configSubject.next(config || { optimized: true });
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        LetDirective.prototype.createEmbeddedView = /**
         * @return {?}
         */
        function () {
            this.embeddedView = this.viewContainerRef.createEmbeddedView(this.templateRef, this.ViewContext);
        };
        /**
         * @return {?}
         */
        LetDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.subscription.unsubscribe();
            this.viewContainerRef.clear();
        };
        LetDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[ngrxLet]' },] },
        ];
        /** @nocollapse */
        LetDirective.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.NgZone },
            { type: core.TemplateRef },
            { type: core.ViewContainerRef }
        ]; };
        LetDirective.propDecorators = {
            ngrxLet: [{ type: core.Input }],
            ngrxLetConfig: [{ type: core.Input }]
        };
        return LetDirective;
    }());
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

    /**
     * @fileoverview added by tsickle
     * Generated from: src/let/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: src/reactive-component.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DECLARATIONS = [LetDirective, PushPipe];
    /** @type {?} */
    var EXPORTS = [DECLARATIONS];
    var ReactiveComponentModule = /** @class */ (function () {
        function ReactiveComponentModule() {
        }
        ReactiveComponentModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [DECLARATIONS],
                        exports: [EXPORTS],
                    },] },
        ];
        return ReactiveComponentModule;
    }());

    exports.LetDirective = LetDirective;
    exports.PushPipe = PushPipe;
    exports.ReactiveComponentModule = ReactiveComponentModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngrx-component.umd.js.map
