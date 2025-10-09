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
  // Generate a consistent modern color scheme based on medication name
  const getBoxColor = (name: string) => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      { 
        bg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
        accent: '#3b82f6',
        text: '#1e40af',
        label: '#eff6ff'
      },
      { 
        bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', 
        accent: '#f59e0b',
        text: '#92400e',
        label: '#fffbeb'
      },
      { 
        bg: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', 
        accent: '#ec4899',
        text: '#9f1239',
        label: '#fdf2f8'
      },
      { 
        bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', 
        accent: '#22c55e',
        text: '#166534',
        label: '#f7fee7'
      },
      { 
        bg: 'linear-gradient(135deg, #fae8ff 0%, #f5d0fe 100%)', 
        accent: '#a855f7',
        text: '#6b21a8',
        label: '#faf5ff'
      },
    ];
    return colors[hash % colors.length];
  };

  const boxColor = getBoxColor(medicationName);

  return (
    <div 
      className="pixel-text select-none transition-all duration-300 hover:scale-105 hover:-translate-y-2 relative animate-fade-in cursor-pointer group overflow-hidden"
      style={{ 
        width: "160px",
        height: "100px",
        background: boxColor.bg,
        border: `3px solid ${boxColor.accent}`,
        borderRadius: "8px",
        boxShadow: `0 8px 16px rgba(0,0,0,0.15), 0 4px 6px rgba(0,0,0,0.1)`,
        transformStyle: "preserve-3d"
      }}
    >
      {/* Shine effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
          borderRadius: "5px"
        }}
      />

      {/* Brand Strip - Modern design */}
      <div 
        className="absolute top-0 left-0 right-0 font-bold text-center py-1 rounded-t-md"
        style={{ 
          fontSize: "6px", 
          background: boxColor.accent,
          color: '#fff',
          letterSpacing: "1.2px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
        }}
      >
        OTC MEDICATION
      </div>

      {/* Content container with proper padding */}
      <div className="absolute" style={{ top: "22px", bottom: "18px", left: "8px", right: "8px", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
        {/* Medication Name */}
        <div 
          className="font-bold text-center transition-transform group-hover:scale-105 px-1"
          style={{ 
            fontSize: medicationName.length > 14 ? "10px" : medicationName.length > 10 ? "11px" : "12px",
            color: boxColor.text,
            lineHeight: "1.2",
            fontWeight: "800",
            wordBreak: "break-word",
            overflow: "hidden"
          }}
        >
          {medicationName}
        </div>

        {/* Dosage Info with modern badge */}
        <div 
          className="text-center px-2 py-0.5 rounded-md mx-auto"
          style={{ 
            fontSize: "7.5px",
            color: boxColor.text,
            fontWeight: "700",
            backgroundColor: boxColor.label,
            border: `1.5px solid ${boxColor.accent}`,
            maxWidth: "fit-content",
            whiteSpace: "nowrap"
          }}
        >
          {dosage}
        </div>
      </div>

      {/* Count - Modern footer */}
      <div 
        className="absolute bottom-0 left-0 right-0 text-center overflow-hidden"
        style={{ 
          fontSize: "6px",
          background: `linear-gradient(to bottom, ${boxColor.label}, rgba(255,255,255,0.95))`,
          borderTop: `2px solid ${boxColor.accent}`,
          color: boxColor.text,
          fontWeight: "bold",
          letterSpacing: "0.2px",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
          padding: "3px 4px",
          lineHeight: "1"
        }}
      >
        {count.includes('ml') || count.includes('tube') ? count.toUpperCase() : `${count} TABLETS`}
      </div>

      {/* Modern corner accent marks */}
      <div 
        className="absolute top-6 left-1.5 w-2.5 h-2.5 border-l-2 border-t-2 opacity-30"
        style={{ borderColor: boxColor.accent }}
      />
      <div 
        className="absolute top-6 right-1.5 w-2.5 h-2.5 border-r-2 border-t-2 opacity-30"
        style={{ borderColor: boxColor.accent }}
      />
      <div 
        className="absolute bottom-5 left-1.5 w-2.5 h-2.5 border-l-2 border-b-2 opacity-30"
        style={{ borderColor: boxColor.accent }}
      />
      <div 
        className="absolute bottom-5 right-1.5 w-2.5 h-2.5 border-r-2 border-b-2 opacity-30"
        style={{ borderColor: boxColor.accent }}
      />
    </div>
  );
};