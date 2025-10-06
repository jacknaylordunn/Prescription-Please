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
      <div className="border-4 border-paper-border p-3 mb-3 bg-card">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs font-bold" style={{ color: '#000' }}>Patient Name:</div>
            <div className="font-bold" style={{ fontSize: `${13 * scale}px`, color: '#000' }}>{patientName}</div>
          </div>
          <div>
            <div className="text-xs font-bold" style={{ color: '#000' }}>Date of Birth:</div>
            <div className="font-bold" style={{ fontSize: `${13 * scale}px`, color: '#000' }}>
              {new Date(new Date().getFullYear() - age, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString('en-GB')}
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-xs font-bold" style={{ color: '#000' }}>NHS Number:</div>
            <div className="font-bold" style={{ fontSize: `${13 * scale}px`, color: '#000' }}>{nhsNumber}</div>
          </div>
        </div>
      </div>

      {/* Decision */}
      <div className="border-4 border-destructive p-4 mb-3 bg-destructive/10">
        <div className="font-bold text-destructive mb-3" style={{ fontSize: `${14 * scale}px` }}>Decision:</div>
        <div className="font-bold leading-relaxed" style={{ fontSize: `${12 * scale}px`, color: '#000' }}>
          ☒ CPR should NOT be attempted<br/>
          <br/>
          In the event of cardiac or respiratory<br/>
          arrest, do not attempt cardiopulmonary<br/>
          resuscitation.
        </div>
      </div>

      {/* Clinical Details */}
      <div className="border-4 border-paper-border p-3 mb-3 bg-card">
        <div className="font-bold mb-2" style={{ fontSize: `${13 * scale}px`, color: '#000' }}>Clinical Details:</div>
        <div className="leading-relaxed" style={{ fontSize: `${11 * scale}px`, color: '#000' }}>
          Advanced life limiting condition with<br/>
          deteriorating health status. Patient has<br/>
          capacity and agrees with this decision.
        </div>
      </div>

      {/* Signatures */}
      <div className="border-t-2 border-paper-border pt-3 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs font-bold" style={{ color: '#000' }}>Senior Doctor:</div>
            <div className="font-script" style={{ fontSize: `${18 * scale}px`, color: '#000' }}>Dr. Signature</div>
          </div>
          <div>
            <div className="text-xs font-bold" style={{ color: '#000' }}>Date:</div>
            <div className="font-bold" style={{ fontSize: `${13 * scale}px`, color: '#000' }}>{formattedDate}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t-4 border-destructive bg-destructive/10">
        <div className="font-bold text-destructive text-center" style={{ fontSize: `${11 * scale}px` }}>
          THIS FORM IS VALID ACROSS ALL CARE SETTINGS
        </div>
      </div>
    </div>
  );
};
