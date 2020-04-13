/**
 * @fileoverview added by tsickle
 * Generated from: modules/component/src/core/cd-aware/get-change-detection-handling.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNoYW5nZS1kZXRlY3Rpb24taGFuZGxpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC9zcmMvY29yZS9jZC1hd2FyZS9nZXQtY2hhbmdlLWRldGVjdGlvbi1oYW5kbGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFHTCxjQUFjLElBQUksYUFBYSxFQUMvQixVQUFVLElBQUksU0FBUyxHQUN4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7QUFFNUMsTUFBTSxVQUFVLHlCQUF5QixDQUN2QyxNQUFjLEVBQ2QsS0FBd0I7SUFFeEIsSUFBSSxLQUFLLEVBQUUsRUFBRTtRQUNYLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztLQUNwRDtTQUFNO1FBQ0wsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDaEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3JDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBOZ1pvbmUsXG4gIMm1ZGV0ZWN0Q2hhbmdlcyBhcyBkZXRlY3RDaGFuZ2VzLFxuICDJtW1hcmtEaXJ0eSBhcyBtYXJrRGlydHksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBpc0l2eSB9IGZyb20gJy4uL3V0aWxzL2lzLWl2eSc7XG5pbXBvcnQgeyBoYXNab25lIH0gZnJvbSAnLi4vdXRpbHMvaGFzLXpvbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hhbmdlRGV0ZWN0aW9uSGFuZGxlcihcbiAgbmdab25lOiBOZ1pvbmUsXG4gIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuKTogPFQ+KGNvbXBvbmVudD86IFQpID0+IHZvaWQge1xuICBpZiAoaXNJdnkoKSkge1xuICAgIHJldHVybiBoYXNab25lKG5nWm9uZSkgPyBtYXJrRGlydHkgOiBkZXRlY3RDaGFuZ2VzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBoYXNab25lKG5nWm9uZSlcbiAgICAgID8gY2RSZWYubWFya0ZvckNoZWNrLmJpbmQoY2RSZWYpXG4gICAgICA6IGNkUmVmLmRldGVjdENoYW5nZXMuYmluZChjZFJlZik7XG4gIH1cbn1cbiJdfQ==