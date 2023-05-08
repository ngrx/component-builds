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
class RenderScheduler {
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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: RenderScheduler, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.TickScheduler }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: RenderScheduler }); }
}
export { RenderScheduler };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: RenderScheduler, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.TickScheduler }]; } });
export function createRenderScheduler() {
    return new RenderScheduler(inject(ChangeDetectorRef), inject(TickScheduler));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLXNjaGVkdWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9jb3JlL3JlbmRlci1zY2hlZHVsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7QUFFakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcURHO0FBQ0gsTUFDYSxlQUFlO0lBQzFCLFlBQ21CLEtBQXdCLEVBQ3hCLGFBQTRCO1FBRDVCLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQ3hCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQzVDLENBQUM7SUFFSjs7O09BR0c7SUFDSCxRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hDLENBQUM7aUlBYlUsZUFBZTtxSUFBZixlQUFlOztTQUFmLGVBQWU7MkZBQWYsZUFBZTtrQkFEM0IsVUFBVTs7QUFpQlgsTUFBTSxVQUFVLHFCQUFxQjtJQUNuQyxPQUFPLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0FBQy9FLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgaW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaWNrU2NoZWR1bGVyIH0gZnJvbSAnLi90aWNrLXNjaGVkdWxlcic7XG5cbi8qKlxuICogUHJvdmlkZXMgcmVuZGVyaW5nIGZ1bmN0aW9uYWxpdHkgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIGB6b25lLmpzYCBpcyBwcmVzZW50XG4gKiBvciBub3QuIEl0IG11c3QgYmUgcHJvdmlkZWQgYXQgdGhlIGNvbXBvbmVudC9kaXJlY3RpdmUgbGV2ZWwuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiAjIyMgUmVyZW5kZXIgem9uZS1sZXNzIGFwcCBvbiByb3V0ZSBjaGFuZ2VzXG4gKlxuICogYGBgdHNcbiAqIEBDb21wb25lbnQoe1xuICogICBzZWxlY3RvcjogJ2FwcC1yb290JyxcbiAqICAgdGVtcGxhdGU6ICc8cm91dGVyLW91dGxldD4nLFxuICogICAvLyDwn5GHIGBSZW5kZXJTY2hlZHVsZXJgIGlzIHByb3ZpZGVkIGF0IHRoZSBjb21wb25lbnQgbGV2ZWxcbiAqICAgcHJvdmlkZXJzOiBbUmVuZGVyU2NoZWR1bGVyXSxcbiAqICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gKiAgIGNvbnN0cnVjdG9yKFxuICogICAgIHByaXZhdGUgcmVhZG9ubHkgcm91dGVyOiBSb3V0ZXIsXG4gKiAgICAgcHJpdmF0ZSByZWFkb25seSByZW5kZXJTY2hlZHVsZXI6IFJlbmRlclNjaGVkdWxlclxuICogICApIHt9XG4gKlxuICogICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAqICAgICB0aGlzLnJvdXRlci5ldmVudHNcbiAqICAgICAgIC5waXBlKGZpbHRlcigoZSkgPT4gZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxuICogICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnJlbmRlclNjaGVkdWxlci5zY2hlZHVsZSgpKTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKlxuICogIyMjIFJlcmVuZGVyIGNvbXBvbmVudCBvbiBpbnRlcnZhbFxuICpcbiAqIGBgYHRzXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdhcHAtaW50ZXJ2YWwnLFxuICogICB0ZW1wbGF0ZTogJ3t7IGVsYXBzZWRUaW1lIH19bXMnLFxuICogICAvLyDwn5GHIGBSZW5kZXJTY2hlZHVsZXJgIGlzIHByb3ZpZGVkIGF0IHRoZSBjb21wb25lbnQgbGV2ZWxcbiAqICAgcHJvdmlkZXJzOiBbUmVuZGVyU2NoZWR1bGVyXSxcbiAqICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gKiB9KVxuICogZXhwb3J0IGNsYXNzIEludGVydmFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAqICAgZWxhcHNlZFRpbWUgPSAwO1xuICpcbiAqICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSByZW5kZXJTY2hlZHVsZXI6IFJlbmRlclNjaGVkdWxlcikge31cbiAqXG4gKiAgIG5nT25Jbml0KCk6IHZvaWQge1xuICogICAgIHNldEludGVydmFsKCgpID0+IHtcbiAqICAgICAgIHRoaXMuZWxhcHNlZFRpbWUgKz0gMTAwMDtcbiAqICAgICAgIHRoaXMucmVuZGVyU2NoZWR1bGVyLnNjaGVkdWxlKCk7XG4gKiAgICAgfSwgMTAwMCk7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVuZGVyU2NoZWR1bGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSByZWFkb25seSB0aWNrU2NoZWR1bGVyOiBUaWNrU2NoZWR1bGVyXG4gICkge31cblxuICAvKipcbiAgICogTWFya3MgY29tcG9uZW50IGFuZCBpdHMgYW5jZXN0b3JzIGFzIGRpcnR5LlxuICAgKiBJdCBhbHNvIHNjaGVkdWxlcyBhIG5ldyBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlIGluIHpvbmUtbGVzcyBtb2RlLlxuICAgKi9cbiAgc2NoZWR1bGUoKTogdm9pZCB7XG4gICAgdGhpcy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLnRpY2tTY2hlZHVsZXIuc2NoZWR1bGUoKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVuZGVyU2NoZWR1bGVyKCk6IFJlbmRlclNjaGVkdWxlciB7XG4gIHJldHVybiBuZXcgUmVuZGVyU2NoZWR1bGVyKGluamVjdChDaGFuZ2VEZXRlY3RvclJlZiksIGluamVjdChUaWNrU2NoZWR1bGVyKSk7XG59XG4iXX0=