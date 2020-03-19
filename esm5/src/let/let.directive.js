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
export { LetDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9sZXQvbGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sRUFFTixXQUFXLEVBRVgsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDTCxLQUFLLEVBSUwsYUFBYSxHQUVkLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsTUFBTSxFQUNOLEdBQUcsRUFDSCxTQUFTLEVBQ1QsY0FBYyxHQUNmLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUdMLGFBQWEsRUFDYixTQUFTLEdBQ1YsTUFBTSxTQUFTLENBQUM7QUFhakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtRUc7QUFFSDtJQXNGRSxzQkFDRSxLQUF3QixFQUN4QixNQUFjLEVBQ0csV0FBMkMsRUFDM0MsZ0JBQWtDO1FBSnJELGlCQWlCQztRQWRrQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0M7UUFDM0MscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQXhGcEMsZ0JBQVcsR0FBeUM7WUFDbkUsU0FBUyxFQUFFLFNBQVM7WUFDcEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDO1FBRWUsa0JBQWEsR0FBRyxJQUFJLGFBQWEsRUFBaUIsQ0FBQztRQUNuRCxZQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ2hELE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMs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QUdELHNCQUFJLHVDQUFhO2FBQWpCLFVBQWtCLE1BQXFCO1lBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELENBQUM7OztPQUFBO0lBcUJELHlDQUFrQixHQUFsQjtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUMxRCxJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsV0FBVyxDQUNqQixDQUFDO0lBQ0osQ0FBQztJQUVELGtDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBeENEO1FBREMsS0FBSyxFQUFFOzs7K0NBS1A7SUFHRDtRQURDLEtBQUssRUFBRTs7O3FEQUdQO0lBcEZVLFlBQVk7UUFEeEIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFDO3lDQXdGMUIsaUJBQWlCO1lBQ2hCLE1BQU07WUFDZ0IsV0FBVztZQUNOLGdCQUFnQjtPQTFGMUMsWUFBWSxDQW9IeEI7SUFBRCxtQkFBQztDQUFBLEFBcEhELElBb0hDO1NBcEhZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgVGVtcGxhdGVSZWYsXG4gIFR5cGUsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBFTVBUWSxcbiAgTmV4dE9ic2VydmVyLFxuICBPYnNlcnZhYmxlLFxuICBQYXJ0aWFsT2JzZXJ2ZXIsXG4gIFJlcGxheVN1YmplY3QsXG4gIFVuc3Vic2NyaWJhYmxlLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGNhdGNoRXJyb3IsXG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgc3RhcnRXaXRoLFxuICB3aXRoTGF0ZXN0RnJvbSxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQ2RBd2FyZSxcbiAgQ29hbGVzY2luZ0NvbmZpZyBhcyBOZ1J4TGV0Q29uZmlnLFxuICBjcmVhdGVDZEF3YXJlLFxuICBzZXRVcFdvcmssXG59IGZyb20gJy4uL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExldFZpZXdDb250ZXh0PFQ+IHtcbiAgLy8gdG8gZW5hYmxlIGBsZXRgIHN5bnRheCB3ZSBoYXZlIHRvIHVzZSAkaW1wbGljaXQgKHZhcjsgbGV0IHYgPSB2YXIpXG4gICRpbXBsaWNpdD86IFQ7XG4gIC8vIHRvIGVuYWJsZSBgYXNgIHN5bnRheCB3ZSBoYXZlIHRvIGFzc2lnbiB0aGUgZGlyZWN0aXZlcyBzZWxlY3RvciAodmFyIGFzIHYpXG4gIG5ncnhMZXQ/OiBUO1xuICAvLyBzZXQgY29udGV4dCB2YXIgY29tcGxldGUgdG8gdHJ1ZSAodmFyJDsgbGV0IHYgPSAkZXJyb3IpXG4gICRlcnJvcj86IGJvb2xlYW47XG4gIC8vIHNldCBjb250ZXh0IHZhciBjb21wbGV0ZSB0byB0cnVlICh2YXIkOyBsZXQgdiA9ICRjb21wbGV0ZSlcbiAgJGNvbXBsZXRlPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBARGlyZWN0aXZlIExldERpcmVjdGl2ZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRoZSBgKm5ncnhMZXRgIGRpcmVjdGl2ZSBzZXJ2ZXMgYSBjb252ZW5pZW50IHdheSBvZiBiaW5kaW5nIG9ic2VydmFibGVzIHRvIGEgdmlldyBjb250ZXh0IChhIGRvbSBlbGVtZW50IHNjb3BlKS5cbiAqIEl0IGFsc28gaGVscHMgd2l0aCBzZXZlcmFsIGludGVybmFsIHByb2Nlc3NpbmcgdW5kZXIgdGhlIGhvb2QuXG4gKlxuICogVGhlIGN1cnJlbnQgd2F5IG9mIGJpbmRpbmcgYW4gb2JzZXJ2YWJsZSB0byB0aGUgdmlldyBsb29rcyBsaWtlIHRoYXQ6XG4gKiBgYGBodG1sXG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwib2JzZXJ2YWJsZU51bWJlciQgYXMgblwiPlxuICogPGFwcC1udW1iZXIgW251bWJlcl09XCJuXCI+XG4gKiA8L2FwcC1udW1iZXI+XG4gKiA8YXBwLW51bWJlci1zcGVjaWFsIFtudW1iZXJdPVwiblwiPlxuICogPC9hcHAtbnVtYmVyLXNwZWNpYWw+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqICBgYGBcbiAqXG4gKiAgVGhlIHByb2JsZW0gaXMgYCpuZ0lmYCBpcyBhbHNvIGludGVyZmVyaW5nIHdpdGggcmVuZGVyaW5nIGFuZCBpbiBjYXNlIG9mIGEgYDBgIHRoZSBjb21wb25lbnQgd291bGQgYmUgaGlkZGVuXG4gKlxuICogSW5jbHVkZWQgRmVhdHVyZXM6XG4gKiAtIGJpbmRpbmcgaXMgYWx3YXlzIHByZXNlbnQuIChgKm5nSWY9XCJ0cnV0aHkkXCJgKVxuICogLSBpdCB0YWtlcyBhd2F5IHRoZSBtdWx0aXBsZSB1c2FnZXMgb2YgdGhlIGBhc3luY2Agb3IgYG5ncnhQdXNoYCBwaXBlXG4gKiAtIGEgdW5pZmllZC9zdHJ1Y3R1cmVkIHdheSBvZiBoYW5kbGluZyBudWxsIGFuZCB1bmRlZmluZWRcbiAqIC0gdHJpZ2dlcnMgY2hhbmdlLWRldGVjdGlvbiBkaWZmZXJlbnRseSBpZiBgem9uZS5qc2AgaXMgcHJlc2VudCBvciBub3QgKGBDaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzYCBvciBgQ2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrYClcbiAqIC0gdHJpZ2dlcnMgY2hhbmdlLWRldGVjdGlvbiBkaWZmZXJlbnRseSBpZiBWaWV3RW5naW5lIG9yIEl2eSBpcyBwcmVzZW50IChgQ2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlc2Agb3IgYMm1ZGV0ZWN0Q2hhbmdlc2ApXG4gKiAtIGRpc3RpbmN0IHNhbWUgdmFsdWVzIGluIGEgcm93IChkaXN0aW5jdFVudGlsQ2hhbmdlZCBvcGVyYXRvciksXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiAjIyMgRXhhbXBsZXNcbiAqXG4gKiBUaGUgYCpuZ3J4TGV0YCBkaXJlY3RpdmUgdGFrZSBvdmVyIHNldmVyYWwgdGhpbmdzIGFuZCBtYWtlcyBpdCBtb3JlIGNvbnZlbmllbnQgYW5kIHNhdmUgdG8gd29yayB3aXRoIHN0cmVhbXMgaW4gdGhlIHRlbXBsYXRlXG4gKiBgPG5nLWNvbnRhaW5lciAqbGV0PVwib2JzZXJ2YWJsZU51bWJlciQgYXMgY1wiPjwvbmctY29udGFpbmVyPmBcbiAqXG4gKiBgYGBodG1sXG4gKiA8bmctY29udGFpbmVyICpuZ3J4TGV0PVwib2JzZXJ2YWJsZU51bWJlciQgYXMgblwiPlxuICogPGFwcC1udW1iZXIgW251bWJlcl09XCJuXCI+XG4gKiA8L2FwcC1udW1iZXI+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqXG4gKiA8bmctY29udGFpbmVyICpuZ3J4TGV0PVwib2JzZXJ2YWJsZU51bWJlciQ7IGxldCBuXCI+XG4gKiA8YXBwLW51bWJlciBbbnVtYmVyXT1cIm5cIj5cbiAqIDwvYXBwLW51bWJlcj5cbiAqIDwvbmctY29udGFpbmVyPlxuICogYGBgXG4gKlxuICogSW4gYWRkaXRpb24gdG8gdGhhdCBpdCBwcm92aWRlcyB1cyBpbmZvcm1hdGlvbiBmcm9tIHRoZSB3aG9sZSBvYnNlcnZhYmxlIGNvbnRleHQuXG4gKiBXZSBjYW4gdHJhY2sgdGhlIG9ic2VydmFibGVzOlxuICogLSBuZXh0IHZhbHVlXG4gKiAtIGVycm9yIHZhbHVlXG4gKiAtIGNvbXBsZXRlIHN0YXRlXG4gKlxuICogYGBgaHRtbFxuICogPG5nLWNvbnRhaW5lciAqbmdyeExldD1cIm9ic2VydmFibGVOdW1iZXIkOyBsZXQgbjsgbGV0IGUgPSAkZXJyb3IsIGxldCBjID0gJGNvbXBsZXRlXCI+XG4gKiA8YXBwLW51bWJlciBbbnVtYmVyXT1cIm5cIiAgKm5nSWY9XCIhZSAmJiAhY1wiPlxuICogPC9hcHAtbnVtYmVyPlxuICogPG5nLWNvbnRhaW5lciAqbmdJZj1cImVcIj5cbiAqIFRoZXJlIGlzIGFuIGVycm9yOiB7e2V9fVxuICogPC9uZy1jb250YWluZXI+XG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwiY1wiPlxuICogT2JzZXJ2YWJsZSBjb21wbGV0ZWQ6IHt7Y319XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIDwvbmctY29udGFpbmVyPlxuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmdyeExldF0nIH0pXG5leHBvcnQgY2xhc3MgTGV0RGlyZWN0aXZlPFU+IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBlbWJlZGRlZFZpZXc6IGFueTtcbiAgcHJpdmF0ZSByZWFkb25seSBWaWV3Q29udGV4dDogTGV0Vmlld0NvbnRleHQ8VSB8IHVuZGVmaW5lZCB8IG51bGw+ID0ge1xuICAgICRpbXBsaWNpdDogdW5kZWZpbmVkLFxuICAgIG5ncnhMZXQ6IHVuZGVmaW5lZCxcbiAgICAkZXJyb3I6IGZhbHNlLFxuICAgICRjb21wbGV0ZTogZmFsc2UsXG4gIH07XG5cbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWdTdWJqZWN0ID0gbmV3IFJlcGxheVN1YmplY3Q8TmdSeExldENvbmZpZz4oKTtcbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWckID0gdGhpcy5jb25maWdTdWJqZWN0LnBpcGUoXG4gICAgZmlsdGVyKHYgPT4gdiAhPT0gdW5kZWZpbmVkICYmIHYgIT09IG51bGwpLFxuICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgc3RhcnRXaXRoKHsgb3B0aW1pemVkOiB0cnVlIH0pXG4gICk7XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHN1YnNjcmlwdGlvbjogVW5zdWJzY3JpYmFibGU7XG4gIHByaXZhdGUgcmVhZG9ubHkgY2RBd2FyZTogQ2RBd2FyZTxVIHwgbnVsbCB8IHVuZGVmaW5lZD47XG4gIHByaXZhdGUgcmVhZG9ubHkgcmVzZXRDb250ZXh0T2JzZXJ2ZXI6IE5leHRPYnNlcnZlcjx1bmtub3duPiA9IHtcbiAgICBuZXh0OiAoKSA9PiB7XG4gICAgICAvLyBpZiBub3QgaW5pdGlhbGl6ZWQgbm8gbmVlZCB0byBzZXQgdW5kZWZpbmVkXG4gICAgICBpZiAodGhpcy5lbWJlZGRlZFZpZXcpIHtcbiAgICAgICAgdGhpcy5WaWV3Q29udGV4dC4kaW1wbGljaXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuVmlld0NvbnRleHQubmdyeExldCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5WaWV3Q29udGV4dC4kZXJyb3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5WaWV3Q29udGV4dC4kY29tcGxldGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuICBwcml2YXRlIHJlYWRvbmx5IHVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXI6IFBhcnRpYWxPYnNlcnZlcjxcbiAgICBVIHwgbnVsbCB8IHVuZGVmaW5lZFxuICA+ID0ge1xuICAgIG5leHQ6ICh2YWx1ZTogVSB8IG51bGwgfCB1bmRlZmluZWQpID0+IHtcbiAgICAgIC8vIHRvIGhhdmUgaW5pdCBsYXp5XG4gICAgICBpZiAoIXRoaXMuZW1iZWRkZWRWaWV3KSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRW1iZWRkZWRWaWV3KCk7XG4gICAgICB9XG4gICAgICB0aGlzLlZpZXdDb250ZXh0LiRpbXBsaWNpdCA9IHZhbHVlO1xuICAgICAgdGhpcy5WaWV3Q29udGV4dC5uZ3J4TGV0ID0gdmFsdWU7XG4gICAgfSxcbiAgICBlcnJvcjogKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgLy8gdG8gaGF2ZSBpbml0IGxhenlcbiAgICAgIGlmICghdGhpcy5lbWJlZGRlZFZpZXcpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVFbWJlZGRlZFZpZXcoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuVmlld0NvbnRleHQuJGVycm9yID0gdHJ1ZTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAvLyB0byBoYXZlIGluaXQgbGF6eVxuICAgICAgaWYgKCF0aGlzLmVtYmVkZGVkVmlldykge1xuICAgICAgICB0aGlzLmNyZWF0ZUVtYmVkZGVkVmlldygpO1xuICAgICAgfVxuICAgICAgdGhpcy5WaWV3Q29udGV4dC4kY29tcGxldGUgPSB0cnVlO1xuICAgIH0sXG4gIH07XG5cbiAgc3RhdGljIG5nVGVtcGxhdGVDb250ZXh0R3VhcmQ8VT4oXG4gICAgZGlyOiBMZXREaXJlY3RpdmU8VT4sXG4gICAgY3R4OiB1bmtub3duXG4gICk6IGN0eCBpcyBMZXRWaWV3Q29udGV4dDxVPiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZ3VyYWJsZUJlaGF2aW91ciA9IDxUPihcbiAgICBvJDogT2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFQ+PlxuICApOiBPYnNlcnZhYmxlPE9ic2VydmFibGU8VD4+ID0+XG4gICAgbyQucGlwZShcbiAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuY29uZmlnJCksXG4gICAgICAvLyBATk9USUNFOiB1bnVzZWQgY29uZmlnID0+IEFzIGRpc2N1c3NlZCB3aXRoIEJyYW5kb24gd2Uga2VlcCBpdCBoZXJlIGJlY2F1c2UgaW4gdGhlIGJldGEgcmVsZWFzZSB3ZSBpbXBsZW1lbnQgY29uZmlndXJhdGlvbiBiZWhhdmlvciBoZXJlXG4gICAgICBtYXAoKFt2YWx1ZSQsIGNvbmZpZ10pID0+IHtcbiAgICAgICAgcmV0dXJuIHZhbHVlJC5waXBlKGNhdGNoRXJyb3IoZSA9PiBFTVBUWSkpO1xuICAgICAgfSlcbiAgICApO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBuZ3J4TGV0KFxuICAgIHBvdGVudGlhbE9ic2VydmFibGU6IE9ic2VydmFibGU8VT4gfCBQcm9taXNlPFU+IHwgbnVsbCB8IHVuZGVmaW5lZFxuICApIHtcbiAgICB0aGlzLmNkQXdhcmUubmV4dChwb3RlbnRpYWxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBuZ3J4TGV0Q29uZmlnKGNvbmZpZzogTmdSeExldENvbmZpZykge1xuICAgIHRoaXMuY29uZmlnU3ViamVjdC5uZXh0KGNvbmZpZyB8fCB7IG9wdGltaXplZDogdHJ1ZSB9KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxMZXRWaWV3Q29udGV4dDxVPj4sXG4gICAgcHJpdmF0ZSByZWFkb25seSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmXG4gICkge1xuICAgIHRoaXMuY2RBd2FyZSA9IGNyZWF0ZUNkQXdhcmU8VT4oe1xuICAgICAgd29yazogc2V0VXBXb3JrKHtcbiAgICAgICAgY2RSZWYsXG4gICAgICAgIG5nWm9uZSxcbiAgICAgICAgY29udGV4dDogKGNkUmVmIGFzIEVtYmVkZGVkVmlld1JlZjxUeXBlPGFueT4+KS5jb250ZXh0LFxuICAgICAgfSksXG4gICAgICByZXNldENvbnRleHRPYnNlcnZlcjogdGhpcy5yZXNldENvbnRleHRPYnNlcnZlcixcbiAgICAgIHVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXI6IHRoaXMudXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcixcbiAgICAgIGNvbmZpZ3VyYWJsZUJlaGF2aW91cjogdGhpcy5jb25maWd1cmFibGVCZWhhdmlvdXIsXG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmNkQXdhcmUuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBjcmVhdGVFbWJlZGRlZFZpZXcoKSB7XG4gICAgdGhpcy5lbWJlZGRlZFZpZXcgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KFxuICAgICAgdGhpcy50ZW1wbGF0ZVJlZixcbiAgICAgIHRoaXMuVmlld0NvbnRleHRcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgfVxufVxuIl19