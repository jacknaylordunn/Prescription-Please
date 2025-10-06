import { useState, useRef, useEffect } from "react";

interface DraggableItemProps {
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  zIndexBase?: number;
  isEnlarged?: boolean;
  onDoubleClick?: () => void;
}

export const DraggableItem = ({ 
  children, 
  initialX = 100, 
  initialY = 100, 
  zIndexBase = 10,
  isEnlarged = false,
  onDoubleClick 
}: DraggableItemProps) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [zIndex, setZIndex] = useState(zIndexBase);
  const dragRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - offsetRef.current.x,
          y: e.clientY - offsetRef.current.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragRef.current) {
      const rect = dragRef.current.getBoundingClientRect();
      offsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setIsDragging(true);
      setZIndex(100); // Bring to front
    }
  };

  return (
    <div
      ref={dragRef}
      className="absolute draggable transition-transform duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isDragging ? 100 : isEnlarged ? 90 : zIndex,
        transform: isEnlarged ? 'scale(1.5)' : 'scale(1)',
        transformOrigin: 'center center',
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </div>
  );
};
