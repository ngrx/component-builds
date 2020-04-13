/**
 * @description
 *
 * Determines if the application uses `NgZone` or `NgNoopZone` as ngZone service instance.
 *
 * @param {NgZone} z - The zone service to check.
 * @returns {boolean} - true if the application runs with `NgZone`, false if the application runs with `NgNoopZone`
 *
 * @usageNotes
 *
 * The function can be just imported and used everywhere.
 *
 * ```ts
 * import { hasZone } from `utils/has-zone`;
 *
 * console.log(hasZone());
 * ```
 */
export function hasZone(z) {
    return z.constructor.name !== 'NoopNgZone';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzLXpvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC9zcmMvY29yZS91dGlscy9oYXMtem9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLFVBQVUsT0FBTyxDQUFDLENBQVM7SUFDL0IsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxZQUFZLENBQUM7QUFDN0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIERldGVybWluZXMgaWYgdGhlIGFwcGxpY2F0aW9uIHVzZXMgYE5nWm9uZWAgb3IgYE5nTm9vcFpvbmVgIGFzIG5nWm9uZSBzZXJ2aWNlIGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7Tmdab25lfSB6IC0gVGhlIHpvbmUgc2VydmljZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSAtIHRydWUgaWYgdGhlIGFwcGxpY2F0aW9uIHJ1bnMgd2l0aCBgTmdab25lYCwgZmFsc2UgaWYgdGhlIGFwcGxpY2F0aW9uIHJ1bnMgd2l0aCBgTmdOb29wWm9uZWBcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIFRoZSBmdW5jdGlvbiBjYW4gYmUganVzdCBpbXBvcnRlZCBhbmQgdXNlZCBldmVyeXdoZXJlLlxuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBoYXNab25lIH0gZnJvbSBgdXRpbHMvaGFzLXpvbmVgO1xuICpcbiAqIGNvbnNvbGUubG9nKGhhc1pvbmUoKSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc1pvbmUoejogTmdab25lKTogYm9vbGVhbiB7XG4gIHJldHVybiB6LmNvbnN0cnVjdG9yLm5hbWUgIT09ICdOb29wTmdab25lJztcbn1cbiJdfQ==