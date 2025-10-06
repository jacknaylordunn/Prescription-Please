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
      className="pixel-text select-none document-shadow transition-transform hover:scale-105 relative"
      style={{ 
        width: "140px",
        height: "90px",
        backgroundColor: boxColor.bg,
        border: `4px solid ${boxColor.border}`,
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
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
        {count} TABLETS
      </div>

      {/* Decorative corner marks */}
      <div className="absolute top-1 left-1" style={{ fontSize: "8px", color: boxColor.border }}>┌</div>
      <div className="absolute top-1 right-1" style={{ fontSize: "8px", color: boxColor.border }}>┐</div>
      <div className="absolute bottom-1 left-1" style={{ fontSize: "8px", color: boxColor.border }}>└</div>
      <div className="absolute bottom-1 right-1" style={{ fontSize: "8px", color: boxColor.border }}>┘</div>
    </div>
  );
};