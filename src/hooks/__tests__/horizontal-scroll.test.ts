import { renderHook, act } from '@testing-library/react';
import useHorizontalScroll from '../horizontal-scroll';

const createMockDiv = (offsetLeft: number, initialScrollLeft: number) => {
  let _scrollLeft = initialScrollLeft;
  return {
    offsetLeft,
    get scrollLeft() {
      return _scrollLeft;
    },
    set scrollLeft(val: number) {
      _scrollLeft = val;
    },
  } as unknown as HTMLDivElement;
};

describe('useHorizontalScroll', () => {
  it('returns handler functions and a scrollRef', () => {
    const { result } = renderHook(() => useHorizontalScroll());
    expect(result.current.scrollRef).toBeDefined();
    expect(typeof result.current.handleMouseDown).toBe('function');
    expect(typeof result.current.handleMouseMove).toBe('function');
    expect(typeof result.current.handleTouchStart).toBe('function');
    expect(typeof result.current.handleTouchMove).toBe('function');
    expect(typeof result.current.handleMouseUp).toBe('function');
    expect(typeof result.current.handleTouchEnd).toBe('function');
  });

  it('handleMouseDown sets up drag state', () => {
    const { result } = renderHook(() => useHorizontalScroll());
    const mockDiv = createMockDiv(10, 0);
    (result.current.scrollRef as any).current = mockDiv;

    act(() => {
      result.current.handleMouseDown({
        pageX: 50,
        preventDefault: jest.fn(),
      } as any);
    });

    act(() => {
      result.current.handleMouseMove({
        pageX: 80,
        preventDefault: jest.fn(),
      } as any);
    });

    expect(mockDiv.scrollLeft).not.toBe(0);
  });

  it('handleTouchStart and handleTouchMove update scrollLeft', () => {
    const { result } = renderHook(() => useHorizontalScroll());
    const mockDiv = createMockDiv(10, 0);
    (result.current.scrollRef as any).current = mockDiv;

    act(() => {
      result.current.handleTouchStart({
        touches: [{ pageX: 50 }],
      } as any);
    });

    const before = mockDiv.scrollLeft;

    act(() => {
      result.current.handleTouchMove({
        touches: [{ pageX: 100 }],
      } as any);
    });

    expect(mockDiv.scrollLeft).not.toBe(before);
  });

  it('handleMouseUp stops dragging', () => {
    const { result } = renderHook(() => useHorizontalScroll());
    const mockDiv = createMockDiv(10, 0);
    (result.current.scrollRef as any).current = mockDiv;

    act(() => {
      result.current.handleMouseDown({
        pageX: 50,
        preventDefault: jest.fn(),
      } as any);
    });

    act(() => {
      result.current.handleMouseUp();
    });

    const scrollAfterEnd = mockDiv.scrollLeft;

    act(() => {
      result.current.handleMouseMove({
        pageX: 200,
        preventDefault: jest.fn(),
      } as any);
    });

    expect(mockDiv.scrollLeft).toBe(scrollAfterEnd);
  });
});
