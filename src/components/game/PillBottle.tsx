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
      className="pixel-text select-none document-shadow transition-transform hover:scale-105"
      style={{ 
        width: "120px",
        height: "160px",
        position: "relative"
      }}
    >
      {/* Bottle Cap */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "45px",
          height: "18px",
          backgroundColor: "#fff",
          border: "3px solid #333",
          borderBottom: "none",
          borderRadius: "6px 6px 0 0"
        }}
      >
        <div 
          className="absolute top-1 left-1/2 -translate-x-1/2"
          style={{
            width: "30px",
            height: "6px",
            backgroundColor: "#666",
            borderRadius: "2px"
          }}
        />
      </div>

      {/* Bottle Body */}
      <div 
        className="absolute top-4"
        style={{
          width: "120px",
          height: "140px",
          backgroundColor: "rgba(255, 200, 150, 0.85)",
          border: "3px solid #8b4513",
          borderRadius: "8px",
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "6px"
        }}
      >
        {/* Label Background */}
        <div 
          className="flex-grow"
          style={{
            backgroundColor: "#fff",
            border: "2px solid #333",
            padding: "6px",
            borderRadius: "4px"
          }}
        >
          {/* Pharmacy Header */}
          <div 
            className="text-center border-b-2 border-primary pb-1 mb-2"
            style={{ fontSize: "6px", color: '#000', fontWeight: "bold" }}
          >
            COMMUNITY PHARMACY
          </div>

          {/* Medication Name */}
          <div 
            className="font-bold text-center mb-2"
            style={{ 
              fontSize: "9px",
              color: '#000',
              lineHeight: "1.1"
            }}
          >
            {medicationName}
          </div>

          {/* Dosage */}
          <div 
            className="text-center mb-2 pb-1 border-b border-gray-300"
            style={{ 
              fontSize: "7px",
              color: '#000',
              fontWeight: "600"
            }}
          >
            {dosage}
          </div>

          {/* Quantity */}
          <div 
            className="text-center"
            style={{ fontSize: "6px", color: '#000' }}
          >
            <span className="font-bold">Qty:</span> {quantity}
          </div>

          {/* Date */}
          <div 
            className="text-center"
            style={{ fontSize: "6px", color: '#000' }}
          >
            <span className="font-bold">Date:</span> {formattedDate}
          </div>

          {/* Warning */}
          <div 
            className="mt-2 text-center bg-yellow-100 border border-yellow-600 px-1 py-1"
            style={{ fontSize: "5px", color: '#000', fontWeight: "bold" }}
          >
            ⚠ READ LEAFLET
          </div>
        </div>

        {/* Pills visible through bottle */}
        <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1 opacity-60">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "50%",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};