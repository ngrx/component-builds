import { Observable } from 'rxjs';
type Primitive = string | number | bigint | boolean | symbol | null | undefined;
type ObservableOrPromise<T> = Observable<T> | PromiseLike<T>;
type ObservableDictionary<PO> = Required<{
    [Key in keyof PO]: Observable<unknown>;
}>;
export type PotentialObservableResult<PO, ExtendedResult = never> = PO extends ObservableOrPromise<infer Result> ? Result | ExtendedResult : PO extends Primitive ? PO : keyof PO extends never ? PO : PO extends ObservableDictionary<PO> ? {
    [Key in keyof PO]: PO[Key] extends Observable<infer Value> ? Value : never;
} | ExtendedResult : PO;
export declare function fromPotentialObservable<PO>(potentialObservable: PO): Observable<PotentialObservableResult<PO>>;
export {};
