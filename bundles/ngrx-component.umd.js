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
     * A fallback for the new `globalThis` reference.
     *
     *  It should be used to replace `window` due to different environments in:
     *  - SSR (Server Side Rendering)
     *  - Tests
     *  - Browser
     *
     * @return {?} - A reference to globalThis. `window` in the Browser.
     */
    function getGlobalThis() {
        return (/** @type {?} */ ((((/** @type {?} */ (globalThis))) || ((/** @type {?} */ (self))) || ((/** @type {?} */ (window))))));
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/core/utils/zone-checks.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * isNgZone
     *
     * \@description
     *
     * This function takes any instance of a class and checks
     * if the constructor name is equal to `NgZone`.
     * This means the Angular application that instantiated this service assumes it runs in a ZuneLess environment,
     * and therefor it's change detection will not be triggered by zone related logic.
     *
     * However, keep in mind this does not mean `zone.js` is not present.
     * The environment could still run in ZoneFull mode even if Angular turned it off.
     * Consider the situation of a Angular element configured for ZoneLess
     * environments is used in an Angular application relining on the zone mechanism.
     *
     * @param {?} instance - The instance to check for constructor name of `NgZone`.
     * @return {?} boolean - true if instance is of type `NgZone`.
     *
     */
    function isNgZone(instance) {
        var _a;
        return ((_a = instance === null || instance === void 0 ? void 0 : instance.constructor) === null || _a === void 0 ? void 0 : _a.name) === 'NgZone';
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
     * Generated from: src/core/utils/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: src/core/cd-aware/creator_render.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function RenderConfig() { }
    if (false) {
        /** @type {?} */
        RenderConfig.prototype.ngZone;
        /** @type {?} */
        RenderConfig.prototype.cdRef;
    }
    /**
     * @template T
     * @param {?} config
     * @return {?}
     */
    function createRender(config) {
        /**
         * @return {?}
         */
        function render() {
            if (isNgZone(config.ngZone)) {
                config.cdRef.markForCheck();
            }
            else {
                config.cdRef.detectChanges();
            }
        }
        return render;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/core/cd-aware/cd-aware_creator.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     * @template U
     */
    function CdAware() { }
    if (false) {
        /** @type {?} */
        CdAware.prototype.nextPotentialObservable;
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
        var potentialObservablesSubject = new rxjs.Subject();
        /** @type {?} */
        var observablesFromTemplate$ = potentialObservablesSubject.pipe(operators.distinctUntilChanged());
        /** @type {?} */
        var rendering$ = observablesFromTemplate$.pipe(
        // Compose the observables from the template and the strategy
        operators.switchMap((/**
         * @param {?} observable$
         * @return {?}
         */
        function (observable$) {
            // If the passed observable is:
            // - undefined - No value set
            // - null - null passed directly or no value set over `async` pipe
            if (observable$ == null) {
                // Update the value to render_creator with null/undefined
                cfg.updateViewContextObserver.next((/** @type {?} */ (observable$)));
                // Render the view
                cfg.render();
                // Stop further processing
                return rxjs.EMPTY;
            }
            // If a new Observable arrives, reset the value to render_creator
            // We do this because we don't know when the next value arrives and want to get rid of the old value
            cfg.resetContextObserver.next();
            cfg.render();
            return observable$.pipe(operators.distinctUntilChanged(), operators.tap(cfg.updateViewContextObserver), operators.tap((/**
             * @return {?}
             */
            function () { return cfg.render(); })), operators.catchError((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                console.error(e);
                return rxjs.EMPTY;
            })));
        })));
        return (/** @type {?} */ ({
            nextPotentialObservable: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                potentialObservablesSubject.next(value);
            },
            subscribe: /**
             * @return {?}
             */
            function () {
                return rendering$.subscribe();
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

    /**
     * @fileoverview added by tsickle
     * Generated from: src/push/push.pipe.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            this.resetContextObserver = {
                next: (/**
                 * @return {?}
                 */
                function () { return (_this.renderedValue = undefined); }),
            };
            this.updateViewContextObserver = {
                next: (/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return (_this.renderedValue = value); }),
            };
            this.cdAware = createCdAware({
                render: createRender({ cdRef: cdRef, ngZone: ngZone }),
                updateViewContextObserver: this.updateViewContextObserver,
                resetContextObserver: this.resetContextObserver,
            });
            this.subscription = this.cdAware.subscribe();
        }
        /**
         * @template T
         * @param {?} potentialObservable
         * @return {?}
         */
        PushPipe.prototype.transform = /**
         * @template T
         * @param {?} potentialObservable
         * @return {?}
         */
        function (potentialObservable) {
            this.cdAware.nextPotentialObservable(potentialObservable);
            return (/** @type {?} */ (this.renderedValue));
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
            { type: core.Pipe, args: [{ name: 'ngrxPush', pure: false },] }
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
        PushPipe.prototype.resetContextObserver;
        /**
         * @type {?}
         * @private
         */
        PushPipe.prototype.updateViewContextObserver;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: src/push/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * Generated from: src/let/let.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            this.resetContextObserver = {
                next: (/**
                 * @return {?}
                 */
                function () {
                    // if not initialized no need to set undefined
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
                    // to have init lazy
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
                    // to have init lazy
                    if (!_this.embeddedView) {
                        _this.createEmbeddedView();
                    }
                    _this.ViewContext.$error = true;
                }),
                complete: (/**
                 * @return {?}
                 */
                function () {
                    // to have init lazy
                    if (!_this.embeddedView) {
                        _this.createEmbeddedView();
                    }
                    _this.ViewContext.$complete = true;
                }),
            };
            this.cdAware = createCdAware({
                render: createRender({ cdRef: cdRef, ngZone: ngZone }),
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
                this.cdAware.nextPotentialObservable(potentialObservable);
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
            { type: core.Directive, args: [{ selector: '[ngrxLet]' },] }
        ];
        /** @nocollapse */
        LetDirective.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.NgZone },
            { type: core.TemplateRef },
            { type: core.ViewContainerRef }
        ]; };
        LetDirective.propDecorators = {
            ngrxLet: [{ type: core.Input }]
        };
        return LetDirective;
    }());
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
                    },] }
        ];
        return ReactiveComponentModule;
    }());

    exports.LetDirective = LetDirective;
    exports.PushPipe = PushPipe;
    exports.ReactiveComponentModule = ReactiveComponentModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngrx-component.umd.js.map
