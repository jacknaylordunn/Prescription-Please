interface DischargeLetterProps {
  patientName: string;
  age: number;
  condition: string;
  isEnlarged?: boolean;
}

export const DischargeLetter = ({ patientName, age, condition, isEnlarged = false }: DischargeLetterProps) => {
  const scale = isEnlarged ? 1.5 : 1;
  const admissionDate = new Date(Date.now() - Math.floor(Math.random() * 7 + 1) * 24 * 60 * 60 * 1000);
  const dischargeDate = new Date();
  
  return (
    <div 
      className="paper-texture border-2 border-primary pixel-text document-shadow"
      style={{ 
        width: `${440 * scale}px`,
        fontSize: `${11 * scale}px`,
        padding: `${18 * scale}px`,
      }}
    >
      {/* Hospital Header */}
      <div className="border-b-4 border-primary pb-3 mb-4 bg-primary/10">
        <div className="font-bold text-primary" style={{ fontSize: `${18 * scale}px` }}>
          NHS HOSPITAL TRUST
        </div>
        <div className="text-paper-text mt-1 font-bold" style={{ fontSize: `${12 * scale}px` }}>
          Accident & Emergency Department<br/>
          Discharge Summary
        </div>
      </div>

      {/* Patient Details */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-paper-text">
        <div className="border-4 border-paper-border p-3 bg-card">
          <div className="font-bold" style={{ color: 'hsl(var(--doc-label))', fontSize: `${11 * scale}px` }}>Patient Name:</div>
          <div className="font-bold text-paper-text" style={{ fontSize: `${13 * scale}px` }}>{patientName}</div>
        </div>
        <div className="border-4 border-paper-border p-3 bg-card">
          <div className="font-bold" style={{ color: 'hsl(var(--doc-label))', fontSize: `${11 * scale}px` }}>Age:</div>
          <div className="font-bold text-paper-text" style={{ fontSize: `${13 * scale}px` }}>{age} years</div>
        </div>
      </div>

      {/* Admission Details */}
      <div className="border-4 border-paper-border p-3 mb-3 bg-card">
        <div className="font-bold text-paper-text mb-2" style={{ fontSize: `${13 * scale}px` }}>Admission Details:</div>
        <div className="text-paper-text space-y-1" style={{ fontSize: `${11 * scale}px` }}>
          <div>
            <span className="font-bold" style={{ color: 'hsl(var(--doc-label))' }}>Admitted: </span>
            <span className="font-bold">{admissionDate.toLocaleDateString('en-GB')}</span>
          </div>
          <div>
            <span className="font-bold" style={{ color: 'hsl(var(--doc-label))' }}>Discharged: </span>
            <span className="font-bold">{dischargeDate.toLocaleDateString('en-GB')}</span>
          </div>
        </div>
      </div>

      {/* Diagnosis */}
      <div className="border-4 border-primary p-3 mb-3 bg-primary/10">
        <div className="font-bold text-paper-text mb-2" style={{ fontSize: `${13 * scale}px` }}>Primary Diagnosis:</div>
        <div className="text-paper-text font-bold" style={{ fontSize: `${13 * scale}px` }}>
          {condition}
        </div>
      </div>

      {/* Treatment Summary */}
      <div className="border-4 border-paper-border p-3 mb-3 bg-card">
        <div className="font-bold text-paper-text mb-2" style={{ fontSize: `${13 * scale}px` }}>Treatment Given:</div>
        <div className="text-paper-text leading-relaxed" style={{ fontSize: `${11 * scale}px` }}>
          • Clinical assessment completed<br/>
          • Investigations performed as indicated<br/>
          • Treatment initiated in hospital<br/>
          • Condition stable for discharge<br/>
          • Follow-up arrangements made
        </div>
      </div>

      {/* Discharge Medications */}
      <div className="border-4 border-accent p-3 mb-3 bg-accent/10">
        <div className="font-bold text-paper-text mb-2" style={{ fontSize: `${13 * scale}px` }}>Discharge Medications:</div>
        <div className="text-paper-text" style={{ fontSize: `${11 * scale}px` }}>
          See attached prescription (FP10).<br/>
          Changes made to existing medications.<br/>
          Patient counselled on new drugs.
        </div>
      </div>

      {/* Follow-up */}
      <div className="border-4 border-paper-border p-3 mb-3 bg-card">
        <div className="font-bold text-paper-text mb-2" style={{ fontSize: `${13 * scale}px` }}>Follow-up:</div>
        <div className="text-paper-text leading-relaxed" style={{ fontSize: `${11 * scale}px` }}>
          • GP follow-up in 1 week<br/>
          • Outpatient review if symptoms worsen<br/>
          • Return to ED if deterioration<br/>
          • District nurse referral made
        </div>
      </div>

      {/* Doctor Details */}
      <div className="border-t-4 border-paper-border pt-3">
        <div className="text-paper-text" style={{ fontSize: `${11 * scale}px` }}>
          <span className="font-bold" style={{ color: 'hsl(var(--doc-label))' }}>Discharging Doctor: </span>
          <span className="font-bold">Dr. {["Anderson", "Mitchell", "Thompson", "Roberts"][Math.floor(Math.random() * 4)]}</span>
        </div>
        <div className="text-paper-text font-bold mt-1" style={{ fontSize: `${11 * scale}px` }}>
          Emergency Medicine Registrar
        </div>
      </div>
    </div>
  );
};
