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
      { bg: '#e8f5e9', border: '#4caf50', text: '#2e7d32' },
      { bg: '#e3f2fd', border: '#2196f3', text: '#1565c0' },
      { bg: '#fff3e0', border: '#ff9800', text: '#e65100' },
      { bg: '#fce4ec', border: '#e91e63', text: '#c2185b' },
      { bg: '#f3e5f5', border: '#9c27b0', text: '#6a1b9a' },
    ];
    return colors[hash % colors.length];
  };

  const boxColor = getBoxColor(medicationName);

  return (
    <div 
      className="pixel-text select-none document-shadow transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-2xl relative animate-fade-in cursor-pointer"
      style={{ 
        width: "140px",
        height: "90px",
        backgroundColor: boxColor.bg,
        border: `4px solid ${boxColor.border}`,
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: `0 4px 8px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.3)`,
      }}
    >
      {/* Brand Strip */}
      <div 
        className="font-bold text-center mb-1 -mx-2 -mt-2 p-1"
        style={{ 
          fontSize: "5px", 
          backgroundColor: boxColor.border,
          color: '#fff',
          letterSpacing: "0.5px"
        }}
      >
        OTC MEDICINE
      </div>

      {/* Medication Name */}
      <div 
        className="font-bold text-center flex-grow flex items-center justify-center"
        style={{ 
          fontSize: "11px",
          color: boxColor.text,
          lineHeight: "1.1"
        }}
      >
        {medicationName}
      </div>

      {/* Dosage Info */}
      <div 
        className="text-center"
        style={{ 
          fontSize: "7px",
          color: boxColor.text,
          fontWeight: "600"
        }}
      >
        {dosage}
      </div>

      {/* Count */}
      <div 
        className="text-center border-t-2 pt-1 -mx-2 -mb-2 px-2 pb-1"
        style={{ 
          fontSize: "6px",
          borderColor: boxColor.border,
          backgroundColor: 'rgba(255,255,255,0.5)',
          color: boxColor.text,
          fontWeight: "bold"
        }}
      >
        {count.includes('ml') || count.includes('tube') ? count.toUpperCase() : `${count} TABLETS`}
      </div>

      {/* Decorative corner marks with animation */}
      <div className="absolute top-1 left-1 animate-pulse" style={{ fontSize: "8px", color: boxColor.border, fontWeight: "bold" }}>┌</div>
      <div className="absolute top-1 right-1 animate-pulse" style={{ fontSize: "8px", color: boxColor.border, fontWeight: "bold" }}>┐</div>
      <div className="absolute bottom-1 left-1 animate-pulse" style={{ fontSize: "8px", color: boxColor.border, fontWeight: "bold" }}>└</div>
      <div className="absolute bottom-1 right-1 animate-pulse" style={{ fontSize: "8px", color: boxColor.border, fontWeight: "bold" }}>┘</div>
      
      {/* Blister pack pattern overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.1 }}>
        <div className="grid grid-cols-4 gap-1 p-2 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i}
              className="rounded-full border"
              style={{ 
                borderColor: boxColor.border,
                backgroundColor: 'rgba(255,255,255,0.3)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};