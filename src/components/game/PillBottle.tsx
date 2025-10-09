interface PillBottleProps {
  medicationName: string;
  dosage: string;
  quantity: string;
  isEnlarged?: boolean;
}

export const PillBottle = ({ 
  medicationName, 
  dosage, 
  quantity,
  isEnlarged = false 
}: PillBottleProps) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB');

  return (
    <div 
      className="pixel-text select-none transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in cursor-pointer group"
      style={{ 
        width: "140px",
        height: "180px",
        position: "relative",
        filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.2))"
      }}
    >
      {/* Bottle Cap with modern design */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 transition-transform group-hover:scale-110 group-hover:-translate-y-1 duration-300"
        style={{
          width: "52px",
          height: "22px",
          background: "linear-gradient(to bottom, #fff 0%, #f1f5f9 100%)",
          border: "3px solid #475569",
          borderBottom: "none",
          borderRadius: "8px 8px 0 0",
          boxShadow: "inset 0 2px 4px rgba(255,255,255,0.9), 0 4px 6px rgba(0,0,0,0.25)"
        }}
      >
        {/* Cap ridges for grip - modern style */}
        <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-around px-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ 
              width: "2px", 
              height: "100%", 
              background: "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.05))",
              borderRadius: "1px"
            }} />
          ))}
        </div>
        {/* Safety seal indicator */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1"
          style={{
            backgroundColor: "#ef4444",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3)"
          }}
        />
      </div>

      {/* Bottle Body with modern amber glass effect */}
      <div 
        className="absolute top-5 overflow-hidden"
        style={{
          width: "140px",
          height: "165px",
          background: "linear-gradient(135deg, rgba(255, 200, 150, 0.92) 0%, rgba(240, 180, 120, 0.88) 100%)",
          border: "3px solid #92400e",
          borderRadius: "12px",
          padding: "12px 10px 10px 10px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          boxShadow: "inset -6px 0 12px rgba(255,255,255,0.5), inset 6px 0 12px rgba(139, 69, 19, 0.2), 0 6px 12px rgba(0,0,0,0.25)"
        }}
      >
        {/* Glass highlight - realistic effect */}
        <div 
          className="absolute top-8 left-3 w-10 h-32 rounded-full pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 100%)",
            filter: "blur(6px)",
            transform: "rotate(-5deg)"
          }}
        />
        
        {/* Label Background - Modern pharmaceutical label */}
        <div 
          className="relative flex-grow bg-white rounded-lg overflow-hidden"
          style={{
            border: "2px solid #1e293b",
            padding: "6px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}
        >
          {/* Pharmacy Header with modern design */}
          <div 
            className="text-center pb-1 mb-1.5 rounded-md"
            style={{ 
              fontSize: "6px", 
              color: '#1e293b',
              fontWeight: "bold",
              background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
              padding: "2px 4px",
              letterSpacing: "1px",
              border: "1px solid #cbd5e1"
            }}
          >
            OVER THE COUNTER
          </div>

          {/* Medication Name */}
          <div 
            className="font-bold text-center mb-1.5"
            style={{ 
              fontSize: medicationName.length > 12 ? "9px" : "10px",
              color: '#1e293b',
              lineHeight: "1.2",
              fontWeight: "800"
            }}
          >
            {medicationName}
          </div>

          {/* Dosage with modern badge */}
          <div 
            className="text-center py-1 mb-1.5 rounded-md mx-auto"
            style={{ 
              fontSize: "7px",
              color: '#475569',
              fontWeight: "700",
              backgroundColor: '#f8fafc',
              border: "1.5px solid #cbd5e1",
              maxWidth: "fit-content",
              padding: "2px 8px"
            }}
          >
            {dosage}
          </div>

          {/* Quantity and Date - Modern grid */}
          <div 
            className="text-center mb-1.5" 
            style={{ fontSize: "6px", color: '#475569' }}
          >
            <div className="bg-slate-50 rounded px-1.5 py-0.5 border border-slate-200 inline-block">
              <span className="font-bold text-slate-700">Contains:</span> {quantity}
            </div>
          </div>

          {/* Usage instructions - OTC style */}
          <div 
            className="text-center rounded-md"
            style={{ 
              fontSize: "5px", 
              color: '#1e40af',
              fontWeight: "bold",
              padding: "3px 4px",
              background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
              border: "1.5px solid #3b82f6",
              lineHeight: "1.2"
            }}
          >
            ℹ READ INSTRUCTIONS BEFORE USE
          </div>
        </div>
      </div>
    </div>
  );
};