import { __decorate, __metadata, __read } from "tslib";
import { ChangeDetectorRef, Directive, Input, NgZone, TemplateRef, ViewContainerRef, } from '@angular/core';
import { EMPTY, ReplaySubject, } from 'rxjs';
import { catchError, distinctUntilChanged, filter, map, startWith, withLatestFrom, } from 'rxjs/operators';
import { createCdAware, setUpWork, } from '../core';
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
                if (!_this.embeddedView) {
                    _this.createEmbeddedView();
                }
                _this.ViewContext.$implicit = value;
                _this.ViewContext.ngrxLet = value;
            },
            error: function (error) {
                if (!_this.embeddedView) {
                    _this.createEmbeddedView();
                }
                _this.ViewContext.$error = true;
            },
            complete: function () {
                if (!_this.embeddedView) {
                    _this.createEmbeddedView();
                }
                _this.ViewContext.$complete = true;
            },
        };
        this.configurableBehaviour = function (o$) {
            return o$.pipe(withLatestFrom(_this.config$), map(function (_a) {
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
export { LetDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9sZXQvbGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sRUFFTixXQUFXLEVBRVgsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDTCxLQUFLLEVBSUwsYUFBYSxHQUVkLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsTUFBTSxFQUNOLEdBQUcsRUFDSCxTQUFTLEVBQ1QsY0FBYyxHQUNmLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUdMLGFBQWEsRUFDYixTQUFTLEdBQ1YsTUFBTSxTQUFTLENBQUM7QUFhakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUVHO0FBRUg7SUFpRkUsc0JBQ0UsS0FBd0IsRUFDeEIsTUFBYyxFQUNHLFdBQTJDLEVBQzNDLGdCQUFrQztRQUpyRCxpQkFpQkM7UUFka0IsZ0JBQVcsR0FBWCxXQUFXLENBQWdDO1FBQzNDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFuRnBDLGdCQUFXLEdBQXlDO1lBQ25FLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FBQztRQUVlLGtCQUFhLEdBQUcsSUFBSSxhQUFhLEVBQWlCLENBQUM7UUFDbkQsWUFBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNoRCxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtB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QUFNLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN6RCxDQUFDOzs7T0FBQTtJQXFCRCx5Q0FBa0IsR0FBbEI7UUFDRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FDMUQsSUFBSSxDQUFDLFdBQVcsRUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FDakIsQ0FBQztJQUNKLENBQUM7SUFFRCxrQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQXhDRDtRQURDLEtBQUssRUFBRTs7OytDQUtQO0lBR0Q7UUFEQyxLQUFLLEVBQUU7OztxREFHUDtJQS9FVSxZQUFZO1FBRHhCLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQzt5Q0FtRjFCLGlCQUFpQjtZQUNoQixNQUFNO1lBQ2dCLFdBQVc7WUFDTixnQkFBZ0I7T0FyRjFDLFlBQVksQ0ErR3hCO0lBQUQsbUJBQUM7Q0FBQSxBQS9HRCxJQStHQztTQS9HWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIFRlbXBsYXRlUmVmLFxuICBUeXBlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgRU1QVFksXG4gIE5leHRPYnNlcnZlcixcbiAgT2JzZXJ2YWJsZSxcbiAgUGFydGlhbE9ic2VydmVyLFxuICBSZXBsYXlTdWJqZWN0LFxuICBVbnN1YnNjcmliYWJsZSxcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBjYXRjaEVycm9yLFxuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHN0YXJ0V2l0aCxcbiAgd2l0aExhdGVzdEZyb20sXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIENkQXdhcmUsXG4gIENvYWxlc2NpbmdDb25maWcgYXMgTmdSeExldENvbmZpZyxcbiAgY3JlYXRlQ2RBd2FyZSxcbiAgc2V0VXBXb3JrLFxufSBmcm9tICcuLi9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBMZXRWaWV3Q29udGV4dDxUPiB7XG4gIC8vIHRvIGVuYWJsZSBgbGV0YCBzeW50YXggd2UgaGF2ZSB0byB1c2UgJGltcGxpY2l0ICh2YXI7IGxldCB2ID0gdmFyKVxuICAkaW1wbGljaXQ/OiBUO1xuICAvLyB0byBlbmFibGUgYGFzYCBzeW50YXggd2UgaGF2ZSB0byBhc3NpZ24gdGhlIGRpcmVjdGl2ZXMgc2VsZWN0b3IgKHZhciBhcyB2KVxuICBuZ3J4TGV0PzogVDtcbiAgLy8gc2V0IGNvbnRleHQgdmFyIGNvbXBsZXRlIHRvIHRydWUgKHZhciQ7IGxldCBlID0gJGVycm9yKVxuICAkZXJyb3I/OiBib29sZWFuO1xuICAvLyBzZXQgY29udGV4dCB2YXIgY29tcGxldGUgdG8gdHJ1ZSAodmFyJDsgbGV0IGMgPSAkY29tcGxldGUpXG4gICRjb21wbGV0ZT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogQERpcmVjdGl2ZSBMZXREaXJlY3RpdmVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBUaGUgYCpuZ3J4TGV0YCBkaXJlY3RpdmUgc2VydmVzIGEgY29udmVuaWVudCB3YXkgb2YgYmluZGluZyBvYnNlcnZhYmxlcyB0byBhIHZpZXcgY29udGV4dCAoYSBkb20gZWxlbWVudCBzY29wZSkuXG4gKiBJdCBhbHNvIGhlbHBzIHdpdGggc2V2ZXJhbCBpbnRlcm5hbCBwcm9jZXNzaW5nIHVuZGVyIHRoZSBob29kLlxuICpcbiAqIFRoZSBjdXJyZW50IHdheSBvZiBiaW5kaW5nIGFuIG9ic2VydmFibGUgdG8gdGhlIHZpZXcgbG9va3MgbGlrZSB0aGF0OlxuICogYGBgaHRtbFxuICogPG5nLWNvbnRhaW5lciAqbmdJZj1cIm9ic2VydmFibGVOdW1iZXIkIGFzIG5cIj5cbiAqIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiPlxuICogPC9hcHAtbnVtYmVyPlxuICogPGFwcC1udW1iZXItc3BlY2lhbCBbbnVtYmVyXT1cIm5cIj5cbiAqIDwvYXBwLW51bWJlci1zcGVjaWFsPlxuICogPC9uZy1jb250YWluZXI+XG4gKiAgYGBgXG4gKlxuICogIFRoZSBwcm9ibGVtIGlzIGAqbmdJZmAgaXMgYWxzbyBpbnRlcmZlcmluZyB3aXRoIHJlbmRlcmluZyBhbmQgaW4gY2FzZSBvZiBhIGAwYCB0aGUgY29tcG9uZW50IHdvdWxkIGJlIGhpZGRlblxuICpcbiAqIEluY2x1ZGVkIEZlYXR1cmVzOlxuICogLSBiaW5kaW5nIGlzIGFsd2F5cyBwcmVzZW50LiAoYCpuZ0lmPVwidHJ1dGh5JFwiYClcbiAqIC0gaXQgdGFrZXMgYXdheSB0aGUgbXVsdGlwbGUgdXNhZ2VzIG9mIHRoZSBgYXN5bmNgIG9yIGBuZ3J4UHVzaGAgcGlwZVxuICogLSBhIHVuaWZpZWQvc3RydWN0dXJlZCB3YXkgb2YgaGFuZGxpbmcgbnVsbCBhbmQgdW5kZWZpbmVkXG4gKiAtIHRyaWdnZXJzIGNoYW5nZS1kZXRlY3Rpb24gZGlmZmVyZW50bHkgaWYgYHpvbmUuanNgIGlzIHByZXNlbnQgb3Igbm90IChgQ2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlc2Agb3IgYENoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVja2ApXG4gKiAtIHRyaWdnZXJzIGNoYW5nZS1kZXRlY3Rpb24gZGlmZmVyZW50bHkgaWYgVmlld0VuZ2luZSBvciBJdnkgaXMgcHJlc2VudCAoYENoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXNgIG9yIGDJtWRldGVjdENoYW5nZXNgKVxuICogLSBkaXN0aW5jdCBzYW1lIHZhbHVlcyBpbiBhIHJvdyAoZGlzdGluY3RVbnRpbENoYW5nZWQgb3BlcmF0b3IpLFxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogVGhlIGAqbmdyeExldGAgZGlyZWN0aXZlIHRha2Ugb3ZlciBzZXZlcmFsIHRoaW5ncyBhbmQgbWFrZXMgaXQgbW9yZSBjb252ZW5pZW50IGFuZCBzYXZlIHRvIHdvcmsgd2l0aCBzdHJlYW1zIGluIHRoZSB0ZW1wbGF0ZVxuICogYDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJvYnNlcnZhYmxlTnVtYmVyJCBhcyBjXCI+PC9uZy1jb250YWluZXI+YFxuICpcbiAqIGBgYGh0bWxcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJvYnNlcnZhYmxlTnVtYmVyJCBhcyBuXCI+XG4gKiA8YXBwLW51bWJlciBbbnVtYmVyXT1cIm5cIj5cbiAqIDwvYXBwLW51bWJlcj5cbiAqIDwvbmctY29udGFpbmVyPlxuICpcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJvYnNlcnZhYmxlTnVtYmVyJDsgbGV0IG5cIj5cbiAqIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiPlxuICogPC9hcHAtbnVtYmVyPlxuICogPC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiBJbiBhZGRpdGlvbiB0byB0aGF0IGl0IHByb3ZpZGVzIHVzIGluZm9ybWF0aW9uIGZyb20gdGhlIHdob2xlIG9ic2VydmFibGUgY29udGV4dC5cbiAqIFdlIGNhbiB0cmFjayB0aGUgb2JzZXJ2YWJsZXM6XG4gKiAtIG5leHQgdmFsdWVcbiAqIC0gZXJyb3IgdmFsdWVcbiAqIC0gY29tcGxldGUgc3RhdGVcbiAqXG4gKiBgYGBodG1sXG4gKiA8bmctY29udGFpbmVyICpuZ3J4TGV0PVwib2JzZXJ2YWJsZU51bWJlciQ7IGxldCBuOyBsZXQgZSA9ICRlcnJvciwgbGV0IGMgPSAkY29tcGxldGVcIj5cbiAqIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiICAqbmdJZj1cIiFlICYmICFjXCI+XG4gKiA8L2FwcC1udW1iZXI+XG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwiZVwiPlxuICogVGhlcmUgaXMgYW4gZXJyb3I6IHt7ZX19XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIDxuZy1jb250YWluZXIgKm5nSWY9XCJjXCI+XG4gKiBPYnNlcnZhYmxlIGNvbXBsZXRlZDoge3tjfX1cbiAqIDwvbmctY29udGFpbmVyPlxuICogPC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ3J4TGV0XScgfSlcbmV4cG9ydCBjbGFzcyBMZXREaXJlY3RpdmU8VT4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGVtYmVkZGVkVmlldzogYW55O1xuICBwcml2YXRlIHJlYWRvbmx5IFZpZXdDb250ZXh0OiBMZXRWaWV3Q29udGV4dDxVIHwgdW5kZWZpbmVkIHwgbnVsbD4gPSB7XG4gICAgJGltcGxpY2l0OiB1bmRlZmluZWQsXG4gICAgbmdyeExldDogdW5kZWZpbmVkLFxuICAgICRlcnJvcjogZmFsc2UsXG4gICAgJGNvbXBsZXRlOiBmYWxzZSxcbiAgfTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZ1N1YmplY3QgPSBuZXcgUmVwbGF5U3ViamVjdDxOZ1J4TGV0Q29uZmlnPigpO1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZyQgPSB0aGlzLmNvbmZpZ1N1YmplY3QucGlwZShcbiAgICBmaWx0ZXIodiA9PiB2ICE9PSB1bmRlZmluZWQgJiYgdiAhPT0gbnVsbCksXG4gICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICBzdGFydFdpdGgoeyBvcHRpbWl6ZWQ6IHRydWUgfSlcbiAgKTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc3Vic2NyaXB0aW9uOiBVbnN1YnNjcmliYWJsZTtcbiAgcHJpdmF0ZSByZWFkb25seSBjZEF3YXJlOiBDZEF3YXJlPFUgfCBudWxsIHwgdW5kZWZpbmVkPjtcbiAgcHJpdmF0ZSByZWFkb25seSByZXNldENvbnRleHRPYnNlcnZlcjogTmV4dE9ic2VydmVyPHVua25vd24+ID0ge1xuICAgIG5leHQ6ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmVtYmVkZGVkVmlldykge1xuICAgICAgICB0aGlzLlZpZXdDb250ZXh0LiRpbXBsaWNpdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5WaWV3Q29udGV4dC5uZ3J4TGV0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLlZpZXdDb250ZXh0LiRlcnJvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLlZpZXdDb250ZXh0LiRjb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG4gIHByaXZhdGUgcmVhZG9ubHkgdXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcjogUGFydGlhbE9ic2VydmVyPFxuICAgIFUgfCBudWxsIHwgdW5kZWZpbmVkXG4gID4gPSB7XG4gICAgbmV4dDogKHZhbHVlOiBVIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmVtYmVkZGVkVmlldykge1xuICAgICAgICB0aGlzLmNyZWF0ZUVtYmVkZGVkVmlldygpO1xuICAgICAgfVxuICAgICAgdGhpcy5WaWV3Q29udGV4dC4kaW1wbGljaXQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuVmlld0NvbnRleHQubmdyeExldCA9IHZhbHVlO1xuICAgIH0sXG4gICAgZXJyb3I6IChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgIGlmICghdGhpcy5lbWJlZGRlZFZpZXcpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVFbWJlZGRlZFZpZXcoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuVmlld0NvbnRleHQuJGVycm9yID0gdHJ1ZTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuZW1iZWRkZWRWaWV3KSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRW1iZWRkZWRWaWV3KCk7XG4gICAgICB9XG4gICAgICB0aGlzLlZpZXdDb250ZXh0LiRjb21wbGV0ZSA9IHRydWU7XG4gICAgfSxcbiAgfTtcblxuICBzdGF0aWMgbmdUZW1wbGF0ZUNvbnRleHRHdWFyZDxVPihcbiAgICBkaXI6IExldERpcmVjdGl2ZTxVPixcbiAgICBjdHg6IHVua25vd25cbiAgKTogY3R4IGlzIExldFZpZXdDb250ZXh0PFU+IHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZmlndXJhYmxlQmVoYXZpb3VyID0gPFQ+KFxuICAgIG8kOiBPYnNlcnZhYmxlPE9ic2VydmFibGU8VD4+XG4gICk6IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxUPj4gPT5cbiAgICBvJC5waXBlKFxuICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5jb25maWckKSxcbiAgICAgIG1hcCgoW3ZhbHVlJCwgY29uZmlnXSkgPT4ge1xuICAgICAgICByZXR1cm4gdmFsdWUkLnBpcGUoY2F0Y2hFcnJvcihlID0+IEVNUFRZKSk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgQElucHV0KClcbiAgc2V0IG5ncnhMZXQoXG4gICAgcG90ZW50aWFsT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxVPiB8IFByb21pc2U8VT4gfCBudWxsIHwgdW5kZWZpbmVkXG4gICkge1xuICAgIHRoaXMuY2RBd2FyZS5uZXh0KHBvdGVudGlhbE9ic2VydmFibGUpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG5ncnhMZXRDb25maWcoY29uZmlnOiBOZ1J4TGV0Q29uZmlnKSB7XG4gICAgdGhpcy5jb25maWdTdWJqZWN0Lm5leHQoY29uZmlnIHx8IHsgb3B0aW1pemVkOiB0cnVlIH0pO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPExldFZpZXdDb250ZXh0PFU+PixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWZcbiAgKSB7XG4gICAgdGhpcy5jZEF3YXJlID0gY3JlYXRlQ2RBd2FyZTxVPih7XG4gICAgICB3b3JrOiBzZXRVcFdvcmsoe1xuICAgICAgICBjZFJlZixcbiAgICAgICAgbmdab25lLFxuICAgICAgICBjb250ZXh0OiAoY2RSZWYgYXMgRW1iZWRkZWRWaWV3UmVmPFR5cGU8YW55Pj4pLmNvbnRleHQsXG4gICAgICB9KSxcbiAgICAgIHJlc2V0Q29udGV4dE9ic2VydmVyOiB0aGlzLnJlc2V0Q29udGV4dE9ic2VydmVyLFxuICAgICAgdXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcjogdGhpcy51cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyLFxuICAgICAgY29uZmlndXJhYmxlQmVoYXZpb3VyOiB0aGlzLmNvbmZpZ3VyYWJsZUJlaGF2aW91cixcbiAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuY2RBd2FyZS5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIGNyZWF0ZUVtYmVkZGVkVmlldygpIHtcbiAgICB0aGlzLmVtYmVkZGVkVmlldyA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcoXG4gICAgICB0aGlzLnRlbXBsYXRlUmVmLFxuICAgICAgdGhpcy5WaWV3Q29udGV4dFxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICB9XG59XG4iXX0=