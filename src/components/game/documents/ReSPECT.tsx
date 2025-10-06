interface ReSPECTProps {
  patientName: string;
  age: number;
  nhsNumber: string;
  isEnlarged?: boolean;
}

export const ReSPECT = ({ patientName, age, nhsNumber, isEnlarged = false }: ReSPECTProps) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB');
  
  return (
    <div 
      className="paper-texture border-4 border-primary pixel-text document-shadow select-none"
      style={{ 
        width: "280px",
        padding: "12px",
      }}
    >
      {/* Header */}
      <div className="bg-primary/20 border-b-2 border-primary p-2 mb-2">
        <div className="font-bold text-center" style={{ fontSize: "10px", color: '#000' }}>
          ReSPECT
        </div>
        <div className="text-center" style={{ fontSize: "6px", color: '#000' }}>
          Recommended Summary Plan for<br/>Emergency Care and Treatment
        </div>
      </div>

      {/* Patient Details */}
      <div className="border-2 border-paper-border p-2 mb-2 bg-card">
        <div className="space-y-1">
          <div>
            <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>PATIENT NAME:</div>
            <div className="font-bold" style={{ fontSize: "8px", color: '#000' }}>{patientName}</div>
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div>
              <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>DOB:</div>
              <div style={{ fontSize: "7px", color: '#000' }}>
                {new Date(new Date().getFullYear() - age, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('en-GB')}
              </div>
            </div>
            <div>
              <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>NHS:</div>
              <div style={{ fontSize: "7px", color: '#000' }}>{nhsNumber}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Summary */}
      <div className="border-2 border-paper-border p-2 mb-2 bg-card">
        <div className="font-bold mb-1" style={{ fontSize: "7px", color: '#000' }}>
          1. SUMMARY OF CARE PREFERENCES
        </div>
        <div style={{ fontSize: "6px", color: '#000', lineHeight: "1.4" }}>
          Patient wishes to remain at home<br/>
          where possible. Supportive care<br/>
          prioritised over life-prolonging<br/>
          interventions.
        </div>
      </div>

      {/* Section 2: Clinical Recommendations */}
      <div className="border-2 border-primary p-2 mb-2 bg-primary/10">
        <div className="font-bold mb-1" style={{ fontSize: "7px", color: '#000' }}>
          2. CLINICAL RECOMMENDATIONS
        </div>
        <div style={{ fontSize: "6px", color: '#000', lineHeight: "1.4" }}>
          ☒ Focus on symptom control<br/>
          ☒ Full medical treatment<br/>
          ☐ CPR attempts appropriate<br/>
          <div className="mt-1 font-bold">
            If cardiac/respiratory arrest:<br/>
            Do not attempt CPR
          </div>
        </div>
      </div>

      {/* Section 3: Capacity */}
      <div className="border-2 border-paper-border p-2 mb-2 bg-card">
        <div className="font-bold mb-1" style={{ fontSize: "7px", color: '#000' }}>
          3. CAPACITY & REPRESENTATION
        </div>
        <div style={{ fontSize: "6px", color: '#000', lineHeight: "1.4" }}>
          ☒ Patient has capacity<br/>
          ☒ Patient involved in decision<br/>
          ☐ Next of kin consulted
        </div>
      </div>

      {/* Signatures */}
      <div className="border-t border-paper-border pt-2 space-y-1">
        <div>
          <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>Clinician Name:</div>
          <div className="font-script" style={{ fontSize: "9px", color: '#000' }}>Dr. Patterson</div>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div>
            <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>GMC:</div>
            <div style={{ fontSize: "7px", color: '#000' }}>7834562</div>
          </div>
          <div>
            <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>Date:</div>
            <div style={{ fontSize: "7px", color: '#000' }}>{formattedDate}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2 pt-2 border-t-2 border-primary bg-primary/10">
        <div className="font-bold text-center" style={{ fontSize: "5px", color: '#000' }}>
          REVIEW DATE: {new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}
        </div>
      </div>
    </div>
  );
};