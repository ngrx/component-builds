import { ChangeDetectorRef, inject, Injectable } from '@angular/core';
import { TickScheduler } from './tick-scheduler';
import * as i0 from "@angular/core";
import * as i1 from "./tick-scheduler";
/**
 * Provides rendering functionality regardless of whether `zone.js` is present
 * or not. It must be provided at the component/directive level.
 *
 * @usageNotes
 *
 * ### Rerender zone-less app on route changes
 *
 * ```ts
 * @Component({
 *   selector: 'app-root',
 *   template: '<router-outlet>',
 *   // 👇 `RenderScheduler` is provided at the component level
 *   providers: [RenderScheduler],
 *   changeDetection: ChangeDetectionStrategy.OnPush,
 * })
 * export class AppComponent implements OnInit {
 *   constructor(
 *     private readonly router: Router,
 *     private readonly renderScheduler: RenderScheduler
 *   ) {}
 *
 *   ngOnInit(): void {
 *     this.router.events
 *       .pipe(filter((e) => e instanceof NavigationEnd))
 *       .subscribe(() => this.renderScheduler.schedule());
 *   }
 * }
 * ```
 *
 * ### Rerender component on interval
 *
 * ```ts
 * @Component({
 *   selector: 'app-interval',
 *   template: '{{ elapsedTime }}ms',
 *   // 👇 `RenderScheduler` is provided at the component level
 *   providers: [RenderScheduler],
 *   changeDetection: ChangeDetectionStrategy.OnPush,
 * })
 * export class IntervalComponent implements OnInit {
 *   elapsedTime = 0;
 *
 *   constructor(private readonly renderScheduler: RenderScheduler) {}
 *
 *   ngOnInit(): void {
 *     setInterval(() => {
 *       this.elapsedTime += 1000;
 *       this.renderScheduler.schedule();
 *     }, 1000);
 *   }
 * }
 * ```
 */
export class RenderScheduler {
    constructor(cdRef, tickScheduler) {
        this.cdRef = cdRef;
        this.tickScheduler = tickScheduler;
    }
    /**
     * Marks component and its ancestors as dirty.
     * It also schedules a new change detection cycle in zone-less mode.
     */
    schedule() {
        this.cdRef.markForCheck();
        this.tickScheduler.schedule();
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: RenderScheduler, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.TickScheduler }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: RenderScheduler }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: RenderScheduler, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: i1.TickScheduler }] });
export function createRenderScheduler() {
    return new RenderScheduler(inject(ChangeDetectorRef), inject(TickScheduler));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLXNjaGVkdWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9jb3JlL3JlbmRlci1zY2hlZHVsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcURHO0FBRUgsTUFBTSxPQUFPLGVBQWU7SUFDMUIsWUFDbUIsS0FBd0IsRUFDeEIsYUFBNEI7UUFENUIsVUFBSyxHQUFMLEtBQUssQ0FBbUI7UUFDeEIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFDNUMsQ0FBQztJQUVKOzs7T0FHRztJQUNILFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDaEMsQ0FBQztpSUFiVSxlQUFlO3FJQUFmLGVBQWU7OzJGQUFmLGVBQWU7a0JBRDNCLFVBQVU7O0FBaUJYLE1BQU0sVUFBVSxxQkFBcUI7SUFDbkMsT0FBTyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUMvRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIGluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGlja1NjaGVkdWxlciB9IGZyb20gJy4vdGljay1zY2hlZHVsZXInO1xuXG4vKipcbiAqIFByb3ZpZGVzIHJlbmRlcmluZyBmdW5jdGlvbmFsaXR5IHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciBgem9uZS5qc2AgaXMgcHJlc2VudFxuICogb3Igbm90LiBJdCBtdXN0IGJlIHByb3ZpZGVkIGF0IHRoZSBjb21wb25lbnQvZGlyZWN0aXZlIGxldmVsLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogIyMjIFJlcmVuZGVyIHpvbmUtbGVzcyBhcHAgb24gcm91dGUgY2hhbmdlc1xuICpcbiAqIGBgYHRzXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdhcHAtcm9vdCcsXG4gKiAgIHRlbXBsYXRlOiAnPHJvdXRlci1vdXRsZXQ+JyxcbiAqICAgLy8g8J+RhyBgUmVuZGVyU2NoZWR1bGVyYCBpcyBwcm92aWRlZCBhdCB0aGUgY29tcG9uZW50IGxldmVsXG4gKiAgIHByb3ZpZGVyczogW1JlbmRlclNjaGVkdWxlcl0sXG4gKiAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICogICBjb25zdHJ1Y3RvcihcbiAqICAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlcjogUm91dGVyLFxuICogICAgIHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyU2NoZWR1bGVyOiBSZW5kZXJTY2hlZHVsZXJcbiAqICAgKSB7fVxuICpcbiAqICAgbmdPbkluaXQoKTogdm9pZCB7XG4gKiAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gKiAgICAgICAucGlwZShmaWx0ZXIoKGUpID0+IGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSlcbiAqICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5yZW5kZXJTY2hlZHVsZXIuc2NoZWR1bGUoKSk7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICpcbiAqICMjIyBSZXJlbmRlciBjb21wb25lbnQgb24gaW50ZXJ2YWxcbiAqXG4gKiBgYGB0c1xuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnYXBwLWludGVydmFsJyxcbiAqICAgdGVtcGxhdGU6ICd7eyBlbGFwc2VkVGltZSB9fW1zJyxcbiAqICAgLy8g8J+RhyBgUmVuZGVyU2NoZWR1bGVyYCBpcyBwcm92aWRlZCBhdCB0aGUgY29tcG9uZW50IGxldmVsXG4gKiAgIHByb3ZpZGVyczogW1JlbmRlclNjaGVkdWxlcl0sXG4gKiAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICogfSlcbiAqIGV4cG9ydCBjbGFzcyBJbnRlcnZhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gKiAgIGVsYXBzZWRUaW1lID0gMDtcbiAqXG4gKiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgcmVuZGVyU2NoZWR1bGVyOiBSZW5kZXJTY2hlZHVsZXIpIHt9XG4gKlxuICogICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAqICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gKiAgICAgICB0aGlzLmVsYXBzZWRUaW1lICs9IDEwMDA7XG4gKiAgICAgICB0aGlzLnJlbmRlclNjaGVkdWxlci5zY2hlZHVsZSgpO1xuICogICAgIH0sIDEwMDApO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlbmRlclNjaGVkdWxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgdGlja1NjaGVkdWxlcjogVGlja1NjaGVkdWxlclxuICApIHt9XG5cbiAgLyoqXG4gICAqIE1hcmtzIGNvbXBvbmVudCBhbmQgaXRzIGFuY2VzdG9ycyBhcyBkaXJ0eS5cbiAgICogSXQgYWxzbyBzY2hlZHVsZXMgYSBuZXcgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSBpbiB6b25lLWxlc3MgbW9kZS5cbiAgICovXG4gIHNjaGVkdWxlKCk6IHZvaWQge1xuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy50aWNrU2NoZWR1bGVyLnNjaGVkdWxlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlbmRlclNjaGVkdWxlcigpOiBSZW5kZXJTY2hlZHVsZXIge1xuICByZXR1cm4gbmV3IFJlbmRlclNjaGVkdWxlcihpbmplY3QoQ2hhbmdlRGV0ZWN0b3JSZWYpLCBpbmplY3QoVGlja1NjaGVkdWxlcikpO1xufVxuIl19