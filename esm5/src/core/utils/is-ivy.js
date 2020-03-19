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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtaXZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9jb21wb25lbnQvc3JjL2NvcmUvdXRpbHMvaXMtaXZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVsRCx5RUFBeUU7QUFDekUsRUFBRTtBQUNGLDJGQUEyRjtBQUMzRiwyRkFBMkY7QUFDM0YsMkZBQTJGO0FBQzNGLDJGQUEyRjtBQUMzRixFQUFFO0FBQ0YsMkRBQTJEO0FBQzNELG9EQUFvRDtBQUVwRCxNQUFNLFVBQVUsS0FBSztJQUNuQixJQUFNLEVBQUUsR0FBUSxhQUFhLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFFbkMsMENBQTBDO0lBQzFDLDBDQUEwQztJQUMxQyw4RUFBOEU7SUFDOUUsT0FBTyxDQUNMLEVBQUUsS0FBSyxTQUFTO1FBQ2hCLG9DQUFvQztRQUNwQyxpRUFBaUU7UUFDakUsRUFBRSxDQUFDLEtBQUssS0FBSyxTQUFTLENBQ3ZCLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0R2xvYmFsVGhpcyB9IGZyb20gJy4vZ2V0LWdsb2JhbC10aGlzJztcblxuLy8gVGFibGUgZm9yIG5nIGdsb2JhbCBwcmVzZW5jZSBpbiBWaWV3RW5naW5lIGFuZCBJdnkgZm9yIHByb2QvZGV2IG1vZGVzOlxuLy9cbi8vIHwgcmVuZGVyICAgICB8ICBWaWV3RW5naW5lICAgIHwgIFZpZXdFbmdpbmUgICAgfCAgICAgIEl2eSAgICAgICAgICB8ICAgICAgSXZ5ICAgICAgICAgIHxcbi8vIHwgbW9kZSAgICAgICB8ICAgICBwcm9kICAgICAgIHwgICAgICBkZXYgICAgICAgfCAgICAgIHByb2QgICAgICAgICB8ICAgICAgZGV2ICAgICAgICAgIHxcbi8vIHwgbmcgICAgICAgICB8ICAgICBwcmVzZW50ICAgIHwgICAgIHByZXNlbnQgICAgfCAgICAgdW5kZWZpbmVkICAgICB8ICAgICBwcmVzZW50ICAgICAgIHxcbi8vIHwgbmcucHJvYmUgICB8ICAgICBwcmVzZW50ICAgIHwgICAgIHByZXNlbnQgICAgfCAgICAgdW5kZWZpbmVkICAgICB8ICAgICB1bmRlZmluZWQgICAgIHxcbi8vXG4vLyBTbyBmb3IgSXZ5IHdlIG5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgbmcgaXMgdW5kZWZpbmVkIG9yLFxuLy8gaW4gY2FzZSBvZiBkZXYgZW52aXJvbm1lbnQsIG5nLnByb2JlIGlzIHVuZGVmaW5lZFxuXG5leHBvcnQgZnVuY3Rpb24gaXNJdnkoKTogYm9vbGVhbiB7XG4gIGNvbnN0IG5nOiBhbnkgPSBnZXRHbG9iYWxUaGlzKCkubmc7XG5cbiAgLy8gSXMgdGhlIGdsb2JhbCBuZyBvYmplY3QgaXMgdW5hdmFpbGFibGU/XG4gIC8vIG5nID09PSB1bmRlZmluZWQgaW4gSXZ5IHByb2R1Y3Rpb24gbW9kZVxuICAvLyBWaWV3IEVuZ2luZSBoYXMgdGhlIG5nIG9iamVjdCBib3RoIGluIGRldmVsb3BtZW50IG1vZGUgYW5kIHByb2R1Y3Rpb24gbW9kZS5cbiAgcmV0dXJuIChcbiAgICBuZyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgLy8gaW4gY2FzZSB3ZSBhcmUgaW4gZGV2IG1vZGUgaW4gaXZ5XG4gICAgLy8gYHByb2JlYCBwcm9wZXJ0eSBpcyBhdmFpbGFibGUgb24gbmcgb2JqZWN0IHdlIHVzZSBWaWV3IEVuZ2luZS5cbiAgICBuZy5wcm9iZSA9PT0gdW5kZWZpbmVkXG4gICk7XG59XG4iXX0=