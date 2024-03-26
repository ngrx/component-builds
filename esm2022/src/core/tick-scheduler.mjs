import { inject, Injectable, NgZone } from '@angular/core';
import { isNgZone } from './zone-helpers';
import * as i0 from "@angular/core";
export class TickScheduler {
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: TickScheduler, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: TickScheduler, providedIn: 'root', useFactory: () => {
            const zone = inject(NgZone);
            return isNgZone(zone)
                ? new NoopTickScheduler()
                : inject(AnimationFrameTickScheduler);
        } }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: TickScheduler, decorators: [{
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
export class AnimationFrameTickScheduler extends TickScheduler {
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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: AnimationFrameTickScheduler, deps: [{ token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: AnimationFrameTickScheduler, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.0", ngImport: i0, type: AnimationFrameTickScheduler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i0.ApplicationRef }] });
export class NoopTickScheduler extends TickScheduler {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    schedule() { }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGljay1zY2hlZHVsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC9zcmMvY29yZS90aWNrLXNjaGVkdWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWtCLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFXMUMsTUFBTSxPQUFnQixhQUFhO2lJQUFiLGFBQWE7cUlBQWIsYUFBYSxjQVJyQixNQUFNLGNBQ04sR0FBRyxFQUFFO1lBQ2YsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLElBQUksaUJBQWlCLEVBQUU7Z0JBQ3pCLENBQUMsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMxQyxDQUFDOzsyRkFFbUIsYUFBYTtrQkFUbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsVUFBVSxFQUFFLEdBQUcsRUFBRTt3QkFDZixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzVCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQzs0QkFDbkIsQ0FBQyxDQUFDLElBQUksaUJBQWlCLEVBQUU7NEJBQ3pCLENBQUMsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQztvQkFDMUMsQ0FBQztpQkFDRjs7QUFRRCxNQUFNLE9BQU8sMkJBQTRCLFNBQVEsYUFBYTtJQUc1RCxZQUE2QixNQUFzQjtRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURtQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUYzQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztJQUk1QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIscUJBQXFCLENBQUMsR0FBRyxFQUFFO2dCQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO2lJQWZVLDJCQUEyQjtxSUFBM0IsMkJBQTJCLGNBRjFCLE1BQU07OzJGQUVQLDJCQUEyQjtrQkFIdkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7O0FBbUJELE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxhQUFhO0lBQ2xELGdFQUFnRTtJQUNoRSxRQUFRLEtBQVUsQ0FBQztDQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcGxpY2F0aW9uUmVmLCBpbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNOZ1pvbmUgfSBmcm9tICcuL3pvbmUtaGVscGVycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VGYWN0b3J5OiAoKSA9PiB7XG4gICAgY29uc3Qgem9uZSA9IGluamVjdChOZ1pvbmUpO1xuICAgIHJldHVybiBpc05nWm9uZSh6b25lKVxuICAgICAgPyBuZXcgTm9vcFRpY2tTY2hlZHVsZXIoKVxuICAgICAgOiBpbmplY3QoQW5pbWF0aW9uRnJhbWVUaWNrU2NoZWR1bGVyKTtcbiAgfSxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVGlja1NjaGVkdWxlciB7XG4gIGFic3RyYWN0IHNjaGVkdWxlKCk6IHZvaWQ7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBbmltYXRpb25GcmFtZVRpY2tTY2hlZHVsZXIgZXh0ZW5kcyBUaWNrU2NoZWR1bGVyIHtcbiAgcHJpdmF0ZSBpc1NjaGVkdWxlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgYXBwUmVmOiBBcHBsaWNhdGlvblJlZikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBzY2hlZHVsZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNTY2hlZHVsZWQpIHtcbiAgICAgIHRoaXMuaXNTY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBSZWYudGljaygpO1xuICAgICAgICB0aGlzLmlzU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE5vb3BUaWNrU2NoZWR1bGVyIGV4dGVuZHMgVGlja1NjaGVkdWxlciB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb25cbiAgc2NoZWR1bGUoKTogdm9pZCB7fVxufVxuIl19