// src/core/zone-helpers.mjs
import { NgZone } from "@angular/core";
function isNgZone(zone) {
  return zone instanceof NgZone;
}

// src/core/tick-scheduler.mjs
import { inject, Injectable, NgZone as NgZone2 } from "@angular/core";
import * as i0 from "@angular/core";
var TickScheduler = class _TickScheduler {
  static {
    this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i0, type: _TickScheduler, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
  }
  static {
    this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i0, type: _TickScheduler, providedIn: "root", useFactory: () => {
      const zone = inject(NgZone2);
      return isNgZone(zone) ? new NoopTickScheduler() : inject(AnimationFrameTickScheduler);
    } });
  }
};
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i0, type: TickScheduler, decorators: [{
  type: Injectable,
  args: [{
    providedIn: "root",
    useFactory: () => {
      const zone = inject(NgZone2);
      return isNgZone(zone) ? new NoopTickScheduler() : inject(AnimationFrameTickScheduler);
    }
  }]
}] });
var AnimationFrameTickScheduler = class _AnimationFrameTickScheduler extends TickScheduler {
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
  static {
    this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i0, type: _AnimationFrameTickScheduler, deps: [{ token: i0.ApplicationRef }], target: i0.ɵɵFactoryTarget.Injectable });
  }
  static {
    this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i0, type: _AnimationFrameTickScheduler, providedIn: "root" });
  }
};
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i0, type: AnimationFrameTickScheduler, decorators: [{
  type: Injectable,
  args: [{
    providedIn: "root"
  }]
}], ctorParameters: () => [{ type: i0.ApplicationRef }] });
var NoopTickScheduler = class extends TickScheduler {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  schedule() {
  }
};

// src/core/render-scheduler.mjs
import { ChangeDetectorRef, inject as inject2, Injectable as Injectable2 } from "@angular/core";
import * as i02 from "@angular/core";
var RenderScheduler = class _RenderScheduler {
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
  static {
    this.ɵfac = i02.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i02, type: _RenderScheduler, deps: [{ token: i02.ChangeDetectorRef }, { token: TickScheduler }], target: i02.ɵɵFactoryTarget.Injectable });
  }
  static {
    this.ɵprov = i02.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i02, type: _RenderScheduler });
  }
};
i02.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i02, type: RenderScheduler, decorators: [{
  type: Injectable2
}], ctorParameters: () => [{ type: i02.ChangeDetectorRef }, { type: TickScheduler }] });
function createRenderScheduler() {
  return new RenderScheduler(inject2(ChangeDetectorRef), inject2(TickScheduler));
}

// src/core/render-event/handlers.mjs
function combineRenderEventHandlers(handlers) {
  return (event) => handlers[event.type]?.(event);
}

// src/core/potential-observable.mjs
import { combineLatest, from, isObservable, Observable } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
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
  return typeof value?.then === "function";
}
function isObservableDictionary(value) {
  return isDictionary(value) && Object.keys(value).length > 0 && Object.values(value).every(isObservable);
}
function isDictionary(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function toDistinctObsDictionary(obsDictionary) {
  return Object.keys(obsDictionary).reduce((acc, key) => ({
    ...acc,
    [key]: obsDictionary[key].pipe(distinctUntilChanged())
  }), {});
}

// src/core/render-event/manager.mjs
import { Observable as Observable2, pipe, ReplaySubject } from "rxjs";
import { distinctUntilChanged as distinctUntilChanged2, switchMap, tap } from "rxjs/operators";
import { untracked } from "@angular/core";
function createRenderEventManager(handlers) {
  const handleRenderEvent = combineRenderEventHandlers(handlers);
  const potentialObservable$ = new ReplaySubject(1);
  return {
    nextPotentialObservable(potentialObservable) {
      potentialObservable$.next(potentialObservable);
    },
    handlePotentialObservableChanges() {
      return potentialObservable$.pipe(distinctUntilChanged2(), switchMapToRenderEvent(), distinctUntilChanged2(renderEventComparator), tap(handleRenderEvent));
    }
  };
}
function switchMapToRenderEvent() {
  return pipe(switchMap((potentialObservable) => {
    const observable$ = fromPotentialObservable(potentialObservable);
    let reset = true;
    let synchronous = true;
    return new Observable2((subscriber) => {
      const subscription = untracked(() => observable$.subscribe({
        next(value) {
          subscriber.next({ type: "next", value, reset, synchronous });
          reset = false;
        },
        error(error) {
          subscriber.next({ type: "error", error, reset, synchronous });
          reset = false;
        },
        complete() {
          subscriber.next({ type: "complete", reset, synchronous });
          reset = false;
        }
      }));
      if (reset) {
        subscriber.next({ type: "suspense", reset, synchronous: true });
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
  if (current.type === "next") {
    return previous.value === current.value;
  }
  if (current.type === "error") {
    return previous.error === current.error;
  }
  return true;
}

// src/let/let.directive.mjs
import { Directive, Input } from "@angular/core";
import { Subscription } from "rxjs";
import * as i03 from "@angular/core";
var LetDirective = class _LetDirective {
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
      $implicit: void 0,
      ngrxLet: void 0,
      error: void 0,
      complete: false
    };
    this.renderEventManager = createRenderEventManager({
      suspense: () => {
        this.viewContext.$implicit = void 0;
        this.viewContext.ngrxLet = void 0;
        this.viewContext.error = void 0;
        this.viewContext.complete = false;
        this.renderSuspenseView();
      },
      next: (event) => {
        this.viewContext.$implicit = event.value;
        this.viewContext.ngrxLet = event.value;
        if (event.reset) {
          this.viewContext.error = void 0;
          this.viewContext.complete = false;
        }
        this.renderMainView(event.synchronous);
      },
      error: (event) => {
        this.viewContext.error = event.error;
        if (event.reset) {
          this.viewContext.$implicit = void 0;
          this.viewContext.ngrxLet = void 0;
          this.viewContext.complete = false;
        }
        this.renderMainView(event.synchronous);
        this.errorHandler.handleError(event.error);
      },
      complete: (event) => {
        this.viewContext.complete = true;
        if (event.reset) {
          this.viewContext.$implicit = void 0;
          this.viewContext.ngrxLet = void 0;
          this.viewContext.error = void 0;
        }
        this.renderMainView(event.synchronous);
      }
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
  static {
    this.ɵfac = i03.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i03, type: _LetDirective, deps: [{ token: i03.TemplateRef }, { token: i03.ViewContainerRef }, { token: i03.ErrorHandler }, { token: RenderScheduler }], target: i03.ɵɵFactoryTarget.Directive });
  }
  static {
    this.ɵdir = i03.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0-next.6", type: _LetDirective, isStandalone: true, selector: "[ngrxLet]", inputs: { ngrxLet: "ngrxLet", suspenseTemplateRef: ["ngrxLetSuspenseTpl", "suspenseTemplateRef"] }, providers: [RenderScheduler], ngImport: i03 });
  }
};
i03.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i03, type: LetDirective, decorators: [{
  type: Directive,
  args: [{
    standalone: true,
    selector: "[ngrxLet]",
    providers: [RenderScheduler]
  }]
}], ctorParameters: () => [{ type: i03.TemplateRef }, { type: i03.ViewContainerRef }, { type: i03.ErrorHandler }, { type: RenderScheduler }], propDecorators: { ngrxLet: [{
  type: Input
}], suspenseTemplateRef: [{
  type: Input,
  args: ["ngrxLetSuspenseTpl"]
}] } });

// src/push/push.pipe.mjs
import { Pipe } from "@angular/core";
import * as i04 from "@angular/core";
var PushPipe = class _PushPipe {
  constructor(errorHandler) {
    this.errorHandler = errorHandler;
    this.renderScheduler = createRenderScheduler();
    this.renderEventManager = createRenderEventManager({
      suspense: (event) => this.setRenderedValue(void 0, event.synchronous),
      next: (event) => this.setRenderedValue(event.value, event.synchronous),
      error: (event) => {
        if (event.reset) {
          this.setRenderedValue(void 0, event.synchronous);
        }
        this.errorHandler.handleError(event.error);
      },
      complete: (event) => {
        if (event.reset) {
          this.setRenderedValue(void 0, event.synchronous);
        }
      }
    });
    this.subscription = this.renderEventManager.handlePotentialObservableChanges().subscribe();
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
  static {
    this.ɵfac = i04.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i04, type: _PushPipe, deps: [{ token: i04.ErrorHandler }], target: i04.ɵɵFactoryTarget.Pipe });
  }
  static {
    this.ɵpipe = i04.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.0.0-next.6", ngImport: i04, type: _PushPipe, isStandalone: true, name: "ngrxPush", pure: false });
  }
};
i04.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0-next.6", ngImport: i04, type: PushPipe, decorators: [{
  type: Pipe,
  args: [{
    standalone: true,
    name: "ngrxPush",
    pure: false
  }]
}], ctorParameters: () => [{ type: i04.ErrorHandler }] });
export {
  LetDirective,
  PushPipe,
  RenderScheduler
};
//# sourceMappingURL=ngrx-component.mjs.map
