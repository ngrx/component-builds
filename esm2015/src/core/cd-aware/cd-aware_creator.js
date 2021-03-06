import { EMPTY, from, isObservable, Subject, } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap, } from 'rxjs/operators';
/**
 * class CdAware
 *
 * @description
 * This abstract class holds all the shared logic for the push pipe and the let directive
 * responsible for change detection
 * If you extend this class you need to implement how the update of the rendered value happens.
 * Also custom behaviour is something you need to implement in the extending class
 */
export function createCdAware(cfg) {
    const potentialObservablesSubject = new Subject();
    const observablesFromTemplate$ = potentialObservablesSubject.pipe(distinctUntilChanged());
    const rendering$ = observablesFromTemplate$.pipe(
    // Compose the observables from the template and the strategy
    switchMap((observable$) => {
        // If the passed observable is:
        // - undefined - No value set
        // - null - null passed directly or no value set over `async` pipe
        if (observable$ == null) {
            // Update the value to render_creator with null/undefined
            cfg.updateViewContextObserver.next(observable$);
            // Render the view
            cfg.render();
            // Stop further processing
            return EMPTY;
        }
        const ob$ = isObservable(observable$)
            ? observable$
            : from(observable$);
        // If a new Observable arrives, reset the value to render_creator
        // We do this because we don't know when the next value arrives and want to get rid of the old value
        cfg.resetContextObserver.next();
        cfg.render();
        return ob$.pipe(distinctUntilChanged(), tap(cfg.updateViewContextObserver), tap(() => cfg.render()), catchError((e) => {
            return EMPTY;
        }));
    }));
    return {
        nextPotentialObservable(value) {
            potentialObservablesSubject.next(value);
        },
        subscribe() {
            return rendering$.subscribe();
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2QtYXdhcmVfY3JlYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9jb3JlL2NkLWF3YXJlL2NkLWF3YXJlX2NyZWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLEtBQUssRUFDTCxJQUFJLEVBQ0osWUFBWSxFQUlaLE9BQU8sR0FHUixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLFNBQVMsRUFDVCxHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQztBQVF4Qjs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxhQUFhLENBQUksR0FJaEM7SUFDQyxNQUFNLDJCQUEyQixHQUU3QixJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQ2xCLE1BQU0sd0JBQXdCLEdBRTFCLDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFFN0QsTUFBTSxVQUFVLEdBQUcsd0JBQXdCLENBQUMsSUFBSTtJQUM5Qyw2REFBNkQ7SUFDN0QsU0FBUyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDeEIsK0JBQStCO1FBQy9CLDZCQUE2QjtRQUM3QixrRUFBa0U7UUFDbEUsSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO1lBQ3ZCLHlEQUF5RDtZQUN6RCxHQUFHLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLFdBQWtCLENBQUMsQ0FBQztZQUN2RCxrQkFBa0I7WUFDbEIsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2IsMEJBQTBCO1lBQzFCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxNQUFNLEdBQUcsR0FBa0IsWUFBWSxDQUFDLFdBQVcsQ0FBQztZQUNsRCxDQUFDLENBQUUsV0FBNkI7WUFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV0QixpRUFBaUU7UUFDakUsb0dBQW9HO1FBQ3BHLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFYixPQUFRLEdBQXFCLENBQUMsSUFBSSxDQUNoQyxvQkFBb0IsRUFBRSxFQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLEVBQ2xDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFDdkIsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDZixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBRUYsT0FBTztRQUNMLHVCQUF1QixDQUNyQixLQUE0QztZQUU1QywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNELFNBQVM7WUFDUCxPQUFPLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQyxDQUFDO0tBQytCLENBQUM7QUFDckMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEVNUFRZLFxuICBmcm9tLFxuICBpc09ic2VydmFibGUsXG4gIE5leHRPYnNlcnZlcixcbiAgT2JzZXJ2YWJsZSxcbiAgT2JzZXJ2YWJsZUlucHV0LFxuICBTdWJqZWN0LFxuICBTdWJzY3JpYmFibGUsXG4gIFN1YnNjcmlwdGlvbixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBjYXRjaEVycm9yLFxuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgc3dpdGNoTWFwLFxuICB0YXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBDZEF3YXJlPFU+IGV4dGVuZHMgU3Vic2NyaWJhYmxlPFU+IHtcbiAgbmV4dFBvdGVudGlhbE9ic2VydmFibGU6IChcbiAgICB2YWx1ZTogT2JzZXJ2YWJsZUlucHV0PGFueT4gfCBudWxsIHwgdW5kZWZpbmVkXG4gICkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBjbGFzcyBDZEF3YXJlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGlzIGFic3RyYWN0IGNsYXNzIGhvbGRzIGFsbCB0aGUgc2hhcmVkIGxvZ2ljIGZvciB0aGUgcHVzaCBwaXBlIGFuZCB0aGUgbGV0IGRpcmVjdGl2ZVxuICogcmVzcG9uc2libGUgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAqIElmIHlvdSBleHRlbmQgdGhpcyBjbGFzcyB5b3UgbmVlZCB0byBpbXBsZW1lbnQgaG93IHRoZSB1cGRhdGUgb2YgdGhlIHJlbmRlcmVkIHZhbHVlIGhhcHBlbnMuXG4gKiBBbHNvIGN1c3RvbSBiZWhhdmlvdXIgaXMgc29tZXRoaW5nIHlvdSBuZWVkIHRvIGltcGxlbWVudCBpbiB0aGUgZXh0ZW5kaW5nIGNsYXNzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDZEF3YXJlPFU+KGNmZzoge1xuICByZW5kZXI6ICgpID0+IHZvaWQ7XG4gIHJlc2V0Q29udGV4dE9ic2VydmVyOiBOZXh0T2JzZXJ2ZXI8dm9pZD47XG4gIHVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXI6IE5leHRPYnNlcnZlcjxVIHwgdW5kZWZpbmVkIHwgbnVsbD47XG59KTogQ2RBd2FyZTxVIHwgdW5kZWZpbmVkIHwgbnVsbD4ge1xuICBjb25zdCBwb3RlbnRpYWxPYnNlcnZhYmxlc1N1YmplY3Q6IFN1YmplY3Q8XG4gICAgT2JzZXJ2YWJsZUlucHV0PFU+IHwgdW5kZWZpbmVkIHwgbnVsbFxuICA+ID0gbmV3IFN1YmplY3QoKTtcbiAgY29uc3Qgb2JzZXJ2YWJsZXNGcm9tVGVtcGxhdGUkOiBPYnNlcnZhYmxlPFxuICAgIE9ic2VydmFibGVJbnB1dDxVPiB8IHVuZGVmaW5lZCB8IG51bGxcbiAgPiA9IHBvdGVudGlhbE9ic2VydmFibGVzU3ViamVjdC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gIGNvbnN0IHJlbmRlcmluZyQgPSBvYnNlcnZhYmxlc0Zyb21UZW1wbGF0ZSQucGlwZShcbiAgICAvLyBDb21wb3NlIHRoZSBvYnNlcnZhYmxlcyBmcm9tIHRoZSB0ZW1wbGF0ZSBhbmQgdGhlIHN0cmF0ZWd5XG4gICAgc3dpdGNoTWFwKChvYnNlcnZhYmxlJCkgPT4ge1xuICAgICAgLy8gSWYgdGhlIHBhc3NlZCBvYnNlcnZhYmxlIGlzOlxuICAgICAgLy8gLSB1bmRlZmluZWQgLSBObyB2YWx1ZSBzZXRcbiAgICAgIC8vIC0gbnVsbCAtIG51bGwgcGFzc2VkIGRpcmVjdGx5IG9yIG5vIHZhbHVlIHNldCBvdmVyIGBhc3luY2AgcGlwZVxuICAgICAgaWYgKG9ic2VydmFibGUkID09IG51bGwpIHtcbiAgICAgICAgLy8gVXBkYXRlIHRoZSB2YWx1ZSB0byByZW5kZXJfY3JlYXRvciB3aXRoIG51bGwvdW5kZWZpbmVkXG4gICAgICAgIGNmZy51cGRhdGVWaWV3Q29udGV4dE9ic2VydmVyLm5leHQob2JzZXJ2YWJsZSQgYXMgYW55KTtcbiAgICAgICAgLy8gUmVuZGVyIHRoZSB2aWV3XG4gICAgICAgIGNmZy5yZW5kZXIoKTtcbiAgICAgICAgLy8gU3RvcCBmdXJ0aGVyIHByb2Nlc3NpbmdcbiAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBvYiQ6IE9ic2VydmFibGU8VT4gPSBpc09ic2VydmFibGUob2JzZXJ2YWJsZSQpXG4gICAgICAgID8gKG9ic2VydmFibGUkIGFzIE9ic2VydmFibGU8VT4pXG4gICAgICAgIDogZnJvbShvYnNlcnZhYmxlJCk7XG5cbiAgICAgIC8vIElmIGEgbmV3IE9ic2VydmFibGUgYXJyaXZlcywgcmVzZXQgdGhlIHZhbHVlIHRvIHJlbmRlcl9jcmVhdG9yXG4gICAgICAvLyBXZSBkbyB0aGlzIGJlY2F1c2Ugd2UgZG9uJ3Qga25vdyB3aGVuIHRoZSBuZXh0IHZhbHVlIGFycml2ZXMgYW5kIHdhbnQgdG8gZ2V0IHJpZCBvZiB0aGUgb2xkIHZhbHVlXG4gICAgICBjZmcucmVzZXRDb250ZXh0T2JzZXJ2ZXIubmV4dCgpO1xuICAgICAgY2ZnLnJlbmRlcigpO1xuXG4gICAgICByZXR1cm4gKG9iJCBhcyBPYnNlcnZhYmxlPFU+KS5waXBlKFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICB0YXAoY2ZnLnVwZGF0ZVZpZXdDb250ZXh0T2JzZXJ2ZXIpLFxuICAgICAgICB0YXAoKCkgPT4gY2ZnLnJlbmRlcigpKSxcbiAgICAgICAgY2F0Y2hFcnJvcigoZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSlcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIG5leHRQb3RlbnRpYWxPYnNlcnZhYmxlKFxuICAgICAgdmFsdWU6IE9ic2VydmFibGVJbnB1dDxVPiB8IHVuZGVmaW5lZCB8IG51bGxcbiAgICApOiB2b2lkIHtcbiAgICAgIHBvdGVudGlhbE9ic2VydmFibGVzU3ViamVjdC5uZXh0KHZhbHVlKTtcbiAgICB9LFxuICAgIHN1YnNjcmliZSgpOiBTdWJzY3JpcHRpb24ge1xuICAgICAgcmV0dXJuIHJlbmRlcmluZyQuc3Vic2NyaWJlKCk7XG4gICAgfSxcbiAgfSBhcyBDZEF3YXJlPFUgfCB1bmRlZmluZWQgfCBudWxsPjtcbn1cbiJdfQ==