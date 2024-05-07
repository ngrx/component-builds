import { Directive, Input, } from '@angular/core';
import { Subscription } from 'rxjs';
import { RenderScheduler } from '../core/render-scheduler';
import { createRenderEventManager } from '../core/render-event/manager';
import * as i0 from "@angular/core";
import * as i1 from "../core/render-scheduler";
/**
 *
 * @description
 *
 * The `*ngrxLet` directive serves a convenient way of binding observables to a view context
 * (DOM element's scope). It also helps with several internal processing under the hood.
 *
 * @usageNotes
 *
 * ### Displaying Observable Values
 *
 * ```html
 * <ng-container *ngrxLet="number$ as n">
 *   <app-number [number]="n"></app-number>
 * </ng-container>
 *
 * <ng-container *ngrxLet="number$; let n">
 *   <app-number [number]="n"></app-number>
 * </ng-container>
 * ```
 *
 * ### Tracking Different Observable Events
 *
 * ```html
 * <ng-container *ngrxLet="number$ as n; error as e; complete as c">
 *   <app-number [number]="n" *ngIf="!e && !c">
 *   </app-number>
 *
 *   <p *ngIf="e">There is an error: {{ e }}</p>
 *   <p *ngIf="c">Observable is completed.</p>
 * </ng-container>
 * ```
 *
 * ### Combining Multiple Observables
 *
 * ```html
 * <ng-container *ngrxLet="{ users: users$, query: query$ } as vm">
 *   <app-search-bar [query]="vm.query"></app-search-bar>
 *   <app-user-list [users]="vm.users"></app-user-list>
 * </ng-container>
 * ```
 *
 * ### Using Suspense Template
 *
 * ```html
 * <ng-container *ngrxLet="number$ as n; suspenseTpl: loading">
 *   <app-number [number]="n"></app-number>
 * </ng-container>
 *
 * <ng-template #loading>
 *   <p>Loading...</p>
 * </ng-template>
 * ```
 *
 * ### Using Aliases for Non-Observable Values
 *
 * ```html
 * <ng-container *ngrxLet="userForm.controls.email as email">
 *   <input type="text" [formControl]="email" />
 *
 *   <ng-container *ngIf="email.errors && (email.touched || email.dirty)">
 *     <p *ngIf="email.errors.required">This field is required.</p>
 *     <p *ngIf="email.errors.email">This field must be an email.</p>
 *   </ng-container>
 * </ng-container>
 * ```
 *
 * @publicApi
 */
export class LetDirective {
    set ngrxLet(potentialObservable) {
        this.renderEventManager.nextPotentialObservable(potentialObservable);
    }
    constructor(mainTemplateRef, viewContainerRef, errorHandler, renderScheduler) {
        this.mainTemplateRef = mainTemplateRef;
        this.viewContainerRef = viewContainerRef;
        this.errorHandler = errorHandler;
        this.renderScheduler = renderScheduler;
        this.isMainViewCreated = false;
        this.isSuspenseViewCreated = false;
        this.viewContext = {
            $implicit: undefined,
            ngrxLet: undefined,
            error: undefined,
            complete: false,
        };
        this.renderEventManager = createRenderEventManager({
            suspense: () => {
                this.viewContext.$implicit = undefined;
                this.viewContext.ngrxLet = undefined;
                this.viewContext.error = undefined;
                this.viewContext.complete = false;
                this.renderSuspenseView();
            },
            next: (event) => {
                this.viewContext.$implicit = event.value;
                this.viewContext.ngrxLet = event.value;
                if (event.reset) {
                    this.viewContext.error = undefined;
                    this.viewContext.complete = false;
                }
                this.renderMainView(event.synchronous);
            },
            error: (event) => {
                this.viewContext.error = event.error;
                if (event.reset) {
                    this.viewContext.$implicit = undefined;
                    this.viewContext.ngrxLet = undefined;
                    this.viewContext.complete = false;
                }
                this.renderMainView(event.synchronous);
                this.errorHandler.handleError(event.error);
            },
            complete: (event) => {
                this.viewContext.complete = true;
                if (event.reset) {
                    this.viewContext.$implicit = undefined;
                    this.viewContext.ngrxLet = undefined;
                    this.viewContext.error = undefined;
                }
                this.renderMainView(event.synchronous);
            },
        });
        this.subscription = new Subscription();
    }
    static ngTemplateContextGuard(dir, ctx) {
        return true;
    }
    ngOnInit() {
        this.subscription.add(this.renderEventManager.handlePotentialObservableChanges().subscribe());
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    renderMainView(isSyncEvent) {
        if (this.isSuspenseViewCreated) {
            this.isSuspenseViewCreated = false;
            this.viewContainerRef.clear();
        }
        if (!this.isMainViewCreated) {
            this.isMainViewCreated = true;
            this.viewContainerRef.createEmbeddedView(this.mainTemplateRef, this.viewContext);
        }
        if (!isSyncEvent) {
            this.renderScheduler.schedule();
        }
    }
    renderSuspenseView() {
        if (this.isMainViewCreated) {
            this.isMainViewCreated = false;
            this.viewContainerRef.clear();
        }
        if (this.suspenseTemplateRef && !this.isSuspenseViewCreated) {
            this.isSuspenseViewCreated = true;
            this.viewContainerRef.createEmbeddedView(this.suspenseTemplateRef);
        }
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i0, type: LetDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: i0.ErrorHandler }, { token: i1.RenderScheduler }], target: i0.ɵɵFactoryTarget.Directive }); }
    /** @nocollapse */ static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0-next.6", type: LetDirective, isStandalone: true, selector: "[ngrxLet]", inputs: { ngrxLet: "ngrxLet", suspenseTemplateRef: ["ngrxLetSuspenseTpl", "suspenseTemplateRef"] }, providers: [RenderScheduler], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i0, type: LetDirective, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[ngrxLet]',
                    providers: [RenderScheduler],
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: i0.ErrorHandler }, { type: i1.RenderScheduler }], propDecorators: { ngrxLet: [{
                type: Input
            }], suspenseTemplateRef: [{
                type: Input,
                args: ['ngrxLetSuspenseTpl']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9sZXQvbGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssR0FLTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7O0FBdUJ4RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvRUc7QUFNSCxNQUFNLE9BQU8sWUFBWTtJQXVEdkIsSUFDSSxPQUFPLENBQUMsbUJBQXVCO1FBQ2pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFJRCxZQUNtQixlQUVoQixFQUNnQixnQkFBa0MsRUFDbEMsWUFBMEIsRUFDMUIsZUFBZ0M7UUFMaEMsb0JBQWUsR0FBZixlQUFlLENBRS9CO1FBQ2dCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBbkUzQyxzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGdCQUFXLEdBQW1DO1lBQzdELFNBQVMsRUFBRSxTQUFTO1lBQ3BCLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUM7UUFDZSx1QkFBa0IsR0FBRyx3QkFBd0IsQ0FBSztZ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bnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUG90ZW50aWFsT2JzZXJ2YWJsZVJlc3VsdCB9IGZyb20gJy4uL2NvcmUvcG90ZW50aWFsLW9ic2VydmFibGUnO1xuaW1wb3J0IHsgUmVuZGVyU2NoZWR1bGVyIH0gZnJvbSAnLi4vY29yZS9yZW5kZXItc2NoZWR1bGVyJztcbmltcG9ydCB7IGNyZWF0ZVJlbmRlckV2ZW50TWFuYWdlciB9IGZyb20gJy4uL2NvcmUvcmVuZGVyLWV2ZW50L21hbmFnZXInO1xuXG50eXBlIExldFZpZXdDb250ZXh0VmFsdWU8UE8+ID0gUG90ZW50aWFsT2JzZXJ2YWJsZVJlc3VsdDxQTz47XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGV0Vmlld0NvbnRleHQ8UE8+IHtcbiAgLyoqXG4gICAqIHVzaW5nIGAkaW1wbGljaXRgIHRvIGVuYWJsZSBgbGV0YCBzeW50YXg6IGAqbmdyeExldD1cIm9icyQ7IGxldCBvXCJgXG4gICAqL1xuICAkaW1wbGljaXQ6IExldFZpZXdDb250ZXh0VmFsdWU8UE8+O1xuICAvKipcbiAgICogdXNpbmcgYG5ncnhMZXRgIHRvIGVuYWJsZSBgYXNgIHN5bnRheDogYCpuZ3J4TGV0PVwib2JzJCBhcyBvXCJgXG4gICAqL1xuICBuZ3J4TGV0OiBMZXRWaWV3Q29udGV4dFZhbHVlPFBPPjtcbiAgLyoqXG4gICAqIGAqbmdyeExldD1cIm9icyQ7IGxldCBlID0gZXJyb3JcImAgb3IgYCpuZ3J4TGV0PVwib2JzJDsgZXJyb3IgYXMgZVwiYFxuICAgKi9cbiAgZXJyb3I6IGFueTtcbiAgLyoqXG4gICAqIGAqbmdyeExldD1cIm9icyQ7IGxldCBjID0gY29tcGxldGVcImAgb3IgYCpuZ3J4TGV0PVwib2JzJDsgY29tcGxldGUgYXMgY1wiYFxuICAgKi9cbiAgY29tcGxldGU6IGJvb2xlYW47XG59XG5cbi8qKlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRoZSBgKm5ncnhMZXRgIGRpcmVjdGl2ZSBzZXJ2ZXMgYSBjb252ZW5pZW50IHdheSBvZiBiaW5kaW5nIG9ic2VydmFibGVzIHRvIGEgdmlldyBjb250ZXh0XG4gKiAoRE9NIGVsZW1lbnQncyBzY29wZSkuIEl0IGFsc28gaGVscHMgd2l0aCBzZXZlcmFsIGludGVybmFsIHByb2Nlc3NpbmcgdW5kZXIgdGhlIGhvb2QuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiAjIyMgRGlzcGxheWluZyBPYnNlcnZhYmxlIFZhbHVlc1xuICpcbiAqIGBgYGh0bWxcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJudW1iZXIkIGFzIG5cIj5cbiAqICAgPGFwcC1udW1iZXIgW251bWJlcl09XCJuXCI+PC9hcHAtbnVtYmVyPlxuICogPC9uZy1jb250YWluZXI+XG4gKlxuICogPG5nLWNvbnRhaW5lciAqbmdyeExldD1cIm51bWJlciQ7IGxldCBuXCI+XG4gKiAgIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiPjwvYXBwLW51bWJlcj5cbiAqIDwvbmctY29udGFpbmVyPlxuICogYGBgXG4gKlxuICogIyMjIFRyYWNraW5nIERpZmZlcmVudCBPYnNlcnZhYmxlIEV2ZW50c1xuICpcbiAqIGBgYGh0bWxcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJudW1iZXIkIGFzIG47IGVycm9yIGFzIGU7IGNvbXBsZXRlIGFzIGNcIj5cbiAqICAgPGFwcC1udW1iZXIgW251bWJlcl09XCJuXCIgKm5nSWY9XCIhZSAmJiAhY1wiPlxuICogICA8L2FwcC1udW1iZXI+XG4gKlxuICogICA8cCAqbmdJZj1cImVcIj5UaGVyZSBpcyBhbiBlcnJvcjoge3sgZSB9fTwvcD5cbiAqICAgPHAgKm5nSWY9XCJjXCI+T2JzZXJ2YWJsZSBpcyBjb21wbGV0ZWQuPC9wPlxuICogPC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiAjIyMgQ29tYmluaW5nIE11bHRpcGxlIE9ic2VydmFibGVzXG4gKlxuICogYGBgaHRtbFxuICogPG5nLWNvbnRhaW5lciAqbmdyeExldD1cInsgdXNlcnM6IHVzZXJzJCwgcXVlcnk6IHF1ZXJ5JCB9IGFzIHZtXCI+XG4gKiAgIDxhcHAtc2VhcmNoLWJhciBbcXVlcnldPVwidm0ucXVlcnlcIj48L2FwcC1zZWFyY2gtYmFyPlxuICogICA8YXBwLXVzZXItbGlzdCBbdXNlcnNdPVwidm0udXNlcnNcIj48L2FwcC11c2VyLWxpc3Q+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIGBgYFxuICpcbiAqICMjIyBVc2luZyBTdXNwZW5zZSBUZW1wbGF0ZVxuICpcbiAqIGBgYGh0bWxcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJudW1iZXIkIGFzIG47IHN1c3BlbnNlVHBsOiBsb2FkaW5nXCI+XG4gKiAgIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiPjwvYXBwLW51bWJlcj5cbiAqIDwvbmctY29udGFpbmVyPlxuICpcbiAqIDxuZy10ZW1wbGF0ZSAjbG9hZGluZz5cbiAqICAgPHA+TG9hZGluZy4uLjwvcD5cbiAqIDwvbmctdGVtcGxhdGU+XG4gKiBgYGBcbiAqXG4gKiAjIyMgVXNpbmcgQWxpYXNlcyBmb3IgTm9uLU9ic2VydmFibGUgVmFsdWVzXG4gKlxuICogYGBgaHRtbFxuICogPG5nLWNvbnRhaW5lciAqbmdyeExldD1cInVzZXJGb3JtLmNvbnRyb2xzLmVtYWlsIGFzIGVtYWlsXCI+XG4gKiAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIFtmb3JtQ29udHJvbF09XCJlbWFpbFwiIC8+XG4gKlxuICogICA8bmctY29udGFpbmVyICpuZ0lmPVwiZW1haWwuZXJyb3JzICYmIChlbWFpbC50b3VjaGVkIHx8IGVtYWlsLmRpcnR5KVwiPlxuICogICAgIDxwICpuZ0lmPVwiZW1haWwuZXJyb3JzLnJlcXVpcmVkXCI+VGhpcyBmaWVsZCBpcyByZXF1aXJlZC48L3A+XG4gKiAgICAgPHAgKm5nSWY9XCJlbWFpbC5lcnJvcnMuZW1haWxcIj5UaGlzIGZpZWxkIG11c3QgYmUgYW4gZW1haWwuPC9wPlxuICogICA8L25nLWNvbnRhaW5lcj5cbiAqIDwvbmctY29udGFpbmVyPlxuICogYGBgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgc2VsZWN0b3I6ICdbbmdyeExldF0nLFxuICBwcm92aWRlcnM6IFtSZW5kZXJTY2hlZHVsZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBMZXREaXJlY3RpdmU8UE8+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGlzTWFpblZpZXdDcmVhdGVkID0gZmFsc2U7XG4gIHByaXZhdGUgaXNTdXNwZW5zZVZpZXdDcmVhdGVkID0gZmFsc2U7XG4gIHByaXZhdGUgcmVhZG9ubHkgdmlld0NvbnRleHQ6IExldFZpZXdDb250ZXh0PFBPIHwgdW5kZWZpbmVkPiA9IHtcbiAgICAkaW1wbGljaXQ6IHVuZGVmaW5lZCxcbiAgICBuZ3J4TGV0OiB1bmRlZmluZWQsXG4gICAgZXJyb3I6IHVuZGVmaW5lZCxcbiAgICBjb21wbGV0ZTogZmFsc2UsXG4gIH07XG4gIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyRXZlbnRNYW5hZ2VyID0gY3JlYXRlUmVuZGVyRXZlbnRNYW5hZ2VyPFBPPih7XG4gICAgc3VzcGVuc2U6ICgpID0+IHtcbiAgICAgIHRoaXMudmlld0NvbnRleHQuJGltcGxpY2l0ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy52aWV3Q29udGV4dC5uZ3J4TGV0ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy52aWV3Q29udGV4dC5lcnJvciA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMudmlld0NvbnRleHQuY29tcGxldGUgPSBmYWxzZTtcblxuICAgICAgdGhpcy5yZW5kZXJTdXNwZW5zZVZpZXcoKTtcbiAgICB9LFxuICAgIG5leHQ6IChldmVudCkgPT4ge1xuICAgICAgdGhpcy52aWV3Q29udGV4dC4kaW1wbGljaXQgPSBldmVudC52YWx1ZTtcbiAgICAgIHRoaXMudmlld0NvbnRleHQubmdyeExldCA9IGV2ZW50LnZhbHVlO1xuXG4gICAgICBpZiAoZXZlbnQucmVzZXQpIHtcbiAgICAgICAgdGhpcy52aWV3Q29udGV4dC5lcnJvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy52aWV3Q29udGV4dC5jb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbmRlck1haW5WaWV3KGV2ZW50LnN5bmNocm9ub3VzKTtcbiAgICB9LFxuICAgIGVycm9yOiAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMudmlld0NvbnRleHQuZXJyb3IgPSBldmVudC5lcnJvcjtcblxuICAgICAgaWYgKGV2ZW50LnJlc2V0KSB7XG4gICAgICAgIHRoaXMudmlld0NvbnRleHQuJGltcGxpY2l0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnZpZXdDb250ZXh0Lm5ncnhMZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudmlld0NvbnRleHQuY29tcGxldGUgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZW5kZXJNYWluVmlldyhldmVudC5zeW5jaHJvbm91cyk7XG4gICAgICB0aGlzLmVycm9ySGFuZGxlci5oYW5kbGVFcnJvcihldmVudC5lcnJvcik7XG4gICAgfSxcbiAgICBjb21wbGV0ZTogKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnZpZXdDb250ZXh0LmNvbXBsZXRlID0gdHJ1ZTtcblxuICAgICAgaWYgKGV2ZW50LnJlc2V0KSB7XG4gICAgICAgIHRoaXMudmlld0NvbnRleHQuJGltcGxpY2l0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnZpZXdDb250ZXh0Lm5ncnhMZXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudmlld0NvbnRleHQuZXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyTWFpblZpZXcoZXZlbnQuc3luY2hyb25vdXMpO1xuICAgIH0sXG4gIH0pO1xuICBwcml2YXRlIHJlYWRvbmx5IHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBASW5wdXQoKVxuICBzZXQgbmdyeExldChwb3RlbnRpYWxPYnNlcnZhYmxlOiBQTykge1xuICAgIHRoaXMucmVuZGVyRXZlbnRNYW5hZ2VyLm5leHRQb3RlbnRpYWxPYnNlcnZhYmxlKHBvdGVudGlhbE9ic2VydmFibGUpO1xuICB9XG5cbiAgQElucHV0KCduZ3J4TGV0U3VzcGVuc2VUcGwnKSBzdXNwZW5zZVRlbXBsYXRlUmVmPzogVGVtcGxhdGVSZWY8dW5rbm93bj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBtYWluVGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPFxuICAgICAgTGV0Vmlld0NvbnRleHQ8UE8gfCB1bmRlZmluZWQ+XG4gICAgPixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSByZWFkb25seSBlcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlbmRlclNjaGVkdWxlcjogUmVuZGVyU2NoZWR1bGVyXG4gICkge31cblxuICBzdGF0aWMgbmdUZW1wbGF0ZUNvbnRleHRHdWFyZDxQTz4oXG4gICAgZGlyOiBMZXREaXJlY3RpdmU8UE8+LFxuICAgIGN0eDogdW5rbm93blxuICApOiBjdHggaXMgTGV0Vmlld0NvbnRleHQ8UE8+IHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMucmVuZGVyRXZlbnRNYW5hZ2VyLmhhbmRsZVBvdGVudGlhbE9ic2VydmFibGVDaGFuZ2VzKCkuc3Vic2NyaWJlKClcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyTWFpblZpZXcoaXNTeW5jRXZlbnQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc1N1c3BlbnNlVmlld0NyZWF0ZWQpIHtcbiAgICAgIHRoaXMuaXNTdXNwZW5zZVZpZXdDcmVhdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaXNNYWluVmlld0NyZWF0ZWQpIHtcbiAgICAgIHRoaXMuaXNNYWluVmlld0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyhcbiAgICAgICAgdGhpcy5tYWluVGVtcGxhdGVSZWYsXG4gICAgICAgIHRoaXMudmlld0NvbnRleHRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFpc1N5bmNFdmVudCkge1xuICAgICAgdGhpcy5yZW5kZXJTY2hlZHVsZXIuc2NoZWR1bGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbmRlclN1c3BlbnNlVmlldygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc01haW5WaWV3Q3JlYXRlZCkge1xuICAgICAgdGhpcy5pc01haW5WaWV3Q3JlYXRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc3VzcGVuc2VUZW1wbGF0ZVJlZiAmJiAhdGhpcy5pc1N1c3BlbnNlVmlld0NyZWF0ZWQpIHtcbiAgICAgIHRoaXMuaXNTdXNwZW5zZVZpZXdDcmVhdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5zdXNwZW5zZVRlbXBsYXRlUmVmKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==