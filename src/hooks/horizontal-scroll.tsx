import { useRef, useCallback } from 'react';

const useHorizontalScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleStart = useCallback((x: number) => {
    isDragging.current = true;
    startX.current = x - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  }, []);

  const handleMove = useCallback((x: number) => {
    if (!isDragging.current) return;
    const currentX = x - (scrollRef.current?.offsetLeft || 0);
    const walk = (currentX - startX.current) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    }
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      handleStart(e.pageX);
    },
    [handleStart]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      handleMove(e.pageX);
    },
    [handleMove]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      handleStart(e.touches[0].pageX);
    },
    [handleStart]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      handleMove(e.touches[0].pageX);
    },
    [handleMove]
  );

  const handleEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  return {
    scrollRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp: handleEnd,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd: handleEnd,
  };
};

export default useHorizontalScroll;
