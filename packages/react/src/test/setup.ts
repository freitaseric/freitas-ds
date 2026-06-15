import "@testing-library/jest-dom/vitest"

class ResizeObserverMock implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserverMock
}

if (!window.PointerEvent) {
  window.PointerEvent = MouseEvent as unknown as typeof PointerEvent
}

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}

if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false
}

if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {}
}

if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {}
}
