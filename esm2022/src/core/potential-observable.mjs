import { combineLatest, from, isObservable, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
export function fromPotentialObservable(potentialObservable) {
    if (isObservable(potentialObservable)) {
        return potentialObservable;
    }
    if (isObservableDictionary(potentialObservable)) {
        return combineLatest(toDistinctObsDictionary(potentialObservable));
    }
    if (isPromiseLike(potentialObservable)) {
        return from(potentialObservable);
    }
    return new Observable((subscriber) => {
        subscriber.next(potentialObservable);
    });
}
function isPromiseLike(value) {
    return typeof value?.then === 'function';
}
function isObservableDictionary(value) {
    return (isDictionary(value) &&
        Object.keys(value).length > 0 &&
        Object.values(value).every(isObservable));
}
function isDictionary(value) {
    return !!value && typeof value === 'object' && !Array.isArray(value);
}
function toDistinctObsDictionary(obsDictionary) {
    return Object.keys(obsDictionary).reduce((acc, key) => ({
        ...acc,
        [key]: obsDictionary[key].pipe(distinctUntilChanged()),
    }), {});
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG90ZW50aWFsLW9ic2VydmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC9zcmMvY29yZS9wb3RlbnRpYWwtb2JzZXJ2YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBNkJ0RCxNQUFNLFVBQVUsdUJBQXVCLENBQ3JDLG1CQUF1QjtJQUl2QixJQUFJLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1FBQ3JDLE9BQU8sbUJBQTZCLENBQUM7S0FDdEM7SUFFRCxJQUFJLHNCQUFzQixDQUFDLG1CQUFtQixDQUFDLEVBQUU7UUFDL0MsT0FBTyxhQUFhLENBQ2xCLHVCQUF1QixDQUFDLG1CQUFtQixDQUFDLENBQ25DLENBQUM7S0FDYjtJQUVELElBQUksYUFBYSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7UUFDdEMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQVcsQ0FBQztLQUM1QztJQUVELE9BQU8sSUFBSSxVQUFVLENBQUssQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUN2QyxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFXLENBQUM7QUFDZixDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsS0FBYztJQUNuQyxPQUFPLE9BQVEsS0FBOEIsRUFBRSxJQUFJLEtBQUssVUFBVSxDQUFDO0FBQ3JFLENBQUM7QUFFRCxTQUFTLHNCQUFzQixDQUM3QixLQUFjO0lBRWQsT0FBTyxDQUNMLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUM3QixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FDekMsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxLQUFjO0lBQ2xDLE9BQU8sQ0FBQyxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUFFRCxTQUFTLHVCQUF1QixDQUU5QixhQUFpQjtJQUNqQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUN0QyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDYixHQUFHLEdBQUc7UUFDTixDQUFDLEdBQUcsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztLQUN2RCxDQUFDLEVBQ0YsRUFBUSxDQUNULENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgZnJvbSwgaXNPYnNlcnZhYmxlLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxudHlwZSBQcmltaXRpdmUgPSBzdHJpbmcgfCBudW1iZXIgfCBiaWdpbnQgfCBib29sZWFuIHwgc3ltYm9sIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxudHlwZSBPYnNlcnZhYmxlT3JQcm9taXNlPFQ+ID0gT2JzZXJ2YWJsZTxUPiB8IFByb21pc2VMaWtlPFQ+O1xuXG50eXBlIE9ic2VydmFibGVEaWN0aW9uYXJ5PFBPPiA9IFJlcXVpcmVkPHtcbiAgW0tleSBpbiBrZXlvZiBQT106IE9ic2VydmFibGU8dW5rbm93bj47XG59PjtcblxuZXhwb3J0IHR5cGUgUG90ZW50aWFsT2JzZXJ2YWJsZVJlc3VsdDxcbiAgUE8sXG4gIEV4dGVuZGVkUmVzdWx0ID0gbmV2ZXJcbj4gPSBQTyBleHRlbmRzIE9ic2VydmFibGVPclByb21pc2U8aW5mZXIgUmVzdWx0PlxuICA/IFJlc3VsdCB8IEV4dGVuZGVkUmVzdWx0XG4gIDogUE8gZXh0ZW5kcyBQcmltaXRpdmVcbiAgPyBQT1xuICA6IGtleW9mIFBPIGV4dGVuZHMgbmV2ZXJcbiAgPyBQT1xuICA6IFBPIGV4dGVuZHMgT2JzZXJ2YWJsZURpY3Rpb25hcnk8UE8+XG4gID9cbiAgICAgIHwge1xuICAgICAgICAgIFtLZXkgaW4ga2V5b2YgUE9dOiBQT1tLZXldIGV4dGVuZHMgT2JzZXJ2YWJsZTxpbmZlciBWYWx1ZT5cbiAgICAgICAgICAgID8gVmFsdWVcbiAgICAgICAgICAgIDogbmV2ZXI7XG4gICAgICAgIH1cbiAgICAgIHwgRXh0ZW5kZWRSZXN1bHRcbiAgOiBQTztcblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Qb3RlbnRpYWxPYnNlcnZhYmxlPFBPPihcbiAgcG90ZW50aWFsT2JzZXJ2YWJsZTogUE9cbik6IE9ic2VydmFibGU8UG90ZW50aWFsT2JzZXJ2YWJsZVJlc3VsdDxQTz4+IHtcbiAgdHlwZSBSZXN1bHQgPSBSZXR1cm5UeXBlPHR5cGVvZiBmcm9tUG90ZW50aWFsT2JzZXJ2YWJsZTxQTz4+O1xuXG4gIGlmIChpc09ic2VydmFibGUocG90ZW50aWFsT2JzZXJ2YWJsZSkpIHtcbiAgICByZXR1cm4gcG90ZW50aWFsT2JzZXJ2YWJsZSBhcyBSZXN1bHQ7XG4gIH1cblxuICBpZiAoaXNPYnNlcnZhYmxlRGljdGlvbmFyeShwb3RlbnRpYWxPYnNlcnZhYmxlKSkge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdG9EaXN0aW5jdE9ic0RpY3Rpb25hcnkocG90ZW50aWFsT2JzZXJ2YWJsZSlcbiAgICApIGFzIFJlc3VsdDtcbiAgfVxuXG4gIGlmIChpc1Byb21pc2VMaWtlKHBvdGVudGlhbE9ic2VydmFibGUpKSB7XG4gICAgcmV0dXJuIGZyb20ocG90ZW50aWFsT2JzZXJ2YWJsZSkgYXMgUmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPFBPPigoc3Vic2NyaWJlcikgPT4ge1xuICAgIHN1YnNjcmliZXIubmV4dChwb3RlbnRpYWxPYnNlcnZhYmxlKTtcbiAgfSkgYXMgUmVzdWx0O1xufVxuXG5mdW5jdGlvbiBpc1Byb21pc2VMaWtlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgUHJvbWlzZUxpa2U8dW5rbm93bj4ge1xuICByZXR1cm4gdHlwZW9mICh2YWx1ZSBhcyBQcm9taXNlTGlrZTx1bmtub3duPik/LnRoZW4gPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzT2JzZXJ2YWJsZURpY3Rpb25hcnkoXG4gIHZhbHVlOiB1bmtub3duXG4pOiB2YWx1ZSBpcyBSZWNvcmQ8c3RyaW5nLCBPYnNlcnZhYmxlPHVua25vd24+PiB7XG4gIHJldHVybiAoXG4gICAgaXNEaWN0aW9uYXJ5KHZhbHVlKSAmJlxuICAgIE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPiAwICYmXG4gICAgT2JqZWN0LnZhbHVlcyh2YWx1ZSkuZXZlcnkoaXNPYnNlcnZhYmxlKVxuICApO1xufVxuXG5mdW5jdGlvbiBpc0RpY3Rpb25hcnkodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG5mdW5jdGlvbiB0b0Rpc3RpbmN0T2JzRGljdGlvbmFyeTxcbiAgT0QgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBPYnNlcnZhYmxlPHVua25vd24+PlxuPihvYnNEaWN0aW9uYXJ5OiBPRCk6IE9EIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9ic0RpY3Rpb25hcnkpLnJlZHVjZShcbiAgICAoYWNjLCBrZXkpID0+ICh7XG4gICAgICAuLi5hY2MsXG4gICAgICBba2V5XTogb2JzRGljdGlvbmFyeVtrZXldLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSksXG4gICAgfSksXG4gICAge30gYXMgT0RcbiAgKTtcbn1cbiJdfQ==