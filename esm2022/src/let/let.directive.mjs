import { Directive, Input, } from '@angular/core';
import { Subscription } from 'rxjs';
import { RenderScheduler } from '../core/render-scheduler';
import { createRenderEventManager } from '../core/render-event/manager';
import * as i0 from "@angular/core";
import * as i1 from "../core/render-scheduler";
/**
 * @ngModule LetModule
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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0-next.8", ngImport: i0, type: LetDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: i0.ErrorHandler }, { token: i1.RenderScheduler }], target: i0.ɵɵFactoryTarget.Directive }); }
    /** @nocollapse */ static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.0-next.8", type: LetDirective, isStandalone: true, selector: "[ngrxLet]", inputs: { ngrxLet: "ngrxLet", suspenseTemplateRef: ["ngrxLetSuspenseTpl", "suspenseTemplateRef"] }, providers: [RenderScheduler], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0-next.8", ngImport: i0, type: LetDirective, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGV0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9sZXQvbGV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssR0FLTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7O0FBdUJ4RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUVHO0FBTUgsTUFBTSxPQUFPLFlBQVk7SUF1RHZCLElBQ0ksT0FBTyxDQUFDLG1CQUF1QjtRQUNqQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsdUJBQXVCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBSUQsWUFDbUIsZUFFaEIsRUFDZ0IsZ0JBQWtDLEVBQ2xDLFlBQTBCLEVBQzFCLGVBQWdDO1FBTGhDLG9CQUFlLEdBQWYsZUFBZSxDQUUvQjtRQUNnQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQW5FM0Msc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLDBCQUFxQixHQUFHLEtBQUssQ0FBQztRQUNyQixnQkFBVyxHQUFtQztZQUM3RCxTQUFTLEVBQUUsU0FBUztZQUNwQixPQUFPLEVBQUUsU0FBUztZQUNsQixLQUFLLEVBQUUsU0FBUztZQUNoQixRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDO1FBQ2UsdUJBQWtCLEdBQUcsd0JBQXdCLENBQUs7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QUFpQixFQUFFO1lBQzNCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDOUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixDQUN0QyxJQUFJLENBQUMsZUFBZSxFQUNwQixJQUFJLENBQUMsV0FBVyxDQUNqQixDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7WUFDL0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1NBQy9CO1FBRUQsSUFBSSxJQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDM0QsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztZQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDcEU7SUFDSCxDQUFDO3dJQXJIVSxZQUFZOzRIQUFaLFlBQVksNEpBRlosQ0FBQyxlQUFlLENBQUM7O2tHQUVqQixZQUFZO2tCQUx4QixTQUFTO21CQUFDO29CQUNULFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUUsV0FBVztvQkFDckIsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO2lCQUM3Qjt3S0F5REssT0FBTztzQkFEVixLQUFLO2dCQUt1QixtQkFBbUI7c0JBQS9DLEtBQUs7dUJBQUMsb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFcnJvckhhbmRsZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQb3RlbnRpYWxPYnNlcnZhYmxlUmVzdWx0IH0gZnJvbSAnLi4vY29yZS9wb3RlbnRpYWwtb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBSZW5kZXJTY2hlZHVsZXIgfSBmcm9tICcuLi9jb3JlL3JlbmRlci1zY2hlZHVsZXInO1xuaW1wb3J0IHsgY3JlYXRlUmVuZGVyRXZlbnRNYW5hZ2VyIH0gZnJvbSAnLi4vY29yZS9yZW5kZXItZXZlbnQvbWFuYWdlcic7XG5cbnR5cGUgTGV0Vmlld0NvbnRleHRWYWx1ZTxQTz4gPSBQb3RlbnRpYWxPYnNlcnZhYmxlUmVzdWx0PFBPPjtcblxuZXhwb3J0IGludGVyZmFjZSBMZXRWaWV3Q29udGV4dDxQTz4ge1xuICAvKipcbiAgICogdXNpbmcgYCRpbXBsaWNpdGAgdG8gZW5hYmxlIGBsZXRgIHN5bnRheDogYCpuZ3J4TGV0PVwib2JzJDsgbGV0IG9cImBcbiAgICovXG4gICRpbXBsaWNpdDogTGV0Vmlld0NvbnRleHRWYWx1ZTxQTz47XG4gIC8qKlxuICAgKiB1c2luZyBgbmdyeExldGAgdG8gZW5hYmxlIGBhc2Agc3ludGF4OiBgKm5ncnhMZXQ9XCJvYnMkIGFzIG9cImBcbiAgICovXG4gIG5ncnhMZXQ6IExldFZpZXdDb250ZXh0VmFsdWU8UE8+O1xuICAvKipcbiAgICogYCpuZ3J4TGV0PVwib2JzJDsgbGV0IGUgPSBlcnJvclwiYCBvciBgKm5ncnhMZXQ9XCJvYnMkOyBlcnJvciBhcyBlXCJgXG4gICAqL1xuICBlcnJvcjogYW55O1xuICAvKipcbiAgICogYCpuZ3J4TGV0PVwib2JzJDsgbGV0IGMgPSBjb21wbGV0ZVwiYCBvciBgKm5ncnhMZXQ9XCJvYnMkOyBjb21wbGV0ZSBhcyBjXCJgXG4gICAqL1xuICBjb21wbGV0ZTogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBAbmdNb2R1bGUgTGV0TW9kdWxlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVGhlIGAqbmdyeExldGAgZGlyZWN0aXZlIHNlcnZlcyBhIGNvbnZlbmllbnQgd2F5IG9mIGJpbmRpbmcgb2JzZXJ2YWJsZXMgdG8gYSB2aWV3IGNvbnRleHRcbiAqIChET00gZWxlbWVudCdzIHNjb3BlKS4gSXQgYWxzbyBoZWxwcyB3aXRoIHNldmVyYWwgaW50ZXJuYWwgcHJvY2Vzc2luZyB1bmRlciB0aGUgaG9vZC5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqICMjIyBEaXNwbGF5aW5nIE9ic2VydmFibGUgVmFsdWVzXG4gKlxuICogYGBgaHRtbFxuICogPG5nLWNvbnRhaW5lciAqbmdyeExldD1cIm51bWJlciQgYXMgblwiPlxuICogICA8YXBwLW51bWJlciBbbnVtYmVyXT1cIm5cIj48L2FwcC1udW1iZXI+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqXG4gKiA8bmctY29udGFpbmVyICpuZ3J4TGV0PVwibnVtYmVyJDsgbGV0IG5cIj5cbiAqICAgPGFwcC1udW1iZXIgW251bWJlcl09XCJuXCI+PC9hcHAtbnVtYmVyPlxuICogPC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiAjIyMgVHJhY2tpbmcgRGlmZmVyZW50IE9ic2VydmFibGUgRXZlbnRzXG4gKlxuICogYGBgaHRtbFxuICogPG5nLWNvbnRhaW5lciAqbmdyeExldD1cIm51bWJlciQgYXMgbjsgZXJyb3IgYXMgZTsgY29tcGxldGUgYXMgY1wiPlxuICogICA8YXBwLW51bWJlciBbbnVtYmVyXT1cIm5cIiAqbmdJZj1cIiFlICYmICFjXCI+XG4gKiAgIDwvYXBwLW51bWJlcj5cbiAqXG4gKiAgIDxwICpuZ0lmPVwiZVwiPlRoZXJlIGlzIGFuIGVycm9yOiB7eyBlIH19PC9wPlxuICogICA8cCAqbmdJZj1cImNcIj5PYnNlcnZhYmxlIGlzIGNvbXBsZXRlZC48L3A+XG4gKiA8L25nLWNvbnRhaW5lcj5cbiAqIGBgYFxuICpcbiAqICMjIyBDb21iaW5pbmcgTXVsdGlwbGUgT2JzZXJ2YWJsZXNcbiAqXG4gKiBgYGBodG1sXG4gKiA8bmctY29udGFpbmVyICpuZ3J4TGV0PVwieyB1c2VyczogdXNlcnMkLCBxdWVyeTogcXVlcnkkIH0gYXMgdm1cIj5cbiAqICAgPGFwcC1zZWFyY2gtYmFyIFtxdWVyeV09XCJ2bS5xdWVyeVwiPjwvYXBwLXNlYXJjaC1iYXI+XG4gKiAgIDxhcHAtdXNlci1saXN0IFt1c2Vyc109XCJ2bS51c2Vyc1wiPjwvYXBwLXVzZXItbGlzdD5cbiAqIDwvbmctY29udGFpbmVyPlxuICogYGBgXG4gKlxuICogIyMjIFVzaW5nIFN1c3BlbnNlIFRlbXBsYXRlXG4gKlxuICogYGBgaHRtbFxuICogPG5nLWNvbnRhaW5lciAqbmdyeExldD1cIm51bWJlciQgYXMgbjsgc3VzcGVuc2VUcGw6IGxvYWRpbmdcIj5cbiAqICAgPGFwcC1udW1iZXIgW251bWJlcl09XCJuXCI+PC9hcHAtbnVtYmVyPlxuICogPC9uZy1jb250YWluZXI+XG4gKlxuICogPG5nLXRlbXBsYXRlICNsb2FkaW5nPlxuICogICA8cD5Mb2FkaW5nLi4uPC9wPlxuICogPC9uZy10ZW1wbGF0ZT5cbiAqIGBgYFxuICpcbiAqICMjIyBVc2luZyBBbGlhc2VzIGZvciBOb24tT2JzZXJ2YWJsZSBWYWx1ZXNcbiAqXG4gKiBgYGBodG1sXG4gKiA8bmctY29udGFpbmVyICpuZ3J4TGV0PVwidXNlckZvcm0uY29udHJvbHMuZW1haWwgYXMgZW1haWxcIj5cbiAqICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgW2Zvcm1Db250cm9sXT1cImVtYWlsXCIgLz5cbiAqXG4gKiAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJlbWFpbC5lcnJvcnMgJiYgKGVtYWlsLnRvdWNoZWQgfHwgZW1haWwuZGlydHkpXCI+XG4gKiAgICAgPHAgKm5nSWY9XCJlbWFpbC5lcnJvcnMucmVxdWlyZWRcIj5UaGlzIGZpZWxkIGlzIHJlcXVpcmVkLjwvcD5cbiAqICAgICA8cCAqbmdJZj1cImVtYWlsLmVycm9ycy5lbWFpbFwiPlRoaXMgZmllbGQgbXVzdCBiZSBhbiBlbWFpbC48L3A+XG4gKiAgIDwvbmctY29udGFpbmVyPlxuICogPC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzdGFuZGFsb25lOiB0cnVlLFxuICBzZWxlY3RvcjogJ1tuZ3J4TGV0XScsXG4gIHByb3ZpZGVyczogW1JlbmRlclNjaGVkdWxlcl0sXG59KVxuZXhwb3J0IGNsYXNzIExldERpcmVjdGl2ZTxQTz4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgaXNNYWluVmlld0NyZWF0ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBpc1N1c3BlbnNlVmlld0NyZWF0ZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSByZWFkb25seSB2aWV3Q29udGV4dDogTGV0Vmlld0NvbnRleHQ8UE8gfCB1bmRlZmluZWQ+ID0ge1xuICAgICRpbXBsaWNpdDogdW5kZWZpbmVkLFxuICAgIG5ncnhMZXQ6IHVuZGVmaW5lZCxcbiAgICBlcnJvcjogdW5kZWZpbmVkLFxuICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgfTtcbiAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJFdmVudE1hbmFnZXIgPSBjcmVhdGVSZW5kZXJFdmVudE1hbmFnZXI8UE8+KHtcbiAgICBzdXNwZW5zZTogKCkgPT4ge1xuICAgICAgdGhpcy52aWV3Q29udGV4dC4kaW1wbGljaXQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnZpZXdDb250ZXh0Lm5ncnhMZXQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnZpZXdDb250ZXh0LmVycm9yID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy52aWV3Q29udGV4dC5jb21wbGV0ZSA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnJlbmRlclN1c3BlbnNlVmlldygpO1xuICAgIH0sXG4gICAgbmV4dDogKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnZpZXdDb250ZXh0LiRpbXBsaWNpdCA9IGV2ZW50LnZhbHVlO1xuICAgICAgdGhpcy52aWV3Q29udGV4dC5uZ3J4TGV0ID0gZXZlbnQudmFsdWU7XG5cbiAgICAgIGlmIChldmVudC5yZXNldCkge1xuICAgICAgICB0aGlzLnZpZXdDb250ZXh0LmVycm9yID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnZpZXdDb250ZXh0LmNvbXBsZXRlID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyTWFpblZpZXcoZXZlbnQuc3luY2hyb25vdXMpO1xuICAgIH0sXG4gICAgZXJyb3I6IChldmVudCkgPT4ge1xuICAgICAgdGhpcy52aWV3Q29udGV4dC5lcnJvciA9IGV2ZW50LmVycm9yO1xuXG4gICAgICBpZiAoZXZlbnQucmVzZXQpIHtcbiAgICAgICAgdGhpcy52aWV3Q29udGV4dC4kaW1wbGljaXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudmlld0NvbnRleHQubmdyeExldCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy52aWV3Q29udGV4dC5jb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbmRlck1haW5WaWV3KGV2ZW50LnN5bmNocm9ub3VzKTtcbiAgICAgIHRoaXMuZXJyb3JIYW5kbGVyLmhhbmRsZUVycm9yKGV2ZW50LmVycm9yKTtcbiAgICB9LFxuICAgIGNvbXBsZXRlOiAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMudmlld0NvbnRleHQuY29tcGxldGUgPSB0cnVlO1xuXG4gICAgICBpZiAoZXZlbnQucmVzZXQpIHtcbiAgICAgICAgdGhpcy52aWV3Q29udGV4dC4kaW1wbGljaXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudmlld0NvbnRleHQubmdyeExldCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy52aWV3Q29udGV4dC5lcnJvciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZW5kZXJNYWluVmlldyhldmVudC5zeW5jaHJvbm91cyk7XG4gICAgfSxcbiAgfSk7XG4gIHByaXZhdGUgcmVhZG9ubHkgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBuZ3J4TGV0KHBvdGVudGlhbE9ic2VydmFibGU6IFBPKSB7XG4gICAgdGhpcy5yZW5kZXJFdmVudE1hbmFnZXIubmV4dFBvdGVudGlhbE9ic2VydmFibGUocG90ZW50aWFsT2JzZXJ2YWJsZSk7XG4gIH1cblxuICBASW5wdXQoJ25ncnhMZXRTdXNwZW5zZVRwbCcpIHN1c3BlbnNlVGVtcGxhdGVSZWY/OiBUZW1wbGF0ZVJlZjx1bmtub3duPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IG1haW5UZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8XG4gICAgICBMZXRWaWV3Q29udGV4dDxQTyB8IHVuZGVmaW5lZD5cbiAgICA+LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVycm9ySGFuZGxlcjogRXJyb3JIYW5kbGVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyU2NoZWR1bGVyOiBSZW5kZXJTY2hlZHVsZXJcbiAgKSB7fVxuXG4gIHN0YXRpYyBuZ1RlbXBsYXRlQ29udGV4dEd1YXJkPFBPPihcbiAgICBkaXI6IExldERpcmVjdGl2ZTxQTz4sXG4gICAgY3R4OiB1bmtub3duXG4gICk6IGN0eCBpcyBMZXRWaWV3Q29udGV4dDxQTz4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5yZW5kZXJFdmVudE1hbmFnZXIuaGFuZGxlUG90ZW50aWFsT2JzZXJ2YWJsZUNoYW5nZXMoKS5zdWJzY3JpYmUoKVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJNYWluVmlldyhpc1N5bmNFdmVudDogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzU3VzcGVuc2VWaWV3Q3JlYXRlZCkge1xuICAgICAgdGhpcy5pc1N1c3BlbnNlVmlld0NyZWF0ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMudmlld0NvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc01haW5WaWV3Q3JlYXRlZCkge1xuICAgICAgdGhpcy5pc01haW5WaWV3Q3JlYXRlZCA9IHRydWU7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KFxuICAgICAgICB0aGlzLm1haW5UZW1wbGF0ZVJlZixcbiAgICAgICAgdGhpcy52aWV3Q29udGV4dFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzU3luY0V2ZW50KSB7XG4gICAgICB0aGlzLnJlbmRlclNjaGVkdWxlci5zY2hlZHVsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyU3VzcGVuc2VWaWV3KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzTWFpblZpZXdDcmVhdGVkKSB7XG4gICAgICB0aGlzLmlzTWFpblZpZXdDcmVhdGVkID0gZmFsc2U7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdXNwZW5zZVRlbXBsYXRlUmVmICYmICF0aGlzLmlzU3VzcGVuc2VWaWV3Q3JlYXRlZCkge1xuICAgICAgdGhpcy5pc1N1c3BlbnNlVmlld0NyZWF0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnN1c3BlbnNlVGVtcGxhdGVSZWYpO1xuICAgIH1cbiAgfVxufVxuIl19