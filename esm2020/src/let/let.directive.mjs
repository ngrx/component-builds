import { Directive, Input, } from '@angular/core';
import { createCdAware } from '../core/cd-aware/cd-aware_creator';
import { createRender } from '../core/cd-aware/creator_render';
import * as i0 from "@angular/core";
/**
 * @ngModule ReactiveComponentModule
 *
 * @description
 *
 * The `*ngrxLet` directive serves a convenient way of binding observables to a view context (a dom element scope).
 * It also helps with several internal processing under the hood.
 *
 * The current way of binding an observable to the view looks like that:
 * ```html
 * <ng-container *ngIf="observableNumber$ | async as n">
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
 * - binding is always present. (`*ngIf="truthy$ | async"`)
 * - it takes away the multiple usages of the `async` or `ngrxPush` pipe
 * - a unified/structured way of handling null and undefined
 * - triggers change-detection differently if `zone.js` is present or not (`ChangeDetectorRef.detectChanges` or `ChangeDetectorRef.markForCheck`)
 * - triggers change-detection differently if ViewEngine or Ivy is present (`ChangeDetectorRef.detectChanges` or `ɵdetectChanges`)
 * - distinct same values in a row (distinctUntilChanged operator)
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
export class LetDirective {
    constructor(cdRef, ngZone, templateRef, viewContainerRef, errorHandler) {
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.isEmbeddedViewCreated = false;
        this.viewContext = {
            $implicit: undefined,
            ngrxLet: undefined,
            $error: false,
            $complete: false,
        };
        this.resetContextObserver = {
            next: () => {
                // if not initialized no need to set undefined
                if (this.isEmbeddedViewCreated) {
                    this.viewContext.$implicit = undefined;
                    this.viewContext.ngrxLet = undefined;
                    this.viewContext.$error = false;
                    this.viewContext.$complete = false;
                }
            },
        };
        this.updateViewContextObserver = {
            next: (value) => {
                this.viewContext.$implicit = value;
                this.viewContext.ngrxLet = value;
                // to have init lazy
                if (!this.isEmbeddedViewCreated) {
                    this.createEmbeddedView();
                }
            },
            error: (error) => {
                this.viewContext.$error = true;
                // to have init lazy
                if (!this.isEmbeddedViewCreated) {
                    this.createEmbeddedView();
                }
            },
            complete: () => {
                this.viewContext.$complete = true;
                // to have init lazy
                if (!this.isEmbeddedViewCreated) {
                    this.createEmbeddedView();
                }
            },
        };
        this.cdAware = createCdAware({
            render: createRender({ cdRef, ngZone }),
            resetContextObserver: this.resetContextObserver,
            updateViewContextObserver: this.updateViewContextObserver,
            errorHandler,
        });
        this.subscription = this.cdAware.subscribe({});
    }
    static ngTemplateContextGuard(dir, ctx) {
        return true;
    }
    set ngrxLet(potentialObservable) {
        this.cdAware.nextPotentialObservable(potentialObservable);
    }
    createEmbeddedView() {
        this.isEmbeddedViewCreated = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef, this.viewContext);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
/** @nocollapse */ /** @nocollapse */ LetDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: LetDirective, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: i0.ErrorHandler }], target: i0.ɵɵFactoryTarget.Directive });
/** @nocollapse */ /** @nocollapse */ LetDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0", type: LetDirective, selector: "[ngrxLet]", inputs: { ngrxLet: "ngrxLet" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: LetDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ngrxLet]' }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: i0.ErrorHandler }]; }, propDecorators: { ngrxLet: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9sZXQvbGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUVULEtBQUssR0FLTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQVcsYUFBYSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDOztBQWEvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpRUc7QUFFSCxNQUFNLE9BQU8sWUFBWTtJQTZEdkIsWUFDRSxLQUF3QixFQUN4QixNQUFjLEVBQ0csV0FBMkMsRUFDM0MsZ0JBQWtDLEVBQ25ELFlBQTBCO1FBRlQsZ0JBQVcsR0FBWCxXQUFXLENBQWdDO1FBQzNDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUE5RDdDLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQUNyQixnQkFBVyxHQUF5QztZQUNuRSxTQUFTLEVBQUUsU0FBUztZQUNwQixPQUFPLEVBQUUsU0FBUztZQUNsQixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUM7UUFJZSx5QkFBb0IsR0FBdUI7WUFDMUQsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDVCw4Q0FBOEM7Z0JBQzlDLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO29CQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztvQkFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7aUJBQ3BDO1lBQ0gsQ0FBQztTQUNGLENBQUM7UUFDZSw4QkFBeUIsR0FBbUM7WUFDM0UsSUFBSSxFQUFFLENBQUMsS0FBMkIsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDakMsb0JBQW9CO2dCQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO29CQUMvQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztpQkFDM0I7WUFDSCxDQUFDO1lBQ0QsS0FBSyxFQUFFLENBQUMsS0FBWSxFQUFFLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDL0Isb0JBQW9CO2dCQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO29CQUMvQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztpQkFDM0I7WUFDSCxDQUFDO1lBQ0QsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDYixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ2xDLG9CQUFvQjtnQkFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtvQkFDL0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7aUJBQzNCO1lBQ0gsQ0FBQztTQUNGLENBQUM7UUFxQkEsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUk7WUFDOUIsTUFBTSxFQUFFLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztZQUN2QyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsb0JBQW9CO1lBQy9DLHlCQUF5QixFQUFFLElBQUksQ0FBQyx5QkFBeUI7WUFDekQsWUFBWTtTQUNiLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQTFCRCxNQUFNLENBQUMsc0JBQXNCLENBQzNCLEdBQW9CLEVBQ3BCLEdBQStCO1FBRS9CLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELElBQ0ksT0FBTyxDQUFDLG1CQUEwRDtRQUNwRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQWtCRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQ3RDLElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxXQUFXLENBQ2pCLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7K0lBdkZVLFlBQVk7bUlBQVosWUFBWTsyRkFBWixZQUFZO2tCQUR4QixTQUFTO21CQUFDLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRTtpTkEwRDlCLE9BQU87c0JBRFYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVycm9ySGFuZGxlcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZXh0T2JzZXJ2ZXIsIE9ic2VydmFibGVJbnB1dCwgT2JzZXJ2ZXIsIFVuc3Vic2NyaWJhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDZEF3YXJlLCBjcmVhdGVDZEF3YXJlIH0gZnJvbSAnLi4vY29yZS9jZC1hd2FyZS9jZC1hd2FyZV9jcmVhdG9yJztcbmltcG9ydCB7IGNyZWF0ZVJlbmRlciB9IGZyb20gJy4uL2NvcmUvY2QtYXdhcmUvY3JlYXRvcl9yZW5kZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIExldFZpZXdDb250ZXh0PFQ+IHtcbiAgLy8gdG8gZW5hYmxlIGBsZXRgIHN5bnRheCB3ZSBoYXZlIHRvIHVzZSAkaW1wbGljaXQgKHZhcjsgbGV0IHYgPSB2YXIpXG4gICRpbXBsaWNpdDogVDtcbiAgLy8gdG8gZW5hYmxlIGBhc2Agc3ludGF4IHdlIGhhdmUgdG8gYXNzaWduIHRoZSBkaXJlY3RpdmVzIHNlbGVjdG9yICh2YXIgYXMgdilcbiAgbmdyeExldDogVDtcbiAgLy8gc2V0IGNvbnRleHQgdmFyIGNvbXBsZXRlIHRvIHRydWUgKHZhciQ7IGxldCBlID0gJGVycm9yKVxuICAkZXJyb3I6IGJvb2xlYW47XG4gIC8vIHNldCBjb250ZXh0IHZhciBjb21wbGV0ZSB0byB0cnVlICh2YXIkOyBsZXQgYyA9ICRjb21wbGV0ZSlcbiAgJGNvbXBsZXRlOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEBuZ01vZHVsZSBSZWFjdGl2ZUNvbXBvbmVudE1vZHVsZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRoZSBgKm5ncnhMZXRgIGRpcmVjdGl2ZSBzZXJ2ZXMgYSBjb252ZW5pZW50IHdheSBvZiBiaW5kaW5nIG9ic2VydmFibGVzIHRvIGEgdmlldyBjb250ZXh0IChhIGRvbSBlbGVtZW50IHNjb3BlKS5cbiAqIEl0IGFsc28gaGVscHMgd2l0aCBzZXZlcmFsIGludGVybmFsIHByb2Nlc3NpbmcgdW5kZXIgdGhlIGhvb2QuXG4gKlxuICogVGhlIGN1cnJlbnQgd2F5IG9mIGJpbmRpbmcgYW4gb2JzZXJ2YWJsZSB0byB0aGUgdmlldyBsb29rcyBsaWtlIHRoYXQ6XG4gKiBgYGBodG1sXG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwib2JzZXJ2YWJsZU51bWJlciQgfCBhc3luYyBhcyBuXCI+XG4gKiA8YXBwLW51bWJlciBbbnVtYmVyXT1cIm5cIj5cbiAqIDwvYXBwLW51bWJlcj5cbiAqIDxhcHAtbnVtYmVyLXNwZWNpYWwgW251bWJlcl09XCJuXCI+XG4gKiA8L2FwcC1udW1iZXItc3BlY2lhbD5cbiAqIDwvbmctY29udGFpbmVyPlxuICogIGBgYFxuICpcbiAqICBUaGUgcHJvYmxlbSBpcyBgKm5nSWZgIGlzIGFsc28gaW50ZXJmZXJpbmcgd2l0aCByZW5kZXJpbmcgYW5kIGluIGNhc2Ugb2YgYSBgMGAgdGhlIGNvbXBvbmVudCB3b3VsZCBiZSBoaWRkZW5cbiAqXG4gKiBJbmNsdWRlZCBGZWF0dXJlczpcbiAqIC0gYmluZGluZyBpcyBhbHdheXMgcHJlc2VudC4gKGAqbmdJZj1cInRydXRoeSQgfCBhc3luY1wiYClcbiAqIC0gaXQgdGFrZXMgYXdheSB0aGUgbXVsdGlwbGUgdXNhZ2VzIG9mIHRoZSBgYXN5bmNgIG9yIGBuZ3J4UHVzaGAgcGlwZVxuICogLSBhIHVuaWZpZWQvc3RydWN0dXJlZCB3YXkgb2YgaGFuZGxpbmcgbnVsbCBhbmQgdW5kZWZpbmVkXG4gKiAtIHRyaWdnZXJzIGNoYW5nZS1kZXRlY3Rpb24gZGlmZmVyZW50bHkgaWYgYHpvbmUuanNgIGlzIHByZXNlbnQgb3Igbm90IChgQ2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlc2Agb3IgYENoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVja2ApXG4gKiAtIHRyaWdnZXJzIGNoYW5nZS1kZXRlY3Rpb24gZGlmZmVyZW50bHkgaWYgVmlld0VuZ2luZSBvciBJdnkgaXMgcHJlc2VudCAoYENoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXNgIG9yIGDJtWRldGVjdENoYW5nZXNgKVxuICogLSBkaXN0aW5jdCBzYW1lIHZhbHVlcyBpbiBhIHJvdyAoZGlzdGluY3RVbnRpbENoYW5nZWQgb3BlcmF0b3IpXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBUaGUgYCpuZ3J4TGV0YCBkaXJlY3RpdmUgdGFrZSBvdmVyIHNldmVyYWwgdGhpbmdzIGFuZCBtYWtlcyBpdCBtb3JlIGNvbnZlbmllbnQgYW5kIHNhdmUgdG8gd29yayB3aXRoIHN0cmVhbXMgaW4gdGhlIHRlbXBsYXRlXG4gKiBgPG5nLWNvbnRhaW5lciAqbmdyeExldD1cIm9ic2VydmFibGVOdW1iZXIkIGFzIGNcIj48L25nLWNvbnRhaW5lcj5gXG4gKlxuICogYGBgaHRtbFxuICogPG5nLWNvbnRhaW5lciAqbmdyeExldD1cIm9ic2VydmFibGVOdW1iZXIkIGFzIG5cIj5cbiAqIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiPlxuICogPC9hcHAtbnVtYmVyPlxuICogPC9uZy1jb250YWluZXI+XG4gKlxuICogPG5nLWNvbnRhaW5lciAqbmdyeExldD1cIm9ic2VydmFibGVOdW1iZXIkOyBsZXQgblwiPlxuICogPGFwcC1udW1iZXIgW251bWJlcl09XCJuXCI+XG4gKiA8L2FwcC1udW1iZXI+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIGBgYFxuICpcbiAqIEluIGFkZGl0aW9uIHRvIHRoYXQgaXQgcHJvdmlkZXMgdXMgaW5mb3JtYXRpb24gZnJvbSB0aGUgd2hvbGUgb2JzZXJ2YWJsZSBjb250ZXh0LlxuICogV2UgY2FuIHRyYWNrIHRoZSBvYnNlcnZhYmxlczpcbiAqIC0gbmV4dCB2YWx1ZVxuICogLSBlcnJvciB2YWx1ZVxuICogLSBjb21wbGV0ZSBzdGF0ZVxuICpcbiAqIGBgYGh0bWxcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJvYnNlcnZhYmxlTnVtYmVyJDsgbGV0IG47IGxldCBlID0gJGVycm9yLCBsZXQgYyA9ICRjb21wbGV0ZVwiPlxuICogPGFwcC1udW1iZXIgW251bWJlcl09XCJuXCIgICpuZ0lmPVwiIWUgJiYgIWNcIj5cbiAqIDwvYXBwLW51bWJlcj5cbiAqIDxuZy1jb250YWluZXIgKm5nSWY9XCJlXCI+XG4gKiBUaGVyZSBpcyBhbiBlcnJvcjoge3tlfX1cbiAqIDwvbmctY29udGFpbmVyPlxuICogPG5nLWNvbnRhaW5lciAqbmdJZj1cImNcIj5cbiAqIE9ic2VydmFibGUgY29tcGxldGVkOiB7e2N9fVxuICogPC9uZy1jb250YWluZXI+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25ncnhMZXRdJyB9KVxuZXhwb3J0IGNsYXNzIExldERpcmVjdGl2ZTxVPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHN0YXRpYyBuZ1RlbXBsYXRlR3VhcmRfbmdyeExldDogJ2JpbmRpbmcnO1xuXG4gIHByaXZhdGUgaXNFbWJlZGRlZFZpZXdDcmVhdGVkID0gZmFsc2U7XG4gIHByaXZhdGUgcmVhZG9ubHkgdmlld0NvbnRleHQ6IExldFZpZXdDb250ZXh0PFUgfCB1bmRlZmluZWQgfCBudWxsPiA9IHtcbiAgICAkaW1wbGljaXQ6IHVuZGVmaW5lZCxcbiAgICBuZ3J4TGV0OiB1bmRlZmluZWQsXG4gICAgJGVycm9yOiBmYWxzZSxcbiAgICAkY29tcGxldGU6IGZhbHNlLFxuICB9O1xuXG4gIHByb3RlY3RlZCByZWFkb25seSBzdWJzY3JpcHRpb246IFVuc3Vic2NyaWJhYmxlO1xuICBwcml2YXRlIHJlYWRvbmx5IGNkQXdhcmU6IENkQXdhcmU8VSB8IG51bGwgfCB1bmRlZmluZWQ+O1xuICBwcml2YXRlIHJlYWRvbmx5IHJlc2V0Q29udGV4dE9ic2VydmVyOiBOZXh0T2JzZXJ2ZXI8dm9pZD4gPSB7XG4gICAgbmV4dDogKCkgPT4ge1xuICAgICAgLy8gaWYgbm90IGluaXRpYWxpemVkIG5vIG5lZWQgdG8gc2V0IHVuZGVmaW5lZFxuICAgICAgaWYgKHRoaXMuaXNFbWJlZGRlZFZpZXdDcmVhdGVkKSB7XG4gICAgICAgIHRoaXMudmlld0NvbnRleHQuJGltcGxpY2l0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnZpZXdDb250ZXh0Lm5ncnhMZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudmlld0NvbnRleHQuJGVycm9yID0gZmFsc2U7XG4gICAgICAgIHRoaXMudmlld0NvbnRleHQuJGNvbXBsZXRlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbiAgcHJpdmF0ZSByZWFkb25seSB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiBPYnNlcnZlcjxVIHwgbnVsbCB8IHVuZGVmaW5lZD4gPSB7XG4gICAgbmV4dDogKHZhbHVlOiBVIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4ge1xuICAgICAgdGhpcy52aWV3Q29udGV4dC4kaW1wbGljaXQgPSB2YWx1ZTtcbiAgICAgIHRoaXMudmlld0NvbnRleHQubmdyeExldCA9IHZhbHVlO1xuICAgICAgLy8gdG8gaGF2ZSBpbml0IGxhenlcbiAgICAgIGlmICghdGhpcy5pc0VtYmVkZGVkVmlld0NyZWF0ZWQpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVFbWJlZGRlZFZpZXcoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGVycm9yOiAoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICB0aGlzLnZpZXdDb250ZXh0LiRlcnJvciA9IHRydWU7XG4gICAgICAvLyB0byBoYXZlIGluaXQgbGF6eVxuICAgICAgaWYgKCF0aGlzLmlzRW1iZWRkZWRWaWV3Q3JlYXRlZCkge1xuICAgICAgICB0aGlzLmNyZWF0ZUVtYmVkZGVkVmlldygpO1xuICAgICAgfVxuICAgIH0sXG4gICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgIHRoaXMudmlld0NvbnRleHQuJGNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgIC8vIHRvIGhhdmUgaW5pdCBsYXp5XG4gICAgICBpZiAoIXRoaXMuaXNFbWJlZGRlZFZpZXdDcmVhdGVkKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRW1iZWRkZWRWaWV3KCk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICBzdGF0aWMgbmdUZW1wbGF0ZUNvbnRleHRHdWFyZDxVPihcbiAgICBkaXI6IExldERpcmVjdGl2ZTxVPixcbiAgICBjdHg6IHVua25vd24gfCBudWxsIHwgdW5kZWZpbmVkXG4gICk6IGN0eCBpcyBMZXRWaWV3Q29udGV4dDxVPiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgbmdyeExldChwb3RlbnRpYWxPYnNlcnZhYmxlOiBPYnNlcnZhYmxlSW5wdXQ8VT4gfCBudWxsIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5jZEF3YXJlLm5leHRQb3RlbnRpYWxPYnNlcnZhYmxlKHBvdGVudGlhbE9ic2VydmFibGUpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPExldFZpZXdDb250ZXh0PFU+PixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXJcbiAgKSB7XG4gICAgdGhpcy5jZEF3YXJlID0gY3JlYXRlQ2RBd2FyZTxVPih7XG4gICAgICByZW5kZXI6IGNyZWF0ZVJlbmRlcih7IGNkUmVmLCBuZ1pvbmUgfSksXG4gICAgICByZXNldENvbnRleHRPYnNlcnZlcjogdGhpcy5yZXNldENvbnRleHRPYnNlcnZlcixcbiAgICAgIHVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXI6IHRoaXMudXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcixcbiAgICAgIGVycm9ySGFuZGxlcixcbiAgICB9KTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuY2RBd2FyZS5zdWJzY3JpYmUoe30pO1xuICB9XG5cbiAgY3JlYXRlRW1iZWRkZWRWaWV3KCkge1xuICAgIHRoaXMuaXNFbWJlZGRlZFZpZXdDcmVhdGVkID0gdHJ1ZTtcbiAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KFxuICAgICAgdGhpcy50ZW1wbGF0ZVJlZixcbiAgICAgIHRoaXMudmlld0NvbnRleHRcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19