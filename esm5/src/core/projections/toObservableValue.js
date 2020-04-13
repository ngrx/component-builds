import { from, of } from 'rxjs';
/**
 * @description
 *
 * This operator ensures the passed value is of the right type for `CdAware`.
 * It takes `null`, `undefined` or `Observable<T>` and returns `Observable<null, undefined, T>`.
 * Every other value throws an error.
 *
 * @param {Observable<T> | Promise<T> | undefined | null} p -
 * @returns {Observable<T| undefined | null>} - proper observable values
 *
 * @usageNotes
 *
 * ```ts
 * import { toObservableValue } from `projections/toObservableValue`;
 *
 * const toObservableValue()
 *  .pipe(switchAll())
 *  .subscribe((n) => console.log(n););
 * ```
 */
export function toObservableValue(p) {
    return p == null ? of(p) : from(p);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9PYnNlcnZhYmxlVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC9zcmMvY29yZS9wcm9qZWN0aW9ucy90b09ic2VydmFibGVWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBK0IsTUFBTSxNQUFNLENBQUM7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQy9CLENBQXdDO0lBRXhDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb20sIG9mLCBPYnNlcnZhYmxlLCBPYnNlcnZhYmxlSW5wdXQgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBUaGlzIG9wZXJhdG9yIGVuc3VyZXMgdGhlIHBhc3NlZCB2YWx1ZSBpcyBvZiB0aGUgcmlnaHQgdHlwZSBmb3IgYENkQXdhcmVgLlxuICogSXQgdGFrZXMgYG51bGxgLCBgdW5kZWZpbmVkYCBvciBgT2JzZXJ2YWJsZTxUPmAgYW5kIHJldHVybnMgYE9ic2VydmFibGU8bnVsbCwgdW5kZWZpbmVkLCBUPmAuXG4gKiBFdmVyeSBvdGhlciB2YWx1ZSB0aHJvd3MgYW4gZXJyb3IuXG4gKlxuICogQHBhcmFtIHtPYnNlcnZhYmxlPFQ+IHwgUHJvbWlzZTxUPiB8IHVuZGVmaW5lZCB8IG51bGx9IHAgLVxuICogQHJldHVybnMge09ic2VydmFibGU8VHwgdW5kZWZpbmVkIHwgbnVsbD59IC0gcHJvcGVyIG9ic2VydmFibGUgdmFsdWVzXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgdG9PYnNlcnZhYmxlVmFsdWUgfSBmcm9tIGBwcm9qZWN0aW9ucy90b09ic2VydmFibGVWYWx1ZWA7XG4gKlxuICogY29uc3QgdG9PYnNlcnZhYmxlVmFsdWUoKVxuICogIC5waXBlKHN3aXRjaEFsbCgpKVxuICogIC5zdWJzY3JpYmUoKG4pID0+IGNvbnNvbGUubG9nKG4pOyk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvT2JzZXJ2YWJsZVZhbHVlPFQ+KFxuICBwOiBPYnNlcnZhYmxlSW5wdXQ8VD4gfCB1bmRlZmluZWQgfCBudWxsXG4pOiBPYnNlcnZhYmxlPFQgfCB1bmRlZmluZWQgfCBudWxsPiB7XG4gIHJldHVybiBwID09IG51bGwgPyBvZihwKSA6IGZyb20ocCk7XG59XG4iXX0=