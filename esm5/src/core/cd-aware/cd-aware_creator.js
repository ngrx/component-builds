/**
 * @fileoverview added by tsickle
 * Generated from: src/core/cd-aware/cd-aware_creator.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject, } from 'rxjs';
import { distinctUntilChanged, map, switchAll, tap } from 'rxjs/operators';
import { toObservableValue } from '../projections';
import { getChangeDetectionHandler } from './get-change-detection-handling';
/**
 * @record
 */
export function CoalescingConfig() { }
if (false) {
    /** @type {?} */
    CoalescingConfig.prototype.optimized;
}
/**
 * @record
 * @template U
 */
export function CdAware() { }
if (false) {
    /** @type {?} */
    CdAware.prototype.next;
}
/**
 * @record
 */
export function WorkConfig() { }
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
export function setUpWork(cfg) {
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
export function createCdAware(cfg) {
    /** @type {?} */
    var observablesSubject = new Subject();
    /** @type {?} */
    var observables$ = observablesSubject.pipe(distinctUntilChanged(), 
    // Try to convert it to values, throw if not possible
    map((/**
     * @param {?} v
     * @return {?}
     */
    function (v) { return toObservableValue(v); })), tap((/**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        cfg.resetContextObserver.next(v);
        cfg.work();
    })), map((/**
     * @param {?} value$
     * @return {?}
     */
    function (value$) {
        return value$.pipe(distinctUntilChanged(), tap(cfg.updateViewContextObserver));
    })), cfg.configurableBehaviour, switchAll(), tap((/**
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
//# sourceMappingURL=cd-aware_creator.js.map