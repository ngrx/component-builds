/**
 * @fileoverview added by tsickle
 * Generated from: src/core/utils/is-ivy.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getGlobalThis } from './get-global-this';
/**
 * \@description
 *
 * Determines if the application runs with ivy or not (ViewEngine)
 *
 * \@usageNotes
 *
 * The function can be just imported and used everywhere.
 *
 * ```ts
 * import { isIvy } from `utils/is-ivy`;
 *
 * console.log(isIvy());  // true or false
 * ```
 *
 * The determination if an application runs with Ivy or not is done by following table:
 *
 * **Table for ng global presence in ViewEngine and Ivy for prod/dev modes**
 *
 *  | render   | ViewEngine | ViewEngine | Ivy       | Ivy       |
 *  | -------- | ---------- | ---------- | --------- | --------  |
 *  | mode     | prod       | dev        | prod      | dev       |
 *  | ng       | present    | present    | undefined | present   |
 *  | ng.probe | present    | present    | undefined | undefined |
 *
 *  > So for Ivy we need to make sure that ng is undefined or,
 *  > in case of dev environment, ng.probe is undefined
 *
 * @return {?}
 */
export function isIvy() {
    /** @type {?} */
    const ng = getGlobalThis().ng;
    // Is the global ng object is unavailable?
    // ng === undefined in Ivy production mode
    // View Engine has the ng object both in development mode and production mode.
    return (ng === undefined ||
        // in case we are in dev mode in ivy
        // `probe` property is available on ng object we use View Engine.
        ng.probe === undefined);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtaXZ5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ncngvY29tcG9uZW50LyIsInNvdXJjZXMiOlsic3JjL2NvcmUvdXRpbHMvaXMtaXZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0JsRCxNQUFNLFVBQVUsS0FBSzs7VUFDYixFQUFFLEdBQVEsYUFBYSxFQUFFLENBQUMsRUFBRTtJQUVsQywwQ0FBMEM7SUFDMUMsMENBQTBDO0lBQzFDLDhFQUE4RTtJQUM5RSxPQUFPLENBQ0wsRUFBRSxLQUFLLFNBQVM7UUFDaEIsb0NBQW9DO1FBQ3BDLGlFQUFpRTtRQUNqRSxFQUFFLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FDdkIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRHbG9iYWxUaGlzIH0gZnJvbSAnLi9nZXQtZ2xvYmFsLXRoaXMnO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIERldGVybWluZXMgaWYgdGhlIGFwcGxpY2F0aW9uIHJ1bnMgd2l0aCBpdnkgb3Igbm90IChWaWV3RW5naW5lKVxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKlxuICogVGhlIGZ1bmN0aW9uIGNhbiBiZSBqdXN0IGltcG9ydGVkIGFuZCB1c2VkIGV2ZXJ5d2hlcmUuXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IGlzSXZ5IH0gZnJvbSBgdXRpbHMvaXMtaXZ5YDtcbiAqXG4gKiBjb25zb2xlLmxvZyhpc0l2eSgpKTsgIC8vIHRydWUgb3IgZmFsc2VcbiAqIGBgYFxuICpcbiAqIFRoZSBkZXRlcm1pbmF0aW9uIGlmIGFuIGFwcGxpY2F0aW9uIHJ1bnMgd2l0aCBJdnkgb3Igbm90IGlzIGRvbmUgYnkgZm9sbG93aW5nIHRhYmxlOlxuICpcbiAqICoqVGFibGUgZm9yIG5nIGdsb2JhbCBwcmVzZW5jZSBpbiBWaWV3RW5naW5lIGFuZCBJdnkgZm9yIHByb2QvZGV2IG1vZGVzKipcbiAqXG4gKiAgfCByZW5kZXIgICB8IFZpZXdFbmdpbmUgfCBWaWV3RW5naW5lIHwgSXZ5ICAgICAgIHwgSXZ5ICAgICAgIHxcbiAqICB8IC0tLS0tLS0tIHwgLS0tLS0tLS0tLSB8IC0tLS0tLS0tLS0gfCAtLS0tLS0tLS0gfCAtLS0tLS0tLSAgfFxuICogIHwgbW9kZSAgICAgfCBwcm9kICAgICAgIHwgZGV2ICAgICAgICB8IHByb2QgICAgICB8IGRldiAgICAgICB8XG4gKiAgfCBuZyAgICAgICB8IHByZXNlbnQgICAgfCBwcmVzZW50ICAgIHwgdW5kZWZpbmVkIHwgcHJlc2VudCAgIHxcbiAqICB8IG5nLnByb2JlIHwgcHJlc2VudCAgICB8IHByZXNlbnQgICAgfCB1bmRlZmluZWQgfCB1bmRlZmluZWQgfFxuICpcbiAqICA+IFNvIGZvciBJdnkgd2UgbmVlZCB0byBtYWtlIHN1cmUgdGhhdCBuZyBpcyB1bmRlZmluZWQgb3IsXG4gKiAgPiBpbiBjYXNlIG9mIGRldiBlbnZpcm9ubWVudCwgbmcucHJvYmUgaXMgdW5kZWZpbmVkXG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJdnkoKTogYm9vbGVhbiB7XG4gIGNvbnN0IG5nOiBhbnkgPSBnZXRHbG9iYWxUaGlzKCkubmc7XG5cbiAgLy8gSXMgdGhlIGdsb2JhbCBuZyBvYmplY3QgaXMgdW5hdmFpbGFibGU/XG4gIC8vIG5nID09PSB1bmRlZmluZWQgaW4gSXZ5IHByb2R1Y3Rpb24gbW9kZVxuICAvLyBWaWV3IEVuZ2luZSBoYXMgdGhlIG5nIG9iamVjdCBib3RoIGluIGRldmVsb3BtZW50IG1vZGUgYW5kIHByb2R1Y3Rpb24gbW9kZS5cbiAgcmV0dXJuIChcbiAgICBuZyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgLy8gaW4gY2FzZSB3ZSBhcmUgaW4gZGV2IG1vZGUgaW4gaXZ5XG4gICAgLy8gYHByb2JlYCBwcm9wZXJ0eSBpcyBhdmFpbGFibGUgb24gbmcgb2JqZWN0IHdlIHVzZSBWaWV3IEVuZ2luZS5cbiAgICBuZy5wcm9iZSA9PT0gdW5kZWZpbmVkXG4gICk7XG59XG4iXX0=