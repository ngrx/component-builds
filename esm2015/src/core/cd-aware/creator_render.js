/**
 * @fileoverview added by tsickle
 * Generated from: src/core/cd-aware/creator_render.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isNgZone } from '../utils';
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
        if (isNgZone(config.ngZone)) {
            config.cdRef.markForCheck();
        }
        else {
            config.cdRef.detectChanges();
        }
    }
    return render;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRvcl9yZW5kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC9zcmMvY29yZS9jZC1hd2FyZS9jcmVhdG9yX3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7QUFFcEMsa0NBR0M7OztJQUZDLDhCQUFlOztJQUNmLDZCQUF5Qjs7Ozs7OztBQUczQixNQUFNLFVBQVUsWUFBWSxDQUFJLE1BQW9COzs7O0lBQ2xELFNBQVMsTUFBTTtRQUNiLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzdCO2FBQU07WUFDTCxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc05nWm9uZSB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJDb25maWcge1xuICBuZ1pvbmU6IE5nWm9uZTtcbiAgY2RSZWY6IENoYW5nZURldGVjdG9yUmVmO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVuZGVyPFQ+KGNvbmZpZzogUmVuZGVyQ29uZmlnKTogKCkgPT4gdm9pZCB7XG4gIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBpZiAoaXNOZ1pvbmUoY29uZmlnLm5nWm9uZSkpIHtcbiAgICAgIGNvbmZpZy5jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVuZGVyO1xufVxuIl19