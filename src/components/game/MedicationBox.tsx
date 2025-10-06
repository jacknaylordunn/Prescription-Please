interface MedicationBoxProps {
  medicationName: string;
  dosage: string;
  count: string;
  isEnlarged?: boolean;
}

export const MedicationBox = ({ 
  medicationName, 
  dosage, 
  count,
  isEnlarged = false 
}: MedicationBoxProps) => {
  // Generate a consistent color based on medication name
  const getBoxColor = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      { bg: '#e8f5e9', border: '#4caf50', text: '#2e7d32', shadow: 'rgba(76, 175, 80, 0.3)' },
      { bg: '#e3f2fd', border: '#2196f3', text: '#1565c0', shadow: 'rgba(33, 150, 243, 0.3)' },
      { bg: '#fff3e0', border: '#ff9800', text: '#e65100', shadow: 'rgba(255, 152, 0, 0.3)' },
      { bg: '#fce4ec', border: '#e91e63', text: '#c2185b', shadow: 'rgba(233, 30, 99, 0.3)' },
      { bg: '#f3e5f5', border: '#9c27b0', text: '#6a1b9a', shadow: 'rgba(156, 39, 176, 0.3)' },
    ];
    return colors[hash % colors.length];
  };

  const boxColor = getBoxColor(medicationName);

  return (
    <div 
      className="pixel-text select-none document-shadow transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl relative animate-fade-in cursor-pointer group"
      style={{ 
        width: "160px",
        height: "100px",
        backgroundColor: boxColor.bg,
        border: `4px solid ${boxColor.border}`,
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: `0 6px 12px ${boxColor.shadow}, inset 0 2px 4px rgba(255,255,255,0.4)`,
        borderRadius: "4px",
        transformStyle: "preserve-3d"
      }}
    >
      {/* Shine effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
          borderRadius: "2px"
        }}
      />

      {/* Brand Strip */}
      <div 
        className="font-bold text-center mb-1 -mx-2 -mt-2 p-1.5"
        style={{ 
          fontSize: "6px", 
          backgroundColor: boxColor.border,
          color: '#fff',
          letterSpacing: "1px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
        }}
      >
        OTC MEDICINE
      </div>

      {/* Medication Name */}
      <div 
        className="font-bold text-center flex-grow flex items-center justify-center transition-transform group-hover:scale-105"
        style={{ 
          fontSize: medicationName.length > 14 ? "10px" : "12px",
          color: boxColor.text,
          lineHeight: "1.2",
          textShadow: "0 1px 2px rgba(255,255,255,0.8)"
        }}
      >
        {medicationName}
      </div>

      {/* Dosage Info */}
      <div 
        className="text-center"
        style={{ 
          fontSize: "8px",
          color: boxColor.text,
          fontWeight: "600"
        }}
      >
        {dosage}
      </div>

      {/* Count */}
      <div 
        className="text-center border-t-2 pt-1.5 -mx-2 -mb-2 px-2 pb-1.5"
        style={{ 
          fontSize: "7px",
          borderColor: boxColor.border,
          backgroundColor: 'rgba(255,255,255,0.6)',
          color: boxColor.text,
          fontWeight: "bold",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
        }}
      >
        {count.includes('ml') || count.includes('tube') ? count.toUpperCase() : `${count} TABLETS`}
      </div>

      {/* Decorative corner marks with staggered animation */}
      <div 
        className="absolute top-1.5 left-1.5 animate-pulse" 
        style={{ 
          fontSize: "10px", 
          color: boxColor.border, 
          fontWeight: "bold",
          animationDelay: "0s",
          animationDuration: "2s"
        }}
      >┌</div>
      <div 
        className="absolute top-1.5 right-1.5 animate-pulse" 
        style={{ 
          fontSize: "10px", 
          color: boxColor.border, 
          fontWeight: "bold",
          animationDelay: "0.5s",
          animationDuration: "2s"
        }}
      >┐</div>
      <div 
        className="absolute bottom-1.5 left-1.5 animate-pulse" 
        style={{ 
          fontSize: "10px", 
          color: boxColor.border, 
          fontWeight: "bold",
          animationDelay: "1s",
          animationDuration: "2s"
        }}
      >└</div>
      <div 
        className="absolute bottom-1.5 right-1.5 animate-pulse" 
        style={{ 
          fontSize: "10px", 
          color: boxColor.border, 
          fontWeight: "bold",
          animationDelay: "1.5s",
          animationDuration: "2s"
        }}
      >┘</div>
      
      {/* Blister pack pattern overlay with subtle animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.15 }}>
        <div className="grid grid-cols-5 gap-1 p-3 h-full">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i}
              className="rounded-full border animate-pulse"
              style={{ 
                borderColor: boxColor.border,
                backgroundColor: 'rgba(255,255,255,0.4)',
                animationDelay: `${i * 0.1}s`,
                animationDuration: "3s"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};