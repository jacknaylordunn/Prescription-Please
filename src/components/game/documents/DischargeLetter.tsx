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
      <div className="border-b-4 border-primary pb-3 mb-4 bg-primary/5">
        <div className="font-bold text-primary" style={{ fontSize: `${16 * scale}px` }}>
          NHS HOSPITAL TRUST
        </div>
        <div className="text-xs text-paper-text mt-1">
          Accident & Emergency Department<br/>
          Discharge Summary
        </div>
      </div>

      {/* Patient Details */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-paper-text">
        <div className="border-2 border-paper-border p-2 bg-card">
          <div className="text-xs opacity-70">Patient Name:</div>
          <div className="font-bold">{patientName}</div>
        </div>
        <div className="border-2 border-paper-border p-2 bg-card">
          <div className="text-xs opacity-70">Age:</div>
          <div className="font-bold">{age} years</div>
        </div>
      </div>

      {/* Admission Details */}
      <div className="border-2 border-paper-border p-3 mb-3 bg-card">
        <div className="font-bold text-paper-text mb-2">Admission Details:</div>
        <div className="text-sm text-paper-text space-y-1">
          <div>
            <span className="opacity-70">Admitted: </span>
            <span className="font-bold">{admissionDate.toLocaleDateString('en-GB')}</span>
          </div>
          <div>
            <span className="opacity-70">Discharged: </span>
            <span className="font-bold">{dischargeDate.toLocaleDateString('en-GB')}</span>
          </div>
        </div>
      </div>

      {/* Diagnosis */}
      <div className="border-2 border-primary p-3 mb-3 bg-primary/5">
        <div className="font-bold text-paper-text mb-2">Primary Diagnosis:</div>
        <div className="text-sm text-paper-text font-bold">
          {condition}
        </div>
      </div>

      {/* Treatment Summary */}
      <div className="border-2 border-paper-border p-3 mb-3 bg-card">
        <div className="font-bold text-paper-text mb-2">Treatment Given:</div>
        <div className="text-sm text-paper-text leading-relaxed">
          • Clinical assessment completed<br/>
          • Investigations performed as indicated<br/>
          • Treatment initiated in hospital<br/>
          • Condition stable for discharge<br/>
          • Follow-up arrangements made
        </div>
      </div>

      {/* Discharge Medications */}
      <div className="border-2 border-accent p-3 mb-3 bg-accent/5">
        <div className="font-bold text-paper-text mb-2">Discharge Medications:</div>
        <div className="text-sm text-paper-text">
          See attached prescription (FP10).<br/>
          Changes made to existing medications.<br/>
          Patient counselled on new drugs.
        </div>
      </div>

      {/* Follow-up */}
      <div className="border-2 border-paper-border p-3 mb-3 bg-card">
        <div className="font-bold text-paper-text mb-2">Follow-up:</div>
        <div className="text-sm text-paper-text leading-relaxed">
          • GP follow-up in 1 week<br/>
          • Outpatient review if symptoms worsen<br/>
          • Return to ED if deterioration<br/>
          • District nurse referral made
        </div>
      </div>

      {/* Doctor Details */}
      <div className="border-t-2 border-paper-border pt-3">
        <div className="text-xs text-paper-text">
          <span className="opacity-70">Discharging Doctor: </span>
          <span className="font-bold">Dr. {["Anderson", "Mitchell", "Thompson", "Roberts"][Math.floor(Math.random() * 4)]}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Emergency Medicine Registrar
        </div>
      </div>
    </div>
  );
};
