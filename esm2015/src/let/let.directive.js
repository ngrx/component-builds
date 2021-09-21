import { ChangeDetectorRef, Directive, ErrorHandler, Input, NgZone, TemplateRef, ViewContainerRef, } from '@angular/core';
import { createCdAware } from '../core/cd-aware/cd-aware_creator';
import { createRender } from '../core/cd-aware/creator_render';
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
export class LetDirective {
    constructor(cdRef, ngZone, templateRef, viewContainerRef, errorHandler) {
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.viewContext = {
            $implicit: undefined,
            ngrxLet: undefined,
            $error: false,
            $complete: false,
        };
        this.resetContextObserver = {
            next: () => {
                // if not initialized no need to set undefined
                if (this.embeddedView) {
                    this.viewContext.$implicit = undefined;
                    this.viewContext.ngrxLet = undefined;
                    this.viewContext.$error = false;
                    this.viewContext.$complete = false;
                }
            },
        };
        this.updateViewContextObserver = {
            next: (value) => {
                // to have init lazy
                if (!this.embeddedView) {
                    this.createEmbeddedView();
                }
                this.viewContext.$implicit = value;
                this.viewContext.ngrxLet = value;
            },
            error: (error) => {
                // to have init lazy
                if (!this.embeddedView) {
                    this.createEmbeddedView();
                }
                this.viewContext.$error = true;
            },
            complete: () => {
                // to have init lazy
                if (!this.embeddedView) {
                    this.createEmbeddedView();
                }
                this.viewContext.$complete = true;
            },
        };
        this.cdAware = createCdAware({
            render: createRender({ cdRef, ngZone }),
            resetContextObserver: this.resetContextObserver,
            updateViewContextObserver: this.updateViewContextObserver,
            errorHandler,
        });
        this.subscription = this.cdAware.subscribe();
    }
    static ngTemplateContextGuard(dir, ctx) {
        return true;
    }
    set ngrxLet(potentialObservable) {
        this.cdAware.nextPotentialObservable(potentialObservable);
    }
    createEmbeddedView() {
        this.embeddedView = this.viewContainerRef.createEmbeddedView(this.templateRef, this.viewContext);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
/** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
LetDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngrxLet]' },] }
];
/**
 * @type {function(): !Array<(null|{
 *   type: ?,
 *   decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>),
 * })>}
 * @nocollapse
 */
LetDirective.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: TemplateRef },
    { type: ViewContainerRef },
    { type: ErrorHandler }
];
/** @type {!Object<string, !Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
LetDirective.propDecorators = {
    ngrxLet: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9sZXQvbGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFFTixXQUFXLEVBQ1gsZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBVyxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFhL0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUVHO0FBRUgsTUFBTSxPQUFPLFlBQVk7SUE4RHZCLFlBQ0UsS0FBd0IsRUFDeEIsTUFBYyxFQUNHLFdBQTJDLEVBQzNDLGdCQUFrQyxFQUNuRCxZQUEwQjtRQUZULGdCQUFXLEdBQVgsV0FBVyxDQUFnQztRQUMzQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBN0RwQyxnQkFBVyxHQUF5QztZQUNuRSxTQUFTLEVBQUUsU0FBUztZQUNwQixPQUFPLEVBQUUsU0FBUztZQUNsQixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUM7UUFJZSx5QkFBb0IsR0FBdUI7WUFDMUQsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDVCw4Q0FBOEM7Z0JBQzlDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO29CQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2lCQUNwQztZQUNILENBQUM7U0FDRixDQUFDO1FBQ2UsOEJBQXlCLEdBQW1DO1lBQzNFLElBQUksRUFBRSxDQUFDLEtBQTJCLEVBQUUsRUFBRTtnQkFDcEMsb0JBQW9CO2dCQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDdEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7aUJBQzNCO2dCQUNELElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ25DLENBQUM7WUFDRCxLQUFLLEVBQUUsQ0FBQyxLQUFZLEVBQUUsRUFBRTtnQkFDdEIsb0JBQW9CO2dCQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDdEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7aUJBQzNCO2dCQUNELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNqQyxDQUFDO1lBQ0QsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDYixvQkFBb0I7Z0JBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUN0QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztpQkFDM0I7Z0JBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLENBQUM7U0FDRixDQUFDO1FBcUJBLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFJO1lBQzlCLE1BQU0sRUFBRSxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDdkMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLG9CQUFvQjtZQUMvQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMseUJBQXlCO1lBQ3pELFlBQVk7U0FDYixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQTFCRCxNQUFNLENBQUMsc0JBQXNCLENBQzNCLEdBQW9CLEVBQ3BCLEdBQStCO1FBRS9CLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELElBQ0ksT0FBTyxDQUFDLG1CQUEwRDtRQUNwRSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQWtCRCxrQkFBa0I7UUFDaEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQzFELElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxXQUFXLENBQ2pCLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7OztZQXhGRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFOzs7Ozs7Ozs7O1lBMUZsQyxpQkFBaUI7WUFJakIsTUFBTTtZQUVOLFdBQVc7WUFDWCxnQkFBZ0I7WUFMaEIsWUFBWTs7OztzQkFrSlgsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVycm9ySGFuZGxlcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25EZXN0cm95LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZXh0T2JzZXJ2ZXIsIE9ic2VydmFibGVJbnB1dCwgT2JzZXJ2ZXIsIFVuc3Vic2NyaWJhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDZEF3YXJlLCBjcmVhdGVDZEF3YXJlIH0gZnJvbSAnLi4vY29yZS9jZC1hd2FyZS9jZC1hd2FyZV9jcmVhdG9yJztcbmltcG9ydCB7IGNyZWF0ZVJlbmRlciB9IGZyb20gJy4uL2NvcmUvY2QtYXdhcmUvY3JlYXRvcl9yZW5kZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIExldFZpZXdDb250ZXh0PFQ+IHtcbiAgLy8gdG8gZW5hYmxlIGBsZXRgIHN5bnRheCB3ZSBoYXZlIHRvIHVzZSAkaW1wbGljaXQgKHZhcjsgbGV0IHYgPSB2YXIpXG4gICRpbXBsaWNpdDogVDtcbiAgLy8gdG8gZW5hYmxlIGBhc2Agc3ludGF4IHdlIGhhdmUgdG8gYXNzaWduIHRoZSBkaXJlY3RpdmVzIHNlbGVjdG9yICh2YXIgYXMgdilcbiAgbmdyeExldDogVDtcbiAgLy8gc2V0IGNvbnRleHQgdmFyIGNvbXBsZXRlIHRvIHRydWUgKHZhciQ7IGxldCBlID0gJGVycm9yKVxuICAkZXJyb3I6IGJvb2xlYW47XG4gIC8vIHNldCBjb250ZXh0IHZhciBjb21wbGV0ZSB0byB0cnVlICh2YXIkOyBsZXQgYyA9ICRjb21wbGV0ZSlcbiAgJGNvbXBsZXRlOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEBEaXJlY3RpdmUgTGV0RGlyZWN0aXZlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVGhlIGAqbmdyeExldGAgZGlyZWN0aXZlIHNlcnZlcyBhIGNvbnZlbmllbnQgd2F5IG9mIGJpbmRpbmcgb2JzZXJ2YWJsZXMgdG8gYSB2aWV3IGNvbnRleHQgKGEgZG9tIGVsZW1lbnQgc2NvcGUpLlxuICogSXQgYWxzbyBoZWxwcyB3aXRoIHNldmVyYWwgaW50ZXJuYWwgcHJvY2Vzc2luZyB1bmRlciB0aGUgaG9vZC5cbiAqXG4gKiBUaGUgY3VycmVudCB3YXkgb2YgYmluZGluZyBhbiBvYnNlcnZhYmxlIHRvIHRoZSB2aWV3IGxvb2tzIGxpa2UgdGhhdDpcbiAqIGBgYGh0bWxcbiAqIDxuZy1jb250YWluZXIgKm5nSWY9XCJvYnNlcnZhYmxlTnVtYmVyJCBhcyBuXCI+XG4gKiA8YXBwLW51bWJlciBbbnVtYmVyXT1cIm5cIj5cbiAqIDwvYXBwLW51bWJlcj5cbiAqIDxhcHAtbnVtYmVyLXNwZWNpYWwgW251bWJlcl09XCJuXCI+XG4gKiA8L2FwcC1udW1iZXItc3BlY2lhbD5cbiAqIDwvbmctY29udGFpbmVyPlxuICogIGBgYFxuICpcbiAqICBUaGUgcHJvYmxlbSBpcyBgKm5nSWZgIGlzIGFsc28gaW50ZXJmZXJpbmcgd2l0aCByZW5kZXJpbmcgYW5kIGluIGNhc2Ugb2YgYSBgMGAgdGhlIGNvbXBvbmVudCB3b3VsZCBiZSBoaWRkZW5cbiAqXG4gKiBJbmNsdWRlZCBGZWF0dXJlczpcbiAqIC0gYmluZGluZyBpcyBhbHdheXMgcHJlc2VudC4gKGAqbmdJZj1cInRydXRoeSRcImApXG4gKiAtIGl0IHRha2VzIGF3YXkgdGhlIG11bHRpcGxlIHVzYWdlcyBvZiB0aGUgYGFzeW5jYCBvciBgbmdyeFB1c2hgIHBpcGVcbiAqIC0gYSB1bmlmaWVkL3N0cnVjdHVyZWQgd2F5IG9mIGhhbmRsaW5nIG51bGwgYW5kIHVuZGVmaW5lZFxuICogLSB0cmlnZ2VycyBjaGFuZ2UtZGV0ZWN0aW9uIGRpZmZlcmVudGx5IGlmIGB6b25lLmpzYCBpcyBwcmVzZW50IG9yIG5vdCAoYENoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXNgIG9yIGBDaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2tgKVxuICogLSB0cmlnZ2VycyBjaGFuZ2UtZGV0ZWN0aW9uIGRpZmZlcmVudGx5IGlmIFZpZXdFbmdpbmUgb3IgSXZ5IGlzIHByZXNlbnQgKGBDaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzYCBvciBgybVkZXRlY3RDaGFuZ2VzYClcbiAqIC0gZGlzdGluY3Qgc2FtZSB2YWx1ZXMgaW4gYSByb3cgKGRpc3RpbmN0VW50aWxDaGFuZ2VkIG9wZXJhdG9yKSxcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIFRoZSBgKm5ncnhMZXRgIGRpcmVjdGl2ZSB0YWtlIG92ZXIgc2V2ZXJhbCB0aGluZ3MgYW5kIG1ha2VzIGl0IG1vcmUgY29udmVuaWVudCBhbmQgc2F2ZSB0byB3b3JrIHdpdGggc3RyZWFtcyBpbiB0aGUgdGVtcGxhdGVcbiAqIGA8bmctY29udGFpbmVyICpuZ3J4TGV0PVwib2JzZXJ2YWJsZU51bWJlciQgYXMgY1wiPjwvbmctY29udGFpbmVyPmBcbiAqXG4gKiBgYGBodG1sXG4gKiA8bmctY29udGFpbmVyICpuZ3J4TGV0PVwib2JzZXJ2YWJsZU51bWJlciQgYXMgblwiPlxuICogPGFwcC1udW1iZXIgW251bWJlcl09XCJuXCI+XG4gKiA8L2FwcC1udW1iZXI+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqXG4gKiA8bmctY29udGFpbmVyICpuZ3J4TGV0PVwib2JzZXJ2YWJsZU51bWJlciQ7IGxldCBuXCI+XG4gKiA8YXBwLW51bWJlciBbbnVtYmVyXT1cIm5cIj5cbiAqIDwvYXBwLW51bWJlcj5cbiAqIDwvbmctY29udGFpbmVyPlxuICogYGBgXG4gKlxuICogSW4gYWRkaXRpb24gdG8gdGhhdCBpdCBwcm92aWRlcyB1cyBpbmZvcm1hdGlvbiBmcm9tIHRoZSB3aG9sZSBvYnNlcnZhYmxlIGNvbnRleHQuXG4gKiBXZSBjYW4gdHJhY2sgdGhlIG9ic2VydmFibGVzOlxuICogLSBuZXh0IHZhbHVlXG4gKiAtIGVycm9yIHZhbHVlXG4gKiAtIGNvbXBsZXRlIHN0YXRlXG4gKlxuICogYGBgaHRtbFxuICogPG5nLWNvbnRhaW5lciAqbmdyeExldD1cIm9ic2VydmFibGVOdW1iZXIkOyBsZXQgbjsgbGV0IGUgPSAkZXJyb3IsIGxldCBjID0gJGNvbXBsZXRlXCI+XG4gKiA8YXBwLW51bWJlciBbbnVtYmVyXT1cIm5cIiAgKm5nSWY9XCIhZSAmJiAhY1wiPlxuICogPC9hcHAtbnVtYmVyPlxuICogPG5nLWNvbnRhaW5lciAqbmdJZj1cImVcIj5cbiAqIFRoZXJlIGlzIGFuIGVycm9yOiB7e2V9fVxuICogPC9uZy1jb250YWluZXI+XG4gKiA8bmctY29udGFpbmVyICpuZ0lmPVwiY1wiPlxuICogT2JzZXJ2YWJsZSBjb21wbGV0ZWQ6IHt7Y319XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIDwvbmctY29udGFpbmVyPlxuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmdyeExldF0nIH0pXG5leHBvcnQgY2xhc3MgTGV0RGlyZWN0aXZlPFU+IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uYW1pbmctY29udmVudGlvblxuICBzdGF0aWMgbmdUZW1wbGF0ZUd1YXJkX25ncnhMZXQ6ICdiaW5kaW5nJztcblxuICBwcml2YXRlIGVtYmVkZGVkVmlldzogYW55O1xuICBwcml2YXRlIHJlYWRvbmx5IHZpZXdDb250ZXh0OiBMZXRWaWV3Q29udGV4dDxVIHwgdW5kZWZpbmVkIHwgbnVsbD4gPSB7XG4gICAgJGltcGxpY2l0OiB1bmRlZmluZWQsXG4gICAgbmdyeExldDogdW5kZWZpbmVkLFxuICAgICRlcnJvcjogZmFsc2UsXG4gICAgJGNvbXBsZXRlOiBmYWxzZSxcbiAgfTtcblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc3Vic2NyaXB0aW9uOiBVbnN1YnNjcmliYWJsZTtcbiAgcHJpdmF0ZSByZWFkb25seSBjZEF3YXJlOiBDZEF3YXJlPFUgfCBudWxsIHwgdW5kZWZpbmVkPjtcbiAgcHJpdmF0ZSByZWFkb25seSByZXNldENvbnRleHRPYnNlcnZlcjogTmV4dE9ic2VydmVyPHZvaWQ+ID0ge1xuICAgIG5leHQ6ICgpID0+IHtcbiAgICAgIC8vIGlmIG5vdCBpbml0aWFsaXplZCBubyBuZWVkIHRvIHNldCB1bmRlZmluZWRcbiAgICAgIGlmICh0aGlzLmVtYmVkZGVkVmlldykge1xuICAgICAgICB0aGlzLnZpZXdDb250ZXh0LiRpbXBsaWNpdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy52aWV3Q29udGV4dC5uZ3J4TGV0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnZpZXdDb250ZXh0LiRlcnJvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZpZXdDb250ZXh0LiRjb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG4gIHByaXZhdGUgcmVhZG9ubHkgdXBkYXRlVmlld0NvbnRleHRPYnNlcnZlcjogT2JzZXJ2ZXI8VSB8IG51bGwgfCB1bmRlZmluZWQ+ID0ge1xuICAgIG5leHQ6ICh2YWx1ZTogVSB8IG51bGwgfCB1bmRlZmluZWQpID0+IHtcbiAgICAgIC8vIHRvIGhhdmUgaW5pdCBsYXp5XG4gICAgICBpZiAoIXRoaXMuZW1iZWRkZWRWaWV3KSB7XG4gICAgICAgIHRoaXMuY3JlYXRlRW1iZWRkZWRWaWV3KCk7XG4gICAgICB9XG4gICAgICB0aGlzLnZpZXdDb250ZXh0LiRpbXBsaWNpdCA9IHZhbHVlO1xuICAgICAgdGhpcy52aWV3Q29udGV4dC5uZ3J4TGV0ID0gdmFsdWU7XG4gICAgfSxcbiAgICBlcnJvcjogKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgLy8gdG8gaGF2ZSBpbml0IGxhenlcbiAgICAgIGlmICghdGhpcy5lbWJlZGRlZFZpZXcpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVFbWJlZGRlZFZpZXcoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudmlld0NvbnRleHQuJGVycm9yID0gdHJ1ZTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAvLyB0byBoYXZlIGluaXQgbGF6eVxuICAgICAgaWYgKCF0aGlzLmVtYmVkZGVkVmlldykge1xuICAgICAgICB0aGlzLmNyZWF0ZUVtYmVkZGVkVmlldygpO1xuICAgICAgfVxuICAgICAgdGhpcy52aWV3Q29udGV4dC4kY29tcGxldGUgPSB0cnVlO1xuICAgIH0sXG4gIH07XG5cbiAgc3RhdGljIG5nVGVtcGxhdGVDb250ZXh0R3VhcmQ8VT4oXG4gICAgZGlyOiBMZXREaXJlY3RpdmU8VT4sXG4gICAgY3R4OiB1bmtub3duIHwgbnVsbCB8IHVuZGVmaW5lZFxuICApOiBjdHggaXMgTGV0Vmlld0NvbnRleHQ8VT4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IG5ncnhMZXQocG90ZW50aWFsT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZUlucHV0PFU+IHwgbnVsbCB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuY2RBd2FyZS5uZXh0UG90ZW50aWFsT2JzZXJ2YWJsZShwb3RlbnRpYWxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxMZXRWaWV3Q29udGV4dDxVPj4sXG4gICAgcHJpdmF0ZSByZWFkb25seSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHRoaXMuY2RBd2FyZSA9IGNyZWF0ZUNkQXdhcmU8VT4oe1xuICAgICAgcmVuZGVyOiBjcmVhdGVSZW5kZXIoeyBjZFJlZiwgbmdab25lIH0pLFxuICAgICAgcmVzZXRDb250ZXh0T2JzZXJ2ZXI6IHRoaXMucmVzZXRDb250ZXh0T2JzZXJ2ZXIsXG4gICAgICB1cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyOiB0aGlzLnVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXIsXG4gICAgICBlcnJvckhhbmRsZXIsXG4gICAgfSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmNkQXdhcmUuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBjcmVhdGVFbWJlZGRlZFZpZXcoKSB7XG4gICAgdGhpcy5lbWJlZGRlZFZpZXcgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KFxuICAgICAgdGhpcy50ZW1wbGF0ZVJlZixcbiAgICAgIHRoaXMudmlld0NvbnRleHRcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19