/**
 * @fileoverview added by tsickle
 * Generated from: modules/component/src/core/utils/is-ivy.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getGlobalThis } from './get-global-this';
/**
 * \@description
 *
 * Determines if the application runs with ivy or not (ViewEngine)
 *
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtaXZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQvc3JjL2NvcmUvdXRpbHMvaXMtaXZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlDbEQsTUFBTSxVQUFVLEtBQUs7O1VBQ2IsRUFBRSxHQUFRLGFBQWEsRUFBRSxDQUFDLEVBQUU7SUFFbEMsMENBQTBDO0lBQzFDLDBDQUEwQztJQUMxQyw4RUFBOEU7SUFDOUUsT0FBTyxDQUNMLEVBQUUsS0FBSyxTQUFTO1FBQ2hCLG9DQUFvQztRQUNwQyxpRUFBaUU7UUFDakUsRUFBRSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQ3ZCLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0R2xvYmFsVGhpcyB9IGZyb20gJy4vZ2V0LWdsb2JhbC10aGlzJztcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBhcHBsaWNhdGlvbiBydW5zIHdpdGggaXZ5IG9yIG5vdCAoVmlld0VuZ2luZSlcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSB0cnVlIGlmIHRoZSBhcHBsaWNhdGlvbiBydW5zIHdpdGggaXZ5LCBmYWxzZSBpZiB0aGUgYXBwbGljYXRpb24gcnVucyB3aXRoIFZpZXdFbmdpbmVcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqIFRoZSBmdW5jdGlvbiBjYW4gYmUganVzdCBpbXBvcnRlZCBhbmQgdXNlZCBldmVyeXdoZXJlLlxuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBpc0l2eSB9IGZyb20gYHV0aWxzL2lzLWl2eWA7XG4gKlxuICogY29uc29sZS5sb2coaXNJdnkoKSk7ICAvLyB0cnVlIG9yIGZhbHNlXG4gKiBgYGBcbiAqXG4gKiBUaGUgZGV0ZXJtaW5hdGlvbiBpZiBhbiBhcHBsaWNhdGlvbiBydW5zIHdpdGggSXZ5IG9yIG5vdCBpcyBkb25lIGJ5IGZvbGxvd2luZyB0YWJsZTpcbiAqXG4gKiAqKlRhYmxlIGZvciBuZyBnbG9iYWwgcHJlc2VuY2UgaW4gVmlld0VuZ2luZSBhbmQgSXZ5IGZvciBwcm9kL2RldiBtb2RlcyoqXG4gKlxuICogIHwgcmVuZGVyICAgfCBWaWV3RW5naW5lIHwgVmlld0VuZ2luZSB8IEl2eSAgICAgICB8IEl2eSAgICAgICB8XG4gKiAgfCAtLS0tLS0tLSB8IC0tLS0tLS0tLS0gfCAtLS0tLS0tLS0tIHwgLS0tLS0tLS0tIHwgLS0tLS0tLS0gIHxcbiAqICB8IG1vZGUgICAgIHwgcHJvZCAgICAgICB8IGRldiAgICAgICAgfCBwcm9kICAgICAgfCBkZXYgICAgICAgfFxuICogIHwgbmcgICAgICAgfCBwcmVzZW50ICAgIHwgcHJlc2VudCAgICB8IHVuZGVmaW5lZCB8IHByZXNlbnQgICB8XG4gKiAgfCBuZy5wcm9iZSB8IHByZXNlbnQgICAgfCBwcmVzZW50ICAgIHwgdW5kZWZpbmVkIHwgdW5kZWZpbmVkIHxcbiAqXG4gKiAgPiBTbyBmb3IgSXZ5IHdlIG5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgbmcgaXMgdW5kZWZpbmVkIG9yLFxuICogID4gaW4gY2FzZSBvZiBkZXYgZW52aXJvbm1lbnQsIG5nLnByb2JlIGlzIHVuZGVmaW5lZFxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSXZ5KCk6IGJvb2xlYW4ge1xuICBjb25zdCBuZzogYW55ID0gZ2V0R2xvYmFsVGhpcygpLm5nO1xuXG4gIC8vIElzIHRoZSBnbG9iYWwgbmcgb2JqZWN0IGlzIHVuYXZhaWxhYmxlP1xuICAvLyBuZyA9PT0gdW5kZWZpbmVkIGluIEl2eSBwcm9kdWN0aW9uIG1vZGVcbiAgLy8gVmlldyBFbmdpbmUgaGFzIHRoZSBuZyBvYmplY3QgYm90aCBpbiBkZXZlbG9wbWVudCBtb2RlIGFuZCBwcm9kdWN0aW9uIG1vZGUuXG4gIHJldHVybiAoXG4gICAgbmcgPT09IHVuZGVmaW5lZCB8fFxuICAgIC8vIGluIGNhc2Ugd2UgYXJlIGluIGRldiBtb2RlIGluIGl2eVxuICAgIC8vIGBwcm9iZWAgcHJvcGVydHkgaXMgYXZhaWxhYmxlIG9uIG5nIG9iamVjdCB3ZSB1c2UgVmlldyBFbmdpbmUuXG4gICAgbmcucHJvYmUgPT09IHVuZGVmaW5lZFxuICApO1xufVxuIl19