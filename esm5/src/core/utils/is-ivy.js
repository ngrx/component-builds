import { getGlobalThis } from './get-global-this';
/**
 * @description
 *
 * Determines if the application runs with ivy or not (ViewEngine)
 *
 * @returns {boolean} - true if the application runs with ivy, false if the application runs with ViewEngine
 *
 * @usageNotes
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
 */
export function isIvy() {
    var ng = getGlobalThis().ng;
    // Is the global ng object is unavailable?
    // ng === undefined in Ivy production mode
    // View Engine has the ng object both in development mode and production mode.
    return (ng === undefined ||
        // in case we are in dev mode in ivy
        // `probe` property is available on ng object we use View Engine.
        ng.probe === undefined);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtaXZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQvc3JjL2NvcmUvdXRpbHMvaXMtaXZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0gsTUFBTSxVQUFVLEtBQUs7SUFDbkIsSUFBTSxFQUFFLEdBQVEsYUFBYSxFQUFFLENBQUMsRUFBRSxDQUFDO0lBRW5DLDBDQUEwQztJQUMxQywwQ0FBMEM7SUFDMUMsOEVBQThFO0lBQzlFLE9BQU8sQ0FDTCxFQUFFLEtBQUssU0FBUztRQUNoQixvQ0FBb0M7UUFDcEMsaUVBQWlFO1FBQ2pFLEVBQUUsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUN2QixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldEdsb2JhbFRoaXMgfSBmcm9tICcuL2dldC1nbG9iYWwtdGhpcyc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgYXBwbGljYXRpb24gcnVucyB3aXRoIGl2eSBvciBub3QgKFZpZXdFbmdpbmUpXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IC0gdHJ1ZSBpZiB0aGUgYXBwbGljYXRpb24gcnVucyB3aXRoIGl2eSwgZmFsc2UgaWYgdGhlIGFwcGxpY2F0aW9uIHJ1bnMgd2l0aCBWaWV3RW5naW5lXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBUaGUgZnVuY3Rpb24gY2FuIGJlIGp1c3QgaW1wb3J0ZWQgYW5kIHVzZWQgZXZlcnl3aGVyZS5cbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgaXNJdnkgfSBmcm9tIGB1dGlscy9pcy1pdnlgO1xuICpcbiAqIGNvbnNvbGUubG9nKGlzSXZ5KCkpOyAgLy8gdHJ1ZSBvciBmYWxzZVxuICogYGBgXG4gKlxuICogVGhlIGRldGVybWluYXRpb24gaWYgYW4gYXBwbGljYXRpb24gcnVucyB3aXRoIEl2eSBvciBub3QgaXMgZG9uZSBieSBmb2xsb3dpbmcgdGFibGU6XG4gKlxuICogKipUYWJsZSBmb3IgbmcgZ2xvYmFsIHByZXNlbmNlIGluIFZpZXdFbmdpbmUgYW5kIEl2eSBmb3IgcHJvZC9kZXYgbW9kZXMqKlxuICpcbiAqICB8IHJlbmRlciAgIHwgVmlld0VuZ2luZSB8IFZpZXdFbmdpbmUgfCBJdnkgICAgICAgfCBJdnkgICAgICAgfFxuICogIHwgLS0tLS0tLS0gfCAtLS0tLS0tLS0tIHwgLS0tLS0tLS0tLSB8IC0tLS0tLS0tLSB8IC0tLS0tLS0tICB8XG4gKiAgfCBtb2RlICAgICB8IHByb2QgICAgICAgfCBkZXYgICAgICAgIHwgcHJvZCAgICAgIHwgZGV2ICAgICAgIHxcbiAqICB8IG5nICAgICAgIHwgcHJlc2VudCAgICB8IHByZXNlbnQgICAgfCB1bmRlZmluZWQgfCBwcmVzZW50ICAgfFxuICogIHwgbmcucHJvYmUgfCBwcmVzZW50ICAgIHwgcHJlc2VudCAgICB8IHVuZGVmaW5lZCB8IHVuZGVmaW5lZCB8XG4gKlxuICogID4gU28gZm9yIEl2eSB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IG5nIGlzIHVuZGVmaW5lZCBvcixcbiAqICA+IGluIGNhc2Ugb2YgZGV2IGVudmlyb25tZW50LCBuZy5wcm9iZSBpcyB1bmRlZmluZWRcbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0l2eSgpOiBib29sZWFuIHtcbiAgY29uc3Qgbmc6IGFueSA9IGdldEdsb2JhbFRoaXMoKS5uZztcblxuICAvLyBJcyB0aGUgZ2xvYmFsIG5nIG9iamVjdCBpcyB1bmF2YWlsYWJsZT9cbiAgLy8gbmcgPT09IHVuZGVmaW5lZCBpbiBJdnkgcHJvZHVjdGlvbiBtb2RlXG4gIC8vIFZpZXcgRW5naW5lIGhhcyB0aGUgbmcgb2JqZWN0IGJvdGggaW4gZGV2ZWxvcG1lbnQgbW9kZSBhbmQgcHJvZHVjdGlvbiBtb2RlLlxuICByZXR1cm4gKFxuICAgIG5nID09PSB1bmRlZmluZWQgfHxcbiAgICAvLyBpbiBjYXNlIHdlIGFyZSBpbiBkZXYgbW9kZSBpbiBpdnlcbiAgICAvLyBgcHJvYmVgIHByb3BlcnR5IGlzIGF2YWlsYWJsZSBvbiBuZyBvYmplY3Qgd2UgdXNlIFZpZXcgRW5naW5lLlxuICAgIG5nLnByb2JlID09PSB1bmRlZmluZWRcbiAgKTtcbn1cbiJdfQ==