import { Observable, OperatorFunction } from 'rxjs';
export declare type PotentialObservableValue<T> = Observable<T> | Promise<T> | undefined | null;
export declare type Output<T> = Observable<T> | Observable<undefined> | Observable<null>;
export declare function isPromiseGuard<T>(value: any): value is Promise<T>;
export declare function isObservableGuard<T>(potentialObservable: any): potentialObservable is Observable<T>;
export declare function isOperateFnArrayGuard<T>(op: any[]): op is OperatorFunction<T, any>[];
export declare function isStringArrayGuard(op: any[]): op is string[];
export declare function isDefinedGuard<T>(opr: any): opr is T;
export declare function isIterableGuard<T>(obj: any): obj is Array<T>;
