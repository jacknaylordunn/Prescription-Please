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
      className="pixel-text select-none transition-all duration-300 hover:scale-105 hover:-translate-y-2 relative animate-fade-in cursor-pointer group"
      style={{ 
        width: "160px",
        height: "100px",
        background: boxColor.bg,
        border: `3px solid ${boxColor.accent}`,
        borderRadius: "8px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
        className="absolute top-0 left-0 right-0 font-bold text-center -mx-[3px] -mt-[3px] py-1.5 rounded-t-md"
        style={{ 
          fontSize: "7px", 
          background: boxColor.accent,
          color: '#fff',
          letterSpacing: "1.5px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
        }}
      >
        OTC MEDICATION
      </div>

      {/* Medication Name */}
      <div 
        className="font-bold text-center mt-6 transition-transform group-hover:scale-105"
        style={{ 
          fontSize: medicationName.length > 14 ? "11px" : "13px",
          color: boxColor.text,
          lineHeight: "1.3",
          fontWeight: "800"
        }}
      >
        {medicationName}
      </div>

      {/* Dosage Info with modern badge */}
      <div 
        className="text-center px-2 py-1 rounded-md mx-auto"
        style={{ 
          fontSize: "9px",
          color: boxColor.text,
          fontWeight: "700",
          backgroundColor: boxColor.label,
          border: `1.5px solid ${boxColor.accent}`,
          maxWidth: "fit-content"
        }}
      >
        {dosage}
      </div>

      {/* Count - Modern footer */}
      <div 
        className="text-center py-1.5 rounded-b-md"
        style={{ 
          fontSize: "7px",
          background: `linear-gradient(to bottom, ${boxColor.label}, rgba(255,255,255,0.95))`,
          borderTop: `2px solid ${boxColor.accent}`,
          color: boxColor.text,
          fontWeight: "bold",
          letterSpacing: "0.3px",
          marginLeft: "-10px",
          marginRight: "-10px",
          marginBottom: "-10px"
        }}
      >
        {count.includes('ml') || count.includes('tube') ? count.toUpperCase() : `${count} TABLETS`}
      </div>

      {/* Modern corner accent marks */}
      <div 
        className="absolute top-8 left-2 w-3 h-3 border-l-2 border-t-2 opacity-30"
        style={{ borderColor: boxColor.accent }}
      />
      <div 
        className="absolute top-8 right-2 w-3 h-3 border-r-2 border-t-2 opacity-30"
        style={{ borderColor: boxColor.accent }}
      />
      <div 
        className="absolute bottom-10 left-2 w-3 h-3 border-l-2 border-b-2 opacity-30"
        style={{ borderColor: boxColor.accent }}
      />
      <div 
        className="absolute bottom-10 right-2 w-3 h-3 border-r-2 border-b-2 opacity-30"
        style={{ borderColor: boxColor.accent }}
      />
    </div>
  );
};