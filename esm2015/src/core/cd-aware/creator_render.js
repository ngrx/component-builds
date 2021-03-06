import { hasZone } from '../utils/has-zone';
export function createRender(config) {
    function render() {
        if (hasZone(config.ngZone)) {
            config.cdRef.markForCheck();
        }
        else {
            config.cdRef.detectChanges();
        }
    }
    return render;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRvcl9yZW5kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2NvbXBvbmVudC9zcmMvY29yZS9jZC1hd2FyZS9jcmVhdG9yX3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFPNUMsTUFBTSxVQUFVLFlBQVksQ0FBSSxNQUFvQjtJQUNsRCxTQUFTLE1BQU07UUFDYixJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUM3QjthQUFNO1lBQ0wsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBoYXNab25lIH0gZnJvbSAnLi4vdXRpbHMvaGFzLXpvbmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlbmRlckNvbmZpZyB7XG4gIG5nWm9uZTogTmdab25lO1xuICBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZW5kZXI8VD4oY29uZmlnOiBSZW5kZXJDb25maWcpOiAoKSA9PiB2b2lkIHtcbiAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGlmIChoYXNab25lKGNvbmZpZy5uZ1pvbmUpKSB7XG4gICAgICBjb25maWcuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlbmRlcjtcbn1cbiJdfQ==