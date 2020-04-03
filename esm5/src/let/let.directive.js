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
export { LetDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9sZXQvbGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixTQUFTLEVBRVQsS0FBSyxFQUNMLE1BQU0sRUFFTixXQUFXLEVBRVgsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDTCxLQUFLLEVBSUwsYUFBYSxHQUVkLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsTUFBTSxFQUNOLEdBQUcsRUFDSCxTQUFTLEVBQ1QsY0FBYyxHQUNmLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUdMLGFBQWEsRUFDYixTQUFTLEdBQ1YsTUFBTSxTQUFTLENBQUM7QUFhakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtRUc7QUFFSDtJQXNGRSxzQkFDRSxLQUF3QixFQUN4QixNQUFjLEVBQ0csV0FBMkMsRUFDM0MsZ0JBQWtDO1FBSnJELGlCQWlCQztRQWRrQixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0M7UUFDM0MscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQXhGcEMsZ0JBQVcsR0FBeUM7WUFDbkUsU0FBUyxFQUFFLFNBQVM7WUFDcEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUUsS0FBSztTQUNqQixDQUFDO1FBRWUsa0JBQWEsR0FBRyxJQUFJLGFBQWEsRUFBaUIsQ0FBQztRQUNuRCxZQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ2hELE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMs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QUdELHNCQUFJLHVDQUFhO2FBQWpCLFVBQWtCLE1BQXFCO1lBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELENBQUM7OztPQUFBO0lBcUJELHlDQUFrQixHQUFsQjtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUMxRCxJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsV0FBVyxDQUNqQixDQUFDO0lBQ0osQ0FBQztJQUVELGtDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBeENEO1FBREMsS0FBSyxFQUFFOzs7K0NBS1A7SUFHRDtRQURDLEtBQUssRUFBRTs7O3FEQUdQO0lBcEZVLFlBQVk7UUFEeEIsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxDQUFDO3lDQXdGMUIsaUJBQWlCO1lBQ2hCLE1BQU07WUFDZ0IsV0FBVztZQUNOLGdCQUFnQjtPQTFGMUMsWUFBWSxDQW9IeEI7SUFBRCxtQkFBQztDQUFBLEFBcEhELElBb0hDO1NBcEhZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgVGVtcGxhdGVSZWYsXG4gIFR5cGUsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBFTVBUWSxcbiAgTmV4dE9ic2VydmVyLFxuICBPYnNlcnZhYmxlLFxuICBQYXJ0aWFsT2JzZXJ2ZXIsXG4gIFJlcGxheVN1YmplY3QsXG4gIFVuc3Vic2NyaWJhYmxlLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGNhdGNoRXJyb3IsXG4gIGRpc3RpbmN0VW50aWxDaGFuZ2VkLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgc3RhcnRXaXRoLFxuICB3aXRoTGF0ZXN0RnJvbSxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQ2RBd2FyZSxcbiAgQ29hbGVzY2luZ0NvbmZpZyBhcyBOZ1J4TGV0Q29uZmlnLFxuICBjcmVhdGVDZEF3YXJlLFxuICBzZXRVcFdvcmssXG59IGZyb20gJy4uL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIExldFZpZXdDb250ZXh0PFQ+IHtcbiAgLy8gdG8gZW5hYmxlIGBsZXRgIHN5bnRheCB3ZSBoYXZlIHRvIHVzZSAkaW1wbGljaXQgKHZhcjsgbGV0IHYgPSB2YXIpXG4gICRpbXBsaWNpdD86IFQ7XG4gIC8vIHRvIGVuYWJsZSBgYXNgIHN5bnRheCB3ZSBoYXZlIHRvIGFzc2lnbiB0aGUgZGlyZWN0aXZlcyBzZWxlY3RvciAodmFyIGFzIHYpXG4gIG5ncnhMZXQ/OiBUO1xuICAvLyBzZXQgY29udGV4dCB2YXIgY29tcGxldGUgdG8gdHJ1ZSAodmFyJDsgbGV0IHYgPSAkZXJyb3IpXG4gICRlcnJvcj86IGJvb2xlYW47XG4gIC8vIHNldCBjb250ZXh0IHZhciBjb21wbGV0ZSB0byB0cnVlICh2YXIkOyBsZXQgdiA9ICRjb21wbGV0ZSlcbiAgJGNvbXBsZXRlPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBARGlyZWN0aXZlIExldERpcmVjdGl2ZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRoZSBgKm5ncnhMZXRgIGRpcmVjdGl2ZSBzZXJ2ZXMgYSBjb252ZW5pZW50IHdheSBvZiBiaW5kaW5nIG9ic2VydmFibGVzIHRvIGEgdmlldyBjb250ZXh0IChhIGRvbSBlbGVtZW50IHNjb3BlKS5cbiAqIEl0IGFsc28gaGVscHMgd2l0aCBzZXZlcmFsIGludGVybmFsIHByb2Nlc3NpbmcgdW5kZXIgdGhlIGhvb2QuXG4gKlxuICogVGhlIGN1cnJlbnQgd2F5IG9mIGJpbmRpbmcgYW4gb2JzZXJ2YWJsZSB0byB0aGUgdmlldyBsb29rcyBsaWtlIHRoYXQ6XG4gKiBgYGBodG1sXG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwib2JzZXJ2YWJsZU51bWJlciQgYXMgblwiPlxuICogPGFwcC1udW1iZXIgW251bWJlcl09XCJuXCI+XG4gKiA8L2FwcC1udW1iZXI+XG4gKiA8YXBwLW51bWJlci1zcGVjaWFsIFtudW1iZXJdPVwiblwiPlxuICogPC9hcHAtbnVtYmVyLXNwZWNpYWw+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqICBgYGBcbiAqXG4gKiAgVGhlIHByb2JsZW0gaXMgYCpuZ0lmYCBpcyBhbHNvIGludGVyZmVyaW5nIHdpdGggcmVuZGVyaW5nIGFuZCBpbiBjYXNlIG9mIGEgYDBgIHRoZSBjb21wb25lbnQgd291bGQgYmUgaGlkZGVuXG4gKlxuICogSW5jbHVkZWQgRmVhdHVyZXM6XG4gKiAtIGJpbmRpbmcgaXMgYWx3YXlzIHByZXNlbnQuIChgKm5nSWY9XCJ0cnV0aHkkXCJgKVxuICogLSBpdCB0YWtlcyBhd2F5IHRoZSBtdWx0aXBsZSB1c2FnZXMgb2YgdGhlIGBhc3luY2Agb3IgYG5ncnhQdXNoYCBwaXBlXG4gKiAtIGEgdW5pZmllZC9zdHJ1Y3R1cmVkIHdheSBvZiBoYW5kbGluZyBudWxsIGFuZCB1bmRlZmluZWRcbiAqIC0gdHJpZ2dlcnMgY2hhbmdlLWRldGVjdGlvbiBkaWZmZXJlbnRseSBpZiBgem9uZS5qc2AgaXMgcHJlc2VudCBvciBub3QgKGBDaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzYCBvciBgQ2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrYClcbiAqIC0gdHJpZ2dlcnMgY2hhbmdlLWRldGVjdGlvbiBkaWZmZXJlbnRseSBpZiBWaWV3RW5naW5lIG9yIEl2eSBpcyBwcmVzZW50IChgQ2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlc2Agb3IgYMm1ZGV0ZWN0Q2hhbmdlc2ApXG4gKiAtIGRpc3RpbmN0IHNhbWUgdmFsdWVzIGluIGEgcm93IChkaXN0aW5jdFVudGlsQ2hhbmdlZCBvcGVyYXRvciksXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiAjIyMgRXhhbXBsZXNcbiAqXG4gKiBUaGUgYCpuZ3J4TGV0YCBkaXJlY3RpdmUgdGFrZSBvdmVyIHNldmVyYWwgdGhpbmdzIGFuZCBtYWtlcyBpdCBtb3JlIGNvbnZlbmllbnQgYW5kIHNhdmUgdG8gd29yayB3aXRoIHN0cmVhbXMgaW4gdGhlIHRlbXBsYXRlXG4gKiBgPG5nLWNvbnRhaW5lciAqbmdyeExldD1cIm9ic2VydmFibGVOdW1iZXIkIGFzIGNcIj48L25nLWNvbnRhaW5lcj5gXG4gKlxuICogYGBgaHRtbFxuICogPG5nLWNvbnRhaW5lciAqbmdyeExldD1cIm9ic2VydmFibGVOdW1iZXIkIGFzIG5cIj5cbiAqIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiPlxuICogPC9hcHAtbnVtYmVyPlxuICogPC9uZy1jb250YWluZXI+XG4gKlxuICogPG5nLWNvbnRhaW5lciAqbmdyeExldD1cIm9ic2VydmFibGVOdW1iZXIkOyBsZXQgblwiPlxuICogPGFwcC1udW1iZXIgW251bWJlcl09XCJuXCI+XG4gKiA8L2FwcC1udW1iZXI+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIGBgYFxuICpcbiAqIEluIGFkZGl0aW9uIHRvIHRoYXQgaXQgcHJvdmlkZXMgdXMgaW5mb3JtYXRpb24gZnJvbSB0aGUgd2hvbGUgb2JzZXJ2YWJsZSBjb250ZXh0LlxuICogV2UgY2FuIHRyYWNrIHRoZSBvYnNlcnZhYmxlczpcbiAqIC0gbmV4dCB2YWx1ZVxuICogLSBlcnJvciB2YWx1ZVxuICogLSBjb21wbGV0ZSBzdGF0ZVxuICpcbiAqIGBgYGh0bWxcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJvYnNlcnZhYmxlTnVtYmVyJDsgbGV0IG47IGxldCBlID0gJGVycm9yLCBsZXQgYyA9ICRjb21wbGV0ZVwiPlxuICogPGFwcC1udW1iZXIgW251bWJlcl09XCJuXCIgICpuZ0lmPVwiIWUgJiYgIWNcIj5cbiAqIDwvYXBwLW51bWJlcj5cbiAqIDxuZy1jb250YWluZXIgKm5nSWY9XCJlXCI+XG4gKiBUaGVyZSBpcyBhbiBlcnJvcjoge3tlfX1cbiAqIDwvbmctY29udGFpbmVyPlxuICogPG5nLWNvbnRhaW5lciAqbmdJZj1cImNcIj5cbiAqIE9ic2VydmFibGUgY29tcGxldGVkOiB7e2N9fVxuICogPC9uZy1jb250YWluZXI+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25ncnhMZXRdJyB9KVxuZXhwb3J0IGNsYXNzIExldERpcmVjdGl2ZTxVPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgZW1iZWRkZWRWaWV3OiBhbnk7XG4gIHByaXZhdGUgcmVhZG9ubHkgVmlld0NvbnRleHQ6IExldFZpZXdDb250ZXh0PFUgfCB1bmRlZmluZWQgfCBudWxsPiA9IHtcbiAgICAkaW1wbGljaXQ6IHVuZGVmaW5lZCxcbiAgICBuZ3J4TGV0OiB1bmRlZmluZWQsXG4gICAgJGVycm9yOiBmYWxzZSxcbiAgICAkY29tcGxldGU6IGZhbHNlLFxuICB9O1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnU3ViamVjdCA9IG5ldyBSZXBsYXlTdWJqZWN0PE5nUnhMZXRDb25maWc+KCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgY29uZmlnJCA9IHRoaXMuY29uZmlnU3ViamVjdC5waXBlKFxuICAgIGZpbHRlcih2ID0+IHYgIT09IHVuZGVmaW5lZCAmJiB2ICE9PSBudWxsKSxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgIHN0YXJ0V2l0aCh7IG9wdGltaXplZDogdHJ1ZSB9KVxuICApO1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBzdWJzY3JpcHRpb246IFVuc3Vic2NyaWJhYmxlO1xuICBwcml2YXRlIHJlYWRvbmx5IGNkQXdhcmU6IENkQXdhcmU8VSB8IG51bGwgfCB1bmRlZmluZWQ+O1xuICBwcml2YXRlIHJlYWRvbmx5IHJlc2V0Q29udGV4dE9ic2VydmVyOiBOZXh0T2JzZXJ2ZXI8dW5rbm93bj4gPSB7XG4gICAgbmV4dDogKCkgPT4ge1xuICAgICAgLy8gaWYgbm90IGluaXRpYWxpemVkIG5vIG5lZWQgdG8gc2V0IHVuZGVmaW5lZFxuICAgICAgaWYgKHRoaXMuZW1iZWRkZWRWaWV3KSB7XG4gICAgICAgIHRoaXMuVmlld0NvbnRleHQuJGltcGxpY2l0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLlZpZXdDb250ZXh0Lm5ncnhMZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuVmlld0NvbnRleHQuJGVycm9yID0gZmFsc2U7XG4gICAgICAgIHRoaXMuVmlld0NvbnRleHQuJGNvbXBsZXRlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbiAgcHJpdmF0ZSByZWFkb25seSB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiBQYXJ0aWFsT2JzZXJ2ZXI8XG4gICAgVSB8IG51bGwgfCB1bmRlZmluZWRcbiAgPiA9IHtcbiAgICBuZXh0OiAodmFsdWU6IFUgfCBudWxsIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAvLyB0byBoYXZlIGluaXQgbGF6eVxuICAgICAgaWYgKCF0aGlzLmVtYmVkZGVkVmlldykge1xuICAgICAgICB0aGlzLmNyZWF0ZUVtYmVkZGVkVmlldygpO1xuICAgICAgfVxuICAgICAgdGhpcy5WaWV3Q29udGV4dC4kaW1wbGljaXQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuVmlld0NvbnRleHQubmdyeExldCA9IHZhbHVlO1xuICAgIH0sXG4gICAgZXJyb3I6IChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgIC8vIHRvIGhhdmUgaW5pdCBsYXp5XG4gICAgICBpZiAoIXRoaXMuZW1iZWRkZWRWaWV3KSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRW1iZWRkZWRWaWV3KCk7XG4gICAgICB9XG4gICAgICB0aGlzLlZpZXdDb250ZXh0LiRlcnJvciA9IHRydWU7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgLy8gdG8gaGF2ZSBpbml0IGxhenlcbiAgICAgIGlmICghdGhpcy5lbWJlZGRlZFZpZXcpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVFbWJlZGRlZFZpZXcoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuVmlld0NvbnRleHQuJGNvbXBsZXRlID0gdHJ1ZTtcbiAgICB9LFxuICB9O1xuXG4gIHN0YXRpYyBuZ1RlbXBsYXRlQ29udGV4dEd1YXJkPFU+KFxuICAgIGRpcjogTGV0RGlyZWN0aXZlPFU+LFxuICAgIGN0eDogdW5rbm93blxuICApOiBjdHggaXMgTGV0Vmlld0NvbnRleHQ8VT4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWd1cmFibGVCZWhhdmlvdXIgPSA8VD4oXG4gICAgbyQ6IE9ic2VydmFibGU8T2JzZXJ2YWJsZTxUPj5cbiAgKTogT2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFQ+PiA9PlxuICAgIG8kLnBpcGUoXG4gICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLmNvbmZpZyQpLFxuICAgICAgLy8gQE5PVElDRTogdW51c2VkIGNvbmZpZyA9PiBBcyBkaXNjdXNzZWQgd2l0aCBCcmFuZG9uIHdlIGtlZXAgaXQgaGVyZSBiZWNhdXNlIGluIHRoZSBiZXRhIHJlbGVhc2Ugd2UgaW1wbGVtZW50IGNvbmZpZ3VyYXRpb24gYmVoYXZpb3IgaGVyZVxuICAgICAgbWFwKChbdmFsdWUkLCBjb25maWddKSA9PiB7XG4gICAgICAgIHJldHVybiB2YWx1ZSQucGlwZShjYXRjaEVycm9yKGUgPT4gRU1QVFkpKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICBASW5wdXQoKVxuICBzZXQgbmdyeExldChcbiAgICBwb3RlbnRpYWxPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPFU+IHwgUHJvbWlzZTxVPiB8IG51bGwgfCB1bmRlZmluZWRcbiAgKSB7XG4gICAgdGhpcy5jZEF3YXJlLm5leHQocG90ZW50aWFsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbmdyeExldENvbmZpZyhjb25maWc6IE5nUnhMZXRDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZ1N1YmplY3QubmV4dChjb25maWcgfHwgeyBvcHRpbWl6ZWQ6IHRydWUgfSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgbmdab25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSByZWFkb25seSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8TGV0Vmlld0NvbnRleHQ8VT4+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZlxuICApIHtcbiAgICB0aGlzLmNkQXdhcmUgPSBjcmVhdGVDZEF3YXJlPFU+KHtcbiAgICAgIHdvcms6IHNldFVwV29yayh7XG4gICAgICAgIGNkUmVmLFxuICAgICAgICBuZ1pvbmUsXG4gICAgICAgIGNvbnRleHQ6IChjZFJlZiBhcyBFbWJlZGRlZFZpZXdSZWY8VHlwZTxhbnk+PikuY29udGV4dCxcbiAgICAgIH0pLFxuICAgICAgcmVzZXRDb250ZXh0T2JzZXJ2ZXI6IHRoaXMucmVzZXRDb250ZXh0T2JzZXJ2ZXIsXG4gICAgICB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiB0aGlzLnVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXIsXG4gICAgICBjb25maWd1cmFibGVCZWhhdmlvdXI6IHRoaXMuY29uZmlndXJhYmxlQmVoYXZpb3VyLFxuICAgIH0pO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5jZEF3YXJlLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgY3JlYXRlRW1iZWRkZWRWaWV3KCkge1xuICAgIHRoaXMuZW1iZWRkZWRWaWV3ID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyhcbiAgICAgIHRoaXMudGVtcGxhdGVSZWYsXG4gICAgICB0aGlzLlZpZXdDb250ZXh0XG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gIH1cbn1cbiJdfQ==