import { inject, Injectable, NgZone } from '@angular/core';
import { isNgZone } from './zone-helpers';
import * as i0 from "@angular/core";
export class TickScheduler {
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: TickScheduler, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: TickScheduler, providedIn: 'root', useFactory: () => {
            const zone = inject(NgZone);
            return isNgZone(zone)
                ? new NoopTickScheduler()
                : inject(AnimationFrameTickScheduler);
        } }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: TickScheduler, decorators: [{
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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: AnimationFrameTickScheduler, deps: [{ token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: AnimationFrameTickScheduler, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: AnimationFrameTickScheduler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i0.ApplicationRef }] });
export class NoopTickScheduler extends TickScheduler {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    schedule() { }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGljay1zY2hlZHVsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC9zcmMvY29yZS90aWNrLXNjaGVkdWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWtCLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFXMUMsTUFBTSxPQUFnQixhQUFhO2lJQUFiLGFBQWE7cUlBQWIsYUFBYSxjQVJyQixNQUFNLGNBQ04sR0FBRyxFQUFFO1lBQ2YsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQztnQkFDbkIsQ0FBQyxDQUFDLElBQUksaUJBQWlCLEVBQUU7Z0JBQ3pCLENBQUMsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUMxQyxDQUFDOzsyRkFFbUIsYUFBYTtrQkFUbEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsVUFBVSxFQUFFLEdBQUcsRUFBRTt3QkFDZixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzVCLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQzs0QkFDbkIsQ0FBQyxDQUFDLElBQUksaUJBQWlCLEVBQUU7NEJBQ3pCLENBQUMsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUMsQ0FBQztvQkFDMUMsQ0FBQztpQkFDRjs7QUFRRCxNQUFNLE9BQU8sMkJBQTRCLFNBQVEsYUFBYTtJQUc1RCxZQUE2QixNQUFzQjtRQUNqRCxLQUFLLEVBQUUsQ0FBQztRQURtQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUYzQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztJQUk1QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLHFCQUFxQixDQUFDLEdBQUcsRUFBRTtnQkFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7aUlBZlUsMkJBQTJCO3FJQUEzQiwyQkFBMkIsY0FGMUIsTUFBTTs7MkZBRVAsMkJBQTJCO2tCQUh2QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7QUFtQkQsTUFBTSxPQUFPLGlCQUFrQixTQUFRLGFBQWE7SUFDbEQsZ0VBQWdFO0lBQ2hFLFFBQVEsS0FBVSxDQUFDO0NBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwbGljYXRpb25SZWYsIGluamVjdCwgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc05nWm9uZSB9IGZyb20gJy4vem9uZS1oZWxwZXJzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6ICgpID0+IHtcbiAgICBjb25zdCB6b25lID0gaW5qZWN0KE5nWm9uZSk7XG4gICAgcmV0dXJuIGlzTmdab25lKHpvbmUpXG4gICAgICA/IG5ldyBOb29wVGlja1NjaGVkdWxlcigpXG4gICAgICA6IGluamVjdChBbmltYXRpb25GcmFtZVRpY2tTY2hlZHVsZXIpO1xuICB9LFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBUaWNrU2NoZWR1bGVyIHtcbiAgYWJzdHJhY3Qgc2NoZWR1bGUoKTogdm9pZDtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbkZyYW1lVGlja1NjaGVkdWxlciBleHRlbmRzIFRpY2tTY2hlZHVsZXIge1xuICBwcml2YXRlIGlzU2NoZWR1bGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHNjaGVkdWxlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc1NjaGVkdWxlZCkge1xuICAgICAgdGhpcy5pc1NjaGVkdWxlZCA9IHRydWU7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFwcFJlZi50aWNrKCk7XG4gICAgICAgIHRoaXMuaXNTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTm9vcFRpY2tTY2hlZHVsZXIgZXh0ZW5kcyBUaWNrU2NoZWR1bGVyIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxuICBzY2hlZHVsZSgpOiB2b2lkIHt9XG59XG4iXX0=