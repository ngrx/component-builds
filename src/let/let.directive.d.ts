import { ErrorHandler, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PotentialObservableResult } from '../core/potential-observable';
import { RenderScheduler } from '../core/render-scheduler';
import * as i0 from "@angular/core";
type LetViewContextValue<PO> = PotentialObservableResult<PO>;
export interface LetViewContext<PO> {
    /**
     * using `$implicit` to enable `let` syntax: `*ngrxLet="obs$; let o"`
     */
    $implicit: LetViewContextValue<PO>;
    /**
     * using `ngrxLet` to enable `as` syntax: `*ngrxLet="obs$ as o"`
     */
    ngrxLet: LetViewContextValue<PO>;
    /**
     * `*ngrxLet="obs$; let e = error"` or `*ngrxLet="obs$; error as e"`
     */
    error: any;
    /**
     * `*ngrxLet="obs$; let c = complete"` or `*ngrxLet="obs$; complete as c"`
     */
    complete: boolean;
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
export declare class LetDirective<PO> implements OnInit, OnDestroy {
    private readonly mainTemplateRef;
    private readonly viewContainerRef;
    private readonly errorHandler;
    private readonly renderScheduler;
    private isMainViewCreated;
    private isSuspenseViewCreated;
    private readonly viewContext;
    private readonly renderEventManager;
    private readonly subscription;
    set ngrxLet(potentialObservable: PO);
    suspenseTemplateRef?: TemplateRef<unknown>;
    constructor(mainTemplateRef: TemplateRef<LetViewContext<PO | undefined>>, viewContainerRef: ViewContainerRef, errorHandler: ErrorHandler, renderScheduler: RenderScheduler);
    static ngTemplateContextGuard<PO>(dir: LetDirective<PO>, ctx: unknown): ctx is LetViewContext<PO>;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private renderMainView;
    private renderSuspenseView;
    static ɵfac: i0.ɵɵFactoryDeclaration<LetDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LetDirective<any>, "[ngrxLet]", never, { "ngrxLet": { "alias": "ngrxLet"; "required": false; }; "suspenseTemplateRef": { "alias": "ngrxLetSuspenseTpl"; "required": false; }; }, {}, never, never, true, never>;
}
export {};
