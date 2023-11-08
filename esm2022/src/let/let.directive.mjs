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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: LetDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: i0.ErrorHandler }, { token: i1.RenderScheduler }], target: i0.ɵɵFactoryTarget.Directive }); }
    /** @nocollapse */ static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.0", type: LetDirective, isStandalone: true, selector: "[ngrxLet]", inputs: { ngrxLet: "ngrxLet", suspenseTemplateRef: ["ngrxLetSuspenseTpl", "suspenseTemplateRef"] }, providers: [RenderScheduler], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: LetDirective, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9sZXQvbGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssR0FLTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7O0FBdUJ4RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvRUc7QUFNSCxNQUFNLE9BQU8sWUFBWTtJQXVEdkIsSUFDSSxPQUFPLENBQUMsbUJBQXVCO1FBQ2pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFJRCxZQUNtQixlQUVoQixFQUNnQixnQkFBa0MsRUFDbEMsWUFBMEIsRUFDMUIsZUFBZ0M7UUFMaEMsb0JBQWUsR0FBZixlQUFlLENBRS9CO1FBQ2dCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBbkUzQyxzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDMUIsMEJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGdCQUFXLEdBQW1DO1lBQzdELFNBQVMsRUFBRSxTQUFTO1lBQ3BCLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUM7UUFDZSx1QkFBa0IsR0FBRyx3QkFBd0IsQ0FBSztZ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QWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQ3RDLElBQUksQ0FBQyxlQUFlLEVBQ3BCLElBQUksQ0FBQyxXQUFXLENBQ2pCLENBQUM7U0FDSDtRQUVELElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQztJQUNILENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDL0I7UUFFRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUMzRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUNwRTtJQUNILENBQUM7aUlBckhVLFlBQVk7cUhBQVosWUFBWSw0SkFGWixDQUFDLGVBQWUsQ0FBQzs7MkZBRWpCLFlBQVk7a0JBTHhCLFNBQVM7bUJBQUM7b0JBQ1QsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxXQUFXO29CQUNyQixTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7aUJBQzdCO3dLQXlESyxPQUFPO3NCQURWLEtBQUs7Z0JBS3VCLG1CQUFtQjtzQkFBL0MsS0FBSzt1QkFBQyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVycm9ySGFuZGxlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBvdGVudGlhbE9ic2VydmFibGVSZXN1bHQgfSBmcm9tICcuLi9jb3JlL3BvdGVudGlhbC1vYnNlcnZhYmxlJztcbmltcG9ydCB7IFJlbmRlclNjaGVkdWxlciB9IGZyb20gJy4uL2NvcmUvcmVuZGVyLXNjaGVkdWxlcic7XG5pbXBvcnQgeyBjcmVhdGVSZW5kZXJFdmVudE1hbmFnZXIgfSBmcm9tICcuLi9jb3JlL3JlbmRlci1ldmVudC9tYW5hZ2VyJztcblxudHlwZSBMZXRWaWV3Q29udGV4dFZhbHVlPFBPPiA9IFBvdGVudGlhbE9ic2VydmFibGVSZXN1bHQ8UE8+O1xuXG5leHBvcnQgaW50ZXJmYWNlIExldFZpZXdDb250ZXh0PFBPPiB7XG4gIC8qKlxuICAgKiB1c2luZyBgJGltcGxpY2l0YCB0byBlbmFibGUgYGxldGAgc3ludGF4OiBgKm5ncnhMZXQ9XCJvYnMkOyBsZXQgb1wiYFxuICAgKi9cbiAgJGltcGxpY2l0OiBMZXRWaWV3Q29udGV4dFZhbHVlPFBPPjtcbiAgLyoqXG4gICAqIHVzaW5nIGBuZ3J4TGV0YCB0byBlbmFibGUgYGFzYCBzeW50YXg6IGAqbmdyeExldD1cIm9icyQgYXMgb1wiYFxuICAgKi9cbiAgbmdyeExldDogTGV0Vmlld0NvbnRleHRWYWx1ZTxQTz47XG4gIC8qKlxuICAgKiBgKm5ncnhMZXQ9XCJvYnMkOyBsZXQgZSA9IGVycm9yXCJgIG9yIGAqbmdyeExldD1cIm9icyQ7IGVycm9yIGFzIGVcImBcbiAgICovXG4gIGVycm9yOiBhbnk7XG4gIC8qKlxuICAgKiBgKm5ncnhMZXQ9XCJvYnMkOyBsZXQgYyA9IGNvbXBsZXRlXCJgIG9yIGAqbmdyeExldD1cIm9icyQ7IGNvbXBsZXRlIGFzIGNcImBcbiAgICovXG4gIGNvbXBsZXRlOiBib29sZWFuO1xufVxuXG4vKipcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBUaGUgYCpuZ3J4TGV0YCBkaXJlY3RpdmUgc2VydmVzIGEgY29udmVuaWVudCB3YXkgb2YgYmluZGluZyBvYnNlcnZhYmxlcyB0byBhIHZpZXcgY29udGV4dFxuICogKERPTSBlbGVtZW50J3Mgc2NvcGUpLiBJdCBhbHNvIGhlbHBzIHdpdGggc2V2ZXJhbCBpbnRlcm5hbCBwcm9jZXNzaW5nIHVuZGVyIHRoZSBob29kLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogIyMjIERpc3BsYXlpbmcgT2JzZXJ2YWJsZSBWYWx1ZXNcbiAqXG4gKiBgYGBodG1sXG4gKiA8bmctY29udGFpbmVyICpuZ3J4TGV0PVwibnVtYmVyJCBhcyBuXCI+XG4gKiAgIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiPjwvYXBwLW51bWJlcj5cbiAqIDwvbmctY29udGFpbmVyPlxuICpcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJudW1iZXIkOyBsZXQgblwiPlxuICogICA8YXBwLW51bWJlciBbbnVtYmVyXT1cIm5cIj48L2FwcC1udW1iZXI+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIGBgYFxuICpcbiAqICMjIyBUcmFja2luZyBEaWZmZXJlbnQgT2JzZXJ2YWJsZSBFdmVudHNcbiAqXG4gKiBgYGBodG1sXG4gKiA8bmctY29udGFpbmVyICpuZ3J4TGV0PVwibnVtYmVyJCBhcyBuOyBlcnJvciBhcyBlOyBjb21wbGV0ZSBhcyBjXCI+XG4gKiAgIDxhcHAtbnVtYmVyIFtudW1iZXJdPVwiblwiICpuZ0lmPVwiIWUgJiYgIWNcIj5cbiAqICAgPC9hcHAtbnVtYmVyPlxuICpcbiAqICAgPHAgKm5nSWY9XCJlXCI+VGhlcmUgaXMgYW4gZXJyb3I6IHt7IGUgfX08L3A+XG4gKiAgIDxwICpuZ0lmPVwiY1wiPk9ic2VydmFibGUgaXMgY29tcGxldGVkLjwvcD5cbiAqIDwvbmctY29udGFpbmVyPlxuICogYGBgXG4gKlxuICogIyMjIENvbWJpbmluZyBNdWx0aXBsZSBPYnNlcnZhYmxlc1xuICpcbiAqIGBgYGh0bWxcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJ7IHVzZXJzOiB1c2VycyQsIHF1ZXJ5OiBxdWVyeSQgfSBhcyB2bVwiPlxuICogICA8YXBwLXNlYXJjaC1iYXIgW3F1ZXJ5XT1cInZtLnF1ZXJ5XCI+PC9hcHAtc2VhcmNoLWJhcj5cbiAqICAgPGFwcC11c2VyLWxpc3QgW3VzZXJzXT1cInZtLnVzZXJzXCI+PC9hcHAtdXNlci1saXN0PlxuICogPC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiAjIyMgVXNpbmcgU3VzcGVuc2UgVGVtcGxhdGVcbiAqXG4gKiBgYGBodG1sXG4gKiA8bmctY29udGFpbmVyICpuZ3J4TGV0PVwibnVtYmVyJCBhcyBuOyBzdXNwZW5zZVRwbDogbG9hZGluZ1wiPlxuICogICA8YXBwLW51bWJlciBbbnVtYmVyXT1cIm5cIj48L2FwcC1udW1iZXI+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqXG4gKiA8bmctdGVtcGxhdGUgI2xvYWRpbmc+XG4gKiAgIDxwPkxvYWRpbmcuLi48L3A+XG4gKiA8L25nLXRlbXBsYXRlPlxuICogYGBgXG4gKlxuICogIyMjIFVzaW5nIEFsaWFzZXMgZm9yIE5vbi1PYnNlcnZhYmxlIFZhbHVlc1xuICpcbiAqIGBgYGh0bWxcbiAqIDxuZy1jb250YWluZXIgKm5ncnhMZXQ9XCJ1c2VyRm9ybS5jb250cm9scy5lbWFpbCBhcyBlbWFpbFwiPlxuICogICA8aW5wdXQgdHlwZT1cInRleHRcIiBbZm9ybUNvbnRyb2xdPVwiZW1haWxcIiAvPlxuICpcbiAqICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImVtYWlsLmVycm9ycyAmJiAoZW1haWwudG91Y2hlZCB8fCBlbWFpbC5kaXJ0eSlcIj5cbiAqICAgICA8cCAqbmdJZj1cImVtYWlsLmVycm9ycy5yZXF1aXJlZFwiPlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuPC9wPlxuICogICAgIDxwICpuZ0lmPVwiZW1haWwuZXJyb3JzLmVtYWlsXCI+VGhpcyBmaWVsZCBtdXN0IGJlIGFuIGVtYWlsLjwvcD5cbiAqICAgPC9uZy1jb250YWluZXI+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHNlbGVjdG9yOiAnW25ncnhMZXRdJyxcbiAgcHJvdmlkZXJzOiBbUmVuZGVyU2NoZWR1bGVyXSxcbn0pXG5leHBvcnQgY2xhc3MgTGV0RGlyZWN0aXZlPFBPPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBpc01haW5WaWV3Q3JlYXRlZCA9IGZhbHNlO1xuICBwcml2YXRlIGlzU3VzcGVuc2VWaWV3Q3JlYXRlZCA9IGZhbHNlO1xuICBwcml2YXRlIHJlYWRvbmx5IHZpZXdDb250ZXh0OiBMZXRWaWV3Q29udGV4dDxQTyB8IHVuZGVmaW5lZD4gPSB7XG4gICAgJGltcGxpY2l0OiB1bmRlZmluZWQsXG4gICAgbmdyeExldDogdW5kZWZpbmVkLFxuICAgIGVycm9yOiB1bmRlZmluZWQsXG4gICAgY29tcGxldGU6IGZhbHNlLFxuICB9O1xuICBwcml2YXRlIHJlYWRvbmx5IHJlbmRlckV2ZW50TWFuYWdlciA9IGNyZWF0ZVJlbmRlckV2ZW50TWFuYWdlcjxQTz4oe1xuICAgIHN1c3BlbnNlOiAoKSA9PiB7XG4gICAgICB0aGlzLnZpZXdDb250ZXh0LiRpbXBsaWNpdCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMudmlld0NvbnRleHQubmdyeExldCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMudmlld0NvbnRleHQuZXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnZpZXdDb250ZXh0LmNvbXBsZXRlID0gZmFsc2U7XG5cbiAgICAgIHRoaXMucmVuZGVyU3VzcGVuc2VWaWV3KCk7XG4gICAgfSxcbiAgICBuZXh0OiAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMudmlld0NvbnRleHQuJGltcGxpY2l0ID0gZXZlbnQudmFsdWU7XG4gICAgICB0aGlzLnZpZXdDb250ZXh0Lm5ncnhMZXQgPSBldmVudC52YWx1ZTtcblxuICAgICAgaWYgKGV2ZW50LnJlc2V0KSB7XG4gICAgICAgIHRoaXMudmlld0NvbnRleHQuZXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudmlld0NvbnRleHQuY29tcGxldGUgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZW5kZXJNYWluVmlldyhldmVudC5zeW5jaHJvbm91cyk7XG4gICAgfSxcbiAgICBlcnJvcjogKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnZpZXdDb250ZXh0LmVycm9yID0gZXZlbnQuZXJyb3I7XG5cbiAgICAgIGlmIChldmVudC5yZXNldCkge1xuICAgICAgICB0aGlzLnZpZXdDb250ZXh0LiRpbXBsaWNpdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy52aWV3Q29udGV4dC5uZ3J4TGV0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnZpZXdDb250ZXh0LmNvbXBsZXRlID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyTWFpblZpZXcoZXZlbnQuc3luY2hyb25vdXMpO1xuICAgICAgdGhpcy5lcnJvckhhbmRsZXIuaGFuZGxlRXJyb3IoZXZlbnQuZXJyb3IpO1xuICAgIH0sXG4gICAgY29tcGxldGU6IChldmVudCkgPT4ge1xuICAgICAgdGhpcy52aWV3Q29udGV4dC5jb21wbGV0ZSA9IHRydWU7XG5cbiAgICAgIGlmIChldmVudC5yZXNldCkge1xuICAgICAgICB0aGlzLnZpZXdDb250ZXh0LiRpbXBsaWNpdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy52aWV3Q29udGV4dC5uZ3J4TGV0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnZpZXdDb250ZXh0LmVycm9yID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbmRlck1haW5WaWV3KGV2ZW50LnN5bmNocm9ub3VzKTtcbiAgICB9LFxuICB9KTtcbiAgcHJpdmF0ZSByZWFkb25seSBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgQElucHV0KClcbiAgc2V0IG5ncnhMZXQocG90ZW50aWFsT2JzZXJ2YWJsZTogUE8pIHtcbiAgICB0aGlzLnJlbmRlckV2ZW50TWFuYWdlci5uZXh0UG90ZW50aWFsT2JzZXJ2YWJsZShwb3RlbnRpYWxPYnNlcnZhYmxlKTtcbiAgfVxuXG4gIEBJbnB1dCgnbmdyeExldFN1c3BlbnNlVHBsJykgc3VzcGVuc2VUZW1wbGF0ZVJlZj86IFRlbXBsYXRlUmVmPHVua25vd24+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgbWFpblRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxcbiAgICAgIExldFZpZXdDb250ZXh0PFBPIHwgdW5kZWZpbmVkPlxuICAgID4sXG4gICAgcHJpdmF0ZSByZWFkb25seSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJTY2hlZHVsZXI6IFJlbmRlclNjaGVkdWxlclxuICApIHt9XG5cbiAgc3RhdGljIG5nVGVtcGxhdGVDb250ZXh0R3VhcmQ8UE8+KFxuICAgIGRpcjogTGV0RGlyZWN0aXZlPFBPPixcbiAgICBjdHg6IHVua25vd25cbiAgKTogY3R4IGlzIExldFZpZXdDb250ZXh0PFBPPiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLnJlbmRlckV2ZW50TWFuYWdlci5oYW5kbGVQb3RlbnRpYWxPYnNlcnZhYmxlQ2hhbmdlcygpLnN1YnNjcmliZSgpXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlck1haW5WaWV3KGlzU3luY0V2ZW50OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNTdXNwZW5zZVZpZXdDcmVhdGVkKSB7XG4gICAgICB0aGlzLmlzU3VzcGVuc2VWaWV3Q3JlYXRlZCA9IGZhbHNlO1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmlzTWFpblZpZXdDcmVhdGVkKSB7XG4gICAgICB0aGlzLmlzTWFpblZpZXdDcmVhdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVFbWJlZGRlZFZpZXcoXG4gICAgICAgIHRoaXMubWFpblRlbXBsYXRlUmVmLFxuICAgICAgICB0aGlzLnZpZXdDb250ZXh0XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghaXNTeW5jRXZlbnQpIHtcbiAgICAgIHRoaXMucmVuZGVyU2NoZWR1bGVyLnNjaGVkdWxlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJTdXNwZW5zZVZpZXcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNNYWluVmlld0NyZWF0ZWQpIHtcbiAgICAgIHRoaXMuaXNNYWluVmlld0NyZWF0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN1c3BlbnNlVGVtcGxhdGVSZWYgJiYgIXRoaXMuaXNTdXNwZW5zZVZpZXdDcmVhdGVkKSB7XG4gICAgICB0aGlzLmlzU3VzcGVuc2VWaWV3Q3JlYXRlZCA9IHRydWU7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuc3VzcGVuc2VUZW1wbGF0ZVJlZik7XG4gICAgfVxuICB9XG59XG4iXX0=