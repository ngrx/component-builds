import { ChangeDetectorRef, NgZone, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Unsubscribable } from 'rxjs';
import { CoalescingConfig as NgRxLetConfig } from '../core';
export interface LetViewContext<T> {
    $implicit?: T;
    ngrxLet?: T;
    $error?: boolean;
    $complete?: boolean;
}
/**
 * @Directive LetDirective
 *
 * @description
 *
 * The `*ngrxLet` directive serves a convenient way of binding observables to a view context (a dom element scope).
 * It also helps with several internal processing under the hood.
 *
 * The current way of binding an observable to the view looks like that:
 * ```html
 * <ng-container *ngIf="observableNumber$ as n">
 * <app-number [number]="n">
 * </app-number>
 * <app-number-special [number]="n">
 * </app-number-special>
 * </ng-container>
 *  ```
 *
 *  The problem is `*ngIf` is also interfering with rendering and in case of a `0` the component would be hidden
 *
 * Included Features:
 * - binding is always present. (`*ngIf="truthy$"`)
 * - it takes away the multiple usages of the `async` or `ngrxPush` pipe
 * - a unified/structured way of handling null and undefined
 * - triggers change-detection differently if `zone.js` is present or not (`ChangeDetectorRef.detectChanges` or `ChangeDetectorRef.markForCheck`)
 * - triggers change-detection differently if ViewEngine or Ivy is present (`ChangeDetectorRef.detectChanges` or `ɵdetectChanges`)
 * - distinct same values in a row (distinctUntilChanged operator),
 *
 * @usageNotes
 *
 * ### Examples
 *
 * The `*ngrxLet` directive take over several things and makes it more convenient and save to work with streams in the template
 * `<ng-container *ngrxLet="observableNumber$ as c"></ng-container>`
 *
 * ```html
 * <ng-container *ngrxLet="observableNumber$ as n">
 * <app-number [number]="n">
 * </app-number>
 * </ng-container>
 *
 * <ng-container *ngrxLet="observableNumber$; let n">
 * <app-number [number]="n">
 * </app-number>
 * </ng-container>
 * ```
 *
 * In addition to that it provides us information from the whole observable context.
 * We can track the observables:
 * - next value
 * - error value
 * - complete state
 *
 * ```html
 * <ng-container *ngrxLet="observableNumber$; let n; let e = $error, let c = $complete">
 * <app-number [number]="n"  *ngIf="!e && !c">
 * </app-number>
 * <ng-container *ngIf="e">
 * There is an error: {{e}}
 * </ng-container>
 * <ng-container *ngIf="c">
 * Observable completed: {{c}}
 * </ng-container>
 * </ng-container>
 * ```
 *
 * @publicApi
 */
export declare class LetDirective<U> implements OnDestroy {
    private readonly templateRef;
    private readonly viewContainerRef;
    private embeddedView;
    private readonly ViewContext;
    private readonly configSubject;
    private readonly config$;
    protected readonly subscription: Unsubscribable;
    private readonly cdAware;
    private readonly resetContextObserver;
    private readonly updateViewContextObserver;
    static ngTemplateContextGuard<U>(dir: LetDirective<U>, ctx: unknown): ctx is LetViewContext<U>;
    private readonly configurableBehaviour;
    set ngrxLet(potentialObservable: Observable<U> | Promise<U> | null | undefined);
    set ngrxLetConfig(config: NgRxLetConfig);
    constructor(cdRef: ChangeDetectorRef, ngZone: NgZone, templateRef: TemplateRef<LetViewContext<U>>, viewContainerRef: ViewContainerRef);
    createEmbeddedView(): void;
    ngOnDestroy(): void;
}
