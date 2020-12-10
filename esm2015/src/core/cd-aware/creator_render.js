/**
 * @fileoverview added by tsickle
 * Generated from: src/core/cd-aware/creator_render.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { hasZone } from '../utils/has-zone';
/**
 * @record
 */
export function RenderConfig() { }
if (false) {
    /** @type {?} */
    RenderConfig.prototype.ngZone;
    /** @type {?} */
    RenderConfig.prototype.cdRef;
}
/**
 * @template T
 * @param {?} config
 * @return {?}
 */
export function createRender(config) {
    /**
     * @return {?}
     */
    function render() {
        if (hasZone(config.ngZone)) {
            config.cdRef.markForCheck();
        }
        else {
            config.cdRef.detectChanges();
        }
    }
    return render;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRvcl9yZW5kZXIuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQvIiwic291cmNlcyI6WyJzcmMvY29yZS9jZC1hd2FyZS9jcmVhdG9yX3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQUU1QyxrQ0FHQzs7O0lBRkMsOEJBQWU7O0lBQ2YsNkJBQXlCOzs7Ozs7O0FBRzNCLE1BQU0sVUFBVSxZQUFZLENBQUksTUFBb0I7Ozs7SUFDbEQsU0FBUyxNQUFNO1FBQ2IsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDN0I7YUFBTTtZQUNMLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgaGFzWm9uZSB9IGZyb20gJy4uL3V0aWxzL2hhcy16b25lJztcblxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJDb25maWcge1xuICBuZ1pvbmU6IE5nWm9uZTtcbiAgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVuZGVyPFQ+KGNvbmZpZzogUmVuZGVyQ29uZmlnKTogKCkgPT4gdm9pZCB7XG4gIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBpZiAoaGFzWm9uZShjb25maWcubmdab25lKSkge1xuICAgICAgY29uZmlnLmNkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZW5kZXI7XG59XG4iXX0=