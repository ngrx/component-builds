import { ErrorHandler, OnDestroy, PipeTransform } from '@angular/core';
import { PotentialObservableResult } from '../core/potential-observable';
import * as i0 from "@angular/core";
type PushPipeResult<PO> = PotentialObservableResult<PO, undefined>;
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
export declare class PushPipe implements PipeTransform, OnDestroy {
    private readonly errorHandler;
    private renderedValue;
    private readonly renderScheduler;
    private readonly renderEventManager;
    private readonly subscription;
    constructor(errorHandler: ErrorHandler);
    transform<PO>(potentialObservable: PO): PushPipeResult<PO>;
    ngOnDestroy(): void;
    private setRenderedValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<PushPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<PushPipe, "ngrxPush", true>;
}
export {};
