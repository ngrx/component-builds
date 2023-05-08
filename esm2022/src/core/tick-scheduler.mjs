import { inject, Injectable, NgZone } from '@angular/core';
import { isNgZone } from './zone-helpers';
import * as i0 from "@angular/core";
class TickScheduler {
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: TickScheduler, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: TickScheduler, providedIn: 'root', useFactory: () => {
            const zone = inject(NgZone);
            return isNgZone(zone)
                ? new NoopTickScheduler()
                : inject(AnimationFrameTickScheduler);
        } }); }
}
export { TickScheduler };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: TickScheduler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => {
                        const zone = inject(NgZone);
                        return isNgZone(zone)
                            ? new NoopTickScheduler()
                            : inject(AnimationFrameTickScheduler);
                    },
                }]
        }] });
class AnimationFrameTickScheduler extends TickScheduler {
    constructor(appRef) {
        super();
        this.appRef = appRef;
        this.isScheduled = false;
    }
    schedule() {
        if (!this.isScheduled) {
            this.isScheduled = true;
            requestAnimationFrame(() => {
                this.appRef.tick();
                this.isScheduled = false;
            });
        }
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: AnimationFrameTickScheduler, deps: [{ token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: AnimationFrameTickScheduler, providedIn: 'root' }); }
}
export { AnimationFrameTickScheduler };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0", ngImport: i0, type: AnimationFrameTickScheduler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i0.ApplicationRef }]; } });
export class NoopTickScheduler extends TickScheduler {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    schedule() { }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGljay1zY2hlZHVsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC9zcmMvY29yZS90aWNrLXNjaGVkdWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWtCLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFMUMsTUFTc0IsYUFBYTtpSUFBYixhQUFhO3FJQUFiLGFBQWEsY0FSckIsTUFBTSxjQUNOLEdBQUcsRUFBRTtZQUNmLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxJQUFJLGlCQUFpQixFQUFFO2dCQUN6QixDQUFDLENBQUMsTUFBTSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDMUMsQ0FBQzs7U0FFbUIsYUFBYTsyRkFBYixhQUFhO2tCQVRsQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFO3dCQUNmLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDNUIsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDOzRCQUNuQixDQUFDLENBQUMsSUFBSSxpQkFBaUIsRUFBRTs0QkFDekIsQ0FBQyxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO29CQUMxQyxDQUFDO2lCQUNGOztBQUtELE1BR2EsMkJBQTRCLFNBQVEsYUFBYTtJQUc1RCxZQUE2QixNQUFzQjtRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURtQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUYzQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztJQUk1QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLHFCQUFxQixDQUFDLEdBQUcsRUFBRTtnQkFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7aUlBZlUsMkJBQTJCO3FJQUEzQiwyQkFBMkIsY0FGMUIsTUFBTTs7U0FFUCwyQkFBMkI7MkZBQTNCLDJCQUEyQjtrQkFIdkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7O0FBbUJELE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxhQUFhO0lBQ2xELGdFQUFnRTtJQUNoRSxRQUFRLEtBQVUsQ0FBQztDQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBpbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNOZ1pvbmUgfSBmcm9tICcuL3pvbmUtaGVscGVycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VGYWN0b3J5OiAoKSA9PiB7XG4gICAgY29uc3Qgem9uZSA9IGluamVjdChOZ1pvbmUpO1xuICAgIHJldHVybiBpc05nWm9uZSh6b25lKVxuICAgICAgPyBuZXcgTm9vcFRpY2tTY2hlZHVsZXIoKVxuICAgICAgOiBpbmplY3QoQW5pbWF0aW9uRnJhbWVUaWNrU2NoZWR1bGVyKTtcbiAgfSxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVGlja1NjaGVkdWxlciB7XG4gIGFic3RyYWN0IHNjaGVkdWxlKCk6IHZvaWQ7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBbmltYXRpb25GcmFtZVRpY2tTY2hlZHVsZXIgZXh0ZW5kcyBUaWNrU2NoZWR1bGVyIHtcbiAgcHJpdmF0ZSBpc1NjaGVkdWxlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgYXBwUmVmOiBBcHBsaWNhdGlvblJlZikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBzY2hlZHVsZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNTY2hlZHVsZWQpIHtcbiAgICAgIHRoaXMuaXNTY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBSZWYudGljaygpO1xuICAgICAgICB0aGlzLmlzU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vb3BUaWNrU2NoZWR1bGVyIGV4dGVuZHMgVGlja1NjaGVkdWxlciB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb25cbiAgc2NoZWR1bGUoKTogdm9pZCB7fVxufVxuIl19