/**
 * @fileoverview added by tsickle
 * Generated from: src/core/utils/get-global-this.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@description
 *
 * A fallback for the new `globalThis` reference.
 *
 *  It should be used to replace `window` due to different environments in:
 *  - SSR (Server Side Rendering)
 *  - Tests
 *  - Browser
 *
 * @return {?} - A reference to globalThis. `window` in the Browser.
 */
export function getGlobalThis() {
    return (/** @type {?} */ ((((/** @type {?} */ (globalThis))) || ((/** @type {?} */ (self))) || ((/** @type {?} */ (window))))));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWdsb2JhbC10aGlzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5ncngvY29tcG9uZW50LyIsInNvdXJjZXMiOlsic3JjL2NvcmUvdXRpbHMvZ2V0LWdsb2JhbC10aGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsTUFBTSxVQUFVLGFBQWE7SUFDM0IsT0FBTyxtQkFBQSxDQUFDLENBQUMsbUJBQUEsVUFBVSxFQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLElBQUksQ0FBQyxtQkFBQSxNQUFNLEVBQU8sQ0FBQyxDQUFDLEVBQU8sQ0FBQztBQUMxRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBBIGZhbGxiYWNrIGZvciB0aGUgbmV3IGBnbG9iYWxUaGlzYCByZWZlcmVuY2UuXG4gKlxuICogIEl0IHNob3VsZCBiZSB1c2VkIHRvIHJlcGxhY2UgYHdpbmRvd2AgZHVlIHRvIGRpZmZlcmVudCBlbnZpcm9ubWVudHMgaW46XG4gKiAgLSBTU1IgKFNlcnZlciBTaWRlIFJlbmRlcmluZylcbiAqICAtIFRlc3RzXG4gKiAgLSBCcm93c2VyXG4gKlxuICogIEByZXR1cm4gLSBBIHJlZmVyZW5jZSB0byBnbG9iYWxUaGlzLiBgd2luZG93YCBpbiB0aGUgQnJvd3Nlci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEdsb2JhbFRoaXMoKTogYW55IHtcbiAgcmV0dXJuICgoZ2xvYmFsVGhpcyBhcyBhbnkpIHx8IChzZWxmIGFzIGFueSkgfHwgKHdpbmRvdyBhcyBhbnkpKSBhcyBhbnk7XG59XG4iXX0=