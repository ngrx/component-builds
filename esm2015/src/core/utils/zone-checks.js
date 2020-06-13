/**
 * @fileoverview added by tsickle
 * Generated from: src/core/utils/zone-checks.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * isNgZone
 *
 * \@description
 *
 * This function takes any instance of a class and checks
 * if the constructor name is equal to `NgZone`.
 * This means the Angular application that instantiated this service assumes it runs in a ZuneLess environment,
 * and therefor it's change detection will not be triggered by zone related logic.
 *
 * However, keep in mind this does not mean `zone.js` is not present.
 * The environment could still run in ZoneFull mode even if Angular turned it off.
 * Consider the situation of a Angular element configured for ZoneLess
 * environments is used in an Angular application relining on the zone mechanism.
 *
 * @param {?} instance - The instance to check for constructor name of `NgZone`.
 * @return {?} boolean - true if instance is of type `NgZone`.
 *
 */
export function isNgZone(instance) {
    var _a;
    return ((_a = instance === null || instance === void 0 ? void 0 : instance.constructor) === null || _a === void 0 ? void 0 : _a.name) === 'NgZone';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiem9uZS1jaGVja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC9zcmMvY29yZS91dGlscy96b25lLWNoZWNrcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsTUFBTSxVQUFVLFFBQVEsQ0FBQyxRQUFhOztJQUNwQyxPQUFPLE9BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFdBQVcsMENBQUUsSUFBSSxNQUFLLFFBQVEsQ0FBQztBQUNsRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBpc05nWm9uZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgYW55IGluc3RhbmNlIG9mIGEgY2xhc3MgYW5kIGNoZWNrc1xuICogaWYgdGhlIGNvbnN0cnVjdG9yIG5hbWUgaXMgZXF1YWwgdG8gYE5nWm9uZWAuXG4gKiBUaGlzIG1lYW5zIHRoZSBBbmd1bGFyIGFwcGxpY2F0aW9uIHRoYXQgaW5zdGFudGlhdGVkIHRoaXMgc2VydmljZSBhc3N1bWVzIGl0IHJ1bnMgaW4gYSBadW5lTGVzcyBlbnZpcm9ubWVudCxcbiAqIGFuZCB0aGVyZWZvciBpdCdzIGNoYW5nZSBkZXRlY3Rpb24gd2lsbCBub3QgYmUgdHJpZ2dlcmVkIGJ5IHpvbmUgcmVsYXRlZCBsb2dpYy5cbiAqXG4gKiBIb3dldmVyLCBrZWVwIGluIG1pbmQgdGhpcyBkb2VzIG5vdCBtZWFuIGB6b25lLmpzYCBpcyBub3QgcHJlc2VudC5cbiAqIFRoZSBlbnZpcm9ubWVudCBjb3VsZCBzdGlsbCBydW4gaW4gWm9uZUZ1bGwgbW9kZSBldmVuIGlmIEFuZ3VsYXIgdHVybmVkIGl0IG9mZi5cbiAqIENvbnNpZGVyIHRoZSBzaXR1YXRpb24gb2YgYSBBbmd1bGFyIGVsZW1lbnQgY29uZmlndXJlZCBmb3IgWm9uZUxlc3NcbiAqIGVudmlyb25tZW50cyBpcyB1c2VkIGluIGFuIEFuZ3VsYXIgYXBwbGljYXRpb24gcmVsaW5pbmcgb24gdGhlIHpvbmUgbWVjaGFuaXNtLlxuICpcbiAqIEBwYXJhbSBpbnN0YW5jZSAtIFRoZSBpbnN0YW5jZSB0byBjaGVjayBmb3IgY29uc3RydWN0b3IgbmFtZSBvZiBgTmdab25lYC5cbiAqIEByZXR1cm4gYm9vbGVhbiAtIHRydWUgaWYgaW5zdGFuY2UgaXMgb2YgdHlwZSBgTmdab25lYC5cbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc05nWm9uZShpbnN0YW5jZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiBpbnN0YW5jZT8uY29uc3RydWN0b3I/Lm5hbWUgPT09ICdOZ1pvbmUnO1xufVxuIl19