/**
 * @fileoverview added by tsickle
 * Generated from: src/core/cd-aware/get-change-detection-handling.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ɵdetectChanges as detectChanges, ɵmarkDirty as markDirty, } from '@angular/core';
import { isIvy } from '../utils/is-ivy';
import { hasZone } from '../utils/has-zone';
/**
 * @param {?} ngZone
 * @param {?} cdRef
 * @return {?}
 */
export function getChangeDetectionHandler(ngZone, cdRef) {
    if (isIvy()) {
        return hasZone(ngZone) ? markDirty : detectChanges;
    }
    else {
        return hasZone(ngZone)
            ? cdRef.markForCheck.bind(cdRef)
            : cdRef.detectChanges.bind(cdRef);
    }
}
//# sourceMappingURL=get-change-detection-handling.js.map