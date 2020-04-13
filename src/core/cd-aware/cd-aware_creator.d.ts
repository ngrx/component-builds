import { ChangeDetectorRef, NgZone } from '@angular/core';
import { NextObserver, Observable, PartialObserver, Subscribable } from 'rxjs';
export interface CoalescingConfig {
    optimized: boolean;
}
export interface CdAware<U> extends Subscribable<U> {
    next: (value: Observable<U> | Promise<U> | null | undefined) => void;
}
export interface WorkConfig {
    context: any;
    ngZone: NgZone;
    cdRef: ChangeDetectorRef;
}
export declare function setUpWork(cfg: WorkConfig): () => void;
/**
 * class CdAware
 *
 * @description
 * This abstract class holds all the shared logic for the push pipe and the let directive
 * responsible for change detection
 * If you extend this class you need to implement how the update of the rendered value happens.
 * Also custom behaviour is something you need to implement in the extending class
 */
export declare function createCdAware<U>(cfg: {
    work: () => void;
    resetContextObserver: NextObserver<unknown>;
    configurableBehaviour: (o: Observable<Observable<U | null | undefined>>) => Observable<Observable<U | null | undefined>>;
    updateViewContextObserver: PartialObserver<U | null | undefined>;
}): CdAware<U | undefined | null>;
