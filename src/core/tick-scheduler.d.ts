import { ApplicationRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare abstract class TickScheduler {
    abstract schedule(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TickScheduler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TickScheduler>;
}
export declare class AnimationFrameTickScheduler extends TickScheduler {
    private readonly appRef;
    private isScheduled;
    constructor(appRef: ApplicationRef);
    schedule(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AnimationFrameTickScheduler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AnimationFrameTickScheduler>;
}
export declare class NoopTickScheduler extends TickScheduler {
    schedule(): void;
}
