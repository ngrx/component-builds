import { ChangeDetectorRef, NgZone } from '@angular/core';
export declare function getChangeDetectionHandler(ngZone: NgZone, cdRef: ChangeDetectorRef): <T>(component?: T) => void;
export declare function getDetectChanges(ngZone: NgZone, cdRef: ChangeDetectorRef): <T>(component?: T) => void;
