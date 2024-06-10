import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

interface VirtualScrollProps {
  itemCount: number;
  renderItem: (index: number) => React.ReactNode;
  itemSize: number;
  height: number;
}

const VirtualScroll: React.FC<VirtualScrollProps> = ({
  itemCount,
  renderItem,
  itemSize,
  height,
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleScroll = () => {
    if (containerRef.current && listRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  useEffect(() => {
    if (containerRef.current && listRef.current) {
      containerRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  const totalHeight = itemCount * itemSize;

  return (
    <div
      ref={containerRef}
      style={{ overflowY: 'auto', height }}
      onScroll={handleScroll}
    >
      <ul ref={listRef} style={{ height: `${totalHeight}px`, paddingTop: `${scrollTop}px` }}>
        {Array.from({ length: itemCount }).map((_, index) => (
          <li key={index} style={{ height: `${itemSize}px` }}>
            {renderItem(index)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VirtualScroll;
