interface DNACPRProps {
  patientName: string;
  age: number;
  nhsNumber: string;
  isEnlarged?: boolean;
}

export const DNACPR = ({ patientName, age, nhsNumber, isEnlarged = false }: DNACPRProps) => {
  const scale = isEnlarged ? 1.5 : 1;
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB');
  
  return (
    <div 
      className="paper-texture border-4 border-destructive pixel-text document-shadow"
      style={{ 
        width: `${400 * scale}px`,
        fontSize: `${11 * scale}px`,
        padding: `${16 * scale}px`,
      }}
    >
      {/* Header */}
      <div className="bg-destructive text-destructive-foreground p-3 mb-4 text-center border-2 border-destructive">
        <div className="font-bold" style={{ fontSize: `${16 * scale}px` }}>
          DO NOT ATTEMPT CARDIOPULMONARY<br/>RESUSCITATION (DNACPR)
        </div>
      </div>

      {/* Patient Details */}
      <div className="border-2 border-paper-border p-3 mb-3 bg-card">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs opacity-70">Patient Name:</div>
            <div className="font-bold text-paper-text">{patientName}</div>
          </div>
          <div>
            <div className="text-xs opacity-70">Date of Birth:</div>
            <div className="font-bold text-paper-text">
              {new Date(new Date().getFullYear() - age, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('en-GB')}
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-xs opacity-70">NHS Number:</div>
            <div className="font-bold text-paper-text">{nhsNumber}</div>
          </div>
        </div>
      </div>

      {/* Decision */}
      <div className="border-2 border-destructive p-3 mb-3 bg-destructive/5">
        <div className="font-bold text-destructive mb-2">Decision:</div>
        <div className="text-paper-text text-sm leading-relaxed">
          ☒ CPR should NOT be attempted<br/>
          <br/>
          In the event of cardiac or respiratory arrest, do not attempt cardiopulmonary resuscitation.
        </div>
      </div>

      {/* Clinical Details */}
      <div className="border-2 border-paper-border p-3 mb-3 bg-card">
        <div className="font-bold text-paper-text mb-2">Clinical Details:</div>
        <div className="text-xs text-paper-text leading-relaxed">
          Advanced life limiting condition with<br/>
          deteriorating health status. Patient has<br/>
          capacity and agrees with this decision.
        </div>
      </div>

      {/* Signatures */}
      <div className="border-t-2 border-paper-border pt-3 space-y-2">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="opacity-70">Senior Doctor:</div>
            <div className="font-script text-lg text-paper-text">Dr. Signature</div>
          </div>
          <div>
            <div className="opacity-70">Date:</div>
            <div className="font-bold text-paper-text">{formattedDate}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t-2 border-destructive">
        <div className="text-xs text-destructive font-bold text-center">
          THIS FORM IS VALID ACROSS ALL CARE SETTINGS
        </div>
      </div>
    </div>
  );
};
