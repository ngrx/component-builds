import * as i0 from '@angular/core';
import { NgZone, inject, Injectable, ChangeDetectorRef, untracked, Directive, Input, Pipe } from '@angular/core';
import { isObservable, combineLatest, from, Observable, ReplaySubject, pipe, Subscription } from 'rxjs';
import { distinctUntilChanged, tap, switchMap } from 'rxjs/operators';

function isNgZone(zone) {
    return zone instanceof NgZone;
}

class TickScheduler {
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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: AnimationFrameTickScheduler, deps: [{ token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: AnimationFrameTickScheduler, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: AnimationFrameTickScheduler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i0.ApplicationRef }] });
class NoopTickScheduler extends TickScheduler {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    schedule() { }
}

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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: RenderScheduler, deps: [{ token: i0.ChangeDetectorRef }, { token: TickScheduler }], target: i0.ɵɵFactoryTarget.Injectable }); }
    /** @nocollapse */ static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: RenderScheduler }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: RenderScheduler, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }, { type: TickScheduler }] });
function createRenderScheduler() {
    return new RenderScheduler(inject(ChangeDetectorRef), inject(TickScheduler));
}

function combineRenderEventHandlers(handlers) {
    return (event) => handlers[event.type]?.(event);
}

function fromPotentialObservable(potentialObservable) {
    if (isObservable(potentialObservable)) {
        return potentialObservable;
    }
    if (isObservableDictionary(potentialObservable)) {
        return combineLatest(toDistinctObsDictionary(potentialObservable));
    }
    if (isPromiseLike(potentialObservable)) {
        return from(potentialObservable);
    }
    return new Observable((subscriber) => {
        subscriber.next(potentialObservable);
    });
}
function isPromiseLike(value) {
    return typeof value?.then === 'function';
}
function isObservableDictionary(value) {
    return (isDictionary(value) &&
        Object.keys(value).length > 0 &&
        Object.values(value).every(isObservable));
}
function isDictionary(value) {
    return !!value && typeof value === 'object' && !Array.isArray(value);
}
function toDistinctObsDictionary(obsDictionary) {
    return Object.keys(obsDictionary).reduce((acc, key) => ({
        ...acc,
        [key]: obsDictionary[key].pipe(distinctUntilChanged()),
    }), {});
}

function createRenderEventManager(handlers) {
    const handleRenderEvent = combineRenderEventHandlers(handlers);
    const potentialObservable$ = new ReplaySubject(1);
    return {
        nextPotentialObservable(potentialObservable) {
            potentialObservable$.next(potentialObservable);
        },
        handlePotentialObservableChanges() {
            return potentialObservable$.pipe(distinctUntilChanged(), switchMapToRenderEvent(), distinctUntilChanged(renderEventComparator), tap(handleRenderEvent));
        },
    };
}
function switchMapToRenderEvent() {
    return pipe(switchMap((potentialObservable) => {
        const observable$ = fromPotentialObservable(potentialObservable);
        let reset = true;
        let synchronous = true;
        return new Observable((subscriber) => {
            const subscription = untracked(() => observable$.subscribe({
                next(value) {
                    subscriber.next({ type: 'next', value, reset, synchronous });
                    reset = false;
                },
                error(error) {
                    subscriber.next({ type: 'error', error, reset, synchronous });
                    reset = false;
                },
                complete() {
                    subscriber.next({ type: 'complete', reset, synchronous });
                    reset = false;
                },
            }));
            if (reset) {
                subscriber.next({ type: 'suspense', reset, synchronous: true });
                reset = false;
            }
            synchronous = false;
            return subscription;
        });
    }));
}
function renderEventComparator(previous, current) {
    if (previous.type !== current.type || previous.reset !== current.reset) {
        return false;
    }
    if (current.type === 'next') {
        return previous.value === current.value;
    }
    if (current.type === 'error') {
        return previous.error === current.error;
    }
    return true;
}

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
class LetDirective {
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
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: LetDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }, { token: i0.ErrorHandler }, { token: RenderScheduler }], target: i0.ɵɵFactoryTarget.Directive }); }
    /** @nocollapse */ static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.0", type: LetDirective, isStandalone: true, selector: "[ngrxLet]", inputs: { ngrxLet: "ngrxLet", suspenseTemplateRef: ["ngrxLetSuspenseTpl", "suspenseTemplateRef"] }, providers: [RenderScheduler], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: LetDirective, decorators: [{
            type: Directive,
            args: [{
                    standalone: true,
                    selector: '[ngrxLet]',
                    providers: [RenderScheduler],
                }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }, { type: i0.ErrorHandler }, { type: RenderScheduler }], propDecorators: { ngrxLet: [{
                type: Input
            }], suspenseTemplateRef: [{
                type: Input,
                args: ['ngrxLetSuspenseTpl']
            }] } });

/**
 * @description
 *
 * The `ngrxPush` pipe serves as a drop-in replacement for the `async` pipe.
 * It contains intelligent handling of change detection to enable us
 * running in zone-full as well as zone-less mode without any changes to the code.
 *
 * @usageNotes
 *
 * ### Displaying Observable Values
 *
 * ```html
 * <p>{{ number$ | ngrxPush }}</p>
 *
 * <ng-container *ngIf="number$ | ngrxPush as n">{{ n }}</ng-container>
 *
 * <app-number [number]="number$ | ngrxPush"></app-number>
 * ```
 *
 * ### Combining Multiple Observables
 *
 * ```html
 * <code>
 *   {{ { users: users$, query: query$ } | ngrxPush | json }}
 * </code>
 * ```
 *
 * @publicApi
 */
class PushPipe {
    constructor(errorHandler) {
        this.errorHandler = errorHandler;
        this.renderScheduler = createRenderScheduler();
        this.renderEventManager = createRenderEventManager({
            suspense: (event) => this.setRenderedValue(undefined, event.synchronous),
            next: (event) => this.setRenderedValue(event.value, event.synchronous),
            error: (event) => {
                if (event.reset) {
                    this.setRenderedValue(undefined, event.synchronous);
                }
                this.errorHandler.handleError(event.error);
            },
            complete: (event) => {
                if (event.reset) {
                    this.setRenderedValue(undefined, event.synchronous);
                }
            },
        });
        this.subscription = this.renderEventManager
            .handlePotentialObservableChanges()
            .subscribe();
    }
    transform(potentialObservable) {
        this.renderEventManager.nextPotentialObservable(potentialObservable);
        return this.renderedValue;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    setRenderedValue(value, isSyncEvent) {
        if (value !== this.renderedValue) {
            this.renderedValue = value;
            if (!isSyncEvent) {
                this.renderScheduler.schedule();
            }
        }
    }
    /** @nocollapse */ static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: PushPipe, deps: [{ token: i0.ErrorHandler }], target: i0.ɵɵFactoryTarget.Pipe }); }
    /** @nocollapse */ static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "17.0.0", ngImport: i0, type: PushPipe, isStandalone: true, name: "ngrxPush", pure: false }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.0", ngImport: i0, type: PushPipe, decorators: [{
            type: Pipe,
            args: [{
                    standalone: true,
                    name: 'ngrxPush',
                    pure: false,
                }]
        }], ctorParameters: () => [{ type: i0.ErrorHandler }] });

/**
 * DO NOT EDIT
 *
 * This file is automatically generated at build
 */

/**
 * Generated bundle index. Do not edit.
 */

export { LetDirective, PushPipe, RenderScheduler };
//# sourceMappingURL=ngrx-component.mjs.map
