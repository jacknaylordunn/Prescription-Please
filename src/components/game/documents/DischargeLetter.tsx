interface DischargeLetterProps {
  patientName: string;
  age: number;
  condition: string;
  isEnlarged?: boolean;
  doctorName?: string;
  admissionDate?: Date;
  dischargeDate?: Date;
}

export const DischargeLetter = ({ patientName, age, condition, isEnlarged = false, doctorName = "Anderson", admissionDate, dischargeDate }: DischargeLetterProps) => {
  const admitDate = admissionDate || new Date();
  const disDate = dischargeDate || new Date();
  
  return (
    <div 
      className="paper-texture border-4 border-paper-border pixel-text document-shadow select-none animate-fade-in hover:scale-[1.02] transition-transform duration-200"
      style={{ 
        width: "280px",
        padding: "12px",
      }}
    >
      {/* Hospital Header */}
      <div className="border-b-2 border-nhs-blue pb-2 mb-2 bg-nhs-blue/10">
        <div className="font-bold" style={{ fontSize: "10px", color: '#000' }}>
          NHS HOSPITAL
        </div>
        <div className="mt-0.5 font-bold" style={{ fontSize: "7px", color: '#000' }}>
          A&E Discharge Summary
        </div>
      </div>

      {/* Patient Details */}
      <div className="grid grid-cols-2 gap-1 mb-2">
        <div className="border-2 border-paper-border p-2 bg-card">
          <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>PATIENT:</div>
          <div className="font-bold" style={{ fontSize: "8px", color: '#000', lineHeight: "1.2" }}>{patientName}</div>
        </div>
        <div className="border-2 border-paper-border p-2 bg-card">
          <div className="font-bold" style={{ fontSize: "6px", color: '#000' }}>AGE:</div>
          <div className="font-bold" style={{ fontSize: "8px", color: '#000' }}>{age} years</div>
        </div>
      </div>

      {/* Admission Details */}
      <div className="border-2 border-paper-border p-2 mb-2 bg-card">
        <div className="font-bold mb-1" style={{ fontSize: "7px", color: '#000' }}>Admission:</div>
        <div className="space-y-0.5" style={{ fontSize: "6px", color: '#000' }}>
          <div>
            <span className="font-bold">In: </span>
            <span className="font-bold">{admitDate.toLocaleDateString('en-GB')}</span>
          </div>
          <div>
            <span className="font-bold">Out: </span>
            <span className="font-bold">{disDate.toLocaleDateString('en-GB')}</span>
          </div>
        </div>
      </div>

      {/* Diagnosis */}
      <div className="border-2 border-nhs-blue p-2 mb-2 bg-nhs-blue/10">
        <div className="font-bold mb-1" style={{ fontSize: "7px", color: '#000' }}>Diagnosis:</div>
        <div className="font-bold" style={{ fontSize: "7px", color: '#000', lineHeight: "1.3" }}>
          {condition.substring(0, 50)}
        </div>
      </div>

      {/* Treatment Summary */}
      <div className="border-2 border-paper-border p-2 mb-2 bg-card">
        <div className="font-bold mb-1" style={{ fontSize: "7px", color: '#000' }}>Treatment:</div>
        <div style={{ fontSize: "6px", color: '#000', lineHeight: "1.3" }}>
          • Assessment done<br/>
          • Investigations done<br/>
          • Treatment started<br/>
          • Stable for discharge
        </div>
      </div>

      {/* Discharge Medications */}
      <div className="border-2 border-accent p-2 mb-2 bg-accent/10">
        <div className="font-bold mb-1" style={{ fontSize: "7px", color: '#000' }}>Medications:</div>
        <div style={{ fontSize: "6px", color: '#000', lineHeight: "1.3" }}>
          See FP10 prescription.<br/>
          Changes to existing meds.<br/>
          Patient counselled.
        </div>
      </div>

      {/* Follow-up */}
      <div className="border-2 border-paper-border p-2 mb-2 bg-card">
        <div className="font-bold mb-1" style={{ fontSize: "7px", color: '#000' }}>Follow-up:</div>
        <div style={{ fontSize: "6px", color: '#000', lineHeight: "1.3" }}>
          • GP in 1 week<br/>
          • Return if worse<br/>
          • District nurse ref
        </div>
      </div>

      {/* Doctor Details */}
      <div className="border-t border-paper-border pt-2">
        <div style={{ fontSize: "6px", color: '#000' }}>
          <span className="font-bold">Dr: </span>
          <span className="font-bold">Dr. {doctorName}</span>
        </div>
        <div className="font-bold mt-0.5" style={{ fontSize: "5px", color: '#000' }}>
          EM Registrar
        </div>
      </div>
    </div>
  );
};
