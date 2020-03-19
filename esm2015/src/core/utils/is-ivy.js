/**
 * @fileoverview added by tsickle
 * Generated from: modules/component/src/core/utils/is-ivy.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getGlobalThis } from './get-global-this';
// Table for ng global presence in ViewEngine and Ivy for prod/dev modes:
//
// | render     |  ViewEngine    |  ViewEngine    |      Ivy          |      Ivy          |
// | mode       |     prod       |      dev       |      prod         |      dev          |
// | ng         |     present    |     present    |     undefined     |     present       |
// | ng.probe   |     present    |     present    |     undefined     |     undefined     |
//
// So for Ivy we need to make sure that ng is undefined or,
// in case of dev environment, ng.probe is undefined
/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtaXZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQvc3JjL2NvcmUvdXRpbHMvaXMtaXZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7Ozs7Ozs7O0FBWWxELE1BQU0sVUFBVSxLQUFLOztVQUNiLEVBQUUsR0FBUSxhQUFhLEVBQUUsQ0FBQyxFQUFFO0lBRWxDLDBDQUEwQztJQUMxQywwQ0FBMEM7SUFDMUMsOEVBQThFO0lBQzlFLE9BQU8sQ0FDTCxFQUFFLEtBQUssU0FBUztRQUNoQixvQ0FBb0M7UUFDcEMsaUVBQWlFO1FBQ2pFLEVBQUUsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUN2QixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEdsb2JhbFRoaXMgfSBmcm9tICcuL2dldC1nbG9iYWwtdGhpcyc7XG5cbi8vIFRhYmxlIGZvciBuZyBnbG9iYWwgcHJlc2VuY2UgaW4gVmlld0VuZ2luZSBhbmQgSXZ5IGZvciBwcm9kL2RldiBtb2Rlczpcbi8vXG4vLyB8IHJlbmRlciAgICAgfCAgVmlld0VuZ2luZSAgICB8ICBWaWV3RW5naW5lICAgIHwgICAgICBJdnkgICAgICAgICAgfCAgICAgIEl2eSAgICAgICAgICB8XG4vLyB8IG1vZGUgICAgICAgfCAgICAgcHJvZCAgICAgICB8ICAgICAgZGV2ICAgICAgIHwgICAgICBwcm9kICAgICAgICAgfCAgICAgIGRldiAgICAgICAgICB8XG4vLyB8IG5nICAgICAgICAgfCAgICAgcHJlc2VudCAgICB8ICAgICBwcmVzZW50ICAgIHwgICAgIHVuZGVmaW5lZCAgICAgfCAgICAgcHJlc2VudCAgICAgICB8XG4vLyB8IG5nLnByb2JlICAgfCAgICAgcHJlc2VudCAgICB8ICAgICBwcmVzZW50ICAgIHwgICAgIHVuZGVmaW5lZCAgICAgfCAgICAgdW5kZWZpbmVkICAgICB8XG4vL1xuLy8gU28gZm9yIEl2eSB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IG5nIGlzIHVuZGVmaW5lZCBvcixcbi8vIGluIGNhc2Ugb2YgZGV2IGVudmlyb25tZW50LCBuZy5wcm9iZSBpcyB1bmRlZmluZWRcblxuZXhwb3J0IGZ1bmN0aW9uIGlzSXZ5KCk6IGJvb2xlYW4ge1xuICBjb25zdCBuZzogYW55ID0gZ2V0R2xvYmFsVGhpcygpLm5nO1xuXG4gIC8vIElzIHRoZSBnbG9iYWwgbmcgb2JqZWN0IGlzIHVuYXZhaWxhYmxlP1xuICAvLyBuZyA9PT0gdW5kZWZpbmVkIGluIEl2eSBwcm9kdWN0aW9uIG1vZGVcbiAgLy8gVmlldyBFbmdpbmUgaGFzIHRoZSBuZyBvYmplY3QgYm90aCBpbiBkZXZlbG9wbWVudCBtb2RlIGFuZCBwcm9kdWN0aW9uIG1vZGUuXG4gIHJldHVybiAoXG4gICAgbmcgPT09IHVuZGVmaW5lZCB8fFxuICAgIC8vIGluIGNhc2Ugd2UgYXJlIGluIGRldiBtb2RlIGluIGl2eVxuICAgIC8vIGBwcm9iZWAgcHJvcGVydHkgaXMgYXZhaWxhYmxlIG9uIG5nIG9iamVjdCB3ZSB1c2UgVmlldyBFbmdpbmUuXG4gICAgbmcucHJvYmUgPT09IHVuZGVmaW5lZFxuICApO1xufVxuIl19