/**
 * @fileoverview added by tsickle
 * Generated from: src/core/cd-aware/creator_render.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { hasZone } from '../utils';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRvcl9yZW5kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC9zcmMvY29yZS9jZC1hd2FyZS9jcmVhdG9yX3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7QUFFbkMsa0NBR0M7OztJQUZDLDhCQUFlOztJQUNmLDZCQUF5Qjs7Ozs7OztBQUczQixNQUFNLFVBQVUsWUFBWSxDQUFJLE1BQW9COzs7O0lBQ2xELFNBQVMsTUFBTTtRQUNiLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQzdCO2FBQU07WUFDTCxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBoYXNab25lIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlckNvbmZpZyB7XG4gIG5nWm9uZTogTmdab25lO1xuICBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZW5kZXI8VD4oY29uZmlnOiBSZW5kZXJDb25maWcpOiAoKSA9PiB2b2lkIHtcbiAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGlmIChoYXNab25lKGNvbmZpZy5uZ1pvbmUpKSB7XG4gICAgICBjb25maWcuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlbmRlcjtcbn1cbiJdfQ==