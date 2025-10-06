interface ReSPECTProps {
  patientName: string;
  age: number;
  nhsNumber: string;
  isEnlarged?: boolean;
  doctorName?: string;
  gmcNumber?: string;
  formattedDate?: string;
  patientDOB?: string;
  respectReviewDate?: string;
}

export const ReSPECT = ({ patientName, age, nhsNumber, isEnlarged = false, doctorName = "Dr. Patterson", gmcNumber, formattedDate, patientDOB, respectReviewDate }: ReSPECTProps) => {
  const today = new Date();
  const dateToShow = formattedDate || today.toLocaleDateString('en-GB');
  const gmcNum = gmcNumber || "7834562";
  const dob = patientDOB || new Date(new Date().getFullYear() - age, 0, 1).toLocaleDateString('en-GB');
  const reviewDate = respectReviewDate || new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB');
  
  return (
    <div 
      className="border-4 pixel-text document-shadow select-none animate-fade-in hover:scale-[1.02] transition-transform duration-200"
      style={{ 
        width: "280px",
        padding: "12px",
        background: `
          repeating-linear-gradient(
            0deg,
            hsl(var(--respect-purple)) 0px,
            hsl(var(--respect-purple)) 1px,
            hsl(270 60% 90%) 1px,
            hsl(270 60% 90%) 2px
          ),
          linear-gradient(135deg, hsl(var(--respect-purple)) 0%, hsl(270 50% 86%) 100%)
        `,
        borderColor: 'hsl(var(--respect-purple-border))',
      }}
    >
      {/* Header */}
      <div className="border-b-2 p-2 mb-2" style={{ 
        backgroundColor: 'hsl(var(--respect-purple-dark))',
        borderColor: 'hsl(var(--respect-purple-border))'
      }}>
        <div className="font-bold text-center" style={{ fontSize: "10px", color: '#fff' }}>
          ReSPECT
        </div>
        <div className="text-center" style={{ fontSize: "6px", color: '#fff' }}>
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
                {dob}
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
      <div className="border-2 p-2 mb-2" style={{ 
        borderColor: 'hsl(var(--respect-purple-border))',
        backgroundColor: 'hsl(var(--respect-purple-dark) / 0.15)'
      }}>
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
          <div className="font-script" style={{ fontSize: "9px", color: '#000' }}>{doctorName}</div>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div>
            <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>GMC:</div>
            <div style={{ fontSize: "7px", color: '#000' }}>{gmcNum}</div>
          </div>
          <div>
            <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>Date:</div>
            <div style={{ fontSize: "7px", color: '#000' }}>{dateToShow}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2 pt-2 border-t-2" style={{ 
        borderColor: 'hsl(var(--respect-purple-border))',
        backgroundColor: 'hsl(var(--respect-purple-dark) / 0.15)'
      }}>
        <div className="font-bold text-center" style={{ fontSize: "5px", color: '#000' }}>
          REVIEW DATE: {reviewDate}
        </div>
      </div>
    </div>
  );
};