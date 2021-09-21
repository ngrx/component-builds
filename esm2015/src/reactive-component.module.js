import { NgModule } from '@angular/core';
import { LetDirective } from './let/let.directive';
import { PushPipe } from './push/push.pipe';
const DECLARATIONS = [LetDirective, PushPipe];
const EXPORTS = [DECLARATIONS];
export class ReactiveComponentModule {
}
/** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
ReactiveComponentModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DECLARATIONS],
                exports: [EXPORTS],
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RpdmUtY29tcG9uZW50Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvY29tcG9uZW50L3NyYy9yZWFjdGl2ZS1jb21wb25lbnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU1QyxNQUFNLFlBQVksR0FBRyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM5QyxNQUFNLE9BQU8sR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBTS9CLE1BQU0sT0FBTyx1QkFBdUI7Ozs7WUFKbkMsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDNUIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTGV0RGlyZWN0aXZlIH0gZnJvbSAnLi9sZXQvbGV0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQdXNoUGlwZSB9IGZyb20gJy4vcHVzaC9wdXNoLnBpcGUnO1xuXG5jb25zdCBERUNMQVJBVElPTlMgPSBbTGV0RGlyZWN0aXZlLCBQdXNoUGlwZV07XG5jb25zdCBFWFBPUlRTID0gW0RFQ0xBUkFUSU9OU107XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0RFQ0xBUkFUSU9OU10sXG4gIGV4cG9ydHM6IFtFWFBPUlRTXSxcbn0pXG5leHBvcnQgY2xhc3MgUmVhY3RpdmVDb21wb25lbnRNb2R1bGUge31cbiJdfQ==