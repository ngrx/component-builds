import { Observable } from 'rxjs';
import { RenderEvent } from './models';
import { RenderEventHandlers } from './handlers';
import { PotentialObservableResult } from '../potential-observable';
export interface RenderEventManager<PO> {
    nextPotentialObservable(potentialObservable: PO): void;
    handlePotentialObservableChanges(): Observable<RenderEvent<PotentialObservableResult<PO>>>;
}
export declare function createRenderEventManager<PO>(handlers: RenderEventHandlers<PotentialObservableResult<PO>>): RenderEventManager<PO>;
