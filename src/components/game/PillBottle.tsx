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
      className="pixel-text select-none document-shadow transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:rotate-1 animate-fade-in cursor-pointer"
      style={{ 
        width: "140px",
        height: "180px",
        position: "relative",
        filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.25))"
      }}
    >
      {/* Bottle Cap with shine */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 transition-transform hover:scale-105"
        style={{
          width: "50px",
          height: "20px",
          backgroundColor: "#fff",
          border: "3px solid #333",
          borderBottom: "none",
          borderRadius: "6px 6px 0 0",
          boxShadow: "inset 0 2px 4px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.2)"
        }}
      >
        <div 
          className="absolute top-1 left-1/2 -translate-x-1/2"
          style={{
            width: "32px",
            height: "6px",
            backgroundColor: "#666",
            borderRadius: "2px",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)"
          }}
        />
        {/* Cap ridges for grip */}
        <div className="absolute top-0 left-0 right-0 flex justify-around px-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ width: "2px", height: "20px", backgroundColor: "rgba(0,0,0,0.1)" }} />
          ))}
        </div>
      </div>

      {/* Bottle Body with glass effect */}
      <div 
        className="absolute top-5"
        style={{
          width: "140px",
          height: "165px",
          backgroundColor: "rgba(255, 200, 150, 0.85)",
          border: "3px solid #8b4513",
          borderRadius: "10px",
          padding: "10px 8px 8px 8px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          boxShadow: "inset -4px 0 8px rgba(255,255,255,0.4), inset 4px 0 8px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.2)"
        }}
      >
        {/* Glass highlight */}
        <div 
          className="absolute top-6 left-2 w-8 h-36 rounded-full pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(255,255,255,0.4), rgba(255,255,255,0))",
            filter: "blur(4px)"
          }}
        />
        {/* Label Background */}
        <div 
          className="relative flex-grow"
          style={{
            backgroundColor: "#fff",
            border: "2px solid #333",
            padding: "5px",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          {/* Pharmacy Header */}
          <div 
            className="text-center border-b border-primary pb-0.5 mb-1"
            style={{ fontSize: "5px", color: '#000', fontWeight: "bold" }}
          >
            PHARMACY
          </div>

          {/* Medication Name */}
          <div 
            className="font-bold text-center mb-1"
            style={{ 
              fontSize: medicationName.length > 12 ? "8px" : "9px",
              color: '#000',
              lineHeight: "1.1"
            }}
          >
            {medicationName}
          </div>

          {/* Dosage */}
          <div 
            className="text-center pb-0.5 border-b border-gray-300"
            style={{ 
              fontSize: "6px",
              color: '#000',
              fontWeight: "600"
            }}
          >
            {dosage}
          </div>

          {/* Quantity and Date in compact layout */}
          <div className="text-center" style={{ fontSize: "5px", color: '#000' }}>
            <div><span className="font-bold">Qty:</span> {quantity}</div>
            <div><span className="font-bold">Date:</span> {formattedDate}</div>
          </div>

          {/* Warning */}
          <div 
            className="text-center bg-yellow-100 border border-yellow-600 px-1"
            style={{ fontSize: "4px", color: '#000', fontWeight: "bold", padding: "2px 4px" }}
          >
            ⚠ READ LEAFLET
          </div>
        </div>

        {/* Pills visible through bottle - animated */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1 opacity-60 pointer-events-none">
          {Array.from({ length: 14 }).map((_, i) => (
            <div 
              key={i}
              className="animate-pulse"
              style={{
                width: i % 3 === 0 ? "10px" : "8px",
                height: i % 3 === 0 ? "5px" : "8px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: i % 3 === 0 ? "30%" : "50%",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
                animationDelay: `${i * 0.15}s`,
                animationDuration: "3s"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};