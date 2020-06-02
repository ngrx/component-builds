/**
 * @fileoverview added by tsickle
 * Generated from: src/core/utils/has-zone.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@description
 *
 * Determines if the application uses `NgZone` or `NgNoopZone` as ngZone service instance.
 *
 * The function can be just imported and used everywhere.
 *
 * ```ts
 * import { hasZone } from `utils/has-zone`;
 *
 * console.log(hasZone());
 * ```
 * @param {?} z
 * @return {?}
 */
export function hasZone(z) {
    return z.constructor.name !== 'NoopNgZone';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzLXpvbmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdyeC9jb21wb25lbnQvIiwic291cmNlcyI6WyJzcmMvY29yZS91dGlscy9oYXMtem9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBLE1BQU0sVUFBVSxPQUFPLENBQUMsQ0FBUztJQUMvQixPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQztBQUM3QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgYXBwbGljYXRpb24gdXNlcyBgTmdab25lYCBvciBgTmdOb29wWm9uZWAgYXMgbmdab25lIHNlcnZpY2UgaW5zdGFuY2UuXG4gKlxuICogVGhlIGZ1bmN0aW9uIGNhbiBiZSBqdXN0IGltcG9ydGVkIGFuZCB1c2VkIGV2ZXJ5d2hlcmUuXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IGhhc1pvbmUgfSBmcm9tIGB1dGlscy9oYXMtem9uZWA7XG4gKlxuICogY29uc29sZS5sb2coaGFzWm9uZSgpKTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzWm9uZSh6OiBOZ1pvbmUpOiBib29sZWFuIHtcbiAgcmV0dXJuIHouY29uc3RydWN0b3IubmFtZSAhPT0gJ05vb3BOZ1pvbmUnO1xufVxuIl19