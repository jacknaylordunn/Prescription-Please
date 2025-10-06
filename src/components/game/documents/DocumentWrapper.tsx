import { ReactNode } from "react";

interface DocumentWrapperProps {
  children: ReactNode;
  scale?: number;
}

export const DocumentWrapper = ({ children, scale = 1 }: DocumentWrapperProps) => {
  return (
    <div style={{ 
      filter: `contrast(1.15) brightness(1.05)`,
      transform: `scale(${scale})`,
      transformOrigin: 'top left'
    }}>
      {children}
    </div>
  );
};
