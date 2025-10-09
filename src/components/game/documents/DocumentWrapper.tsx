import { ReactNode } from "react";

interface DocumentWrapperProps {
  children: ReactNode;
  scale?: number;
}

export const DocumentWrapper = ({ children, scale = 1 }: DocumentWrapperProps) => {
  // Scale down on mobile/tablet
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
  
  const responsiveScale = isMobile ? scale * 0.65 : isTablet ? scale * 0.8 : scale;
  
  return (
    <div style={{ 
      filter: `contrast(1.15) brightness(1.05)`,
      transform: `scale(${responsiveScale})`,
      transformOrigin: 'top left'
    }}>
      {children}
    </div>
  );
};
