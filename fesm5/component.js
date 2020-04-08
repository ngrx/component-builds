/**
 * @license NgRx 9.1.0+1.sha-6a18359
 * (c) 2015-2018 Brandon Roberts, Mike Ryan, Rob Wormald, Victor Savkin
 * License: MIT
 */
import { __read, __decorate, __metadata } from 'tslib';
import { ɵmarkDirty, ɵdetectChanges, Pipe, ChangeDetectorRef, NgZone, Input, Directive, TemplateRef, ViewContainerRef, NgModule } from '@angular/core';
import { of, from, Subject, ReplaySubject, EMPTY } from 'rxjs';
import { distinctUntilChanged, map, tap, switchAll, withLatestFrom, filter, startWith, catchError } from 'rxjs/operators';

// Returns a reference to global thin
// - Browser
// - SSR
// - Tests
function getGlobalThis() {
    return (globalThis || self || window);
}

// Table for ng global presence in ViewEngine and Ivy for prod/dev modes:
//
// | render     |  ViewEngine    |  ViewEngine    |      Ivy          |      Ivy          |
// | mode       |     prod       |      dev       |      prod         |      dev          |
// | ng         |     present    |     present    |     undefined     |     present       |
// | ng.probe   |     present    |     present    |     undefined     |     undefined     |
//
// So for Ivy we need to make sure that ng is undefined or,
// in case of dev environment, ng.probe is undefined
function isIvy() {
    var ng = getGlobalThis().ng;
    // Is the global ng object is unavailable?
    // ng === undefined in Ivy production mode
    // View Engine has the ng object both in development mode and production mode.
    return (ng === undefined ||
        // in case we are in dev mode in ivy
        // `probe` property is available on ng object we use View Engine.
        ng.probe === undefined);
}

function hasZone(z) {
    return z.constructor.name !== 'NoopNgZone';
}

function getChangeDetectionHandler(ngZone, cdRef) {
    if (isIvy()) {
        return hasZone(ngZone) ? ɵmarkDirty : ɵdetectChanges;
    }
    else {
        return hasZone(ngZone)
            ? cdRef.markForCheck.bind(cdRef)
            : cdRef.detectChanges.bind(cdRef);
    }
}
function getDetectChanges(ngZone, cdRef) {
    if (isIvy()) {
        return !hasZone(ngZone) ? ɵdetectChanges : ɵmarkDirty;
    }
    else {
        return hasZone(ngZone)
            ? cdRef.markForCheck.bind(cdRef)
            : cdRef.detectChanges.bind(cdRef);
    }
}

function toObservableValue(p) {
    return p == null ? of(p) : from(p);
}

function setUpWork(cfg) {
    var render = getChangeDetectionHandler(cfg.ngZone, cfg.cdRef);
    return function () { return render(cfg.context); };
}
/**
 * class CdAware
 *
 * @description
 * This abstract class holds all the shared logic for the push pipe and the let directive
 * responsible for change detection
 * If you extend this class you need to implement how the update of the rendered value happens.
 * Also custom behaviour is something you need to implement in the extending class
 */
function createCdAware(cfg) {
    var observablesSubject = new Subject();
    // We have to defer the setup of observables$ until subscription as getConfigurableBehaviour is defined in the
    // extending class. So getConfigurableBehaviour is not available in the abstract layer
    var observables$ = observablesSubject.pipe(
    // Ignore potential observables of the same instances
    distinctUntilChanged(), 
    // Try to convert it to values, throw if not possible
    map(toObservableValue), tap(function (v) {
        cfg.resetContextObserver.next(v);
        cfg.work();
    }), map(function (value$) {
        return value$.pipe(distinctUntilChanged(), tap(cfg.updateViewContextObserver));
    }), 
    // e.g. coalescing
    cfg.configurableBehaviour, 
    // Unsubscribe from previous observables
    // Then flatten the latest internal observables into the output
    // @NOTICE applied behaviour (on the values, not the observable) will fire here
    switchAll(), tap(function () { return cfg.work(); }));
    return {
        next: function (value) {
            observablesSubject.next(value);
        },
        subscribe: function () {
            return observables$.subscribe();
        },
    };
}

/**
 * @Pipe PushPipe
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
 * @usageNotes
 *
 * ### Examples
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
var PushPipe = /** @class */ (function () {
    function PushPipe(cdRef, ngZone) {
        var _this = this;
        this.configSubject = new Subject();
        this.config$ = this.configSubject
            .asObservable()
            .pipe(distinctUntilChanged());
        this.updateViewContextObserver = {
            // assign value that will get returned from the transform function on the next change detection
            next: function (value) { return (_this.renderedValue = value); },
        };
        this.resetContextObserver = {
            next: function (value) { return (_this.renderedValue = undefined); },
        };
        this.configurableBehaviour = function (o$) {
            return o$.pipe(withLatestFrom(_this.config$), map(function (_a) {
                var _b = __read(_a, 2), value$ = _b[0], config = _b[1];
                // As discussed with Brandon we keep it here
                // because in the beta we implement configuration behavior here
                return value$.pipe();
            }));
        };
        this.cdAware = createCdAware({
            work: setUpWork({
                ngZone: ngZone,
                cdRef: cdRef,
                context: cdRef.context,
            }),
            updateViewContextObserver: this.updateViewContextObserver,
            resetContextObserver: this.resetContextObserver,
            configurableBehaviour: this.configurableBehaviour,
        });
        this.subscription = this.cdAware.subscribe();
    }
    PushPipe.prototype.transform = function (potentialObservable, config) {
        if (config === void 0) { config = { optimized: true }; }
        this.configSubject.next(config);
        this.cdAware.next(potentialObservable);
        return this.renderedValue;
    };
    PushPipe.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    PushPipe = __decorate([
        Pipe({ name: 'ngrxPush', pure: false }),
        __metadata("design:paramtypes", [ChangeDetectorRef, NgZone])
    ], PushPipe);
    return PushPipe;
}());

/**
 * @Directive LetDirective
 *
 * @description
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
 * @usageNotes
 *
 * ### Examples
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
 * @publicApi
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
        this.configSubject = new ReplaySubject();
        this.config$ = this.configSubject.pipe(filter(function (v) { return v !== undefined && v !== null; }), distinctUntilChanged(), startWith({ optimized: true }));
        this.resetContextObserver = {
            next: function () {
                // if not initialized no need to set undefined
                if (_this.embeddedView) {
                    _this.ViewContext.$implicit = undefined;
                    _this.ViewContext.ngrxLet = undefined;
                    _this.ViewContext.$error = false;
                    _this.ViewContext.$complete = false;
                }
            },
        };
        this.updateViewContextObserver = {
            next: function (value) {
                // to have init lazy
                if (!_this.embeddedView) {
                    _this.createEmbeddedView();
                }
                _this.ViewContext.$implicit = value;
                _this.ViewContext.ngrxLet = value;
            },
            error: function (error) {
                // to have init lazy
                if (!_this.embeddedView) {
                    _this.createEmbeddedView();
                }
                _this.ViewContext.$error = true;
            },
            complete: function () {
                // to have init lazy
                if (!_this.embeddedView) {
                    _this.createEmbeddedView();
                }
                _this.ViewContext.$complete = true;
            },
        };
        this.configurableBehaviour = function (o$) {
            return o$.pipe(withLatestFrom(_this.config$), 
            // @NOTICE: unused config => As discussed with Brandon we keep it here because in the beta release we implement configuration behavior here
            map(function (_a) {
                var _b = __read(_a, 2), value$ = _b[0], config = _b[1];
                return value$.pipe(catchError(function (e) { return EMPTY; }));
            }));
        };
        this.cdAware = createCdAware({
            work: setUpWork({
                cdRef: cdRef,
                ngZone: ngZone,
                context: cdRef.context,
            }),
            resetContextObserver: this.resetContextObserver,
            updateViewContextObserver: this.updateViewContextObserver,
            configurableBehaviour: this.configurableBehaviour,
        });
        this.subscription = this.cdAware.subscribe();
    }
    LetDirective.ngTemplateContextGuard = function (dir, ctx) {
        return true;
    };
    Object.defineProperty(LetDirective.prototype, "ngrxLet", {
        set: function (potentialObservable) {
            this.cdAware.next(potentialObservable);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LetDirective.prototype, "ngrxLetConfig", {
        set: function (config) {
            this.configSubject.next(config || { optimized: true });
        },
        enumerable: true,
        configurable: true
    });
    LetDirective.prototype.createEmbeddedView = function () {
        this.embeddedView = this.viewContainerRef.createEmbeddedView(this.templateRef, this.ViewContext);
    };
    LetDirective.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.viewContainerRef.clear();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], LetDirective.prototype, "ngrxLet", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], LetDirective.prototype, "ngrxLetConfig", null);
    LetDirective = __decorate([
        Directive({ selector: '[ngrxLet]' }),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            NgZone,
            TemplateRef,
            ViewContainerRef])
    ], LetDirective);
    return LetDirective;
}());

var DECLARATIONS = [LetDirective, PushPipe];
var EXPORTS = [DECLARATIONS];
var ReactiveComponentModule = /** @class */ (function () {
    function ReactiveComponentModule() {
    }
    ReactiveComponentModule = __decorate([
        NgModule({
            declarations: [DECLARATIONS],
            exports: [EXPORTS],
        })
    ], ReactiveComponentModule);
    return ReactiveComponentModule;
}());

/**
 * DO NOT EDIT
 *
 * This file is automatically generated at build
 */

/**
 * Generated bundle index. Do not edit.
 */

export { LetDirective, PushPipe, ReactiveComponentModule };
//# sourceMappingURL=component.js.map
