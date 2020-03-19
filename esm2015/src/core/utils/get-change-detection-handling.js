/**
 * @fileoverview added by tsickle
 * Generated from: modules/component/src/core/utils/get-change-detection-handling.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ɵdetectChanges as detectChanges, ɵmarkDirty as markDirty, } from '@angular/core';
import { isIvy } from './is-ivy';
import { hasZone } from './has-zone';
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
/**
 * @param {?} ngZone
 * @param {?} cdRef
 * @return {?}
 */
export function getDetectChanges(ngZone, cdRef) {
    if (isIvy()) {
        return !hasZone(ngZone) ? detectChanges : markDirty;
    }
    else {
        return hasZone(ngZone)
            ? cdRef.markForCheck.bind(cdRef)
            : cdRef.detectChanges.bind(cdRef);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWNoYW5nZS1kZXRlY3Rpb24taGFuZGxpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC9zcmMvY29yZS91dGlscy9nZXQtY2hhbmdlLWRldGVjdGlvbi1oYW5kbGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFHTCxjQUFjLElBQUksYUFBYSxFQUMvQixVQUFVLElBQUksU0FBUyxHQUN4QixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7Ozs7OztBQUVyQyxNQUFNLFVBQVUseUJBQXlCLENBQ3ZDLE1BQWMsRUFDZCxLQUF3QjtJQUV4QixJQUFJLEtBQUssRUFBRSxFQUFFO1FBQ1gsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO0tBQ3BEO1NBQU07UUFDTCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDcEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNoQyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDckM7QUFDSCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsZ0JBQWdCLENBQzlCLE1BQWMsRUFDZCxLQUF3QjtJQUV4QixJQUFJLEtBQUssRUFBRSxFQUFFO1FBQ1gsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7S0FDckQ7U0FBTTtRQUNMLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNwQixDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNyQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgTmdab25lLFxuICDJtWRldGVjdENoYW5nZXMgYXMgZGV0ZWN0Q2hhbmdlcyxcbiAgybVtYXJrRGlydHkgYXMgbWFya0RpcnR5LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgaXNJdnkgfSBmcm9tICcuL2lzLWl2eSc7XG5pbXBvcnQgeyBoYXNab25lIH0gZnJvbSAnLi9oYXMtem9uZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGFuZ2VEZXRlY3Rpb25IYW5kbGVyKFxuICBuZ1pvbmU6IE5nWm9uZSxcbiAgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmXG4pOiA8VD4oY29tcG9uZW50PzogVCkgPT4gdm9pZCB7XG4gIGlmIChpc0l2eSgpKSB7XG4gICAgcmV0dXJuIGhhc1pvbmUobmdab25lKSA/IG1hcmtEaXJ0eSA6IGRldGVjdENoYW5nZXM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGhhc1pvbmUobmdab25lKVxuICAgICAgPyBjZFJlZi5tYXJrRm9yQ2hlY2suYmluZChjZFJlZilcbiAgICAgIDogY2RSZWYuZGV0ZWN0Q2hhbmdlcy5iaW5kKGNkUmVmKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGV0ZWN0Q2hhbmdlcyhcbiAgbmdab25lOiBOZ1pvbmUsXG4gIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuKTogPFQ+KGNvbXBvbmVudD86IFQpID0+IHZvaWQge1xuICBpZiAoaXNJdnkoKSkge1xuICAgIHJldHVybiAhaGFzWm9uZShuZ1pvbmUpID8gZGV0ZWN0Q2hhbmdlcyA6IG1hcmtEaXJ0eTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaGFzWm9uZShuZ1pvbmUpXG4gICAgICA/IGNkUmVmLm1hcmtGb3JDaGVjay5iaW5kKGNkUmVmKVxuICAgICAgOiBjZFJlZi5kZXRlY3RDaGFuZ2VzLmJpbmQoY2RSZWYpO1xuICB9XG59XG4iXX0=